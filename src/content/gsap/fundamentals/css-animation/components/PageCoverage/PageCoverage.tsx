/** 52개 공식 source item을 compact reference evidence로 모두 렌더링한다. */
import { cssAnimationCoverage, cssAnimationSections } from '../../css-animation.meta'
import { cssAnimationReference } from '../../css-animation.reference'

export function PageCoverage() {
  return (
    <nav className="css-animation-coverage" aria-label="CSS 공식 source 대응 범위">
      <div className="css-animation-coverage__summary">
        <div><strong>{cssAnimationCoverage.officialSources}/1</strong><span>공식 source</span></div>
        <div><strong>{cssAnimationReference.length}/{cssAnimationCoverage.sourceItems}</strong><span>기술 item</span></div>
        <p>전체 CSS property 목록을 만들지 않고, 42개 기술 주장과 10개 공식 예제를 여섯 질문에 연결했습니다.</p>
      </div>
      <div className="css-animation-coverage__groups">
        {cssAnimationSections.map((section) => {
          // 각 heading 아래에는 해당 section이 소유한 stable ID만 모은다.
          const items = cssAnimationReference.filter(({ sectionId }) => sectionId === section.id)

          return (
            <section key={section.id} aria-labelledby={`coverage-${section.id}`}>
              <h2 id={`coverage-${section.id}`}><a href={`#${section.id}`}>{section.number} · {section.title}</a></h2>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.sectionId}`}>
                      <code>{item.id}</code>
                      <span><strong>{item.title}</strong>{item.summary}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </nav>
  )
}
