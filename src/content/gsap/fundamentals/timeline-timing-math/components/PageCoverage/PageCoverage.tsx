/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { timelineTimingMathSourceItems } from '../../timeline-timing-math.catalog'
import { timelineTimingMathCoverage, timelineTimingMathSections } from '../../timeline-timing-math.meta'

// 공식 문서에 게시된 주장만 coverage 분모에 넣고 실행으로 확인한 항목은 따로 센다
const officialItemCount = timelineTimingMathSourceItems.filter((item) => item.origin === 'official').length
const probeItemCount = timelineTimingMathSourceItems.length - officialItemCount
// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(
  timelineTimingMathSourceItems.filter((item) => item.origin === 'official').map((item) => item.source),
).size

export function PageCoverage() {
  return (
    <nav className="tl-timing-coverage" aria-label="Timeline 시간 계산 학습 순서">
      <div className="tl-timing-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{timelineTimingMathCoverage.officialSources}
          </strong>
          <span>대조한 공식 문서</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{timelineTimingMathCoverage.officialSourceItems}
          </strong>
          <span>설명한 핵심 동작</span>
        </div>
        <p>
          시간을 다루는 Timeline 메서드 일곱 개의 핵심 동작 {timelineTimingMathCoverage.officialSourceItems}개를 "길이는 어디서 오고, 그
          길이를 어떻게 읽고 바꾸나"라는 흐름의 여덟 단계로 다시 묶었습니다. 여기에 공식 문서에 없어 직접 실행해 확인한 항목{' '}
          {probeItemCount}개를 따로 표시합니다.
        </p>
      </div>
      <ol>
        {timelineTimingMathSections.map((section) => (
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
