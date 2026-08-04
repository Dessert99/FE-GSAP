/** 키프레임 예제의 애니메이션 상태와 실행을 한곳에서 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** canonical vars 배열과 linked guide의 백분율 확장 중 표시할 형식이다. */
type KeyframeMode = 'array' | 'percentage'
/** 한 keyframe에서 바꿀 숫자형 속성 묶음이다. */
type KeyframeVars = Record<string, number>

/** GSAP 실행과 코드 직렬화가 공유하는 mode별 keyframes 설정이다. */
export type KeyframesAnimationConfig =
  | { keyframes: KeyframeVars[], ease: string }
  | { keyframes: Record<string, KeyframeVars>, duration: number, ease: string }

/** 키프레임 예제 UI가 표시하고 조절할 애니메이션 값을 제공한다. */
export function useKeyframesAnimation() {
  // 한 target 선택과 useGSAP 정리를 이 예제 DOM 안으로 제한한다.
  const scope = useRef<HTMLDivElement>(null)
  // 실행 선택자와 미리보기 className이 같은 target을 가리키게 한다.
  const targetClassName = 'keyframes-example__target'
  // canonical 배열과 linked-guide 백분율 형식 중 실행할 구성을 선택한다.
  const [mode, setMode] = useState<KeyframeMode>('array')
  // 같은 keyframes도 처음부터 다시 실행할 수 있도록 재생 횟수를 센다.
  const [runKey, setRunKey] = useState(0)
  // 모션 감소 환경에서는 각 keyframe을 시간 없이 최종 상태까지 적용한다.
  const reducedMotion = useReducedMotion()
  // canonical gsap.to()가 소개하는 to-style vars 배열을 실행 설정으로 만든다.
  const arrayAnimationConfig: KeyframesAnimationConfig = {
    keyframes: [
      { x: 150, duration: reducedMotion ? 0 : 0.55 },
      { y: -70, rotation: 90, duration: reducedMotion ? 0 : 0.45 },
      { x: 250, y: 0, scale: 1.25, duration: reducedMotion ? 0 : 0.55 },
    ],
    ease: 'none',
  }
  // linked Keyframes guide의 백분율 형식을 별도 확장 설정으로 만든다.
  const percentageAnimationConfig: KeyframesAnimationConfig = {
    keyframes: {
      '25%': { x: 90, y: -55 },
      '60%': { x: 180, y: 15, rotation: 180 },
      '100%': { x: 250, y: 0, rotation: 360 },
    },
    duration: reducedMotion ? 0 : 1.8,
    ease: 'none',
  }
  // control에서 선택한 출처 범위의 keyframes 설정 하나를 실제 실행에 넘긴다.
  const animationConfig = mode === 'array' ? arrayAnimationConfig : percentageAnimationConfig

  useGSAP(
    () => {
      // 이전 keyframes가 남긴 transform을 지워 매번 같은 상태에서 시작한다.
      gsap.set(`.${targetClassName}`, { x: 0, y: 0, rotation: 0, scale: 1 })
      // 같은 target의 여러 to-style 상태를 하나의 Tween 안에서 순서대로 재생한다.
      gsap.to(`.${targetClassName}`, animationConfig)
    },
    // 형식·모션 설정·재생 횟수가 바뀌면 이전 Tween을 되돌리고 keyframes를 다시 만든다.
    { scope, dependencies: [mode, reducedMotion, runKey], revertOnUpdate: true },
  )

  // 예제 UI가 controls·preview·serializer에 사용할 동일한 실행 상태를 돌려준다.
  return {
    scope,
    targetClassName,
    mode,
    setMode,
    animationConfig,
    reducedMotion,
    replay: () => setRunKey((key) => key + 1),
  }
}
