/** Timeline 재생 제어 여덟 메서드를 sequence 중심의 다섯 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { PlaybackCommandsSection } from './sections/PlaybackCommandsSection/PlaybackCommandsSection'
import { PlaybackModelSection } from './sections/PlaybackModelSection/PlaybackModelSection'
import { RestartReverseSection } from './sections/RestartReverseSection/RestartReverseSection'
import { StateReadoutSection } from './sections/StateReadoutSection/StateReadoutSection'
import { timelinePlaybackControlsMeta } from './timeline-playback-controls.meta'
import './TimelinePlaybackControlsPage.css'

export function TimelinePlaybackControlsPage() {
  return (
    <article className="timeline-playback-page">
      <header className="timeline-playback-page__header">
        <p className="timeline-playback-page__eyebrow">{timelinePlaybackControlsMeta.category}</p>
        <h1>{timelinePlaybackControlsMeta.title}</h1>
        <p className="timeline-playback-page__summary">{timelinePlaybackControlsMeta.summary}</p>
        <div className="timeline-playback-page__official-links">
          {timelinePlaybackControlsMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}
        </div>
        <div className="timeline-playback-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{timelinePlaybackControlsMeta.sourcePath}</code>
        </div>
        <p className="timeline-playback-page__reviewed">공식 문서 대조일 · {timelinePlaybackControlsMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <PlaybackModelSection />
      <PlaybackCommandsSection />
      <RestartReverseSection />
      <StateReadoutSection />
      <BoundariesSection />
    </article>
  )
}
