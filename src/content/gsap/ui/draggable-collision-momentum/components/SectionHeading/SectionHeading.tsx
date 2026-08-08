/** P08의 단계 번호와 초보자 질문을 일관된 heading 구조로 표시한다. */
type Props = { number: string; id: string; title: string; description: string }

export function SectionHeading({ number, id, title, description }: Props) {
  return (
    <div className="draggable-collision-momentum-page__heading">
      <span>{number}</span>
      <div>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}
