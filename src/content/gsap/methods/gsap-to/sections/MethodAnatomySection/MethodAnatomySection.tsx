/** targets·vars·반환 Tween이 호출문에서 차지하는 위치를 시각화한다. */
import './MethodAnatomySection.css'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function MethodAnatomySection() {
  return (
    <section id="parameters" className="gsap-method-page__section" aria-labelledby="method-anatomy-title">
      <SectionHeading number="02" id="method-anatomy-title" title="Parameters: targets와 vars" description="공식 시그니처 gsap.to(targets, vars)의 두 인자와 반환값을 실제 호출 위치에 연결합니다." />

      <div className="method-anatomy">
        <div className="method-anatomy__code" aria-label="gsap.to 호출 구조">
          <pre>
            <code>
              <span className="method-anatomy__return">const tween</span>
              {' = '}
              <span className="method-anatomy__method">gsap.to</span>
              {'('}
              <span className="method-anatomy__targets">'.box'</span>
              {', '}
              <span className="method-anatomy__vars">{'{ x: 100 }'}</span>
              {')'}
            </code>
          </pre>
        </div>

        <div className="method-anatomy__items">
          <article className="method-anatomy__item method-anatomy__item--targets">
            <span className="method-anatomy__number">1</span>
            <div>
              <code>targets → '.box'</code>
              <h3>무엇을 움직일지</h3>
              <p>
                선택자 문자열은 내부적으로 <code>document.querySelectorAll()</code>처럼 요소를 찾습니다. DOM 요소, 일반 JavaScript 객체, 여러 대상의 배열도 직접 전달할 수 있습니다.
              </p>
            </div>
          </article>
          <article className="method-anatomy__item method-anatomy__item--vars">
            <span className="method-anatomy__number">2</span>
            <div>
              <code>vars → {'{ x: 100 }'}</code>
              <h3>어디까지, 어떻게 움직일지</h3>
              <p>
                중괄호 안에는 목표 속성값과 <code>duration</code>, <code>ease</code>, <code>repeat</code> 같은 실행 조건이 들어갑니다.
              </p>
            </div>
          </article>
          <article className="method-anatomy__item method-anatomy__item--return">
            <span className="method-anatomy__number">3</span>
            <div>
              <code>return → tween</code>
              <h3>만들어진 애니메이션</h3>
              <p>
                <code>gsap.to()</code>가 반환한 Tween을 변수에 저장하면 나중에 <code>pause()</code>, <code>play()</code>, <code>reverse()</code>로 제어할 수 있습니다.
              </p>
            </div>
          </article>
        </div>

        <div className="method-anatomy__object-example">
          <div><strong>DOM만 target이 아닙니다</strong><p>숫자 속성이 있는 일반 객체도 같은 방식으로 보간할 수 있습니다.</p></div>
          <pre><code>{`const score = { value: 0 }

gsap.to(score, {
  value: 100,
  onUpdate: () => console.log(score.value)
})`}</code></pre>
        </div>
      </div>
    </section>
  )
}
