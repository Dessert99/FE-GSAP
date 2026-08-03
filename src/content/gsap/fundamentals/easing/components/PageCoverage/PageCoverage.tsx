/** Easing 공식 source 26개가 어느 학습 묶음에 반영됐는지 보여준다. */
import { easingCoverageGroups } from '../../easing.catalog'

export function PageCoverage() {
  return (
    <aside className="easing-page__coverage" aria-labelledby="easing-coverage-title">
      <div><p>OFFICIAL COVERAGE</p><h2 id="easing-coverage-title">26 / 26</h2></div>
      <ul>
        {easingCoverageGroups.map((group) => <li key={group.title}><strong>{group.title}</strong><span>{group.ids.join(' · ')}</span></li>)}
      </ul>
    </aside>
  )
}
