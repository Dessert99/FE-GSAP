/** 다섯 학습 단계가 같은 번호·제목·질문 구조를 유지하게 한다. */
type Props = { number: string; id: string; title: string; description: string }

export function SectionHeading({ number, id, title, description }: Props) {
  return <div className="css-rule-plugin-page__section-heading"><span>{number}</span><div><h2 id={`${id}-title`}>{title}</h2><p>{description}</p></div></div>
}
