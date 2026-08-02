/** 아직 레슨이 없는 트랙에서도 학습 범위를 빈 화면 대신 안내한다. */
type Props = {
  label: string
  description: string
}

export function TrackOverviewPage({ label, description }: Props) {
  return (
    <article className="track-overview">
      <p className="track-overview__eyebrow">GSAP STUDY TRACK</p>
      <h1>{label}</h1>
      <p>{description}</p>
    </article>
  )
}
