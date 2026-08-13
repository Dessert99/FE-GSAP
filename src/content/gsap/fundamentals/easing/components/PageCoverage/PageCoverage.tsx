/** Easing을 이해할 네 가지 학습 주제를 페이지 첫머리에서 안내한다. */
import { easingCoverageGroups } from '../../easing.catalog'

export function PageCoverage() {
  return (
    <aside className="easing-page__coverage" aria-labelledby="easing-coverage-title">
      <div><p>학습 순서</p><h2 id="easing-coverage-title">네 가지 주제</h2></div>
      <ul>
        {easingCoverageGroups.map((group) => <li key={group.title}><strong>{group.title}</strong></li>)}
      </ul>
    </aside>
  )
}
