/** P14의 debugging workflow, create config, production boundary를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { GsDevToolsLab } from './examples/GsDevToolsLab/GsDevToolsLab'
import { ConfigControlsSection } from './sections/ConfigControlsSection/ConfigControlsSection'
import { CreateInstanceSection } from './sections/CreateInstanceSection/CreateInstanceSection'
import { DebuggingProblemSection } from './sections/DebuggingProblemSection/DebuggingProblemSection'
import { ProductionBoundarySection } from './sections/ProductionBoundarySection/ProductionBoundarySection'
import { gsdevtoolsMeta } from './gsdevtools.meta'
import './GsDevToolsPage.css'

/** GSDevTools를 development-only inspector와 native fallback control 관점으로 가르친다. */
export function GsDevToolsPage() {
  return (
    <article className="gsdevtools-page">
      <header>
        <p>{gsdevtoolsMeta.category}</p>
        <h1>{gsdevtoolsMeta.title}</h1>
        <p>{gsdevtoolsMeta.summary}</p>
        <div className="gsdevtools-page__links">
          {gsdevtoolsMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p>
          <code>{gsdevtoolsMeta.sourcePath}</code> · 공식 대조일 {gsdevtoolsMeta.reviewedAt}
        </p>
      </header>
      <DebuggingProblemSection />
      <CreateInstanceSection />
      <ConfigControlsSection />
      <GsDevToolsLab />
      <ProductionBoundarySection />
    </article>
  )
}
