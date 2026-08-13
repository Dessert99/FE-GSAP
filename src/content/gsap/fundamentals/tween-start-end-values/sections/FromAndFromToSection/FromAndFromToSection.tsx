/** from과 fromTo의 시그니처·target·vars 배치 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** 현재값 의존 여부와 special property 위치를 시그니처 옆에서 비교한다. */
export function FromAndFromToSection() {
  return (
    <section id="from-and-from-to" className="tween-values-page__section" aria-labelledby="from-and-from-to-title">
      <SectionHeading
        number="03"
        id="from-and-from-to"
        title="from과 fromTo의 인자 읽기"
        description="두 method 모두 Tween을 반환하고 기본으로 즉시 재생하지만, 끝값을 현재 상태에서 읽는지 직접 쓰는지가 다릅니다."
      />
      <div className="tween-values-page__card-grid">
        <article className="tween-values-page__card">
          <p className="tween-values-page__kicker">CURRENT END</p>
          <h3><code>gsap.from(targets, vars)</code></h3>
          <p><code>vars</code>가 시작 상태입니다. selector, element, 일반 object, object array를 대상으로 받고 만들어진 <code>Tween</code>을 반환합니다.</p>
          <pre><code>{`const tween = gsap.from('.card', {
  y: 40,
  opacity: 0,
  duration: 0.8
})`}</code></pre>
        </article>
        <article className="tween-values-page__card">
          <p className="tween-values-page__kicker">EXPLICIT END</p>
          <h3><code>gsap.fromTo(targets, fromVars, toVars)</code></h3>
          <p>양 끝을 모두 적습니다. <code>duration</code>, <code>ease</code>, callback 같은 special property는 실행을 소유하는 <code>toVars</code>에 둡니다.</p>
          <pre><code>{`const tween = gsap.fromTo('.card',
  { y: 40, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8 }
)`}</code></pre>
        </article>
      </div>
      <p className="tween-values-page__note">
        <strong>반환 Tween:</strong> 변수에 담으면 <code>pause()</code>, <code>seek()</code>, <code>progress()</code>, <code>play()</code>로
        나중에 제어할 수 있습니다. 저장하지 않아도 기본으로 바로 재생하지만 <code>delay</code>나 <code>paused</code>를 설정하면 시작 시점이
        달라지고, 완료된 Tween은 GSAP의 활성 처리에서 정리됩니다.
      </p>
      <p className="tween-values-page__note"><strong>사용하지 않을 형태:</strong> 예전의 positional <code>duration</code> overload는 deprecated입니다. 초 단위 시간은 항상 <code>vars.duration</code>에 둡니다.</p>
    </section>
  )
}
