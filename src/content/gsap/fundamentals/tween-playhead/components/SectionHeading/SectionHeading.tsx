/** Tween playhead 페이지의 학습 순서와 heading anchor를 연결한다. */
type Props = { number: string; id: string; title: string; description: string }

/** 섹션 번호·제목·설명을 한 단위로 전달한다. */
export function SectionHeading({ number, id, title, description }: Props) {
  return <header className="tween-playhead-page__section-heading"><p>{number}</p><div><h2 id={id}>{title}</h2><p>{description}</p></div></header>
}
