/** 긴 페이지에서도 현재 학습 단계와 질문을 한눈에 찾게 한다. */
type SectionHeadingProps = {
  number: string
  id: string
  title: string
  description: string
}

/** 섹션 번호·제목·학습 질문을 같은 시각 구조로 렌더링한다. */
export function SectionHeading({ number, id, title, description }: SectionHeadingProps) {
  return (
    <div className="utility-distribute-page__section-heading">
      <span>{number}</span>
      <div>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}
