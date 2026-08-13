/** 공식 목차와 현재 학습 섹션의 대응 관계를 본문 뒤에서 다시 찾게 한다. */
import { gsapToPageMeta, officialPageSections } from '../../gsap-to.meta'
import './PageCoverageSection.css'

export function PageCoverageSection() {
  return (
    <section id="official-coverage" className="page-coverage" aria-labelledby="official-coverage-title">
      <header className="page-coverage__header">
        <p className="page-coverage__eyebrow">Official document outline</p>
        <h2 id="official-coverage-title">공식 문서에서 다시 찾기</h2>
        <p><code>gsap.to()</code> 공식 문서의 목차를 이 페이지의 학습 순서에 연결했습니다. 마지막 대조일은 {gsapToPageMeta.reviewedAt}입니다.</p>
      </header>

      <nav className="page-coverage__outline" aria-label="공식 목차와 로컬 학습 섹션">
        <ol>
          {officialPageSections.map((section, index) => (
            <li key={`${section.title}-${section.anchor}`}>
              <a href={`#${section.anchor}`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{section.title}</strong><small>{section.localTitle}</small></a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  )
}
