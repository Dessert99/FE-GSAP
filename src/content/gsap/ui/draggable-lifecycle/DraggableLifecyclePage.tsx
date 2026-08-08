/** Draggable instance lifecycle의 다섯 학습 단계를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { EnableDisableSection } from './sections/EnableDisableSection/EnableDisableSection'
import { FrameworkCleanupSection } from './sections/FrameworkCleanupSection/FrameworkCleanupSection'
import { KillRecreateSection } from './sections/KillRecreateSection/KillRecreateSection'
import { LifecycleMentalModelSection } from './sections/LifecycleMentalModelSection/LifecycleMentalModelSection'
import { ProgrammaticDragSection } from './sections/ProgrammaticDragSection/ProgrammaticDragSection'
import { draggableLifecycleMeta } from './draggable-lifecycle.meta'
import './DraggableLifecyclePage.css'

/** P06 Draggable lifecycle state machine을 보여 주는 학습 페이지다. */
export function DraggableLifecyclePage() {
  return <article className="draggable-lifecycle-page"><header className="draggable-lifecycle-page__header"><p className="draggable-lifecycle-page__eyebrow">{draggableLifecycleMeta.category}</p><h1>{draggableLifecycleMeta.title}</h1><p className="draggable-lifecycle-page__summary">{draggableLifecycleMeta.summary}</p><div className="draggable-lifecycle-page__official-links">{draggableLifecycleMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}</div><p className="draggable-lifecycle-page__path">이 페이지의 코드 위치 · <code>{draggableLifecycleMeta.sourcePath}</code></p><p className="draggable-lifecycle-page__reviewed">공식 문서 대조일 · {draggableLifecycleMeta.reviewedAt}</p></header><PageCoverage /><LifecycleMentalModelSection /><EnableDisableSection /><ProgrammaticDragSection /><KillRecreateSection /><FrameworkCleanupSection /></article>
}
