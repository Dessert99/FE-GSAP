/** getRule()의 selector·공식 반환 표현·local 정규화 차이를 분리해 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { cssRulePluginProperties } from '../../css-rule-plugin.properties'

export function GetRuleSection() {
  const code = "const rule = CSSRulePlugin.getRule('.myClass::before')\ngsap.to(rule, { duration: 3, cssRule: { color: '#0000FF' } })"
  return (
    <section id="get-rule" className="css-rule-plugin-page__section" aria-labelledby="get-rule-title">
      <SectionHeading number="02" id="get-rule" title="getRule()로 stylesheet의 대상을 찾습니다" description="getRule()은 tween target을 결정하는 static method입니다. selector를 정확히 쓰고, 공식 반환 표현과 lab의 안전한 정규화를 구분합니다." />
      <pre className="css-rule-plugin-page__code"><code>{code}</code></pre>
      <div className="css-rule-plugin-page__prose"><p>공식 signature는 <code>CSSRulePlugin.getRule(selector:String): Object</code>입니다. <code>.myClass</code>나 <code>#myID</code>처럼 animate할 CSS selector와 정확히 일치하는 string을 전달합니다.</p><p>공식 문서는 <code>::before</code>처럼 <strong>pseudo selector만</strong> 넣으면 stylesheet object들의 array를 돌린다고 설명합니다. 이 lab은 <code>.shared-rule-lab__card::before</code>라는 구체 selector 하나만 찾고, array·접근 실패를 <code>null</code>로 정규화해 화면에 표시합니다.</p></div>
      <div className="css-rule-plugin-page__note css-rule-plugin-page__note--source"><strong>source 확인:</strong> 설치본 3.15.0은 <code>::</code>를 <code>:</code>로, selector를 소문자로 정규화해 stylesheet rules와 비교합니다. 타입 선언은 <code>CSSRule</code>, 공식 문서는 <code>Object</code>라고 적으므로 어느 하나를 공식 반환 type으로 바꾸어 적지 않습니다.</div>
      <PropertyTable properties={cssRulePluginProperties.slice(1, 3)} />
    </section>
  )
}

/** API의 타입·기본값·타이밍·주의점을 같은 표 형식으로 표시한다. */
function PropertyTable({ properties }: { properties: readonly (typeof cssRulePluginProperties)[number][] }) {
  return <div className="css-rule-plugin-page__table-wrap"><table className="css-rule-plugin-page__table"><thead><tr><th scope="col">이름</th><th scope="col">타입</th><th scope="col">기본값</th><th scope="col">허용값·시점</th><th scope="col">주의점</th></tr></thead><tbody>{properties.map((property) => <tr key={property.name}><th scope="row"><code>{property.name}</code></th><td>{property.type}</td><td>{property.defaultValue}</td><td>{property.acceptedValues}<br /><small>{property.timing}</small></td><td>{property.caveat}</td></tr>)}</tbody></table></div>
}
