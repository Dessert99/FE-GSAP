/** CSSPlugin 공식 문서의 핵심 주제를 여섯 학습 섹션으로 바로 찾게 한다. */
import { cssAnimationSections } from '../../css-animation.meta'

export function PageCoverage() {
  return (
    <nav className="css-animation-coverage" aria-label="CSSPlugin 학습 목차">
      <div className="css-animation-coverage__summary">
        <strong>어디서부터 읽을까요?</strong>
        <p>CSSPlugin 공식 문서의 핵심 내용을 여섯 질문으로 나누었습니다. 궁금한 주제로 바로 이동하세요.</p>
      </div>
      <div className="css-animation-coverage__groups">
        {cssAnimationSections.map((section) => (
          <section key={section.id} aria-labelledby={`outline-${section.id}`}>
            <h2 id={`outline-${section.id}`}><a href={`#${section.id}`}>{section.number} · {section.title}</a></h2>
          </section>
        ))}
      </div>
    </nav>
  )
}
