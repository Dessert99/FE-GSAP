/** InertiaPlugin의 velocity-to-destination 학습 단계를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { InertiaPuckLab } from './examples/InertiaPuckLab/InertiaPuckLab'
import { BoundsEndSection } from './sections/BoundsEndSection/BoundsEndSection'
import { CleanupBoundarySection } from './sections/CleanupBoundarySection/CleanupBoundarySection'
import { DestinationPredictionSection } from './sections/DestinationPredictionSection/DestinationPredictionSection'
import { TrackingLifecycleSection } from './sections/TrackingLifecycleSection/TrackingLifecycleSection'
import { VelocitySampleSection } from './sections/VelocitySampleSection/VelocitySampleSection'
import { inertiaMeta } from './inertia.meta'
import './InertiaPage.css'

export function InertiaPage() {
  return (
    <article className="inertia-page">
      <header>
        <p>{inertiaMeta.category}</p>
        <h1>{inertiaMeta.title}</h1>
        <p>{inertiaMeta.summary}</p>
        <div>
          {inertiaMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p>
          <code>{inertiaMeta.sourcePath}</code>
        </p>
      </header>
      <PageCoverage />
      <VelocitySampleSection />
      <TrackingLifecycleSection />
      <InertiaPuckLab />
      <DestinationPredictionSection />
      <BoundsEndSection />
      <CleanupBoundarySection />
    </article>
  )
}
