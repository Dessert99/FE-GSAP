/** P17의 tracker lookup, membership, snapshot, sampling boundary를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { VelocityGaugeLab } from './examples/VelocityGaugeLab/VelocityGaugeLab'
import { EstablishedTrackerSection } from './sections/EstablishedTrackerSection/EstablishedTrackerSection'
import { LookupMembershipSection } from './sections/LookupMembershipSection/LookupMembershipSection'
import { ReadSnapshotSection } from './sections/ReadSnapshotSection/ReadSnapshotSection'
import { SamplingMissingSection } from './sections/SamplingMissingSection/SamplingMissingSection'
import { velocityTrackerReadMeta } from './velocity-tracker-read.meta'
import './VelocityTrackerReadPage.css'

/** stable target에서 selected property velocity를 안전하게 읽는 P17 학습 페이지다. */
export function VelocityTrackerReadPage() {
  return (
    <article className="velocity-tracker-read-page">
      <header>
        <p>{velocityTrackerReadMeta.category}</p>
        <h1>{velocityTrackerReadMeta.title}</h1>
        <p>{velocityTrackerReadMeta.summary}</p>
        <div className="velocity-tracker-read-page__links">
          {velocityTrackerReadMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p>
          <code>{velocityTrackerReadMeta.sourcePath}</code> · 공식 대조일{' '}
          {velocityTrackerReadMeta.reviewedAt}
        </p>
      </header>
      <EstablishedTrackerSection />
      <LookupMembershipSection />
      <ReadSnapshotSection />
      <VelocityGaugeLab />
      <SamplingMissingSection />
    </article>
  )
}
