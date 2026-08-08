/** stable object를 P16 pattern으로 track하고 requested velocity snapshot만 읽는다. */
import gsap from 'gsap'
import { VelocityTracker } from 'gsap/utils/VelocityTracker'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// selected property와 display unit을 함께 고정하는 descriptor의 선택값이다.
type TrackedProperty = 'x' | 'rotation'

// requested snapshot만 screen reader에 전달할 query matrix result다.
type VelocitySnapshot = {
  instanceVelocity: number | null
  staticVelocity: number | null
  lookupFound: boolean
  staticMembership: boolean
  instanceMembership: boolean
  targetIdentity: boolean
  missingLookup: boolean
  missingMembership: boolean
}

// installed source가 제공하지만 d.ts에는 없는 instance property query를 좁힌다.
type InstalledTracker = gsap.VelocityTrackerInstance & {
  isTracking: (property: string) => boolean
}

/** one stable target에서 lookup, membership, velocity read를 분리하는 runtime이다. */
export function useVelocityGaugeRuntime() {
  // GSAP cache identity가 유지되는 plain object target이다.
  const targetRef = useRef({ x: 0, rotation: 0 })
  // P16 tracking pattern이 만든 instance를 cleanup까지 보관한다.
  const trackerRef = useRef<InstalledTracker | null>(null)
  // missing boundary를 실제 lookup에 쓰는 다른 stable object다.
  const missingTargetRef = useRef({ x: 0, rotation: 0 })
  // x와 rotation 중 실제 get/isTracking query property를 고른다.
  const [property, setProperty] = useState<TrackedProperty>('x')
  // input이 변경한 stable object 값을 preview transform으로 표시한다.
  const [position, setPosition] = useState({ x: 0, rotation: 0 })
  // snapshot button을 요청했을 때만 visual velocity를 갱신한다.
  const [snapshot, setSnapshot] = useState<VelocitySnapshot | null>(null)
  // no-autoplay lab도 actual preference를 InteractiveExample notice에 전달한다.
  const reducedMotion = useReducedMotion()
  // actual track setup, query property, unit, code가 공유하는 single descriptor다.
  const descriptor = {
    targetLabel: 'stableVelocityTarget',
    properties: 'x,rotation',
    type: 'num' as const,
    property,
    unit: property === 'x' ? 'px/s' : 'deg/s',
    input:
      property === 'x'
        ? { min: 0, max: 240, step: 4 }
        : { min: -180, max: 180, step: 6 },
  }

  useEffect(() => {
    const target = targetRef.current
    // VelocityTracker는 GSAP core에 먼저 register해 P16 static tracking pattern을 사용한다.
    gsap.registerPlugin(VelocityTracker)
    // x와 rotation을 한 stable target에 track해 이후 read API가 찾을 instance를 만든다.
    const [tracker] = VelocityTracker.track(
      target,
      descriptor.properties,
      descriptor.type,
    )
    trackerRef.current = tracker as InstalledTracker

    return () => {
      // tracked properties를 cleanup에서 untrack해 ticker sampling과 lookup을 남기지 않는다.
      VelocityTracker.untrack(target, descriptor.properties)
      trackerRef.current = null
    }
    // setup properties는 P16 prerequisite contract로 고정되어 lifecycle을 한 번만 만든다.
  }, [])

  // property를 바꾸면 이전 단위로 읽은 snapshot을 지워 새 label과 오래된 값을 섞지 않는다.
  const selectProperty = (nextProperty: TrackedProperty) => {
    setProperty(nextProperty)
    setSnapshot(null)
  }

  // selected property 값만 stable target에 쓰고 velocity display는 snapshot 요청 전까지 그대로 둔다.
  const setPropertyValue = (value: number) => {
    const target = targetRef.current
    target[descriptor.property] = value
    setPosition({ x: target.x, rotation: target.rotation })
  }

  // lookup 성공 뒤에만 get/getVelocity를 호출해 missing target warning path를 피한다.
  const captureSnapshot = () => {
    const target = targetRef.current
    const tracker = VelocityTracker.getByTarget(target)
    const foundTracker =
      (tracker as InstalledTracker | undefined) ?? trackerRef.current
    const instanceVelocity = foundTracker
      ? foundTracker.get(descriptor.property)
      : null
    const staticVelocity = foundTracker
      ? VelocityTracker.getVelocity(target, descriptor.property)
      : null
    const missingTarget = missingTargetRef.current
    setSnapshot({
      instanceVelocity: Number.isFinite(instanceVelocity)
        ? instanceVelocity
        : null,
      staticVelocity: Number.isFinite(staticVelocity) ? staticVelocity : null,
      lookupFound: Boolean(foundTracker),
      staticMembership: Boolean(
        VelocityTracker.isTracking(target, descriptor.property),
      ),
      instanceMembership: Boolean(
        foundTracker?.isTracking(descriptor.property),
      ),
      targetIdentity: Boolean(foundTracker && foundTracker.target === target),
      missingLookup: Boolean(VelocityTracker.getByTarget(missingTarget)),
      missingMembership: Boolean(
        VelocityTracker.isTracking(missingTarget, descriptor.property),
      ),
    })
  }

  // display layer에는 descriptor, preview values, demand-snapshot action만 돌려준다.
  return {
    property,
    setProperty: selectProperty,
    position,
    snapshot,
    descriptor,
    reducedMotion,
    setPropertyValue,
    captureSnapshot,
  }
}
