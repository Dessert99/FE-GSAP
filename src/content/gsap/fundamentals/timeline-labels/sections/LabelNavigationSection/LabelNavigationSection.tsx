/** currentLabel·nextLabel·previousLabel의 getter/setter와 정확히 같은 시각을 건너뛰는 경계를 비교한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function LabelNavigationSection() {
  return (
    <section id="label-navigation" className="labels-page__section" aria-labelledby="label-navigation-title">
      <SectionHeading number="04" id="label-navigation" title="지금 어느 이름인지, 앞뒤 이름은 무엇인지 묻기" description="세 getter는 Timeline local time에서 현재·이전·다음 label을 찾습니다. reversed 여부나 label을 붙인 순서는 결과를 바꾸지 않습니다." />
      <div className="labels-page__table-wrap"><table className="labels-page__table"><caption>공식 signature와 경계</caption><thead><tr><th scope="col">메서드</th><th scope="col">반환</th><th scope="col">같은 시각 처리</th></tr></thead><tbody>
        <tr><th scope="row"><code>currentLabel(value:String) : [String | self]</code></th><td>인자 없으면 현재 또는 앞의 가장 가까운 String, 있으면 self</td><td>같은 시각 label 포함</td></tr>
        <tr><th scope="row"><code>nextLabel(time:Number) : String</code></th><td>기준보다 뒤의 label, 없으면 실행상 undefined</td><td>같은 시각 무시</td></tr>
        <tr><th scope="row"><code>previousLabel(time:Number) : String</code></th><td>기준보다 앞의 label, 없으면 실행상 undefined</td><td>같은 시각 무시</td></tr>
      </tbody></table></div>
      <div className="labels-page__split"><div className="labels-page__prose"><p><code>currentLabel()</code>은 공식이 getter와 setter를 겸한다고 명시합니다. 인자를 생략하면 String을 읽고, 이름을 넘기면 그 label로 점프한 뒤 chaining용 self를 돌려줍니다. value 기본값은 null입니다.</p></div><div className="labels-page__prose"><p><code>nextLabel()</code>·<code>previousLabel()</code>은 time을 생략하면 현재 playhead를 기준으로 합니다. reversed여도 "앞/뒤"는 진행 방향이 아니라 local time의 이른/늦은 쪽입니다.</p></div></div>
      <pre className="labels-page__code"><code>{`timeline.tweenTo(timeline.nextLabel())
timeline.tweenTo(timeline.previousLabel())`}</code></pre>
      <div className="labels-page__note labels-page__note--probe"><h3>undefined 경계와 시간 순서</h3><p>label이 없거나 첫 label 앞이면 <code>currentLabel()</code>은 undefined였습니다. next는 마지막 label 위·뒤에서, previous는 첫 label 위·앞에서 undefined였습니다. 5초·1초·3초 순으로 label을 붙여도 2초의 previous는 1초, next는 3초 label이었습니다.</p><p>공식이 권한 <code>tweenTo(timeline.nextLabel())</code>은 next가 undefined여도 에러 없이 Timeline 끝으로 가는 Tween을 만들었습니다.</p><p className="labels-page__provenance">GSAP 3.15.0에서 playhead 경계 0·0.0001·label exact·duration 밖과 reversed 전후, 비시간순 insertion을 각각 측정했습니다.</p></div>
      <div className="labels-page__warning"><h3>없는 이름을 currentLabel(value)에 넘겨도 오류가 아닙니다</h3><p>실행하면 그 이름이 Timeline 끝에 새 label로 만들어지고 그쪽으로 이동하며 self를 돌려줍니다. paused·reversed는 바뀌지 않았습니다. 오타가 조용히 새 label이 될 수 있습니다.</p></div>
    </section>
  )
}
