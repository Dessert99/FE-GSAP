/** catalog item 수와 section mapping을 현재 페이지에서 보이게 한다. */
import { inertiaSourceItems } from '../../inertia.catalog'
import { inertiaCoverage, inertiaSections } from '../../inertia.meta'

export function PageCoverage() {
  const official = inertiaSourceItems.filter(
    (item) => item.origin === 'official',
  ).length
  const implementation = inertiaSourceItems.filter(
    (item) => item.origin === 'implementation',
  ).length
  return (
    <aside className="inertia-page__coverage">
      <strong>
        {official} / {inertiaCoverage.officialSourceItems}
      </strong>
      <span>{implementation} implementation boundaries</span>
      <ol>
        {inertiaSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              {section.number} · {section.title}
            </a>
            <span>{section.sourceItems}</span>
          </li>
        ))}
      </ol>
    </aside>
  )
}
