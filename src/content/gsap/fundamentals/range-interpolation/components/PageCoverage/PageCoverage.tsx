/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { rangeInterpolationSourceItems } from '../../range-interpolation.catalog'
import { rangeInterpolationCoverage, rangeInterpolationSections } from '../../range-interpolation.meta'

// 공식 문서에 게시된 주장만 coverage 분모에 넣고 실행으로 확인한 항목은 따로 센다
const officialItemCount = rangeInterpolationSourceItems.filter((item) => item.origin === 'official').length
// 공식에 없는 경계 동작은 probe 분모로 분리한다
const probeItemCount = rangeInterpolationSourceItems.filter((item) => item.origin === 'probe').length
// catalog가 실제 근거를 댄 canonical 수를 분자로 쓴다
const mappedSourceCount = new Set(rangeInterpolationSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="range-coverage" aria-label="범위 변환 학습 순서">
      <div className="range-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{rangeInterpolationCoverage.officialSources}
          </strong>
          <span>대조한 공식 문서</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{rangeInterpolationCoverage.officialSourceItems}
          </strong>
          <span>설명한 핵심 동작</span>
        </div>
        <p>
          공식 다섯 문서의 핵심 동작 {rangeInterpolationCoverage.officialSourceItems}개를 하나의 값 변환 흐름으로 묶었습니다. 문서가
          설명하지 않은 경계 동작 {probeItemCount}개는 직접 확인해 구분했습니다.
        </p>
      </div>
      <ol>
        {rangeInterpolationSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
                <small>{section.sourceItems}개 핵심 동작</small>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
