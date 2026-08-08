/** batch descriptor가 세 card order·phase status·표시 코드를 함께 만드는 lab이다. */
import {
  batchActionDescriptor,
  useBatchInterruptAnimation,
} from './useBatchInterruptAnimation'
import './BatchInterruptLab.css'
/** focus identity를 유지한 채 batch interruption을 관찰하게 한다. */
export function BatchInterruptLab() {
  // stable key를 가진 card가 DOM order 대신 container class만 바꾼다
  const cards = ['alpha', 'beta', 'gamma'] as const
  // batch action이 실제로 실행한 결과와 media preference를 표시한다
  const { scope, reversed, status, reducedMotion, run } =
    useBatchInterruptAnimation()
  // runtime descriptor와 같은 id·phase·duration으로 코드 패널을 직렬화한다
  const code = `const batch = Flip.batch('${batchActionDescriptor.id}')
batch.add({
  getState: () => Flip.getState(cards),
  setState: () => cardsEl.classList.toggle('batch-interrupt-lab__cards--reversed'),
  animate: (action) => Flip.from(action.state, {
    duration: ${reducedMotion ? 0 : batchActionDescriptor.duration},
  }),
})
const active = cards.some((card) => Flip.isFlipping(card))
if (active) Flip.killFlipsOf(cards)
batch.run()`
  return (
    <section className="batch-interrupt-lab">
      <h3>세 card의 새 order가 이전 Flip과 경쟁하지 않게 하기</h3>
      <p>
        시스템 reduced motion:{' '}
        {reducedMotion ? '켜짐 · final order 즉시 적용' : '꺼짐 · Flip 실행'}
      </p>
      <p>현재 order: {reversed ? 'reversed' : 'original'}</p>
      <div ref={scope} className="batch-interrupt-lab__cards">
        {cards.map((card) => (
          <button
            key={card}
            type="button"
            className="batch-interrupt-lab__card"
          >
            {card}
          </button>
        ))}
      </div>
      <button type="button" onClick={run}>
        filter/order batch 실행
      </button>
      <p role="status">{status}</p>
      <pre>
        <code>{code}</code>
      </pre>
    </section>
  )
}
