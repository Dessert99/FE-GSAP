/** repeat·yoyo 예제의 deprecated yoyoEase 조합과 실행 설정을 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

type YoyoEase = 'false' | 'true' | 'power2.in' | 'back.out(1.7)'

/** repeat·yoyo 예제 UI가 조절할 값과 실제 실행 설정을 제공한다. */
export function useRepeatYoyoAnimation() {
  const scope = useRef<HTMLDivElement>(null)
  const targetClassName = 'repeat-yoyo-example__target'
  const [duration, setDuration] = useState(0.7)
  const [repeat, setRepeat] = useState(1)
  const [repeatDelay, setRepeatDelay] = useState(0.2)
  const [yoyo, setYoyoEnabled] = useState(true)
  const [yoyoEase, setYoyoEase] = useState<YoyoEase>('false')
  const [runKey, setRunKey] = useState(0)
  const reducedMotion = useReducedMotion()
  const animationConfig = {
    duration: reducedMotion ? 0 : duration,
    repeat: reducedMotion ? 0 : repeat,
    repeatDelay: reducedMotion ? 0 : repeatDelay,
    yoyo,
    yoyoEase: yoyoEase === 'false' ? false : yoyoEase === 'true' ? true : yoyoEase,
    ease: 'power1.inOut',
  }

  function setYoyo(nextYoyo: boolean) {
    setYoyoEnabled(nextYoyo)
    if (!nextYoyo) setYoyoEase('false')
  }

  useGSAP(
    () => {
      // 모션 감소 환경에서는 반복까지 제거해 지속적으로 움직이는 미리보기를 막는다.
      gsap.set(`.${targetClassName}`, { x: 0 })
      gsap.to(`.${targetClassName}`, { x: 190, ...animationConfig })
    },
    { scope, dependencies: [duration, repeat, repeatDelay, yoyo, yoyoEase, reducedMotion, runKey], revertOnUpdate: true },
  )

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
    reducedMotion,
    replay: () => setRunKey((key) => key + 1),
  }
}
