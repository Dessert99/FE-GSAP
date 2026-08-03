/** Easing 페이지의 학습 순서와 제목을 일관되게 연결한다. */
type Props = {
  number: string
  id: string
  title: string
  description: string
}

/** 섹션 번호와 설명을 heading anchor에 묶어 목차 없이도 흐름을 읽게 한다. */
export function SectionHeading({ number, id, title, description }: Props) {
  return (
    <header className="easing-page__section-heading">
      <p>{number}</p>
      <div><h2 id={id}>{title}</h2><p>{description}</p></div>
    </header>
  )
}
