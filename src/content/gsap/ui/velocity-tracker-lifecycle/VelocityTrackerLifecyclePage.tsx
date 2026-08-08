/** P16 header, five lifecycle sections와 one-target lab을 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { VelocityTrackerLifecycleLab } from './examples/VelocityTrackerLifecycleLab/VelocityTrackerLifecycleLab'
import { AddRemoveSection } from './sections/AddRemoveSection/AddRemoveSection'
import { CleanupSection } from './sections/CleanupSection/CleanupSection'
import { PropertySetSection } from './sections/PropertySetSection/PropertySetSection'
import { TrackerOwnershipSection } from './sections/TrackerOwnershipSection/TrackerOwnershipSection'
import { WholeTargetUntrackSection } from './sections/WholeTargetUntrackSection/WholeTargetUntrackSection'
import { velocityTrackerLifecycleMeta } from './velocity-tracker-lifecycle.meta'
import './VelocityTrackerLifecyclePage.css'
/** VelocityTracker의 property membership과 cleanup을 설명하는 P16 페이지다. */
export function VelocityTrackerLifecyclePage() {
  return (
    <article className="velocity-tracker-lifecycle">
      <header>
        <p>{velocityTrackerLifecycleMeta.category}</p>
        <h1>{velocityTrackerLifecycleMeta.title}</h1>
        <p>{velocityTrackerLifecycleMeta.summary}</p>
        <div>
          {velocityTrackerLifecycleMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <PageCoverage />
      </header>
      <TrackerOwnershipSection />
      <PropertySetSection />
      <VelocityTrackerLifecycleLab />
      <AddRemoveSection />
      <WholeTargetUntrackSection />
      <CleanupSection />
    </article>
  )
}
