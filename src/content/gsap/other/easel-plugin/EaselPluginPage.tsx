/** EaselPlugin의 canvas target·easel vars·stage draw·dependency 경계를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { BoundarySection } from './sections/BoundarySection/BoundarySection'
import { ConceptSection } from './sections/ConceptSection/ConceptSection'
import { SequenceSection } from './sections/SequenceSection/SequenceSection'
import { TargetSection } from './sections/TargetSection/TargetSection'
import { VarsSection } from './sections/VarsSection/VarsSection'
import { easelPluginMeta } from './easel-plugin.meta'
import './EaselPluginPage.css'
/** P10 EaselPlugin의 static executable boundary를 제공하는 학습 페이지다. */
export function EaselPluginPage() {
  return (
    <article className="easel-plugin-page">
      <header>
        <p>{easelPluginMeta.category}</p>
        <h1>{easelPluginMeta.title}</h1>
        <p>{easelPluginMeta.summary}</p>
        <OfficialDocsLink {...easelPluginMeta.officialSources[0]} />
        <p>
          <code>{easelPluginMeta.sourcePath}</code> · 공식 대조일{' '}
          {easelPluginMeta.reviewedAt}
        </p>
      </header>
      <ConceptSection />
      <TargetSection />
      <VarsSection />
      <SequenceSection />
      <BoundarySection />
    </article>
  )
}
