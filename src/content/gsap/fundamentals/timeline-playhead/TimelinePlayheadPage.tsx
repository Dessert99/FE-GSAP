/** Timeline playhead의 네 좌표와 두 control Tween을 여섯 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { DirectSettersSection } from './sections/DirectSettersSection/DirectSettersSection'
import { NavigationTweenSection } from './sections/NavigationTweenSection/NavigationTweenSection'
import { OfficialDifferencesSection } from './sections/OfficialDifferencesSection/OfficialDifferencesSection'
import { PlayheadCoordinatesSection } from './sections/PlayheadCoordinatesSection/PlayheadCoordinatesSection'
import { RangeTweenSection } from './sections/RangeTweenSection/RangeTweenSection'
import { timelinePlayheadMeta } from './timeline-playhead.meta'
import './TimelinePlayheadPage.css'

export function TimelinePlayheadPage() {
  return (
    <article className="timeline-playhead-page">
      <header className="timeline-playhead-page__header">
        <p className="timeline-playhead-page__eyebrow">{timelinePlayheadMeta.category}</p>
        <h1>{timelinePlayheadMeta.title}</h1>
        <p className="timeline-playhead-page__summary">{timelinePlayheadMeta.summary}</p>
        <div className="timeline-playhead-page__official-links">{timelinePlayheadMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}</div>
        <p className="timeline-playhead-page__path">이 페이지의 코드 위치 · <code>{timelinePlayheadMeta.sourcePath}</code></p>
        <p className="timeline-playhead-page__reviewed">공식 문서 대조일 · {timelinePlayheadMeta.reviewedAt}</p>
      </header>
      <PageCoverage />
      <PlayheadCoordinatesSection />
      <DirectSettersSection />
      <NavigationTweenSection />
      <RangeTweenSection />
      <OfficialDifferencesSection />
      <BoundariesSection />
    </article>
  )
}
