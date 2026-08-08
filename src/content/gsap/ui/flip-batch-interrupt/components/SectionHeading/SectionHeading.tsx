/** P13 section heading의 번호와 설명을 재사용한다. */
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
