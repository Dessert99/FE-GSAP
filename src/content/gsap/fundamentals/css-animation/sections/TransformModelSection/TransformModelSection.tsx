/** transform alias의 고정 합성 순서와 공식 Quick reference 20행을 보존한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { cssQuickReference } from '../../css-animation.reference'
import { TransformOrderExample } from '../../examples/TransformOrderExample/TransformOrderExample'

export function TransformModelSection() {
  return (
    <section id="transform-model" className="css-animation-page__section" aria-labelledby="transform-model-title">
      <SectionHeading number="03" id="transform-model" title="transform alias와 고정 순서 읽기" description="x·scale·rotation을 별도 값으로 주면 CSSPlugin이 cache하고 일관된 순서로 합칩니다. object key 순서와 화면의 transform 순서를 분리해 보세요." />
      <div className="css-animation-page__grid">
        <article className="css-animation-page__card">
          <h3>alias가 직접 다루는 한 값</h3>
          <p><code>x:50</code>은 translateX 하나를 직접 갱신합니다. 임의 transform string은 브라우저가 만든 <code>matrix()</code>나 <code>matrix3d()</code>를 다시 읽고 분해해야 합니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>고정된 operation 순서</h3>
          <p><strong>translation → scale → rotationX → rotationY → skew → rotationZ</strong>입니다. 드문 비표준 순서가 꼭 필요한 경우에만 transform string을 고려합니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>percent와 px를 함께 쓰기</h3>
          <p><code>xPercent/yPercent</code>는 percent 이동, <code>x/y</code>는 보통 px 이동입니다. 둘을 함께 쓸 수 있고 percent 이동은 SVG에도 적용됩니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>cache와 다시 parse하기</h3>
          <p>개별 transform을 Tween해도 cache가 나머지 값을 보존합니다. 외부 CSS가 transform을 바꿨다면 <code>parseTransform:true</code>로 다시 읽고, 끝에서 제거하려면 <code>clearProps:'transform'</code>을 씁니다.</p>
        </article>
      </div>
      <div className="css-animation-page__example-stack"><TransformOrderExample /></div>
      <article className="css-animation-page__table-card">
        <h3>공식 Quick reference · 20행</h3>
        <p>전체 CSS property catalog가 아니라 공식 문서가 제공하는 transform shorthand와 공통 timing 대응만 그대로 보존합니다.</p>
        <div className="css-animation-page__table-wrap">
          <table>
            <thead><tr><th scope="col">GSAP vars</th><th scope="col">설명 또는 CSS 대응</th></tr></thead>
            <tbody>
              {cssQuickReference.map(([gsapValue, cssValue]) => (
                <tr key={gsapValue}><th scope="row"><code>{gsapValue}</code></th><td>{cssValue}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
      <div className="css-animation-page__note"><strong>추가 경계</strong> <code>scale</code>은 scaleX/Y shortcut이고 <code>rotation:'+=30'</code> 같은 상대값도 가능합니다. transform의 antialias와 최종 렌더링 품질은 브라우저가 결정합니다.</div>
    </section>
  )
}
