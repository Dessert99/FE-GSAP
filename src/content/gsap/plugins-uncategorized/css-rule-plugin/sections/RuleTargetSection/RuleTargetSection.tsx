/** shared stylesheet rule과 개별 inline style의 적용 범위를 먼저 대비한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function RuleTargetSection() {
  return (
    <section id="rule-target" className="css-rule-plugin-page__section" aria-labelledby="rule-target-title">
      <SectionHeading number="01" id="rule-target" title="element 하나 대신 공유 rule을 고릅니다" description="먼저 target이 DOM element인지 stylesheet rule인지 구분하면, 여러 card가 동시에 바뀌는 이유가 바로 보입니다." />
      <div className="css-rule-plugin-page__split"><div className="css-rule-plugin-page__prose"><h3>일반 CSSPlugin은 element마다 inline style을 씁니다</h3><p>개별 element를 정밀하게 제어해야 한다면 공식 문서도 일반 CSSPlugin을 쓰는 편이 보통 더 좋다고 안내합니다. 한 card만 바꾸고 싶을 때의 선택입니다.</p></div><div className="css-rule-plugin-page__prose"><h3>CSSRulePlugin은 selector가 공유하는 rule을 씁니다</h3><p>같은 selector를 쓰는 요소가 많아도 stylesheet rule은 하나입니다. 그 rule의 declaration을 바꾸면 그 selector를 쓰는 모든 card가 함께 다시 그려집니다.</p></div></div>
      <div className="css-rule-plugin-page__note"><strong>pseudo element도 stylesheet rule입니다.</strong> <code>::before</code>와 <code>::after</code>는 JavaScript에서 직접 reference할 수 없지만, 해당 selector의 rule을 찾으면 CSSRulePlugin target으로 쓸 수 있습니다.</div>
    </section>
  )
}
