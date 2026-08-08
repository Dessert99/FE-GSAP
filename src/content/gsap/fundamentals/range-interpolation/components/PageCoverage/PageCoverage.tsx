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
    <nav className="range-coverage" aria-label="공식 source 대응 범위">
      <div className="range-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{rangeInterpolationCoverage.officialSources}
          </strong>
          <span>공식 source</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{rangeInterpolationCoverage.officialSourceItems}
          </strong>
          <span>공식 기술 item</span>
        </div>
        <p>
          공식 다섯 문서의 기술 item {rangeInterpolationCoverage.officialSourceItems}개를 하나의 값 변환 흐름으로 다시 묶었습니다. 공식이
          침묵한 경계는 GSAP 3.15.0 probe {probeItemCount}개로 따로 표시합니다.
        </p>
      </div>
      <ol>
        {rangeInterpolationSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
                <small>{section.sourceItems}개 공식 item</small>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
