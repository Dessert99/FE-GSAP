/** overwrite 예제의 충돌 처리 선택과 실제 Tween 설정을 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 선택 UI의 문자열 값을 GSAP overwrite 설정으로 정규화한다. */
export type OverwriteValue = 'false' | 'auto' | 'true'

/** overwrite 예제 UI가 조절할 값과 정규화된 두 Tween 설정을 제공한다. */
export function useOverwriteAnimation() {
  const scope = useRef<HTMLDivElement>(null)
  const targetClassName = 'overwrite-example__target'
  const [overwrite, setOverwrite] = useState<OverwriteValue>('auto')
  const [runKey, setRunKey] = useState(0)
  const reducedMotion = useReducedMotion()
  const initialTweenConfig = { x: 220, rotation: 360, duration: reducedMotion ? 0 : 2.4, ease: 'none' }
  const overwriteValue: boolean | 'auto' = overwrite === 'false' ? false : overwrite === 'true' ? true : 'auto'
  const overwriteTweenConfig = { x: 70, duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.65, overwrite: overwriteValue, ease: 'power2.out' }

  useGSAP(
    () => {
      // 모션 감소 환경에서는 충돌 후의 최종 상태만 즉시 보여준다.
      const target = `.${targetClassName}`
      gsap.set(target, { x: 0, rotation: 0 })
      gsap.to(target, initialTweenConfig)
      gsap.to(target, overwriteTweenConfig)
    },
    { scope, dependencies: [overwrite, reducedMotion, runKey], revertOnUpdate: true },
  )

  return {
    scope,
    targetClassName,
    overwrite,
    setOverwrite,
    initialTweenConfig,
    overwriteTweenConfig,
    reducedMotion,
    replay: () => setRunKey((key) => key + 1),
  }
}
