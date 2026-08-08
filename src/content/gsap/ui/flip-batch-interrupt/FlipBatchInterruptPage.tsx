/** P13의 header, coverage, five learner-flow sections와 lab을 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BatchInterruptLab } from './examples/BatchInterruptLab/BatchInterruptLab'
import { CleanupSection } from './sections/CleanupSection/CleanupSection'
import { ActiveQuerySection } from './sections/ActiveQuerySection/ActiveQuerySection'
import { BatchPhasesSection } from './sections/BatchPhasesSection/BatchPhasesSection'
import { KillPolicySection } from './sections/KillPolicySection/KillPolicySection'
import { SingleFlipRaceSection } from './sections/SingleFlipRaceSection/SingleFlipRaceSection'
import { flipBatchInterruptMeta } from './flip-batch-interrupt.meta'
import './FlipBatchInterruptPage.css'
/** P13 Flip batch와 interruption control을 설명하는 학습 페이지다. */
export function FlipBatchInterruptPage() {
  return (
    <article className="flip-bi">
      <header>
        <p>{flipBatchInterruptMeta.category}</p>
        <h1>{flipBatchInterruptMeta.title}</h1>
        <div>
          {flipBatchInterruptMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <PageCoverage />
      </header>
      <SingleFlipRaceSection />
      <BatchPhasesSection />
      <BatchInterruptLab />
      <ActiveQuerySection />
      <KillPolicySection />
      <CleanupSection />
    </article>
  )
}
