/** 공식 목차와 속성의 로컬 대응 상태를 페이지 첫 화면에 표시한다. */
import { officialCoverageExpected, officialPageSections } from '../../gsap-to.meta'
import { specialProperties } from '../../gsap-to.properties'
import './PageCoverageSection.css'

export function PageCoverageSection() {
  return (
    <nav className="page-coverage" aria-label="공식 문서 대응 범위">
      <div className="page-coverage__summary">
        <div>
          <strong>{officialPageSections.length}/{officialCoverageExpected.sections}</strong>
          <span>공식 섹션</span>
        </div>
        <div>
          <strong>{specialProperties.length}/{officialCoverageExpected.specialProperties}</strong>
          <span>특수 속성</span>
        </div>
        <p>공식 문서의 기술 내용만 대응합니다. 설명은 직역하지 않고 학습 순서와 실행 예제로 다시 구성했습니다.</p>
      </div>
      <ol className="page-coverage__list">
        {officialPageSections.map((section, index) => (
          <li key={section.title}>
            <a href={`#${section.anchor}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{section.title}</strong>
                <small>{section.localTitle}</small>
              </div>
              <i aria-hidden="true">완료</i>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
