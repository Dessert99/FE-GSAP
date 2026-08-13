/** stroke 표시 범위와 측정을 익히는 다섯 학습 단계를 안내한다. */
import { drawSvgSections } from '../../draw-svg.meta'

/** dash 원리부터 렌더링 경계까지 학습 순서를 보여 준다. */
export function PageCoverage() {
  return (
    <aside
      className="draw-svg-page__coverage"
      aria-labelledby="draw-svg-coverage-title"
    >
      <div>
        <p>학습 순서</p>
        <h2 id="draw-svg-coverage-title">SVG stroke를 부분적으로 보이기</h2>
        <span>값 문법, 길이·현재 위치, 렌더링 경계를 차례로 확인합니다.</span>
      </div>
      <ol>
        {drawSvgSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              {section.number} · {section.title}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  )
}
