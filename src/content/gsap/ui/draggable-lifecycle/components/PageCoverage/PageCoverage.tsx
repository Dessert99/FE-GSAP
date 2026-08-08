/** catalog의 실제 source 수를 meta 계약과 대조해 화면에 표시한다. */
import { draggableLifecycleSourceItems } from '../../draggable-lifecycle.catalog'
import { draggableLifecycleCoverage, draggableLifecycleSections } from '../../draggable-lifecycle.meta'

/** source item과 설치본 차이를 분리한 coverage 요약을 표시한다. */
export function PageCoverage() {
  const officialItemCount = draggableLifecycleSourceItems.filter((item) => item.origin === 'official').length
  const implementationItemCount = draggableLifecycleSourceItems.filter((item) => item.origin === 'implementation').length

  return <aside className="draggable-lifecycle-page__coverage" aria-labelledby="draggable-lifecycle-coverage-title"><div><p>OFFICIAL COVERAGE</p><h2 id="draggable-lifecycle-coverage-title">{officialItemCount} / {draggableLifecycleCoverage.officialSourceItems}</h2><span>{draggableLifecycleCoverage.officialSources} canonicals · {implementationItemCount} / {draggableLifecycleCoverage.implementationItems} source/type checks</span></div><ol>{draggableLifecycleSections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.number} · {section.title}</a><span>{section.sourceItems} items</span></li>)}</ol></aside>
}
