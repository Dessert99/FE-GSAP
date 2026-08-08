/** Draggable listener·pressed·recent-drag의 다섯 학습 단계를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { ClickDragBoundarySection } from './sections/ClickDragBoundarySection/ClickDragBoundarySection'
import { GestureEventMentalModelSection } from './sections/GestureEventMentalModelSection/GestureEventMentalModelSection'
import { ListenerCleanupSection } from './sections/ListenerCleanupSection/ListenerCleanupSection'
import { PressedTimingSection } from './sections/PressedTimingSection/PressedTimingSection'
import { RecentDragDecisionSection } from './sections/RecentDragDecisionSection/RecentDragDecisionSection'
import { draggableEventsMeta } from './draggable-events.meta'
import './DraggableEventsPage.css'

/** P07 Draggable gesture event와 recent-drag state를 설명하는 학습 페이지다. */
export function DraggableEventsPage() {
  return (
    <article className="draggable-events-page">
      <header className="draggable-events-page__header">
        <p className="draggable-events-page__eyebrow">
          {draggableEventsMeta.category}
        </p>
        <h1>{draggableEventsMeta.title}</h1>
        <p className="draggable-events-page__summary">
          {draggableEventsMeta.summary}
        </p>
        <div className="draggable-events-page__official-links">
          {draggableEventsMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p className="draggable-events-page__path">
          이 페이지의 코드 위치 · <code>{draggableEventsMeta.sourcePath}</code>
        </p>
        <p className="draggable-events-page__reviewed">
          공식 문서 대조일 · {draggableEventsMeta.reviewedAt}
        </p>
      </header>
      <PageCoverage />
      <GestureEventMentalModelSection />
      <PressedTimingSection />
      <RecentDragDecisionSection />
      <ListenerCleanupSection />
      <ClickDragBoundarySection />
    </article>
  )
}
