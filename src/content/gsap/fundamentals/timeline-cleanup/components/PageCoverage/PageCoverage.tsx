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
    <nav className="tl-cleanup-coverage" aria-label="Timeline 정리 방법 학습 순서">
      <div className="tl-cleanup-coverage__summary">
        <div><strong>{sourceCount}/{timelineCleanupCoverage.officialSources}</strong><span>대조한 공식 문서</span></div>
        <div><strong>{officialCount}/{timelineCleanupCoverage.officialSourceItems}</strong><span>설명한 핵심 동작</span></div>
        <p>여섯 정리 방법의 핵심 동작 {officialCount}개를 무엇이 남는지에 따라 비교하고, 문서에 없는 경계 동작 {probeCount}개는 직접 확인해 구분했습니다.</p>
      </div>
      <ol>{timelineCleanupSections.map((section) => <li key={section.id}><a href={`#${section.id}`}><span>{section.number}</span><div><strong>{section.title}</strong><small>{section.sourceItems}개 핵심 동작</small></div></a></li>)}</ol>
    </nav>
  )
}
