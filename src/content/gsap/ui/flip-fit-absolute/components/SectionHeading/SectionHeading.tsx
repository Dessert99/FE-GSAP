/** Flip fit/absolute section의 번호와 질문을 한 heading으로 묶는다. */
type Props = { number: string; id: string; title: string; description: string }
export function SectionHeading({ number, id, title, description }: Props) {
  return (
    <header className="flip-fit-absolute-page__heading">
      <span>{number}</span>
      <div>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{description}</p>
      </div>
    </header>
  )
}
