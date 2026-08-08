/** DrawSVG 학습 단계의 번호·anchor·초보자 질문을 같은 heading으로 묶는다. */
type Props = { number: string; id: string; title: string; description: string }

/** 섹션 identity를 heading과 설명에 같은 방식으로 연결한다. */
export function SectionHeading({ number, id, title, description }: Props) {
  return (
    <header className="draw-svg-page__section-heading">
      <span>{number}</span>
      <div>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{description}</p>
      </div>
    </header>
  )
}
