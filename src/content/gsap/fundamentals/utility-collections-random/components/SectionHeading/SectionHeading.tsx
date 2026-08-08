/** 학습 섹션의 번호·질문·설명을 같은 밀도로 보여주는 페이지 전용 heading이다. */
import type { ReactNode } from 'react'

/** 섹션 본문이 source 순서와 학습 질문을 함께 드러내게 한다. */
export function SectionHeading({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <div className="utility-collections-page__section-heading"><span>{number}</span><div><h2>{title}</h2><p>{children}</p></div></div>
}
