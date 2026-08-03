/** steps 문자열과 paused Tween의 수동 progress를 같은 runtime state로 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

/** 실제 steps Tween과 code serializer가 함께 소비하는 실행 설정이다. */
export type SteppedEaseDescriptor = { x: number; duration: number; easeExpression: string; progress: number }

/** step 수와 progress가 실제 target 위치와 현재 계단값을 함께 바꾸게 한다. */
export function useSteppedEaseAnimation() {
  // paused Tween을 이 예제 DOM 범위 안에서만 만들고 정리한다.
  const scope = useRef<HTMLDivElement>(null)
  // 실제 GSAP selector와 preview className이 공유하는 target 이름이다.
  const targetClassName = 'stepped-ease-example__target'
  // 0~1 구간을 몇 개의 불연속 value로 나눌지 정한다.
  const [steps, setSteps] = useState(5)
  // autoplay 없이 stepped Tween의 playhead를 직접 옮긴다.
  const [progress, setProgress] = useState(0.4)
  // 현재 값으로 Tween을 다시 만들어 runtime과 preview를 재동기화한다.
  const [runKey, setRunKey] = useState(0)
  // controls·Tween·serializer가 함께 쓰는 공식 steps 문자열이다.
  const easeExpression = `steps(${steps})`
  // 이동 거리·시간·ease·playhead를 실제 Tween과 코드 패널이 공유한다.
  const descriptor: SteppedEaseDescriptor = { x: 100, duration: 1, easeExpression, progress }
  // text 관찰값도 실제 Tween과 같은 GSAP easing function에서 계산한다.
  const easingFunction = gsap.parseEase(easeExpression)
  // 현재 progress가 선택한 step curve에서 반환한 normalized value다.
  const currentValue = easingFunction(progress)
  // 0→100 예제에서 화면에 표시할 현재 불연속 값이다.
  const steppedValue = Math.round(currentValue * 100)

  useGSAP(
    () => {
      // 이전 Tween이 남긴 위치를 지워 step 수를 바꿔도 같은 0에서 출발한다.
      gsap.set(`.${targetClassName}`, { x: 0 })
      // 자동 재생 없이 0→100 Tween을 만들고 선택한 progress의 계단 위치만 보여준다.
      gsap.to(`.${targetClassName}`, { x: descriptor.x, duration: descriptor.duration, ease: descriptor.easeExpression, paused: true }).progress(descriptor.progress)
    },
    // step 수·progress·재실행이 바뀌면 이전 Tween을 되돌리고 동일 descriptor로 다시 만든다.
    { scope, dependencies: [descriptor, runKey], revertOnUpdate: true },
  )

  // TSX가 controls·preview·code·관찰값을 같은 runtime 값에서 표시하게 한다.
  return {
    scope,
    targetClassName,
    steps,
    setSteps,
    progress,
    setProgress,
    descriptor,
    currentValue,
    steppedValue,
    replay: () => setRunKey((key) => key + 1),
  }
}
