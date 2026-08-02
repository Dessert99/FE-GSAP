/** 특수 속성 34개의 타입·기본값·조합·예제를 그룹별로 보여준다. */
import { specialProperties, specialPropertyGroups } from '../../gsap-to.properties'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import './SpecialPropertiesSection.css'

export function SpecialPropertiesSection() {
  return (
    <section id="special-properties" className="gsap-method-page__section" aria-labelledby="special-properties-title">
      <SectionHeading number="03" id="special-properties-title" title="Special Properties" description={`공식 문서의 특수 속성 ${specialProperties.length}개를 빠짐없이 분류했습니다. 각 카드에서 동작과 실제 사용처를 먼저 확인하고 관련 예제로 이동할 수 있습니다.`} />

      <div className="special-properties">
        {specialPropertyGroups.map((group) => (
          <section key={group.title} className="special-properties__group">
            <header>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
            </header>
            <div className="special-properties__cards">
              {group.properties.map((property) => (
                <article key={property.name} id={`property-${property.name}`} className="special-property">
                  <div className="special-property__title">
                    <code>{property.name}</code>
                    {property.exampleAnchor ? <a href={`#${property.exampleAnchor}`}>관련 예제 ↓</a> : <span>참조 속성</span>}
                  </div>
                  <dl>
                    <div><dt>타입</dt><dd>{property.type}</dd></div>
                    <div><dt>기본값</dt><dd>{property.defaultValue}</dd></div>
                    <div><dt>허용값</dt><dd>{property.acceptedValues}</dd></div>
                  </dl>
                  <div className="special-property__explanation">
                    <strong>어떤 동작인가요?</strong>
                    <p>{property.description}</p>
                  </div>
                  <div className="special-property__use-case">
                    <strong>언제 쓰나요?</strong>
                    <p>{property.useCase}</p>
                  </div>
                  <div className="special-property__combination">
                    <strong>함께 쓰는 속성</strong>
                    <span>{property.combination}</span>
                  </div>
                  <pre><code>{property.example}</code></pre>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
