/** 공식 source와 로컬 학습 섹션의 대응 수를 catalog에서 직접 세어 보여준다. */
import { timelineRepeatsSourceItems } from '../../timeline-repeats.catalog'
import { timelineRepeatsCoverage, timelineRepeatsSections } from '../../timeline-repeats.meta'

// 공식 게시 item만 coverage 분모에 넣고 실행 probe는 별도로 센다
const officialCount = timelineRepeatsSourceItems.filter((item) => item.origin === 'official').length
// 전체에서 공식 item을 빼 실행으로 확인한 item 수를 구한다
const probeCount = timelineRepeatsSourceItems.length - officialCount
// catalog가 실제로 근거를 가진 source 종류를 분자로 쓴다
const sourceCount = new Set(timelineRepeatsSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return <nav className="tl-repeats-coverage" aria-label="공식 source 대응 범위"><div className="tl-repeats-coverage__summary"><div><strong>{sourceCount}/{timelineRepeatsCoverage.officialSources}</strong><span>공식 source</span></div><div><strong>{officialCount}/{timelineRepeatsCoverage.officialSourceItems}</strong><span>공식 기술 item</span></div><p>Timeline repeat cycle과 child invalidation에 관한 공식 {officialCount}개를 일곱 단계로 묶고, GSAP 3.15.0 실행 probe {probeCount}개를 분리했습니다.</p></div><ol>{timelineRepeatsSections.map((section) => <li key={section.id}><a href={`#${section.id}`}><span>{section.number}</span><div><strong>{section.title}</strong><small>{section.sourceItems}개 source item</small></div></a></li>)}</ol></nav>
}
