/** gsap.to()의 기본 도착값 동작과 반환 Tween 제어를 먼저 소개한다. */
import { DestinationValuesExample } from '../../examples/DestinationValuesExample/DestinationValuesExample'
import { TweenControlsExample } from '../../examples/TweenControlsExample/TweenControlsExample'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function OverviewSection() {
  return (
    <section id="overview" className="gsap-method-page__section" aria-labelledby="overview-title">
      <SectionHeading number="01" id="overview-title" title="개요 · Returns: Tween" description="현재값을 자동으로 읽어 목표값까지 움직이고, 필요하면 반환된 Tween의 시간축을 직접 제어합니다." />
      <div className="gsap-method-page__example-stack"><DestinationValuesExample /><TweenControlsExample /></div>
      <div className="gsap-method-page__note"><p><strong>to · from · fromTo의 차이</strong> <code>to()</code>는 목표값, <code>from()</code>은 시작값, <code>fromTo()</code>는 시작값과 목표값을 모두 적습니다. Tween은 기본적으로 즉시 재생되고 완료 후 내부적으로 정리됩니다.</p></div>
    </section>
  )
}
