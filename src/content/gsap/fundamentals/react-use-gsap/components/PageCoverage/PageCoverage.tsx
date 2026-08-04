/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { reactUseGsapSourceItems } from '../../react-use-gsap.catalog'
import { reactUseGsapCoverage, reactUseGsapSections } from '../../react-use-gsap.meta'

// 공식 문서에 게시된 주장만 coverage 분모에 넣고 실행으로 확인한 항목은 따로 센다
const officialItemCount = reactUseGsapSourceItems.filter((item) => item.origin === 'official').length
const probeItemCount = reactUseGsapSourceItems.length - officialItemCount
// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(reactUseGsapSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="react-gsap-coverage" aria-label="공식 source 대응 범위">
      <div className="react-gsap-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{reactUseGsapCoverage.officialSources}
          </strong>
          <span>공식 source</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{reactUseGsapCoverage.officialSourceItems}
          </strong>
          <span>공식 기술 item</span>
        </div>
        <p>
          공식 React 자료의 기술 item {reactUseGsapCoverage.officialSourceItems}개를 "왜 필요한가 → 어떻게 쓰는가 → 무엇을 조심하는가"의 여섯 단계로 다시 묶었습니다. 여기에 공식 자료에 없어 직접 실행해 확인한 항목 {probeItemCount}개를 따로 표시합니다.</p>
      </div>
      <ol>
        {reactUseGsapSections.map((section) => (
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
