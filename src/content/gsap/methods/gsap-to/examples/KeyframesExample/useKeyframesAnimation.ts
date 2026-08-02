/** 키프레임 예제의 애니메이션 상태와 실행을 한곳에서 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

type KeyframeMode = 'array' | 'percentage'
type KeyframeVars = Record<string, number>

/** GSAP 실행과 코드 직렬화가 공유하는 mode별 keyframes 설정이다. */
export type KeyframesAnimationConfig =
  | { keyframes: KeyframeVars[], ease: string }
  | { keyframes: Record<string, KeyframeVars>, duration: number, ease: string }

/** 키프레임 예제 UI가 표시하고 조절할 애니메이션 값을 제공한다. */
export function useKeyframesAnimation() {
  const scope = useRef<HTMLDivElement>(null)
  const targetClassName = 'keyframes-example__target'
  const [mode, setMode] = useState<KeyframeMode>('array')
  const [runKey, setRunKey] = useState(0)
  const reducedMotion = useReducedMotion()
  const arrayAnimationConfig: KeyframesAnimationConfig = {
    keyframes: [
      { x: 150, duration: reducedMotion ? 0 : 0.55 },
      { y: -70, rotation: 90, duration: reducedMotion ? 0 : 0.45 },
      { x: 250, y: 0, scale: 1.25, duration: reducedMotion ? 0 : 0.55 },
    ],
    ease: 'none',
  }
  const percentageAnimationConfig: KeyframesAnimationConfig = {
    keyframes: {
      '25%': { x: 90, y: -55 },
      '60%': { x: 180, y: 15, rotation: 180 },
      '100%': { x: 250, y: 0, rotation: 360 },
    },
    duration: reducedMotion ? 0 : 1.8,
    ease: 'none',
  }
  const animationConfig = mode === 'array' ? arrayAnimationConfig : percentageAnimationConfig

  useGSAP(
    () => {
      // 모션 감소 환경에서는 각 keyframe의 결과만 순서대로 즉시 적용한다.
      gsap.set(`.${targetClassName}`, { x: 0, y: 0, rotation: 0, scale: 1 })
      gsap.to(`.${targetClassName}`, animationConfig)
    },
    { scope, dependencies: [mode, reducedMotion, runKey], revertOnUpdate: true },
  )

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
