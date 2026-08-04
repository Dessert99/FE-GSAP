/** repeat·yoyo·yoyoEase 조합의 실행 설정을 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// yoyoEase의 비활성·자동 반전·특정 ease 선택지를 제한한다.
type YoyoEase = 'false' | 'true' | 'power2.in' | 'back.out(1.7)'

/** repeat·yoyo 예제 UI가 조절할 값과 실제 실행 설정을 제공한다. */
export function useRepeatYoyoAnimation() {
  // 이 예제의 GSAP 선택자와 정리 범위를 감싸는 DOM을 가리킨다.
  const scope = useRef<HTMLDivElement>(null)
  // 실행 코드와 미리보기가 같은 대상을 사용하도록 선택자를 공유한다.
  const targetClassName = 'repeat-yoyo-example__target'
  // 한 회차에서 시작점과 도착점 사이를 이동할 시간을 제어한다.
  const [duration, setDuration] = useState(0.7)
  // 최초 실행 뒤 추가할 반복 횟수를 제어한다.
  const [repeat, setRepeat] = useState(1)
  // 한 회차가 끝난 뒤 다음 회차 전까지 기다릴 시간을 제어한다.
  const [repeatDelay, setRepeatDelay] = useState(0.2)
  // 반복 회차마다 값 진행 방향을 번갈아 바꿀지 제어한다.
  const [yoyo, setYoyoEnabled] = useState(true)
  // 복귀 회차에 자동 반전 또는 별도 ease를 적용할지 제어한다.
  const [yoyoEase, setYoyoEase] = useState<YoyoEase>('false')
  // 같은 설정의 Tween을 처음부터 다시 만들 재생 횟수를 센다.
  const [runKey, setRunKey] = useState(0)
  // 사용자 환경에서 반복 움직임을 제거해야 하는지 확인한다.
  const reducedMotion = useReducedMotion()
  // 실제 Tween과 표시 코드가 함께 사용할 반복 설정을 만든다.
  const animationConfig = {
    duration: reducedMotion ? 0 : duration,
    repeat: reducedMotion ? 0 : repeat,
    repeatDelay: reducedMotion ? 0 : repeatDelay,
    yoyo,
    yoyoEase: yoyoEase === 'false' ? false : yoyoEase === 'true' ? true : yoyoEase,
    ease: 'power1.inOut',
  }

  // yoyo 선택만 바꾸고 yoyoEase는 독립적으로 유지해 자동 yoyo를 관찰하게 한다.
  function setYoyo(nextYoyo: boolean) {
    setYoyoEnabled(nextYoyo)
  }

  // yoyoEase의 truthy 값이 yoyo를 자동 활성화하는지 화면 설명에 드러낸다.
  const effectiveYoyo = yoyo || Boolean(animationConfig.yoyoEase)
  // 실제 repeat가 남아 있을 때만 화면에서 복귀 회차를 관찰할 수 있다.
  const hasReturnCycle = animationConfig.repeat !== 0 && effectiveYoyo

  useGSAP(
    () => {
      // 이전 Tween이 남긴 transform을 지워 항상 같은 시작점에서 비교한다.
      gsap.set(`.${targetClassName}`, { x: 0 })
      // repeat·yoyo·yoyoEase의 실제 조합으로 한 대상의 반복 Tween을 실행한다.
      gsap.to(`.${targetClassName}`, { x: 190, ...animationConfig })
    },
    // 반복 설정·모션 설정·재생 횟수가 바뀌면 이전 Tween을 되돌리고 다시 만든다.
    { scope, dependencies: [duration, repeat, repeatDelay, yoyo, yoyoEase, reducedMotion, runKey], revertOnUpdate: true },
  )

  // UI가 실제 반복 설정과 같은 값을 표시하고 조절하도록 필요한 상태만 전달한다.
  return {
    scope,
    targetClassName,
    duration,
    setDuration,
    repeat,
    setRepeat,
    repeatDelay,
    setRepeatDelay,
    yoyo,
    setYoyo,
    yoyoEase,
    setYoyoEase,
    animationConfig,
    effectiveYoyo,
    hasReturnCycle,
    reducedMotion,
    replay: () => setRunKey((key) => key + 1),
  }
}
