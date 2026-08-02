/** 도착값 예제의 애니메이션 상태와 실행을 한곳에서 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

type Ease = 'none' | 'power1.out' | 'power2.out' | 'back.out(1.7)'

/** 도착값 예제 UI가 표시하고 조절할 애니메이션 값을 제공한다. */
export function useDestinationValuesAnimation() {
  const scope = useRef<HTMLDivElement>(null)
  const targetClassName = 'destination-values-example__target'
  const [x, setX] = useState(180)
  const [rotation, setRotation] = useState(90)
  const [duration, setDuration] = useState(1)
  const [ease, setEase] = useState<Ease>('power2.out')
  const [runKey, setRunKey] = useState(0)
  const reducedMotion = useReducedMotion()
  const animationDuration = reducedMotion ? 0 : duration

  useGSAP(
    () => {
      // 모션 감소 환경에서는 목표 상태만 즉시 보여줘 자동 이동을 만들지 않는다.
      gsap.set(`.${targetClassName}`, { x: 0, rotation: 0 })
      gsap.to(`.${targetClassName}`, { x, rotation, duration: animationDuration, ease })
    },
    { scope, dependencies: [x, rotation, duration, ease, reducedMotion, runKey], revertOnUpdate: true },
  )

  return {
    scope,
    targetClassName,
    x,
    setX,
    rotation,
    setRotation,
    duration,
    setDuration,
    animationDuration,
    ease,
    setEase,
    reducedMotion,
    replay: () => setRunKey((key) => key + 1),
  }
}
