/** effect 등록부터 Timeline 확장까지 이어지는 여섯 학습 단계의 바로가기를 제공한다. */
import { reusableEffectsSections } from '../../reusable-effects.meta'

/** 현재 페이지의 학습 순서를 짧은 링크 목록으로 표시한다. */
export function PageCoverage() {
  return (
    <nav className="reusable-effects-page__coverage" aria-labelledby="reusable-effects-coverage-title">
      <div><p>학습 순서</p><h2 id="reusable-effects-coverage-title">{reusableEffectsSections.length}단계</h2></div>
      <ul>{reusableEffectsSections.map((section) => <li key={section.id}><a href={`#${section.id}`}><strong>{section.number} · {section.title}</strong><span>이 단계로 이동</span></a></li>)}</ul>
    </nav>
  )
}
