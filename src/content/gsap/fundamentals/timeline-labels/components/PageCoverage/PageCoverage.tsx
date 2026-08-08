/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { timelineLabelsSourceItems } from '../../timeline-labels.catalog'
import { timelineLabelsCoverage, timelineLabelsSections } from '../../timeline-labels.meta'

// 공식 문서에 게시된 주장만 coverage 분모에 넣고 실행으로 확인한 항목은 따로 센다
const officialItemCount = timelineLabelsSourceItems.filter((item) => item.origin === 'official').length
const probeItemCount = timelineLabelsSourceItems.length - officialItemCount
// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(timelineLabelsSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="labels-coverage" aria-label="공식 source 대응 범위">
      <div className="labels-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{timelineLabelsCoverage.officialSources}
          </strong>
          <span>공식 source</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{timelineLabelsCoverage.officialSourceItems}
          </strong>
          <span>공식 기술 item</span>
        </div>
        <p>
          Timeline label 문서 7개의 기술 item {timelineLabelsCoverage.officialSourceItems}개를 "이름을 만들고, 묻고, 그 이름으로
          이동하고, 지운다"는 흐름의 일곱 단계로 다시 묶었습니다. 여기에 공식 문서가 침묵하거나 실행과 어긋나 직접 확인한 항목{' '}
          {probeItemCount}개를 따로 표시합니다.
        </p>
      </div>
      <ol>
        {timelineLabelsSections.map((section) => (
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
