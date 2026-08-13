/** catalog의 실제 공식·probe 수를 meta 계약과 대조해 화면에 표시한다. */
import { timelinePlayheadSourceItems } from '../../timeline-playhead.catalog'
import { timelinePlayheadCoverage, timelinePlayheadSections } from '../../timeline-playhead.meta'

export function PageCoverage() {
  const officialItemCount = timelinePlayheadSourceItems.filter((item) => item.origin === 'official').length
  const probeItemCount = timelinePlayheadSourceItems.filter((item) => item.origin === 'implementation').length

  return (
    <aside className="timeline-playhead-page__coverage" aria-labelledby="timeline-playhead-coverage-title">
      <div><p>PLAYHEAD 학습 순서</p><h2 id="timeline-playhead-coverage-title">핵심 동작 {officialItemCount}개</h2><span>공식 문서 {timelinePlayheadCoverage.officialSources}개 · 직접 확인한 경계 {probeItemCount}개</span></div>
      <ol>{timelinePlayheadSections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.number} · {section.title}</a><span>{section.sourceItems}개 핵심 동작</span></li>)}</ol>
    </aside>
  )
}
