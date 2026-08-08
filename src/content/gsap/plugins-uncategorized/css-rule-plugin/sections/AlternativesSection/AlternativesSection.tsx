/** 공식 deprecation 안내를 CSS 변수·real element 선택 기준으로 정확히 보존한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function AlternativesSection() {
  const cssVariableCode = 'gsap.to("html", { "--my-variable": 100, duration: 2 })'
  return (
    <section id="alternatives" className="css-rule-plugin-page__section" aria-labelledby="alternatives-title">
      <SectionHeading number="05" id="alternatives" title="CSS 변수와 실제 element를 선택하는 기준" description="공식 문서는 CSSRulePlugin을 CSS variable 방식으로 deprecated 했습니다. 이 페이지는 legacy rule target을 읽되, 새 구현에서 무엇을 선택할지 같이 정합니다." />
      <div className="css-rule-plugin-page__warning"><strong>공식 warning:</strong> CSSRulePlugin은 excellent browser support를 갖춘 CSS variables 사용을 선호하는 방향으로 deprecated 되었습니다. GSAP은 CSS variable animation을 native 지원합니다.</div>
      <pre className="css-rule-plugin-page__code"><code>{cssVariableCode}</code></pre>
      <div className="css-rule-plugin-page__split"><div className="css-rule-plugin-page__prose"><h3>CSS variable을 선택할 때</h3><p>공유 값을 stylesheet에 남겨야 한다면 CSS variable을 선택합니다. 단, 공식 문서는 어느 property를 target하든 repaint가 발생하므로 sparingly 쓰고 performance에 주의하라고 경고합니다.</p></div><div className="css-rule-plugin-page__prose"><h3>실제 HTML element를 선택할 때</h3><p>pseudo element를 별도 real HTML element로 바꿀 수 있다면, 다른 DOM element처럼 직접 animate할 수 있습니다. 더 세밀한 객체별 제어가 필요할 때도 이 경계가 맞습니다.</p></div></div>
      <p className="css-rule-plugin-page__related">선행 학습: <a href={toHref('/fundamentals/plugins')}>Plugins 등록과 소유권</a> · CSS selector와 CSSPlugin은 core 학습 경계입니다.</p>
    </section>
  )
}
