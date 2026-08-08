/** getUnit의 읽기와 unitize의 제거·계산·재부착을 한 CSS 값 경계로 묶는다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { UnitLab } from '../../examples/UnitLab/UnitLab'

export function UnitSection() {
  return (
    <section className="pipeline-units-page__section" id="units" aria-labelledby="units-title">
      <SectionHeading
        number="02"
        id="units"
        title="계산할 때 떼고 CSS로 보낼 때 붙인다"
        description="CSS 값은 숫자와 단위가 붙은 문자열이지만 clamp·wrap·mapRange는 숫자를 계산합니다. getUnit은 경계를 관찰하고 unitize는 그 경계를 자동으로 왕복시킵니다."
      />

      <div className="pipeline-units-page__unit-model" aria-label="단위 처리 순서">
        <div><span>입력 문자열</span><code>"150px"</code></div>
        <div><span>parseFloat 뒤</span><code>150</code></div>
        <div><span>wrap 결과</span><code>50</code></div>
        <div><span>단위 재부착</span><code>"50px"</code></div>
      </div>

      <UnitLab />

      <div className="pipeline-units-page__reference-grid">
        <article>
          <h3><code>getUnit(value)</code></h3>
          <p>숫자가 먼저, 단위가 뒤에 오는 String을 받으며 String을 돌려줍니다.</p>
          <pre><code>{`gsap.utils.getUnit("50%")  // "%"\ngsap.utils.getUnit("100vw") // "vw"`}</code></pre>
        </article>
        <article>
          <h3>단위 강제</h3>
          <p>둘째 인자에 <code>"px"</code>를 주면 입력이 %여도 결과는 px입니다.</p>
          <pre><code>{`const clamp = unitize(clamp(0, 100), "px")\nclamp(132)    // "100px"\nclamp("-20%") // "0px"\nclamp(50)     // "50px"`}</code></pre>
        </article>
        <article>
          <h3>입력 단위 보존</h3>
          <p>unit 인자를 생략하면 입력에서 읽은 단위를 최종 결과에 다시 붙입니다.</p>
          <pre><code>{`const wrap = unitize(wrap(0, 100))\nwrap("150px") // "50px"\nwrap("130%")  // "30%"`}</code></pre>
        </article>
        <article>
          <h3>다른 단위로 바꾸기</h3>
          <p>공식 mapRange 예제는 어떤 입력 단위가 와도 %를 붙입니다.</p>
          <pre><code>{`const map = unitize(mapRange(-10, 10, 0, 100), "%")\nmap(0)     // "50%"\nmap("5px") // "75%"`}</code></pre>
        </article>
      </div>

      <aside className="pipeline-units-page__note">
        <h3>modifier와의 경계</h3>
        <p>공식 문서는 <code>modifiers.x</code>가 받은 단위 포함 값을 unitize로 숫자화하고, <code>wrap(0, window.innerWidth)</code> 뒤 px를 붙이는 예제를 싣습니다. modifier가 <em>언제</em> 호출되는지는 page 40이 소유하고, 여기서는 단위를 안전하게 왕복시키는 함수 계약만 소유합니다.</p>
      </aside>
    </section>
  )
}
