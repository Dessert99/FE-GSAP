/** then()이 Timeline 완료 하나를 Promise로 바꾸는 계약과 callback 방식의 선택 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function CompletionPromiseSection() {
  return (
    <section id="completion-promise" className="schedule-page__section" aria-labelledby="completion-promise-title">
      <SectionHeading number="07" id="completion-promise" title="완료를 Promise로 기다리기" description="끝에서 할 일을 callback 자리에 맡길 수도 있고 Promise가 resolve될 때까지 위에서 아래로 기다릴 수도 있습니다." />

      <div className="schedule-page__prose"><p><strong>Promise</strong>는 나중에 생길 완료 결과를 나타내는 JavaScript 객체입니다. 공식 문서는 <code>then()</code>을 onComplete 대신 Promise를 선호할 때 쓰며 Timeline이 완료되면 resolve된다고 설명합니다.</p></div>
      <pre className="schedule-page__signature"><code>then( callback:Function ) : Promise</code></pre>
      <div className="schedule-page__table-wrap"><table className="schedule-page__table"><caption>then() 계약</caption><tbody>
        <tr><th scope="row"><code>callback</code></th><td>생성된 Timeline Promise를 처리할 Function</td></tr>
        <tr><th scope="row">반환</th><td>Timeline 완료 시 resolve되는 Promise</td></tr>
      </tbody></table></div>
      <pre className="schedule-page__code"><code>{`gsap.timeline()
  .to('.class', { duration: 1, x: 100 })
  .then(yourFunction)
  .then(...)`}</code></pre>

      <div className="schedule-page__note schedule-page__note--probe">
        <h3>resolve 값은 Timeline 자신</h3>
        <p>GSAP 3.15.0에서 이미 완료된 Timeline에 handler를 둔 <code>then()</code>을 호출했을 때 callback이 받은 값은 Timeline 자신이었고, <code>await timeline</code>도 같은 instance를 돌려줬습니다. 공식 페이지는 resolve 값을 게시하지 않습니다.</p>
      </div>

      <div className="schedule-page__warning"><h3>이 페이지가 말하지 않는 것</h3><p>공식 문서는 kill·무한 반복·reject 계약을 설명하지 않습니다. 이 페이지는 “정상 완료에서 resolve된다”까지만 가르치며 중단 가능한 작업의 Promise 정책을 지어내지 않습니다.</p></div>
    </section>
  )
}
