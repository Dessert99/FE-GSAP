/** Timeline의 시간 계산을 "길이는 children에서 나온다"에서 출발하는 여덟 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { ChildrenClockSection } from './sections/ChildrenClockSection/ChildrenClockSection'
import { DurationTotalSection } from './sections/DurationTotalSection/DurationTotalSection'
import { GetterSetterSection } from './sections/GetterSetterSection/GetterSetterSection'
import { GlobalTimeSection } from './sections/GlobalTimeSection/GlobalTimeSection'
import { SetterScalesSection } from './sections/SetterScalesSection/SetterScalesSection'
import { StartEndSection } from './sections/StartEndSection/StartEndSection'
import { TimeScaleSection } from './sections/TimeScaleSection/TimeScaleSection'
import { timelineTimingMathMeta } from './timeline-timing-math.meta'
import './TimelineTimingMathPage.css'

export function TimelineTimingMathPage() {
  return (
    <article className="tl-timing-page">
      <header className="tl-timing-page__header">
        <p className="tl-timing-page__eyebrow">{timelineTimingMathMeta.category}</p>
        <h1>{timelineTimingMathMeta.title}</h1>
        <p className="tl-timing-page__summary">{timelineTimingMathMeta.summary}</p>
        <div className="tl-timing-page__official-links">
          {timelineTimingMathMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="tl-timing-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{timelineTimingMathMeta.sourcePath}</code>
        </div>
        <p className="tl-timing-page__reviewed">공식 문서 대조일 · {timelineTimingMathMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <ChildrenClockSection />
      <GetterSetterSection />
      <DurationTotalSection />
      <SetterScalesSection />
      <StartEndSection />
      <TimeScaleSection />
      <GlobalTimeSection />
      <BoundariesSection />
    </article>
  )
}
