/** Tween playhead canonical source 45개가 local evidence를 가진다는 것을 보여준다. */
import { tweenPlayheadCoverage } from '../../tween-playhead.catalog'

export function PageCoverage() {
  return (
    <aside className="tween-playhead-page__coverage" aria-labelledby="tween-playhead-coverage-title">
      <div><p>OFFICIAL COVERAGE</p><h2 id="tween-playhead-coverage-title">45 / 45</h2></div>
      <ul>{tweenPlayheadCoverage.map((group) => <li key={group.title}><strong>{group.title}</strong><span>{group.ids.join(' · ')}</span></li>)}</ul>
    </aside>
  )
}
