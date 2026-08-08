/** amount의 전체 폭과 each의 거리 간격을 공식 문구와 probe로 구분한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function AmountEachSection() {
  return (
    <section id="amount-each" className="utility-distribute-page__section" aria-labelledby="amount-each-title">
      <SectionHeading number="02" id="amount-each" title="amount와 each는 서로 다른 간격 질문이다" description="끝까지 얼마를 나눌지 묻는다면 amount, 거리 단계마다 얼마를 더할지 묻는다면 each입니다." />
      <div className="utility-distribute-page__comparison">
        <article><p className="utility-distribute-page__label">amount</p><h3>전체 배분 폭</h3><p><code>base</code>에서 가장 먼 반환값까지 더할 총량입니다. 공식 문서는 target 사이 값을 직접 정하려면 <code>each</code>를 쓰라고 안내합니다.</p><code>{`{ base: 10, amount: 30 }`}</code></article>
        <article><p className="utility-distribute-page__label">each</p><h3>거리 단위당 간격</h3><p>target의 거리 단계마다 <code>base</code>에 더할 값입니다. 공식의 flat 4-target 예시는 <code>each: 1</code> → 0, 1, 2, 3입니다.</p><code>{`{ base: 0, each: 1 }`}</code></article>
      </div>
      <aside className="utility-distribute-page__probe">
        <h3>GSAP 3.15.0 probe · 공식 침묵과 근삿값</h3>
        <p><code>amount</code>와 <code>each</code>를 함께 주면 관찰본에서는 amount가 우선했습니다. 공식 문서는 둘 중 하나를 쓰라고만 하며 우선순위는 게시하지 않습니다.</p>
        <p>또한 공식의 “amount 1 / target 100 → 차이 0.01”은 근삿값입니다. 끝점을 0과 1에 맞춘 실제 첫 간격은 <code>0.010101…</code>였습니다.</p>
      </aside>
      <aside className="utility-distribute-page__official-error"><h3>공식 원문 오류 보존</h3><p>amount 절의 <code>if amount is 1 and there 100 targets</code>는 <code>are</code>가 빠져 있고, each 절의 <code>If each is 1 and the there are 4 targets</code>에는 불필요한 <code>the</code>가 있습니다. 의미는 교정해 설명하되 원문 오류를 숨기지 않습니다.</p></aside>
    </section>
  )
}
