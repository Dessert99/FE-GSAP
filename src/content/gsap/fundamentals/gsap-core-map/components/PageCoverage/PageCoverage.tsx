/** GSAP Core의 역할을 이해하는 여섯 학습 질문을 첫 화면에서 안내한다. */
import { gsapCoreMapSections } from '../../gsap-core-map.meta'

export function PageCoverage() {
  return (
    <nav className="core-map-coverage" aria-label="이 페이지에서 다루는 공식 문서 내용">
      <div className="core-map-coverage__summary">
        <div><strong>학습 순서</strong><span>GSAP Core 지도</span></div>
        <p>GSAP의 진입점부터 Tween·Timeline·plugin과 다음 학습까지 여섯 질문으로 살펴봅니다.</p>
      </div>
      <ol>
        {gsapCoreMapSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div><strong>{section.title}</strong></div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
