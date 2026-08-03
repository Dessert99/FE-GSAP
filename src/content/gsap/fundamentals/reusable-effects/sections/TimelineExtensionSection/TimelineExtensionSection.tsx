/** Timeline extension의 삽입 position·parent 반환·callback context를 설명하고 실습한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { TimelineEffectExample } from '../../examples/TimelineEffectExample/TimelineEffectExample'

/** extendTimeline이 registry effect를 parent sequence method로 바꾸는 계약을 보여준다. */
export function TimelineExtensionSection() {
  return (
    <section className="reusable-effects-page__section" aria-labelledby="timeline-extension">
      <SectionHeading number="05" id="timeline-extension" title="Timeline method로 확장하면 무엇이 달라지나요?" description="extendTimeline을 켜면 같은 name의 method가 parent Timeline에 생기고, effect 반환 animation을 선택한 position에 넣습니다." />
      <div className="reusable-effects-page__signature"><code>tl.projectReveal(targets, vars?, position?) → parent Timeline</code><p>두 번째 인자가 object가 아니면 config 대신 position으로 읽고 defaults를 사용합니다. 반환값은 parent Timeline이므로 바로 다음 Tween을 chain할 수 있습니다.</p></div>
      <pre><code>{`tl.projectReveal('.card', '+=0.25')
  .to('.card', { scale: 1.08 })

// 내부 개념
tl.add(effectAnimation, '+=0.25')`}</code></pre>
      <p className="reusable-effects-page__warning"><strong>반환 경고:</strong> extension callback이 Tween이나 Timeline을 반환하지 않으면 parent가 <code>add()</code>할 animation이 없어 sequence에 삽입할 수 없습니다.</p>
      <TimelineEffectExample />
    </section>
  )
}
