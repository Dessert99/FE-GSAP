/** 각 학습 section의 번호와 한 문장 질문을 같은 형식으로 표시한다. */
type SectionHeadingProps = { number: string; title: string; question: string }

export function SectionHeading({
  number,
  title,
  question,
}: SectionHeadingProps) {
  return (
    <header>
      <p>{number}</p>
      <h2>{title}</h2>
      <p>{question}</p>
    </header>
  )
}
