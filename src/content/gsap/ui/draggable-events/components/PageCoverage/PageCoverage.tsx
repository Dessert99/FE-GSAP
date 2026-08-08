/** P07 catalog의 official/implementation item 수를 분리해 표시한다. */
import { draggableEventSourceItems } from '../../draggable-events.catalog'
import {
  draggableEventsCoverage,
  draggableEventsSections,
} from '../../draggable-events.meta'

/** source item이 다섯 learning section에 모두 연결됐는지 보여 준다. */
export function PageCoverage() {
  const official = draggableEventSourceItems.filter(
    (item) => item.origin === 'official',
  ).length
  const implementation = draggableEventSourceItems.filter(
    (item) => item.origin === 'implementation',
  ).length
  return (
    <aside
      className="draggable-events-page__coverage"
      aria-labelledby="draggable-events-coverage-title"
    >
      <div>
        <p>OFFICIAL COVERAGE</p>
        <h2 id="draggable-events-coverage-title">
          {official} / {draggableEventsCoverage.officialSourceItems}
        </h2>
        <span>
          {draggableEventsCoverage.officialSources} canonicals ·{' '}
          {implementation} implementation checks
        </span>
      </div>
      <ol>
        {draggableEventsSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              {section.number} · {section.title}
            </a>
            <span>{section.sourceItems} items</span>
          </li>
        ))}
      </ol>
    </aside>
  )
}
