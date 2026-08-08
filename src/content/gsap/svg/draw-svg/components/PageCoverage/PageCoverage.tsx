/** catalog의 실제 source 수를 meta 계약과 대조해 화면에 표시한다. */
import { drawSvgSourceItems } from '../../draw-svg.catalog'
import { drawSvgCoverage, drawSvgSections } from '../../draw-svg.meta'

/** source item과 installed/raw 차이를 분리한 coverage 요약을 표시한다. */
export function PageCoverage() {
  const official = drawSvgSourceItems.filter(
    (item) => item.origin === 'official',
  ).length
  const implementation = drawSvgSourceItems.filter(
    (item) => item.origin === 'implementation',
  ).length
  return (
    <aside
      className="draw-svg-page__coverage"
      aria-labelledby="draw-svg-coverage-title"
    >
      <div>
        <p>OFFICIAL COVERAGE</p>
        <h2 id="draw-svg-coverage-title">
          {official} / {drawSvgCoverage.officialSourceItems}
        </h2>
        <span>
          {drawSvgCoverage.officialSources} canonicals · {implementation} /{' '}
          {drawSvgCoverage.implementationItems} source/type checks
        </span>
      </div>
      <ol>
        {drawSvgSections.map((section) => (
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
