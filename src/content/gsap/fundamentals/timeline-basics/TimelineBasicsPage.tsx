/** Timeline 생성·vars·child creator·position·defaults·nesting을 여덟 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { ChildCreatorsSection } from './sections/ChildCreatorsSection/ChildCreatorsSection'
import { DefaultsScopeSection } from './sections/DefaultsScopeSection/DefaultsScopeSection'
import { NestingClockSection } from './sections/NestingClockSection/NestingClockSection'
import { PositionParameterSection } from './sections/PositionParameterSection/PositionParameterSection'
import { TimelineInstanceSection } from './sections/TimelineInstanceSection/TimelineInstanceSection'
import { TimelineVarsSection } from './sections/TimelineVarsSection/TimelineVarsSection'
import { WhyTimelineSection } from './sections/WhyTimelineSection/WhyTimelineSection'
import { timelineBasicsMeta } from './timeline-basics.meta'
import './TimelineBasicsPage.css'

export function TimelineBasicsPage() {
  return (
    <article className="timeline-page">
      <header className="timeline-page__header">
        <p className="timeline-page__eyebrow">{timelineBasicsMeta.category}</p>
        <h1>{timelineBasicsMeta.title}</h1>
        <p className="timeline-page__summary">{timelineBasicsMeta.summary}</p>
        <div className="timeline-page__official-links">
          {timelineBasicsMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}
        </div>
        <div className="timeline-page__path"><span>이 페이지의 코드 위치</span><code>{timelineBasicsMeta.sourcePath}</code></div>
        <p className="timeline-page__reviewed">공식 문서 대조일 · {timelineBasicsMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <WhyTimelineSection />
      <TimelineInstanceSection />
      <TimelineVarsSection />
      <ChildCreatorsSection />
      <PositionParameterSection />
      <DefaultsScopeSection />
      <NestingClockSection />
      <BoundariesSection />
    </article>
  )
}
