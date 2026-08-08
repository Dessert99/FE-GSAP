/** page 37을 pipeline·unit·browser property·경계 네 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { PipelineSection } from './sections/PipelineSection/PipelineSection'
import { PrefixSection } from './sections/PrefixSection/PrefixSection'
import { UnitSection } from './sections/UnitSection/UnitSection'
import { utilityPipelinesUnitsMeta } from './utility-pipelines-units.meta'
import './UtilityPipelinesUnitsPage.css'

export function UtilityPipelinesUnitsPage() {
  return (
    <article className="pipeline-units-page">
      <header className="pipeline-units-page__header">
        <p className="pipeline-units-page__eyebrow">{utilityPipelinesUnitsMeta.category}</p>
        <h1>{utilityPipelinesUnitsMeta.title}</h1>
        <p className="pipeline-units-page__summary">{utilityPipelinesUnitsMeta.summary}</p>
        <div className="pipeline-units-page__official-links">
          {utilityPipelinesUnitsMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} label={source.label} href={source.href} />)}
        </div>
        <div className="pipeline-units-page__path"><span>이 페이지의 코드 위치</span><code>{utilityPipelinesUnitsMeta.sourcePath}</code></div>
        <p className="pipeline-units-page__reviewed">공식 문서 대조일 · {utilityPipelinesUnitsMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <PipelineSection />
      <UnitSection />
      <PrefixSection />
      <BoundariesSection />
    </article>
  )
}
