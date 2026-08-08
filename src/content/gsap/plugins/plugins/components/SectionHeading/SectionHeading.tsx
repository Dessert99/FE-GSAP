/** 다섯 학습 단계의 번호·제목·질문을 일관된 heading으로 표시한다. */
type SectionHeadingProps = {
  number: string;
  id: string;
  title: string;
  description: string;
};

/** section의 시작점과 학습 질문을 함께 제공한다. */
export function SectionHeading({
  number,
  id,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="plugins-page__section-heading">
      <span>{number}</span>
      <div>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
