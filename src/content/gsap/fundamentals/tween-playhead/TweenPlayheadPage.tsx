/** Tween playhead의 local·total·eased 값과 이동 경계를 여섯 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { tweenPlayheadMeta } from './tween-playhead.meta'
import { CallbacksBoundariesSection } from './sections/CallbacksBoundariesSection/CallbacksBoundariesSection'
import { InspectValuesSection } from './sections/InspectValuesSection/InspectValuesSection'
import { JumpPlayheadSection } from './sections/JumpPlayheadSection/JumpPlayheadSection'
import { LocalTotalSection } from './sections/LocalTotalSection/LocalTotalSection'
import { PlayheadMentalModelSection } from './sections/PlayheadMentalModelSection/PlayheadMentalModelSection'
import { RawEasedSection } from './sections/RawEasedSection/RawEasedSection'
import './TweenPlayheadPage.css'

export function TweenPlayheadPage() {
  return (
    <article className="tween-playhead-page">
      <header className="tween-playhead-page__header">
        <p className="tween-playhead-page__eyebrow">{tweenPlayheadMeta.category}</p>
        <h1>{tweenPlayheadMeta.title}</h1>
        <p className="tween-playhead-page__summary">{tweenPlayheadMeta.summary}</p>
        <div className="tween-playhead-page__official-links">{tweenPlayheadMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}</div>
        <div className="tween-playhead-page__path"><span>이 페이지의 코드 위치</span><code>{tweenPlayheadMeta.sourcePath}</code></div>
        <p className="tween-playhead-page__reviewed">공식 문서 대조일 · {tweenPlayheadMeta.reviewedAt}</p>
      </header>
      <PageCoverage />
      <PlayheadMentalModelSection />
      <RawEasedSection />
      <LocalTotalSection />
      <InspectValuesSection />
      <JumpPlayheadSection />
      <CallbacksBoundariesSection />
    </article>
  )
}
