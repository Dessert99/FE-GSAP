/** Stable card batch의 DOM mutation·active query·target cleanup을 실제 Flip으로 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** batch action과 표시 code가 공유하는 lifecycle descriptor다. */
export const batchActionDescriptor = {
  id: 'p13-card-order',
  duration: 0.45,
  phases: ['getState', 'setState', 'animate'] as const,
}
// Flip batch API를 실제 lifecycle에서 쓸 수 있게 등록한다
gsap.registerPlugin(Flip)
/** React card identity를 바꾸지 않고 container class만 Flip action에서 바꾼다. */
export function useBatchInterruptAnimation() {
  // scoped query와 batch cleanup이 lab DOM 안에 머문다
  const scope = useRef<HTMLDivElement>(null)
  // component lifetime과 같은 batch instance를 보관한다
  const batchRef = useRef<ReturnType<typeof Flip.batch> | null>(null)
  // final DOM mutation이 적용됐는지 discrete label로 보인다
  const [reversed, setReversed] = useState(false)
  // action 결과만 발표하는 discrete status다
  const [status, setStatus] = useState('대기')
  // browser media preference가 duration 0 policy를 결정한다
  const reducedMotion = useReducedMotion()
  useGSAP(
    () => {
      // scoped container가 class mutation과 fixed card query의 대상이 된다
      const container = scope.current?.querySelector(
        '.batch-interrupt-lab__cards',
      )
      if (!container) return undefined
      // motion preference로 lifecycle을 다시 만들면 cleanup이 복구한 original order와 표시를 맞춘다
      setReversed(false)
      // 같은 id의 action을 하나의 batch lifecycle로 묶는다
      const batch = Flip.batch(batchActionDescriptor.id)
      batchRef.current = batch
      batch.add({
        // layout 변경 전 stable card들의 FIRST state를 함께 저장한다
        getState: () =>
          Flip.getState(
            container.querySelectorAll('.batch-interrupt-lab__card'),
          ),
        // order는 React state가 아니라 scoped flex class가 바꾼다
        setState: () => {
          container.classList.toggle('batch-interrupt-lab__cards--reversed')
          setReversed(
            container.classList.contains(
              'batch-interrupt-lab__cards--reversed',
            ),
          )
          return Array.from(container.children)
        },
        // 저장한 FIRST state와 class 변경 뒤 DOM을 Flip으로 연결한다
        animate: (action) =>
          Flip.from(action.state, {
            duration: reducedMotion ? 0 : batchActionDescriptor.duration,
          }),
      })
      return () => {
        const cards = container.querySelectorAll('.batch-interrupt-lab__card')
        Flip.killFlipsOf(cards)
        batch.kill()
        container.classList.remove('batch-interrupt-lab__cards--reversed')
        batchRef.current = null
      }
    },
    { scope, dependencies: [reducedMotion], revertOnUpdate: true },
  )
  // 실행 중인 target만 먼저 확인해 선택된 interruption policy를 적용한다
  const run = () => {
    const cards = scope.current?.querySelectorAll('.batch-interrupt-lab__card')
    if (!cards) return
    const active = Array.from(cards).some((card) => Flip.isFlipping(card))
    if (active) Flip.killFlipsOf(cards)
    setStatus(
      `active: ${active} · ${batchActionDescriptor.phases.join(' → ')} · ${reducedMotion ? 'final order 즉시 적용' : 'Flip 실행'}`,
    )
    batchRef.current?.run()
  }
  // lab가 stable DOM 범위와 discrete 표시, batch 실행 함수를 함께 받는다
  return { scope, reversed, status, reducedMotion, run }
}
