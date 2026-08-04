/** overwrite 예제의 충돌 처리 선택과 실제 Tween 설정을 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 선택 UI의 문자열 값을 GSAP overwrite 설정으로 정규화한다. */
export type OverwriteValue = 'false' | 'auto' | 'true'

/** overwrite 예제 UI가 조절할 값과 정규화된 두 Tween 설정을 제공한다. */
export function useOverwriteAnimation() {
  // 두 Tween이 같은 target을 찾고 컴포넌트 해제 때 함께 정리될 DOM 범위를 잡는다.
  const scope = useRef<HTMLDivElement>(null)
  // 실행 선택자와 미리보기 className이 같은 대상을 가리키게 한다.
  const targetClassName = 'overwrite-example__target'
  // 두 번째 Tween이 기존 Tween을 정리하는 범위를 선택한다.
  const [overwrite, setOverwrite] = useState<OverwriteValue>('auto')
  // 같은 설정도 처음부터 다시 실행할 수 있도록 재생 횟수를 센다.
  const [runKey, setRunKey] = useState(0)
  // 모션 감소 환경에서는 충돌 규칙의 최종 결과만 즉시 보여준다.
  const reducedMotion = useReducedMotion()
  // 먼저 시작해 x와 rotation을 함께 점유하는 Tween 설정이다.
  const initialTweenConfig = { x: 220, rotation: 360, duration: reducedMotion ? 0 : 2.4, ease: 'none' }
  // UI 문자열을 GSAP이 받는 boolean 또는 auto 값으로 바꾼다.
  const overwriteValue: boolean | 'auto' = overwrite === 'false' ? false : overwrite === 'true' ? true : 'auto'
  // 뒤이어 x와 충돌하며 선택한 overwrite 규칙을 적용하는 Tween 설정이다.
  const overwriteTweenConfig = { x: 70, duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.65, overwrite: overwriteValue, ease: 'power2.out' }

  useGSAP(
    () => {
      // 두 Tween이 공유할 실제 target 선택자를 만든다.
      const target = `.${targetClassName}`
      // 이전 실행이 남긴 위치와 회전을 지워 충돌 비교를 같은 상태에서 시작한다.
      gsap.set(target, { x: 0, rotation: 0 })
      // 첫 Tween이 x와 rotation을 먼저 움직이기 시작한다.
      gsap.to(target, initialTweenConfig)
      // 두 번째 Tween이 선택한 overwrite 규칙으로 첫 Tween과 충돌한다.
      gsap.to(target, overwriteTweenConfig)
    },
    // overwrite·모션 설정·재생 횟수가 바뀌면 이전 Tween을 되돌리고 충돌을 다시 만든다.
    { scope, dependencies: [overwrite, reducedMotion, runKey], revertOnUpdate: true },
  )

  // 예제 UI가 controls·preview·serializer에 사용할 동일한 실행 상태를 돌려준다.
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
