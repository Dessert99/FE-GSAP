/** camelCase·복합값·단위·CSS variable을 보간 조건과 함께 설명한다. */
import { CssValueParsingExample } from '../../examples/CssValueParsingExample/CssValueParsingExample'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function CssValuesSection() {
  return (
    <section id="css-values" className="css-animation-page__section" aria-labelledby="css-values-title">
      <SectionHeading number="02" id="css-values" title="CSS 값을 보간 가능한 형태로 쓰기" description="camelCase는 property를 찾는 규칙이고, 단위와 문자열 조각은 시작값에서 목표값까지 유효한 중간 CSS를 만드는 재료입니다." />
      <div className="css-animation-page__grid">
        <article className="css-animation-page__card">
          <h3>이름은 camelCase</h3>
          <p><code>font-size</code>는 <code>fontSize</code>, <code>background-color</code>는 <code>backgroundColor</code>로 적습니다. CSS custom property만 <code>'--brand-hue'</code>처럼 원래 이름을 유지합니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>숫자·색·문자열을 조각으로 읽기</h3>
          <p><code>boxShadow</code>, <code>borderRadius</code>, <code>border</code>처럼 여러 숫자와 색이 섞인 문자열도 대응하는 조각끼리 보간합니다. 필요한 vendor prefix는 CSSPlugin이 탐지합니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>기본 단위와 명시 단위</h3>
          <p><code>x:24</code>는 px, <code>rotation:360</code>은 deg가 기본입니다. <code>'20vw'</code>나 <code>'1.25rad'</code>처럼 다른 단위는 문자열로 씁니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>단위가 달라도 변환</h3>
          <p>현재 width가 <code>50%</code>이고 목표가 <code>200px</code>여도 GSAP이 필요한 단위 변환을 수행합니다. <code>height:'auto'</code>처럼 계산된 크기도 다룰 수 있습니다.</p>
        </article>
      </div>
      <div className="css-animation-page__example-stack"><CssValueParsingExample /></div>
    </section>
  )
}
