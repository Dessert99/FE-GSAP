/** P08 공식 item과 source/probe 경계가 모두 연결됐음을 요약한다. */
import { draggableCollisionMomentumItems } from '../../draggable-collision-momentum.catalog'
import {
  draggableCollisionMomentumCoverage,
  draggableCollisionMomentumSections,
} from '../../draggable-collision-momentum.meta'

const officialItems = draggableCollisionMomentumItems.filter((item) => item.origin === 'official')
const sourceItems = draggableCollisionMomentumItems.filter((item) => item.origin === 'source')
const canonicalCount = new Set(officialItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="draggable-collision-momentum-coverage" aria-label="공식 source 대응 범위">
      <div>
        <strong>
          {canonicalCount}/{draggableCollisionMomentumCoverage.officialSources}
        </strong>
        <span>공식 canonical</span>
      </div>
      <div>
        <strong>
          {officialItems.length}/{draggableCollisionMomentumCoverage.officialSourceItems}
        </strong>
        <span>공식 기술 item</span>
      </div>
      <p>
        설치본 source/type·Node probe {sourceItems.length}/
        {draggableCollisionMomentumCoverage.sourceVerifiedItems}개는 공식 분모와 분리했습니다.
      </p>
      <ol>
        {draggableCollisionMomentumSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              {section.number} · {section.title} <small>{section.sourceItems}개</small>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
