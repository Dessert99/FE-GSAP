/** utility 결과를 Tween target·string form·function value와 혼동하지 않게 경계를 설명한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** collection utility가 Tween 생성 API가 아니라는 경계를 고정한다. */
export function TweenBoundarySection() {
  return (
    <section className="utility-collections-page__section" id="tween-boundary">
      <SectionHeading number="04" title="Tween에는 배열·문자열·함수를 어느 경계로 넘길까">
        이 페이지의 utility는 target 후보와 choice rule을 준비합니다. Tween을 생성하고 각 target의 vars를 해석하는 계약은 <a href={toHref('/fundamentals/gsap-to')}>gsap.to()</a> 페이지에 남겨 둡니다.
      </SectionHeading>
      <div className="utility-collections-page__split"><div className="utility-collections-page__prose"><h3>target 후보는 먼저 Array로</h3><pre className="utility-collections-page__code"><code>{`const targets = gsap.utils.toArray('.card', scope)\ngsap.to(targets, { x: 120 })`}</code></pre><p><code>toArray()</code>는 후보의 모양을 맞출 뿐 animation을 시작하지 않습니다. 그 Array를 <code>gsap.to()</code>에 넘기는 순간 Tween 계약이 시작됩니다.</p></div><div className="utility-collections-page__prose"><h3>공식 string form은 Tween vars 안의 별도 문법입니다</h3><pre className="utility-collections-page__code"><code>{`gsap.to('.class', {\n  x: 'random([0, 100, 200, 500])',\n})\n\ngsap.to('.class', {\n  x: 'random(-100, 100, 5)',\n})`}</code></pre><p>공식 <code>random()</code> 문서는 vars 안의 string form도 제공합니다. 반대로 <code>const pick = random(..., true)</code>처럼 받은 function을 언제 호출할지는 application 코드와 function-value contract의 경계입니다.</p></div></div>
    </section>
  )
}
