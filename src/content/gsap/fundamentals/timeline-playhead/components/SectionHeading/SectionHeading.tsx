/** Timeline playhead의 번호·anchor·초보자 질문을 한 heading으로 묶는다. */
type Props = { number: string; id: string; title: string; description: string }

/** 섹션 identity를 heading과 설명에 동일하게 연결한다. */
export function SectionHeading({ number, id, title, description }: Props) {
  return <header className="timeline-playhead-page__section-heading"><span>{number}</span><div><h2 id={`${id}-title`}>{title}</h2><p>{description}</p></div></header>
}
