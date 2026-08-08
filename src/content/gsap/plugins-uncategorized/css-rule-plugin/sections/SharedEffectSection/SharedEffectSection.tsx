/** proxy style과 cssRule vars의 실행 순서를 하나의 shared card lab으로 연결한다. */
import { SharedRuleLab } from '../../examples/SharedRuleLab/SharedRuleLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { cssRulePluginProperties } from '../../css-rule-plugin.properties'

export function SharedEffectSection() {
  return (
    <section id="shared-effect" className="css-rule-plugin-page__section" aria-labelledby="shared-effect-title">
      <SectionHeading number="03" id="shared-effect" title="proxy를 거쳐 cssRule vars를 tween합니다" description="CSSRulePlugin은 rule declaration을 바로 보간하지 않고 proxy style object에 CSSPlugin을 적용한 뒤 결과를 rule에 복사합니다." />
      <div className="css-rule-plugin-page__prose"><p>그래서 tween vars는 <code>cssRule: {'{ color, width }'}</code>처럼 감쌉니다. lab의 selector·색·크기 controls는 하나의 descriptor가 되고, 같은 descriptor가 <code>getRule()</code>, <code>gsap.to()</code>, code panel과 rule declaration readout을 함께 만듭니다.</p><p>시작값은 선택한 rule에 이미 선언된 값을 사용합니다. CSSRulePlugin은 여러 selector의 calculated style을 합치지 못하므로 declaration이 없으면 예상과 다른 시작값이 될 수 있습니다. 이때만 <code>fromTo()</code>로 시작값을 명시합니다.</p></div>
      <SharedRuleLab />
      <PropertyTable properties={cssRulePluginProperties.filter((property) => property.name === 'CSSRulePlugin' || property.name === 'cssRule' || property.name === 'rule declaration')} />
    </section>
  )
}

/** plugin 실행에서 쓰는 property의 형태·시점·주의점을 표로 정리한다. */
function PropertyTable({ properties }: { properties: readonly (typeof cssRulePluginProperties)[number][] }) {
  return <div className="css-rule-plugin-page__table-wrap"><table className="css-rule-plugin-page__table"><thead><tr><th scope="col">이름</th><th scope="col">타입</th><th scope="col">기본값</th><th scope="col">허용값·시점</th><th scope="col">주의점</th></tr></thead><tbody>{properties.map((property) => <tr key={property.name}><th scope="row"><code>{property.name}</code></th><td>{property.type}</td><td>{property.defaultValue}</td><td>{property.acceptedValues}<br /><small>{property.timing}</small></td><td>{property.caveat}</td></tr>)}</tbody></table></div>
}
