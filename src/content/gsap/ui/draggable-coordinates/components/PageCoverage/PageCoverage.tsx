/** catalog의 공식 item 수를 coverage 계약과 함께 표시한다. */
import { draggableCoordinateSourceItems } from '../../draggable-coordinates.catalog'
import {
  draggableCoordinatesCoverage,
  draggableCoordinatesSections,
} from '../../draggable-coordinates.meta'

/** 열네 canonical이 다섯 learner section에 빠짐없이 있는지 보여 준다. */
export function PageCoverage() {
  const officialItemCount = draggableCoordinateSourceItems.filter(
    (item) => item.origin === 'official',
  ).length
  return (
    <aside
      className="draggable-coordinates-page__coverage"
      aria-labelledby="draggable-coordinates-coverage-title"
    >
      <div>
        <p>DRAG 좌표 읽기 순서</p>
        <h2 id="draggable-coordinates-coverage-title">
          핵심 동작 {officialItemCount}개
        </h2>
        <span>
          공식 문서 {draggableCoordinatesCoverage.officialSources}개 · target과 pointer 값을 단계별로 비교
        </span>
      </div>
      <ol>
        {draggableCoordinatesSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              {section.number} · {section.title}
            </a>
            <span>{section.sourceItems}개 핵심 동작</span>
          </li>
        ))}
      </ol>
    </aside>
  )
}
