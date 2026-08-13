/** 하나의 descriptor로 tracking·inertia tween·완료 위치 snapshot을 동기화한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

export type VelocityMode = 'numeric' | 'auto'
type NumericDescriptor = {
  mode: 'numeric'
  velocity: number
  min: number
  max: number
  end: number[]
  resistance: number
  duration: { min: number; max: number }
}
type AutoDescriptor = Omit<NumericDescriptor, 'mode' | 'velocity'> & {
  mode: 'auto'
  velocity: 'auto'
}
export type InertiaDescriptor = NumericDescriptor | AutoDescriptor
export type InertiaSnapshot = {
  tracked: boolean
  velocity: number
  nearestNotch: number
  position: number
  notice: string
}

gsap.registerPlugin(InertiaPlugin)

export function useInertiaPuckAnimation() {
  // GSAP selection과 unmount cleanup을 page-local puck 하나로 한정한다
  const scope = useRef<HTMLDivElement>(null)
  // x transform과 Inertia tracking의 실제 target을 보관한다
  const puckRef = useRef<HTMLButtonElement>(null)
  // numeric velocity와 tracker auto velocity 중 하나를 선택한다
  const [mode, setMode] = useState<VelocityMode>('numeric')
  // keyboard sample이 만든 마지막 수치를 numeric descriptor에 연결한다
  const [numericVelocity, setNumericVelocity] = useState(500)
  // operating-system motion preference는 tween 대신 immediate snap을 고른다
  const reducedMotion = useReducedMotion()
  // readout은 high-frequency onUpdate가 아니라 action과 completion에서만 갱신한다
  const [snapshot, setSnapshot] = useState<InertiaSnapshot>({
    tracked: false,
    velocity: 0,
    nearestNotch: 0,
    position: 0,
    notice: 'track 준비 중',
  })
  // descriptor는 tracking input, bounds, end와 tween code의 단일 source다
  const descriptor: InertiaDescriptor =
    mode === 'numeric'
      ? {
          mode,
          velocity: numericVelocity,
          min: 0,
          max: 280,
          end: [0, 70, 140, 210, 280],
          resistance: 900,
          duration: { min: 0.25, max: 1.2 },
        }
      : {
          mode,
          velocity: 'auto',
          min: 0,
          max: 280,
          end: [0, 70, 140, 210, 280],
          resistance: 900,
          duration: { min: 0.25, max: 1.2 },
        }
  // current transform을 number로 읽어 direct GSAP mutation 후에도 snapshot을 사실대로 남긴다
  const readPosition = (puck: HTMLButtonElement) =>
    Number(gsap.getProperty(puck, 'x')) || 0
  // tracking 상태와 velocity를 실제 plugin static call로 가져와 sparse snapshot을 만든다
  const readSnapshot = (notice: string) => {
    const puck = puckRef.current
    if (!puck) return
    const tracked = InertiaPlugin.isTracking(puck, 'x')
    const velocity = tracked ? InertiaPlugin.getVelocity(puck, 'x') : 0
    const position = readPosition(puck)
    setSnapshot({
      tracked,
      velocity,
      nearestNotch: gsap.utils.snap(descriptor.end, position),
      position,
      notice,
    })
  }
  // keyboard sample은 controlled x mutation 후 tracker가 읽은 velocity를 numeric input에 반영한다
  const sampleVelocity = (delta: number) => {
    const puck = puckRef.current
    if (!puck) return
    gsap.killTweensOf(puck)
    gsap.set(puck, {
      x: Math.min(
        descriptor.max,
        Math.max(descriptor.min, readPosition(puck) + delta),
      ),
    })
    const velocity = InertiaPlugin.getVelocity(puck, 'x')
    setNumericVelocity(Math.round(velocity || delta * 12))
    readSnapshot('키보드 sample을 기록했습니다. 100ms 뒤 auto가 안정됩니다.')
  }
  // descriptor의 velocity/bounds/end/duration을 그대로 inertia tween으로 전달한다
  const throwPuck = () => {
    const puck = puckRef.current
    if (!puck) return
    gsap.killTweensOf(puck)
    if (reducedMotion) {
      // reduced motion에서는 관성 예측 대신 현재 위치에 가장 가까운 허용값을 고른다
      const finalX = gsap.utils.snap(descriptor.end, readPosition(puck))
      gsap.set(puck, { x: finalX })
      readSnapshot(
        'reduced motion: 관성 계산 없이 현재 위치에서 가장 가까운 notch로 이동했습니다.',
      )
      return
    }
    gsap.to(puck, {
      inertia: {
        x: {
          velocity: descriptor.velocity,
          min: descriptor.min,
          max: descriptor.max,
          end: descriptor.end,
        },
        resistance: descriptor.resistance,
        duration: descriptor.duration,
      },
      onComplete: () =>
        readSnapshot('tween 완료: 실제 x를 completion에서 읽었습니다.'),
    })
    setSnapshot((previous) => ({
      ...previous,
      notice: 'inertia tween 실행 중 — 도착 위치는 완료 뒤에 읽습니다.',
    }))
  }
  useGSAP(
    () => {
      // auto input과 getVelocity가 같은 x property를 공유하도록 mount에서 track한다
      const puck = puckRef.current
      if (!puck) return
      InertiaPlugin.track(puck, 'x')
      readSnapshot(
        'x tracking 시작: sample을 두 번 만든 뒤 auto를 선택할 수 있습니다.',
      )
      // unmount에는 tracked 모든 x와 실행 중 tween을 남기지 않는다
      return () => {
        gsap.killTweensOf(puck)
        InertiaPlugin.untrack(puck, 'x')
      }
    },
    // scope는 lab DOM으로 cleanup 범위를 고정한다
    { scope },
  )
  return {
    scope,
    puckRef,
    descriptor,
    snapshot,
    reducedMotion,
    setMode,
    sampleVelocity,
    throwPuck,
  }
}
