/** tweenTo의 입력·반환 Tween·pause/reversed 생명주기를 direct setter와 비교한다. */
import { NavigationModeLab } from '../../examples/NavigationModeLab/NavigationModeLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 signature와 두 코드 예제를 같은 section에 보존한다
const officialCode = `tweenTo( position:[Number | Label], vars:Object ) : Tween

tl.tweenTo("myLabel2");

tl.tweenTo(5, {
  onComplete: myFunction,
  onCompleteParams: [tl],
  ease: "strong",
});`

export function NavigationTweenSection() {
  return (
    <section id="navigation-tween" className="timeline-playhead-page__section" aria-labelledby="navigation-tween-title">
      <SectionHeading number="03" id="navigation-tween" title="tweenTo는 목적지까지 움직이는 별도 Tween을 만든다" description="Timeline을 즉시 옮기는 대신 Timeline의 time()을 선형으로 tween하는 control Tween을 받아 중간 과정을 보여 줍니다." />
      <pre className="timeline-playhead-page__code"><code>{officialCode}</code></pre>
      <div className="timeline-playhead-page__prose"><p><code>position</code>은 초 숫자 또는 label입니다. <code>vars</code>는 Object, 기본값 <code>null</code>이며 <code>onComplete</code>, <code>ease</code>, <code>delay</code> 같은 Tween special property를 반환되는 control Tween에 전달합니다.</p><p>control Tween은 먼저 대상 Timeline을 pause하고 Timeline의 <code>time()</code>을 목적지까지 움직입니다. 완료 뒤 자동 resume하지 않습니다. 필요하면 <code>onComplete</code>에서 <code>tl.resume()</code>을 호출합니다.</p></div>
      <div className="timeline-playhead-page__note"><h3>겉보기 방향과 reversed는 별개입니다</h3><p>현재보다 앞선 위치로 tweenTo하면 화면은 뒤로 움직이지만 Timeline의 <code>reversed</code> 상태는 true가 되지 않습니다. 반환 Tween 참조는 <code>kill()</code>할 수 있습니다.</p><p><strong>GSAP 3.15.0 probe</strong> — 0.25초에서 1초 label로 만든 control Tween은 duration 0.75, ease <code>none</code>이었고 완료 뒤 Timeline은 paused로 남았습니다.</p></div>
      <NavigationModeLab />
    </section>
  )
}
