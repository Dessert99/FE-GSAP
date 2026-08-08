/** Timeline defaults가 직접 child 생성 시점에 내려가고 중첩 경계에서는 멈추는 범위를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function DefaultsScopeSection() {
  return (
    <section id="defaults-scope" className="timeline-page__section" aria-labelledby="defaults-scope-title">
      <SectionHeading number="06" id="defaults-scope" title="defaults는 누구에게까지 내려가나" description="같은 duration·ease를 모든 child에 반복해 적는 대신 부모 Timeline의 defaults에서 직접 child에게 밀어 넣을 수 있습니다." />

      <div className="timeline-page__split">
        <article><h3>매번 반복</h3><pre className="timeline-page__code"><code>{`const timeline = gsap.timeline()
timeline.to('.class1', { rotation: -270, duration: 1, ease: 'elastic' })
  .to('.class2', { rotation: -360, duration: 1, ease: 'elastic' })
  .to('.class3', { rotation: -180, duration: 1, ease: 'elastic' })`}</code></pre></article>
        <article><h3>defaults 한 번</h3><pre className="timeline-page__code"><code>{`const timeline = gsap.timeline({
  defaults: { duration: 1, ease: 'elastic' },
})
timeline.to('.class1', { rotation: -270 })
  .to('.class2', { rotation: -360 })
  .to('.class3', { rotation: -180 })`}</code></pre></article>
      </div>

      <div className="timeline-page__prose">
        <p>공식 문서는 defaults가 일부 허용 property에만 제한되지 않고 직접 child Tween에 모두 들어간다고 설명합니다. child가 같은 property를 직접 선언하면 상속값을 쉽게 덮어씁니다.</p>
      </div>

      <div className="timeline-page__warning">
        <h3>set과 중첩 Timeline에서 경계를 확인했습니다</h3>
        <p>defaults의 ease와 사용자 정의 key는 <code>set()</code> child vars에도 들어갔지만 set duration은 defaults가 0.25·1·3이어도 항상 0이었습니다. 부모 defaults는 직접 child인 중첩 Timeline 자체까지만 닿고 그 안의 손자 Tween에는 내려가지 않았습니다. 중첩 Timeline이 자기 defaults를 선언하면 그 값은 손자에게 적용됐습니다.</p>
      </div>
    </section>
  )
}
