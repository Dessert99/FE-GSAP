/** 여러 대상 예제의 애니메이션 상태와 실행을 한곳에서 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** stagger가 첫 출발 target을 정할 때 사용할 기준 위치다. */
type Origin = 'start' | 'center' | 'edges' | 'random'

/** 여러 대상 예제 UI가 표시하고 조절할 애니메이션 값을 제공한다. */
export function useMultipleTargetsAnimation() {
  // 다섯 target 선택과 useGSAP 정리를 이 예제 DOM 안으로 제한한다.
  const scope = useRef<HTMLDivElement>(null)
  // 실행 선택자와 미리보기 className이 같은 다섯 target을 가리키게 한다.
  const targetClassName = 'multiple-targets-example__dot'
  // 모든 target이 공유할 x 도착값을 조절한다.
  const [x, setX] = useState(170)
  // 각 target 하나가 이동하는 시간을 조절한다.
  const [duration, setDuration] = useState(0.6)
  // 인접한 target들의 시작 시각 사이 간격을 조절한다.
  const [stagger, setStagger] = useState(0.12)
  // stagger 순서의 첫 기준점을 선택한다.
  const [from, setFrom] = useState<Origin>('start')
  // 같은 설정도 처음부터 다시 실행할 수 있도록 재생 횟수를 센다.
  const [runKey, setRunKey] = useState(0)
  // 모션 감소 환경에서는 이동과 순차 출발을 모두 즉시 끝낸다.
  const reducedMotion = useReducedMotion()
  // 모션 설정에 맞춰 실제 Tween duration을 정규화한다.
  const animationDuration = reducedMotion ? 0 : duration
  // 모션 설정에 맞춰 실제 target 사이 시작 간격을 정규화한다.
  const animationStagger = reducedMotion ? 0 : stagger

  useGSAP(
    () => {
      // 이전 실행의 x를 지워 다섯 target을 같은 출발점에 놓는다.
      gsap.set(`.${targetClassName}`, { x: 0 })
      // 같은 x와 duration을 적용하되 stagger로 target별 시작 시각만 나눈다.
      gsap.to(`.${targetClassName}`, { x, duration: animationDuration, stagger: { each: animationStagger, from }, ease: 'power2.out' })
    },
    // 거리·시간·간격·순서·모션 설정·재생 횟수가 바뀌면 이전 Tween을 되돌리고 다시 만든다.
    { scope, dependencies: [x, duration, stagger, from, reducedMotion, runKey], revertOnUpdate: true },
  )

  // 예제 UI가 controls·preview·serializer에 사용할 동일한 실행 상태를 돌려준다.
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
