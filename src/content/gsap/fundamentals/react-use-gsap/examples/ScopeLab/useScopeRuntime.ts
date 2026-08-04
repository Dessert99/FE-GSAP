/** 같은 class를 가진 상자 두 개 중 scope 안쪽만 선택되는 것을 실제 target 수로 보여준다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** GSAP이 실제로 무엇을 잡았는지 숫자와 이름으로 드러내는 관찰값이다. */
export type ScopeObservation = {
  matchedInDocument: number
  targetedByTween: number
  targetedLabels: string[]
}

/** 두 상자가 공유하는 선택자이자 className — 같은 문자열이라야 scope 효과가 드러난다. */
const boxSelector = '.react-scope-lab__box'

/** scope 예제의 controls, paused Tween, 관찰값, 실행 action을 제공한다. */
export function useScopeRuntime() {
  // useGSAP에 넘길 범위 — 이 안의 상자만 선택자에 걸린다
  const scope = useRef<HTMLDivElement>(null)
  // 준비된 paused Tween을 실행 버튼에서만 재생하도록 보관한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // 문서 전체 개수와 실제로 잡힌 개수를 나란히 보여줘 scope 효과를 숫자로 읽게 한다
  const [observation, setObservation] = useState<ScopeObservation>({
    matchedInDocument: 0,
    targetedByTween: 0,
    targetedLabels: [],
  })
  // 준비·실행 상태를 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 실행하지 않았습니다. 실행을 눌러 어느 상자가 움직이는지 보세요.')
  // 운영체제 모션 감소 설정에서는 이동 없이 최종 위치만 보여준다
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      // 이전 실행이 남긴 위치를 지워 항상 같은 지점에서 출발시킨다
      gsap.set(boxSelector, { x: 0 })
      // scope 안에서 같은 선택자로 만든 paused Tween — 실행 버튼이 이 Tween을 재생한다
      const tween = gsap.to(boxSelector, {
        x: 150,
        duration: reducedMotion ? 0 : 0.9,
        ease: 'none',
        paused: true,
      })
      // 실행 handler가 같은 Tween을 처음부터 재생하도록 보관한다
      tweenRef.current = tween
      // GSAP이 실제로 잡은 element를 그대로 읽어야 표시값이 추측이 아닌 관찰이 된다
      const targeted = tween.targets() as HTMLElement[]
      setObservation({
        matchedInDocument: document.querySelectorAll(boxSelector).length,
        targetedByTween: targeted.length,
        targetedLabels: targeted.map((element) => element.dataset.label ?? '이름 없음'),
      })
      return () => {
        tweenRef.current = null
      }
    },
    // scope를 넘겨야 선택자가 이 container의 자손으로 한정된다 — 이 예제의 핵심 옵션이다
    { scope, dependencies: [reducedMotion], revertOnUpdate: true },
  )

  // 준비된 Tween을 수동으로 재생한다. 모션 감소 설정에서는 duration 0이라 즉시 끝난다
  function run() {
    // useGSAP이 준비해 둔 paused Tween — 재생만 하고 새로 만들지 않는다
    const tween = tweenRef.current
    // runtime 준비 전 click은 화면을 바꾸지 않는다
    if (!tween) return

    tween.restart()
    setStatus(`실행했습니다. 문서에는 ${observation.matchedInDocument}개가 있지만 ${observation.targetedByTween}개만 움직입니다.`)
  }

  // TSX가 무대·관찰 패널·코드 패널을 같은 runtime 값에서 그리도록 필요한 값만 전달한다
  return { scope, boxSelector, observation, status, reducedMotion, run }
}
