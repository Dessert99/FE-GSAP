/** catalog의 실제 item 수를 meta 계약과 대조해 표시한다. */
import { flipFitAbsoluteSourceItems } from '../../flip-fit-absolute.catalog'
import {
  flipFitAbsoluteCoverage,
  flipFitAbsoluteSections,
} from '../../flip-fit-absolute.meta'
export function PageCoverage() {
  const official = flipFitAbsoluteSourceItems.filter(
    (i) => i.origin === 'official',
  ).length
  const implementation = flipFitAbsoluteSourceItems.filter(
    (i) => i.origin === 'implementation',
  ).length
  return (
    <aside className="flip-fit-absolute-page__coverage">
      <strong>
        {official} / {flipFitAbsoluteCoverage.officialSourceItems}
      </strong>
      <span>{implementation} implementation checks</span>
      <ol>
        {flipFitAbsoluteSections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`}>
              {s.number} · {s.title}
            </a>
            <span>{s.sourceItems}</span>
          </li>
        ))}
      </ol>
    </aside>
  )
}
