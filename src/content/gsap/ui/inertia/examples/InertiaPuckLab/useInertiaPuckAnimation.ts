/** 하나의 discriminated descriptor로 tracking·prediction·tween·snapshot을 동기화한다. */
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
  predictedEnd: number
  position: number
  notice: string
}

gsap.registerPlugin(InertiaPlugin)

/** number line의 가장 가까운 notch를 학습용 예상 readout에 쓴다. */
const nearestEnd = (value: number, ends: number[]) =>
  ends.reduce((closest, end) =>
    Math.abs(end - value) < Math.abs(closest - value) ? end : closest,
  )

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
    predictedEnd: 0,
    position: 0,
    notice: 'track 준비 중',
  })
  // descriptor는 tracking input, bounds, end, tween code와 snapshot prediction의 단일 source다
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
  // raw velocity를 range에 제한하고 가장 가까운 notch로 학습용 predicted end를 만든다
  const predictEnd = (position: number, velocity: number) => {
    const natural = position + (velocity / descriptor.resistance) * 120
    return nearestEnd(
      Math.min(descriptor.max, Math.max(descriptor.min, natural)),
      descriptor.end,
    )
  }
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
      predictedEnd: predictEnd(position, velocity),
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
    const trackedVelocity = InertiaPlugin.getVelocity(puck, 'x')
    const inputVelocity =
      descriptor.velocity === 'auto' ? trackedVelocity : descriptor.velocity
    const predictedEnd = predictEnd(readPosition(puck), inputVelocity)
    if (reducedMotion) {
      gsap.set(puck, { x: predictedEnd })
      readSnapshot(
        'reduced motion: tween 없이 predicted notch로 즉시 snap했습니다.',
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
      predictedEnd,
      notice: 'inertia tween 실행 중 — readout은 매 frame 갱신하지 않습니다.',
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
    setMode,
    sampleVelocity,
    throwPuck,
  }
}
