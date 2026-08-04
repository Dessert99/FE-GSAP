/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { responsiveMotionSourceItems } from '../../responsive-motion.catalog'
import { responsiveMotionCoverage, responsiveMotionSections } from '../../responsive-motion.meta'

// 공식 문서에 게시된 주장만 coverage 분모에 넣고 설치본으로 확인한 항목은 따로 센다
const officialItemCount = responsiveMotionSourceItems.filter((item) => item.origin === 'official').length
const probeItemCount = responsiveMotionSourceItems.length - officialItemCount
// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(responsiveMotionSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="responsive-coverage" aria-label="공식 source 대응 범위">
      <div className="responsive-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{responsiveMotionCoverage.officialSources}
          </strong>
          <span>공식 source</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{responsiveMotionCoverage.officialSourceItems}
          </strong>
          <span>공식 기술 item</span>
        </div>
        <p>
          matchMedia()와 matchMediaRefresh()의 기술 item {responsiveMotionCoverage.officialSourceItems}개를 "조건을 걸고 → 조건이
          바뀌고 → 정리된다"는 하나의 흐름으로 다시 묶었습니다. 여기에 공식 문서에 없어 설치본으로 직접 확인한 항목 {probeItemCount}
          개를 따로 표시합니다.
        </p>
      </div>
      <ol>
        {responsiveMotionSections.map((section) => (
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
