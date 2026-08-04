/** 여섯 학습 단계의 번호·제목·질문을 같은 heading 구조로 표시한다. */
type Props = {
  number: string
  id: string
  title: string
  description: string
}

export function SectionHeading({ number, id, title, description }: Props) {
  return (
    <div className="find-stop-page__section-heading">
      <span>{number}</span>
      <div>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}
