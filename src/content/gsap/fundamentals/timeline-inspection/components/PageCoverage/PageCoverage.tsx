/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { timelineInspectionSourceItems } from '../../timeline-inspection.catalog'
import { timelineInspectionCoverage, timelineInspectionSections } from '../../timeline-inspection.meta'

// 공식 문서에 게시된 주장만 coverage 분모에 넣고 실행으로 확인한 항목은 따로 센다
const officialItemCount = timelineInspectionSourceItems.filter((item) => item.origin === 'official').length
const probeItemCount = timelineInspectionSourceItems.length - officialItemCount
// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(timelineInspectionSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="inspect-coverage" aria-label="공식 source 대응 범위">
      <div className="inspect-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{timelineInspectionCoverage.officialSources}
          </strong>
          <span>공식 source</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{timelineInspectionCoverage.officialSourceItems}
          </strong>
          <span>공식 기술 item</span>
        </div>
        <p>
          조회 메서드 세 개와 속성 두 개, 공식 문서 다섯 곳의 기술 item {timelineInspectionCoverage.officialSourceItems}개를 "지형 파악 →
          세 가지 조회 → 노드에 남는 부가 정보"라는 흐름의 일곱 단계로 다시 묶었습니다. 여기에 공식 문서에 없거나 공식 설명과 달라서 직접
          실행해 확인한 항목 {probeItemCount}개를 따로 표시합니다.
        </p>
      </div>
      <ol>
        {timelineInspectionSections.map((section) => (
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
