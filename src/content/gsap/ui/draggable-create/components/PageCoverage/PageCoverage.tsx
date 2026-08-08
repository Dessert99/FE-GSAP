/** catalog의 실제 source 수를 meta 계약과 대조해 화면에 표시한다. */
import { draggableCreateSourceItems } from '../../draggable-create.catalog'
import { draggableCreateCoverage, draggableCreateSections } from '../../draggable-create.meta'

/** source item과 구현 source를 분리한 coverage 요약을 표시한다. */
export function PageCoverage() {
  const officialItemCount = draggableCreateSourceItems.filter((item) => item.origin === 'official').length
  const implementationItemCount = draggableCreateSourceItems.filter((item) => item.origin === 'implementation').length

  return (
    <aside className="draggable-create-page__coverage" aria-labelledby="draggable-create-coverage-title">
      <div><p>OFFICIAL COVERAGE</p><h2 id="draggable-create-coverage-title">{officialItemCount} / {draggableCreateCoverage.officialSourceItems}</h2><span>{draggableCreateCoverage.officialSources} canonicals · {implementationItemCount} / {draggableCreateCoverage.implementationItems} source/type checks</span></div>
      <ol>{draggableCreateSections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.number} · {section.title}</a><span>{section.sourceItems} items</span></li>)}</ol>
    </aside>
  )
}
