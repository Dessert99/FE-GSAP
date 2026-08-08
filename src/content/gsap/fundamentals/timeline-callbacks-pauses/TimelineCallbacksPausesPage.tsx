/** Timeline에 함수와 멈춤 지점을 예약하는 여섯 메서드를 여덟 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { CompletionPromiseSection } from './sections/CompletionPromiseSection/CompletionPromiseSection'
import { DelayedCallSection } from './sections/DelayedCallSection/DelayedCallSection'
import { LifecycleCallbacksSection } from './sections/LifecycleCallbacksSection/LifecycleCallbacksSection'
import { PausePointsSection } from './sections/PausePointsSection/PausePointsSection'
import { PositionParameterSection } from './sections/PositionParameterSection/PositionParameterSection'
import { SchedulingBasicsSection } from './sections/SchedulingBasicsSection/SchedulingBasicsSection'
import { TimelineCallSection } from './sections/TimelineCallSection/TimelineCallSection'
import { timelineCallbacksPausesMeta } from './timeline-callbacks-pauses.meta'
import './TimelineCallbacksPausesPage.css'

export function TimelineCallbacksPausesPage() {
  return (
    <article className="schedule-page">
      <header className="schedule-page__header">
        <p className="schedule-page__eyebrow">{timelineCallbacksPausesMeta.category}</p>
        <h1>{timelineCallbacksPausesMeta.title}</h1>
        <p className="schedule-page__summary">{timelineCallbacksPausesMeta.summary}</p>
        <div className="schedule-page__official-links">
          {timelineCallbacksPausesMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="schedule-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{timelineCallbacksPausesMeta.sourcePath}</code>
        </div>
        <p className="schedule-page__reviewed">공식 문서 대조일 · {timelineCallbacksPausesMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <SchedulingBasicsSection />
      <DelayedCallSection />
      <TimelineCallSection />
      <PositionParameterSection />
      <PausePointsSection />
      <LifecycleCallbacksSection />
      <CompletionPromiseSection />
      <BoundariesSection />
    </article>
  )
}
