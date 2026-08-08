/** catalog 실측값과 meta 계약을 나란히 보여 source 누락을 즉시 드러낸다. */
import { timelineCleanupSourceItems } from '../../timeline-cleanup.catalog'
import { timelineCleanupCoverage, timelineCleanupSections } from '../../timeline-cleanup.meta'

// 공식 item만 coverage 분모에 넣고 실행 probe는 별도 수치로 남긴다
const officialCount = timelineCleanupSourceItems.filter((item) => item.origin === 'official').length
// 전체 item에서 공식 item을 빼면 문서가 침묵한 동작을 확인한 probe 수가 된다
const probeCount = timelineCleanupSourceItems.length - officialCount
// catalog가 실제 근거로 가진 공식 source 종류를 분자로 쓴다
const sourceCount = new Set(timelineCleanupSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="tl-cleanup-coverage" aria-label="공식 source 대응 범위">
      <div className="tl-cleanup-coverage__summary">
        <div><strong>{sourceCount}/{timelineCleanupCoverage.officialSources}</strong><span>공식 source</span></div>
        <div><strong>{officialCount}/{timelineCleanupCoverage.officialSourceItems}</strong><span>공식 기술 item</span></div>
        <p>여섯 cleanup 선택의 공식 {officialCount}개를 보존 범위로 재배열하고 GSAP 3.15.0 실행 probe {probeCount}개를 분리했습니다.</p>
      </div>
      <ol>{timelineCleanupSections.map((section) => <li key={section.id}><a href={`#${section.id}`}><span>{section.number}</span><div><strong>{section.title}</strong><small>{section.sourceItems}개 source item</small></div></a></li>)}</ol>
    </nav>
  )
}
