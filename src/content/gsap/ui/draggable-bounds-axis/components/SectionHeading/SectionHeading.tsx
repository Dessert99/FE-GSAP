/** 다섯 공간 제약 섹션의 번호·질문을 같은 heading 구조로 표시한다. */
type Props = { number: string; id: string; title: string; description: string }

export function SectionHeading({ number, id, title, description }: Props) {
  return <div className="draggable-bounds-axis-page__heading"><span>{number}</span><div><h2 id={`${id}-title`}>{title}</h2><p>{description}</p></div></div>
}
