/** gsap.effects registry의 named direct call과 default override 규칙을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** 공식 fade recipe를 가장 짧은 direct 호출과 override로 읽게 한다. */
export function DirectCallSection() {
  return (
    <section className="reusable-effects-page__section" aria-labelledby="direct-call">
      <SectionHeading number="03" id="direct-call" title="registry에서 effect를 어떻게 호출하나요?" description="등록 name을 gsap.effects의 key로 읽고, 첫 인자에 targets, 둘째 인자에 이번 호출만 바꿀 config를 전달합니다." />
      <div className="reusable-effects-page__code-grid">
        <article><h3>default 사용</h3><pre><code>{`gsap.effects.projectFadeIn('.card')
// callback config.duration → 2`}</code></pre></article>
        <article><h3>호출값으로 override</h3><pre><code>{`gsap.effects.projectFadeIn('.card', {
  duration: 0.8
})
// callback config.duration → 0.8`}</code></pre></article>
      </div>
      <p><code>gsap.effects</code>는 등록된 effect를 보관하는 object입니다. selector, Element, group 중 무엇을 넘겨도 callback 전에 array로 정규화되므로 recipe는 같은 target 처리 방식을 유지할 수 있습니다.</p>
    </section>
  )
}
