/** 공식 source 21개가 local evidence에 모두 연결됐음을 페이지 앞에서 보여준다. */
import { reusableEffectsCatalog, reusableEffectsCoverage } from '../../reusable-effects.catalog'
import { reusableEffectsCoverageSummary } from '../../reusable-effects.meta'

/** canonical source와 source item의 전체 대응 범위를 표시한다. */
export function PageCoverage() {
  return (
    <aside className="reusable-effects-page__coverage" aria-labelledby="reusable-effects-coverage-title">
      <div><p>OFFICIAL COVERAGE</p><h2 id="reusable-effects-coverage-title">{reusableEffectsCatalog.length} / {reusableEffectsCoverageSummary.sourceItems}</h2></div>
      <ul>{reusableEffectsCoverage.map((group) => <li key={group.title}><strong>{group.title}</strong><span>{group.ids.join(' · ')}</span></li>)}</ul>
    </aside>
  )
}
