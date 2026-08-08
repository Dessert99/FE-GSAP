/** ScrollTrigger가 연결됐을 때만 생기는 optional driver property의 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function ScrollTriggerSection() {
  return (
    <section id="scroll-trigger" className="inspect-page__section" aria-labelledby="scroll-trigger-title">
      <SectionHeading number="06" id="scroll-trigger" title="밖에서 붙은 driver가 남긴 자리" description="scrollTrigger는 Timeline child를 찾는 값이 아니라, 이 Timeline의 재생을 scroll에 연결한 외부 driver instance에 접근하는 선택적 property다." />
      <pre className="inspect-page__signature"><code>scrollTrigger: ScrollTrigger | undefined</code></pre>
      <div className="inspect-page__split">
        <pre className="inspect-page__code"><code>{`const tl = gsap.timeline({
  scrollTrigger: { start: 'top center' },
})

tl.scrollTrigger.refresh()
tl.scrollTrigger.kill()`}</code></pre>
        <div className="inspect-page__warning"><strong>연결된 Timeline에만 property가 추가됩니다.</strong><p>공식 warning 그대로 ScrollTrigger가 없으면 단순히 값이 undefined인 자리가 아니라 <code>'scrollTrigger' in timeline</code> 자체가 false였습니다. 항상 자리는 있고 값이 undefined일 수 있는 <code>data</code>와 다릅니다.</p></div>
      </div>
      <p className="inspect-page__boundary-note">ScrollTrigger의 생성·refresh·kill lifecycle은 plugin 학습 범위입니다. 여기서는 “연결된 driver를 어디서 읽는가”까지만 다룹니다.</p>
    </section>
  )
}
