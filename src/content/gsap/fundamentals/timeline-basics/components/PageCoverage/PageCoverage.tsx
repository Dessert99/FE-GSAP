/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { timelineBasicsSourceItems } from '../../timeline-basics.catalog'
import { timelineBasicsCoverage, timelineBasicsSections } from '../../timeline-basics.meta'

// 공식 문서에 게시된 주장만 coverage 분모에 넣고 실행으로 확인한 항목은 따로 센다
const officialItemCount = timelineBasicsSourceItems.filter((item) => item.origin === 'official').length
const probeItemCount = timelineBasicsSourceItems.length - officialItemCount
// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(timelineBasicsSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="timeline-coverage" aria-label="공식 source 대응 범위">
      <div className="timeline-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{timelineBasicsCoverage.officialSources}
          </strong>
          <span>공식 source</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{timelineBasicsCoverage.officialSourceItems}
          </strong>
          <span>공식 기술 item</span>
        </div>
        <p>
          gsap.timeline() 생성자와 Timeline 클래스, vars 명세, 그리고 to · from · fromTo · set 네 메서드 문서의 기술 item{' '}
          {timelineBasicsCoverage.officialSourceItems}개를 "그릇을 만들고 → 안을 채우고 → 놓을 자리를 정한다"는 여덟 단계로 다시
          묶었습니다. 여기에 공식 문서에 없어 직접 실행해 확인한 항목 {probeItemCount}개를 따로 표시합니다.
        </p>
      </div>
      <ol>
        {timelineBasicsSections.map((section) => (
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
