/** catalog의 실제 공식·probe 수를 meta 계약과 대조해 화면에 표시한다. */
import { timelinePlayheadSourceItems } from '../../timeline-playhead.catalog'
import { timelinePlayheadCoverage, timelinePlayheadSections } from '../../timeline-playhead.meta'

export function PageCoverage() {
  const officialItemCount = timelinePlayheadSourceItems.filter((item) => item.origin === 'official').length
  const probeItemCount = timelinePlayheadSourceItems.filter((item) => item.origin === 'implementation').length

  return (
    <aside className="timeline-playhead-page__coverage" aria-labelledby="timeline-playhead-coverage-title">
      <div><p>OFFICIAL COVERAGE</p><h2 id="timeline-playhead-coverage-title">{officialItemCount} / {timelinePlayheadCoverage.officialSourceItems}</h2><span>{timelinePlayheadCoverage.officialSources} canonicals · {probeItemCount} / {timelinePlayheadCoverage.probeItems} probes</span></div>
      <ol>{timelinePlayheadSections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.number} · {section.title}</a><span>{section.sourceItems} items</span></li>)}</ol>
    </aside>
  )
}
