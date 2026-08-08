/** P07 section의 번호·anchor·학습 질문을 같은 heading 형식으로 묶는다. */
type Props = { number: string; id: string; title: string; description: string }

/** heading identity와 설명을 한 곳에서 연결한다. */
export function SectionHeading({ number, id, title, description }: Props) {
  return (
    <header className="draggable-events-page__section-heading">
      <span>{number}</span>
      <div>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{description}</p>
      </div>
    </header>
  )
}
