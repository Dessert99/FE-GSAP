/** 도착값 예제의 애니메이션 상태와 실행을 한곳에서 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// 예제에서 비교할 GSAP ease 이름만 선택하도록 허용한다.
type Ease = 'none' | 'power1.out' | 'power2.out' | 'back.out(1.7)'

/** 도착값 예제 UI가 표시하고 조절할 애니메이션 값을 제공한다. */
export function useDestinationValuesAnimation() {
  // 이 예제의 GSAP 선택자와 정리 범위를 감싸는 DOM을 가리킨다.
  const scope = useRef<HTMLDivElement>(null)
  // 실행 코드와 미리보기가 같은 대상을 사용하도록 선택자를 공유한다.
  const targetClassName = 'destination-values-example__target'
  // 대상이 도착할 가로 위치를 제어한다.
  const [x, setX] = useState(180)
  // 대상이 도착할 회전 각도를 제어한다.
  const [rotation, setRotation] = useState(90)
  // 시작값에서 도착값까지 보간할 시간을 제어한다.
  const [duration, setDuration] = useState(1)
  // 0부터 1까지의 진행률을 속도 곡선으로 바꿀 ease를 제어한다.
  const [ease, setEase] = useState<Ease>('power2.out')
  // 같은 설정의 Tween을 처음부터 다시 만들 재생 횟수를 센다.
  const [runKey, setRunKey] = useState(0)
  // 사용자 환경에서 지속적인 움직임을 줄여야 하는지 확인한다.
  const reducedMotion = useReducedMotion()
  // 모션 감소 환경에서는 같은 도착 상태를 즉시 보여준다.
  const animationDuration = reducedMotion ? 0 : duration

  useGSAP(
    () => {
      // 이전 Tween이 남긴 transform을 지워 항상 같은 현재값에서 시작한다.
      gsap.set(`.${targetClassName}`, { x: 0, rotation: 0 })
      // 현재값을 읽어 선택한 시간과 ease로 x·rotation 도착값까지 보간한다.
      gsap.to(`.${targetClassName}`, { x, rotation, duration: animationDuration, ease })
    },
    // 조절값·모션 설정·재생 횟수가 바뀌면 이전 Tween을 되돌리고 다시 만든다.
    { scope, dependencies: [x, rotation, duration, ease, reducedMotion, runKey], revertOnUpdate: true },
  )

  // UI가 실행 설정과 같은 값을 표시하고 조절하도록 필요한 상태만 전달한다.
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
