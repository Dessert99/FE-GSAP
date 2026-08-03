/** set의 즉시 적용과 quickSetter의 고빈도 경계를 분리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** 한 번의 상태 설정에 set을 쓰고 반복 입력에는 다음 owner를 찾게 한다. */
export function SetSection() {
  return (
    <section id="set" className="tween-values-page__section" aria-labelledby="set-title">
      <SectionHeading
        number="04"
        id="set"
        title="시간 없이 상태만 바꾸기"
        description="set은 duration이 0인 Tween처럼 vars를 즉시 적용하고 Tween을 반환합니다. 초기화나 단계 전환에 적합합니다."
      />
      <div className="tween-values-page__card-grid">
        <article className="tween-values-page__card">
          <h3>하나의 selector</h3>
          <pre><code>{`gsap.set('.card', { x: 40, opacity: 1 })`}</code></pre>
          <p>selector가 찾은 대상이 여러 개여도 같은 값을 한 번에 적용합니다.</p>
        </article>
        <article className="tween-values-page__card">
          <h3>target array</h3>
          <pre><code>{`gsap.set([cardA, cardB], { visibility: 'visible' })`}</code></pre>
          <p>DOM 참조 배열도 target이 됩니다. 반환 Tween을 보존하면 다른 animation과 같은 방식으로 참조할 수 있습니다.</p>
        </article>
      </div>
      <p className="tween-values-page__note"><strong>성능 경계:</strong> pointermove처럼 같은 property를 매우 자주 갱신하는 경우는 <code>set()</code>을 계속 만들지 않고 <code>quickSetter()</code> 전용 페이지에서 이어서 다룹니다.</p>
    </section>
  )
}
