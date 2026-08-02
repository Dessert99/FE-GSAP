/** 시간·방향·반복·충돌 속성을 실제 사용 조합의 예제로 묶는다. */
import { OverwriteExample } from '../../examples/OverwriteExample/OverwriteExample'
import { PlaybackOptionsExample } from '../../examples/PlaybackOptionsExample/PlaybackOptionsExample'
import { RepeatRefreshExample } from '../../examples/RepeatRefreshExample/RepeatRefreshExample'
import { RepeatYoyoExample } from '../../examples/RepeatYoyoExample/RepeatYoyoExample'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function PropertyExamplesSection() {
  return (
    <section className="gsap-method-page__section gsap-method-page__subsection" aria-labelledby="playback-cluster-title">
      <SectionHeading number="03-A" id="playback-cluster-title" title="시간 · 방향 속성 조합" description="참조표에서 따로 본 속성을 한 Tween의 시작 상태와 playhead 방향으로 연결합니다." />
      <div className="gsap-method-page__example-stack"><PlaybackOptionsExample /><RepeatYoyoExample /><RepeatRefreshExample /><OverwriteExample /></div>
    </section>
  )
}
