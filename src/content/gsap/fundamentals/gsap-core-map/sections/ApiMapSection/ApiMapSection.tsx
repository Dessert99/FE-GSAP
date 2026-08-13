/** 공식 Core와 plugin 전체 목록을 학습자의 목적에서 찾는 compact index로 재구성한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { coreCapabilityGroups, pluginFamilies } from '../../gsap-core-map.catalog'

export function ApiMapSection() {
  return (
    <section id="api-map" className="core-map-page__section" aria-labelledby="api-map-title">
      <SectionHeading number="04" id="api-map" title="목적에서 API 찾기" description="이름을 외우기보다 지금 풀려는 문제가 target, 속도감, 실행 구조, 계산, 특수 능력 중 어디에 속하는지 먼저 고릅니다." />
      <div className="core-map-page__catalog-grid">
        {coreCapabilityGroups.map((group) => (
          <article key={group.title}>
            <p className="core-map-page__badge">Core</p>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            <ul>{group.items.map((item) => <li key={item}><code>{item}</code></li>)}</ul>
          </article>
        ))}
      </div>
      <div className="core-map-page__subheading">
        <p className="core-map-page__badge">Plugin 목록</p>
        <h3>특수 능력은 기능 분류에서 찾습니다</h3>
        <p>공식 도구 목록은 plugin별 CDN 입구를 제공하고 React 통합은 npm package로 안내합니다. 아래 이름은 세부 사용법이 아니라 전체 탐색 범위입니다.</p>
      </div>
      <div className="core-map-page__plugin-grid">
        {pluginFamilies.map((group) => (
          <article key={group.family}>
            <h4>{group.family}</h4>
            <p>{group.useCase}</p>
            <p>{group.items.join(' · ')}</p>
            {group.dependency ? <small>{group.dependency}</small> : null}
          </article>
        ))}
      </div>
    </section>
  )
}
