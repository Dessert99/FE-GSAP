/** P16 section의 순서와 학습 질문을 일관되게 보인다. */
export function SectionHeading({
  number,
  title,
}: {
  number: string
  title: string
}) {
  return (
    <h2>
      {number} · {title}
    </h2>
  )
}
