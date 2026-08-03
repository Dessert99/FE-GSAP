/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { gsapCoreMapCoverage, gsapCoreMapSections } from '../../gsap-core-map.meta'

export function PageCoverage() {
  return (
    <nav className="core-map-coverage" aria-label="공식 source 대응 범위">
      <div className="core-map-coverage__summary">
        <div><strong>{gsapCoreMapCoverage.officialSources}/3</strong><span>공식 source</span></div>
        <div><strong>{gsapCoreMapCoverage.sourceItems}/34</strong><span>기술 item</span></div>
        <p>공식 목차를 복제하지 않고, 34개 기술 item을 처음 배우는 사람의 여섯 질문으로 다시 묶었습니다.</p>
      </div>
      <ol>
        {gsapCoreMapSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div><strong>{section.title}</strong><small>{section.sourceItems}개 source item</small></div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
