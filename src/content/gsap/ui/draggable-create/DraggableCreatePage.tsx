/** Draggable instance 생성·조회·검사·cleanup의 다섯 학습 단계를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { CreateSection } from './sections/CreateSection/CreateSection'
import { InstanceMentalModelSection } from './sections/InstanceMentalModelSection/InstanceMentalModelSection'
import { LifecycleBoundarySection } from './sections/LifecycleBoundarySection/LifecycleBoundarySection'
import { LookupIdentitySection } from './sections/LookupIdentitySection/LookupIdentitySection'
import { TargetVarsSection } from './sections/TargetVarsSection/TargetVarsSection'
import { draggableCreateMeta } from './draggable-create.meta'
import './DraggableCreatePage.css'

/** P03 Draggable의 생성과 lookup identity를 보여 주는 학습 페이지다. */
export function DraggableCreatePage() {
  return <article className="draggable-create-page"><header className="draggable-create-page__header"><p className="draggable-create-page__eyebrow">{draggableCreateMeta.category}</p><h1>{draggableCreateMeta.title}</h1><p className="draggable-create-page__summary">{draggableCreateMeta.summary}</p><div className="draggable-create-page__official-links">{draggableCreateMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}</div><p className="draggable-create-page__path">이 페이지의 코드 위치 · <code>{draggableCreateMeta.sourcePath}</code></p><p className="draggable-create-page__reviewed">공식 문서 대조일 · {draggableCreateMeta.reviewedAt}</p></header><PageCoverage /><InstanceMentalModelSection /><CreateSection /><LookupIdentitySection /><TargetVarsSection /><LifecycleBoundarySection /></article>
}
