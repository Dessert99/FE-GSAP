/** 같은 Tween을 조작하는 여덟 메서드를 학습자 의도별 여섯 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { PlaybackModelSection } from './sections/PlaybackModelSection/PlaybackModelSection'
import { RestartSection } from './sections/RestartSection/RestartSection'
import { ReverseDirectionSection } from './sections/ReverseDirectionSection/ReverseDirectionSection'
import { StateGetterSection } from './sections/StateGetterSection/StateGetterSection'
import { StopAndGoSection } from './sections/StopAndGoSection/StopAndGoSection'
import { tweenPlaybackControlsMeta } from './tween-playback-controls.meta'
import './TweenPlaybackControlsPage.css'

export function TweenPlaybackControlsPage() {
  return (
    <article className="playback-page">
      <header className="playback-page__header">
        <p className="playback-page__eyebrow">{tweenPlaybackControlsMeta.category}</p>
        <h1>{tweenPlaybackControlsMeta.title}</h1>
        <p className="playback-page__summary">{tweenPlaybackControlsMeta.summary}</p>
        <div className="playback-page__official-links">
          {tweenPlaybackControlsMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="playback-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{tweenPlaybackControlsMeta.sourcePath}</code>
        </div>
        <p className="playback-page__reviewed">공식 문서 대조일 · {tweenPlaybackControlsMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <PlaybackModelSection />
      <StopAndGoSection />
      <RestartSection />
      <ReverseDirectionSection />
      <StateGetterSection />
      <BoundariesSection />
    </article>
  )
}
