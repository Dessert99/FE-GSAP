/** Draggable target·pointer·phase 좌표의 다섯 학습 단계를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { CoordinateMentalModelSection } from './sections/CoordinateMentalModelSection/CoordinateMentalModelSection'
import { DirectionRotationSection } from './sections/DirectionRotationSection/DirectionRotationSection'
import { PhaseSnapshotSection } from './sections/PhaseSnapshotSection/PhaseSnapshotSection'
import { PointerTargetSection } from './sections/PointerTargetSection/PointerTargetSection'
import { ReadingBoundarySection } from './sections/ReadingBoundarySection/ReadingBoundarySection'
import { draggableCoordinatesMeta } from './draggable-coordinates.meta'
import './DraggableCoordinatesPage.css'

/** P04 Draggable 좌표·시점·pointer frame을 보여 주는 학습 페이지다. */
export function DraggableCoordinatesPage() {
  return (
    <article className="draggable-coordinates-page">
      <header className="draggable-coordinates-page__header">
        <p className="draggable-coordinates-page__eyebrow">
          {draggableCoordinatesMeta.category}
        </p>
        <h1>{draggableCoordinatesMeta.title}</h1>
        <p className="draggable-coordinates-page__summary">
          {draggableCoordinatesMeta.summary}
        </p>
        <div className="draggable-coordinates-page__official-links">
          {draggableCoordinatesMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p className="draggable-coordinates-page__path">
          이 페이지의 코드 위치 ·{' '}
          <code>{draggableCoordinatesMeta.sourcePath}</code>
        </p>
        <p className="draggable-coordinates-page__reviewed">
          공식 문서 대조일 · {draggableCoordinatesMeta.reviewedAt}
        </p>
      </header>
      <PageCoverage />
      <CoordinateMentalModelSection />
      <PhaseSnapshotSection />
      <PointerTargetSection />
      <DirectionRotationSection />
      <ReadingBoundarySection />
    </article>
  )
}
