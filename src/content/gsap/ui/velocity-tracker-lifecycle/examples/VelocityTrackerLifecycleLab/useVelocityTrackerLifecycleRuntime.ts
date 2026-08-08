/** 하나의 stable target에서 VelocityTracker membership lifecycle을 실행한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { VelocityTracker } from 'gsap/utils/VelocityTracker'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// tracking set의 property와 unit type, comma-list는 runtime과 code panel이 공유한다
export const velocityTrackerSetDescriptor = {
  propertyList: 'x,rotation',
  typeList: 'num,deg',
  properties: [
    { name: 'x', type: 'num', unit: 'px', step: 24 },
    { name: 'rotation', type: 'deg', unit: 'deg', step: 15 },
  ],
} as const

// descriptor property 이름을 snapshot membership key로 제한한다
type PropertyName =
  (typeof velocityTrackerSetDescriptor.properties)[number]['name']
// action 뒤에만 갱신하는 tracker lookup과 property membership의 sparse readout이다
export type VelocityTrackerLifecycleSnapshot = {
  trackerFound: boolean
  membership: Record<PropertyName, boolean>
  values: Record<PropertyName, number>
  notice: string
}

// InertiaPlugin 파일 ownership과 standalone VelocityTracker core binding을 함께 등록한다
gsap.registerPlugin(InertiaPlugin)
VelocityTracker.register(gsap)

/** tracker set을 만들고 property별 membership과 cleanup을 page-local target에 한정한다. */
export function useVelocityTrackerLifecycleRuntime() {
  // useGSAP selection과 cleanup을 lab DOM 범위로 좁힌다
  const scope = useRef<HTMLDivElement>(null)
  // React가 유지하는 target node를 tracking API의 같은 object로 쓴다
  const targetRef = useRef<HTMLButtonElement>(null)
  // track()이 만든 instance는 add/remove action과 unmount cleanup에 재사용한다
  const trackerRef = useRef<
    ReturnType<typeof VelocityTracker.track>[number] | null
  >(null)
  // display는 ticker frame 대신 lifecycle action 뒤의 sparse snapshot만 보인다
  const [snapshot, setSnapshot] = useState<VelocityTrackerLifecycleSnapshot>({
    trackerFound: false,
    membership: { x: false, rotation: false },
    values: { x: 0, rotation: 0 },
    notice: 'track set을 준비 중입니다.',
  })
  // OS motion preference는 이 instant-only lab의 motion boundary를 표시한다
  const reducedMotion = useReducedMotion()
  // target transform을 action 시점의 number로 읽어 snapshot이 GSAP mutation과 같게 한다
  const readTargetValue = (target: HTMLButtonElement, property: PropertyName) =>
    Number(gsap.getProperty(target, property)) || 0
  // lookup과 actual isTracking 결과를 action 뒤 한 번만 React display로 옮긴다
  const readSnapshot = (notice: string) => {
    const target = targetRef.current
    if (!target) return
    setSnapshot({
      trackerFound: Boolean(VelocityTracker.getByTarget(target)),
      membership: {
        x: Boolean(VelocityTracker.isTracking(target, 'x')),
        rotation: Boolean(VelocityTracker.isTracking(target, 'rotation')),
      },
      values: {
        x: readTargetValue(target, 'x'),
        rotation: readTargetValue(target, 'rotation'),
      },
      notice,
    })
  }
  // descriptor comma-list를 static track call과 source-derived type-list cast에 함께 쓴다
  const trackSet = () => {
    const target = targetRef.current
    if (!target) return
    const [tracker] = VelocityTracker.track(
      target,
      velocityTrackerSetDescriptor.propertyList,
      velocityTrackerSetDescriptor.typeList as Parameters<
        typeof VelocityTracker.track
      >[2],
    )
    trackerRef.current = tracker
    readSnapshot('x,rotation track set을 시작했습니다.')
  }
  // instance add/remove가 property 하나의 membership만 바꾸게 한다
  const toggleProperty = (property: PropertyName) => {
    const target = targetRef.current
    const tracker = trackerRef.current
    if (!target || !tracker) return
    const detail = velocityTrackerSetDescriptor.properties.find(
      (candidate) => candidate.name === property,
    )
    if (!detail) return
    if (VelocityTracker.isTracking(target, property)) {
      tracker.remove(property)
      readSnapshot(`${property} tracking을 remove했습니다.`)
      return
    }
    tracker.add(property, detail.type)
    readSnapshot(`${property} tracking을 add했습니다.`)
  }
  // static untrack의 property 생략 form으로 target의 set 전체를 끝낸다
  const untrackAll = () => {
    const target = targetRef.current
    if (!target) return
    VelocityTracker.untrack(target)
    readSnapshot('target 전체를 untrack했습니다.')
  }
  // native button action은 GSAP set으로 해당 unit의 target value만 즉시 바꾼다
  const nudge = (property: PropertyName, direction: -1 | 1) => {
    const target = targetRef.current
    if (!target) return
    const detail = velocityTrackerSetDescriptor.properties.find(
      (candidate) => candidate.name === property,
    )
    if (!detail) return
    const next = readTargetValue(target, property) + detail.step * direction
    if (property === 'x') gsap.set(target, { x: next })
    else gsap.set(target, { rotation: next })
    readSnapshot(
      `${property}를 ${direction > 0 ? '+' : '-'}${detail.step}${detail.unit} 변경했습니다${reducedMotion ? ' (reduced motion: instant)' : ''}.`,
    )
  }
  useGSAP(
    () => {
      // mount에서 static track으로 stable target의 x와 rotation set을 시작한다
      trackSet()
      const target = targetRef.current
      const tracker = trackerRef.current
      if (!target || !tracker) return undefined
      // unmount에서는 property remove 후 whole-target untrack으로 ticker tracking을 남기지 않는다
      return () => {
        tracker.remove('x')
        tracker.remove('rotation')
        VelocityTracker.untrack(target)
        trackerRef.current = null
      }
    },
    // scope는 target query와 cleanup을 local lab으로 고정한다
    { scope },
  )
  // lab는 stable target refs, descriptor, sparse snapshot과 lifecycle controls를 함께 받는다
  return {
    scope,
    targetRef,
    descriptor: velocityTrackerSetDescriptor,
    snapshot,
    reducedMotion,
    nudge,
    toggleProperty,
    trackSet,
    untrackAll,
  }
}
