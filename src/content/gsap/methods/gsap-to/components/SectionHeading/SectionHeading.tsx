/** 긴 학습 페이지의 섹션 번호와 제목 형식을 일정하게 유지한다. */
type Props = {
  number: string
  id: string
  title: string
  description: string
}

export function SectionHeading({ number, id, title, description }: Props) {
  return (
    <div className="gsap-method-page__section-heading">
      <span>{number}</span>
      <div><h2 id={id}>{title}</h2><p>{description}</p></div>
    </div>
  )
}
