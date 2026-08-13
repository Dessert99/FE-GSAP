/** Draggable instance의 시작부터 폐기까지 다섯 학습 단계를 안내한다. */
import { draggableLifecycleSections } from '../../draggable-lifecycle.meta'

/** instance를 잠시 멈추는 일과 완전히 폐기하는 일을 질문 순서로 보여 준다. */
export function PageCoverage() {
  return <aside className="draggable-lifecycle-page__coverage" aria-labelledby="draggable-lifecycle-coverage-title"><div><p>학습 순서</p><h2 id="draggable-lifecycle-coverage-title">Draggable instance lifecycle</h2><span>활성화, programmatic drag, 폐기와 cleanup을 구분합니다.</span></div><ol>{draggableLifecycleSections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.number} · {section.title}</a></li>)}</ol></aside>
}
