/** P04의 번호·anchor·초보자 질문을 일관된 heading으로 묶는다. */
type Props = { number: string; id: string; title: string; description: string }

/** section identity를 제목과 설명에 같은 방식으로 연결한다. */
export function SectionHeading({ number, id, title, description }: Props) {
  return (
    <header className="draggable-coordinates-page__section-heading">
      <span>{number}</span>
      <div>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{description}</p>
      </div>
    </header>
  )
}
