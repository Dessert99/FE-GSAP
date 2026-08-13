/** raw 시간 위치와 ease가 바꾼 적용 비율을 공식 power2.out 예제로 비교한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function RawEasedSection() {
  return (
    <section className="tween-playhead-page__section" aria-labelledby="playhead-raw-eased">
      <SectionHeading number="02" id="playhead-raw-eased" title="progress는 raw, ratio는 eased입니다" description="시간이 절반 지났다고 property 값도 반드시 절반인 것은 아닙니다." />
      <div className="tween-playhead-page__equation"><code>tween.ratio === gsap.parseEase('power2.out')(tween.progress())</code></div>
      <p>1초 <code>power2.out</code> Tween의 0.5초에서 <code>progress()</code>는 0.5지만 read-only <code>ratio</code>는 0.875입니다. back·elastic의 overshoot에서는 ratio가 0~1 밖으로 나갈 수 있고 custom interpolation multiplier로도 쓸 수 있습니다.</p>
    </section>
  )
}
