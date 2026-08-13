/** press부터 drag 종료 뒤 시간까지 다섯 학습 단계를 안내한다. */
import { draggableEventsSections } from '../../draggable-events.meta'

/** gesture event의 발생 순서와 cleanup 경계를 먼저 보여 준다. */
export function PageCoverage() {
  return (
    <aside
      className="draggable-events-page__coverage"
      aria-labelledby="draggable-events-coverage-title"
    >
      <div>
        <p>학습 순서</p>
        <h2 id="draggable-events-coverage-title">한 번의 drag에서 생기는 event</h2>
        <span>press·drag·release를 구분하고 listener cleanup까지 확인합니다.</span>
      </div>
      <ol>
        {draggableEventsSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              {section.number} · {section.title}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  )
}
