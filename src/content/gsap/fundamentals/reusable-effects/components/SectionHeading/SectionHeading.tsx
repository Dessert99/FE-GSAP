/** reusable effects의 여섯 학습 단계를 번호·anchor·질문으로 연결한다. */
type Props = { number: string; id: string; title: string; description: string }

/** section 번호와 처음 읽을 질문을 같은 heading 구조로 표시한다. */
export function SectionHeading({ number, id, title, description }: Props) {
  return <header className="reusable-effects-page__section-heading"><p>{number}</p><div><h2 id={id}>{title}</h2><p>{description}</p></div></header>
}
