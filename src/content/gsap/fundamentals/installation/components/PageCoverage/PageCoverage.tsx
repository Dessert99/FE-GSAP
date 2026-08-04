/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { installationSourceItems } from '../../installation.catalog'
import { installationCoverage, installationSections } from '../../installation.meta'

export function PageCoverage() {
  return (
    <nav className="installation-coverage" aria-label="공식 source 대응 범위">
      <div className="installation-coverage__summary">
        <div>
          <strong>{installationCoverage.officialSources}/2</strong>
          <span>공식 source</span>
        </div>
        <div>
          <strong>
            {installationSourceItems.length}/{installationCoverage.sourceItems}
          </strong>
          <span>기술 item</span>
        </div>
        <p>공식 목차를 그대로 옮기지 않고, 34개 기술 item을 설치 순서대로 이어지는 여섯 질문으로 다시 묶었습니다.</p>
      </div>
      <ol>
        {installationSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
                <small>{section.sourceItems}개 source item</small>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
