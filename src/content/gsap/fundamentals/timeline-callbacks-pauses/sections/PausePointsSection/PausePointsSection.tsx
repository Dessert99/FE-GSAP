/** addPause의 정확한 playhead 보정과 removePause의 제거 범위·반환 불일치를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { TimelineEventLab } from '../../examples/TimelineEventLab/TimelineEventLab'

export function PausePointsSection() {
  return (
    <section id="pause-points" className="schedule-page__section" aria-labelledby="pause-points-title">
      <SectionHeading number="05" id="pause-points" title="재생을 그 자리에 세우고 다시 치우기" description="일반 callback 안에서 pause하는 대신 addPause를 쓰면 frame 사이로 지나친 playhead를 정확한 위치로 되돌립니다." />

      <div className="schedule-page__split">
        <div>
          <pre className="schedule-page__signature"><code>addPause( position:[String | Number | Label], callback:Function, params:Array ) : self</code></pre>
          <div className="schedule-page__table-wrap"><table className="schedule-page__table"><caption>addPause() 인자</caption><tbody>
            <tr><th scope="row"><code>position</code></th><td>String | Number | Label · 기본 <code>&quot;+=0&quot;</code></td></tr>
            <tr><th scope="row"><code>callback</code></th><td>Function · 기본 <code>null</code> · 멈춘 직후 호출</td></tr>
            <tr><th scope="row"><code>params</code></th><td>Array · 기본 <code>null</code></td></tr>
          </tbody></table></div>
        </div>
        <div>
          <pre className="schedule-page__signature"><code>removePause( position:[Number | Label] ) : self</code></pre>
          <div className="schedule-page__prose"><p>공식 문서는 pause를 제거할 시간이나 label을 받고 self를 돌려준다고 적습니다. 기본값은 게시하지 않았습니다.</p></div>
        </div>
      </div>

      <div className="schedule-page__prose">
        <p>virtual playhead가 한 frame에서 0.99초였다가 다음 frame에 1.01초가 될 수 있습니다. 일반 callback에서 멈추면 목표 1초를 조금 지나친 채 남아 reverse 직후 같은 callback을 다시 만날 수 있습니다. <code>addPause()</code>는 callback을 맞닥뜨린 뒤 playhead를 정확한 pause 위치로 보정합니다.</p>
        <p>pause는 <code>onComplete</code>를 이용한 zero-duration Tween child입니다. 그래서 Timeline 구조에 남으며 제거할 때 <code>removePause()</code>를 사용합니다.</p>
      </div>

      <pre className="schedule-page__code"><code>{`timeline.addPause(2)
timeline.addPause('yourLabel')
timeline.addPause('yourLabel+=3', yourFunction)
timeline.addPause(4, yourFunction, ['param1', 'param2'])

const removable = gsap.timeline().to('.class', { duration: 1, x: 100 })
removable.addPause()
removable.removePause(1)`}</code></pre>

      <div className="schedule-page__warning">
        <h3>공식 반환과 실제 반환이 다릅니다</h3>
        <p>공식 signature와 TypeScript 선언은 <code>removePause(): self</code>라고 적지만 GSAP 3.15.0 실행 결과는 <code>undefined</code>였습니다. 따라서 <code>timeline.removePause(1).play()</code>처럼 이어 쓰지 않습니다.</p>
      </div>

      <div className="schedule-page__note schedule-page__note--probe">
        <h3>재현한 pause 수명</h3>
        <p>0.1초 pause에서 <code>paused() = true</code>, <code>time() = 0.1</code>로 정확히 멈췄습니다. <code>play()</code>로 계속하면 같은 pause에서 다시 멈추지 않았고, <code>restart()</code> 뒤 다시 지나가면 재차 멈췄습니다. 같은 위치의 call callback은 removePause 뒤에도 남았습니다.</p>
      </div>

      <TimelineEventLab />
    </section>
  )
}
