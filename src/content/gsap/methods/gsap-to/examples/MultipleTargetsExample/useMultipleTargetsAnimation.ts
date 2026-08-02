/** 여러 대상 예제의 애니메이션 상태와 실행을 한곳에서 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

type Origin = 'start' | 'center' | 'edges' | 'random'

/** 여러 대상 예제 UI가 표시하고 조절할 애니메이션 값을 제공한다. */
export function useMultipleTargetsAnimation() {
  const scope = useRef<HTMLDivElement>(null)
  const targetClassName = 'multiple-targets-example__dot'
  const [x, setX] = useState(170)
  const [duration, setDuration] = useState(0.6)
  const [stagger, setStagger] = useState(0.12)
  const [from, setFrom] = useState<Origin>('start')
  const [runKey, setRunKey] = useState(0)
  const reducedMotion = useReducedMotion()
  const animationDuration = reducedMotion ? 0 : duration
  const animationStagger = reducedMotion ? 0 : stagger

  useGSAP(
    () => {
      // 모션 감소 환경에서는 duration과 시작 간격을 모두 없애 연속 동작을 만들지 않는다.
      gsap.set(`.${targetClassName}`, { x: 0 })
      gsap.to(`.${targetClassName}`, { x, duration: animationDuration, stagger: { each: animationStagger, from }, ease: 'power2.out' })
    },
    { scope, dependencies: [x, duration, stagger, from, reducedMotion, runKey], revertOnUpdate: true },
  )

  return {
    scope,
    targetClassName,
    x,
    setX,
    duration,
    setDuration,
    animationDuration,
    stagger,
    setStagger,
    animationStagger,
    from,
    setFrom,
    reducedMotion,
    replay: () => setRunKey((key) => key + 1),
  }
}
