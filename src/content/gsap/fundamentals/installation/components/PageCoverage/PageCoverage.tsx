/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { installationSourceItems } from '../../installation.catalog'
import { installationCoverage, installationSections } from '../../installation.meta'

export function PageCoverage() {
  return (
    <nav className="installation-coverage" aria-label="공식 문서 학습 범위">
      <div className="installation-coverage__summary">
        <div>
          <strong>{installationCoverage.officialSources}/2</strong>
          <span>공식 문서</span>
        </div>
        <div>
          <strong>
            {installationSourceItems.length}/{installationCoverage.sourceItems}
          </strong>
          <span>확인한 설명</span>
        </div>
        <p>공식 설치 문서 두 곳의 설명 34개를 처음 설치하는 순서에 맞춰 여섯 질문으로 묶었습니다.</p>
      </div>
      <ol>
        {installationSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
                <small>공식 설명 {section.sourceItems}개</small>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
