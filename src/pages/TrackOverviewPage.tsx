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
