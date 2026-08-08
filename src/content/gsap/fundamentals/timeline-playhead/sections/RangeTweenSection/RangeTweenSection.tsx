/** tweenFromTo의 두 위치·즉시 duration·vars·공식 예제를 range lab으로 연결한다. */
import { FromToRangeLab } from '../../examples/FromToRangeLab/FromToRangeLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 signature와 두 control Tween sequencing 예제를 보존한다
const officialCode = `tweenFromTo(
  fromPosition:[Number | Label],
  toPosition:[Number | Label],
  vars:Object
) : Tween

const master = gsap.timeline();
master.add(tl.tweenFromTo("myLabel1", "myLabel2"));
master.add(tl.tweenFromTo("myLabel2", 0));

tl.tweenFromTo(0, 5, {
  onComplete: myFunction,
  onCompleteParams: [tl],
  ease: "strong",
});`

export function RangeTweenSection() {
  return (
    <section id="range-tween" className="timeline-playhead-page__section" aria-labelledby="range-tween-title">
      <SectionHeading number="04" id="range-tween" title="tweenFromTo는 출발과 도착을 함께 고정한다" description="control Tween을 master Timeline에 차례로 넣을 때 from과 to가 모두 있어야 duration을 생성 순간 바로 계산할 수 있습니다." />
      <pre className="timeline-playhead-page__code"><code>{officialCode}</code></pre>
      <div className="timeline-playhead-page__prose"><p><code>fromPosition</code>과 <code>toPosition</code>은 각각 초 또는 label입니다. <code>vars</code>는 Object, 기본값 <code>null</code>이며 반환되는 Tween에 onComplete·ease·delay 등 special property를 전달합니다.</p><p><code>tweenFromTo()</code>도 Timeline의 <code>time()</code>을 선형으로 tween하고 Timeline을 먼저 pause하며 완료 뒤 자동 resume하지 않습니다. control Tween을 저장해 <code>kill()</code>할 수 있고, 겉으로 뒤로 이동해도 Timeline의 reversed property는 바뀌지 않습니다.</p></div>
      <div className="timeline-playhead-page__note"><h3>tweenTo보다 range sequence에 맞는 이유</h3><p><code>tweenTo()</code>는 현재 playhead에서 목적지까지의 거리를 써서 duration을 정합니다. <code>tweenFromTo()</code>는 두 끝이 처음부터 정해져 다음 control Tween을 master에 붙일 위치도 즉시 정확히 계산할 수 있습니다.</p></div>
      <FromToRangeLab />
    </section>
  )
}
