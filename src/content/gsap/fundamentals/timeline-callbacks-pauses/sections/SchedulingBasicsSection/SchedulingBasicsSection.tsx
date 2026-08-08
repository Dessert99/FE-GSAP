/** 함수가 기다리는 위치를 네 층으로 먼저 나눠 뒤의 메서드 선택 기준을 세운다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function SchedulingBasicsSection() {
  return (
    <section id="scheduling-basics" className="schedule-page__section" aria-labelledby="scheduling-basics-title">
      <SectionHeading number="01" id="scheduling-basics" title="시간 위에 함수를 예약한다는 것" description="모두 '나중에 함수 실행'처럼 보이지만, 무엇의 시간을 따라가고 무엇을 멈추는지는 서로 다릅니다." />

      <div className="schedule-page__prose">
        <p><strong>callback</strong>은 지금 직접 부르지 않고 다른 코드가 알맞은 시점에 대신 부르도록 맡긴 함수입니다. 먼저 그 시점을 누가 소유하는지 고릅니다.</p>
      </div>

      <div className="schedule-page__table-wrap">
        <table className="schedule-page__table">
          <caption>함수 실행 시점을 소유하는 네 층</caption>
          <thead><tr><th scope="col">필요한 일</th><th scope="col">API</th><th scope="col">기준 시계</th></tr></thead>
          <tbody>
            <tr><th scope="row">Timeline 없이 한 번 기다리기</th><td><code>gsap.delayedCall()</code></td><td>GSAP rendering loop</td></tr>
            <tr><th scope="row">sequence 중간에 함수 꽂기</th><td><code>timeline.call()</code></td><td>Timeline position</td></tr>
            <tr><th scope="row">sequence 중간에서 멈추기</th><td><code>addPause()</code></td><td>Timeline position + paused 상태</td></tr>
            <tr><th scope="row">전체 시작·갱신·완료 관찰</th><td><code>eventCallback()</code>·<code>then()</code></td><td>Timeline 생애</td></tr>
          </tbody>
        </table>
      </div>

      <div className="schedule-page__note">
        <h3>왜 setTimeout()과 다른가</h3>
        <p>공식 문서는 <code>delayedCall()</code>이 GSAP의 전체 rendering loop와 완전히 동기화된다고 설명합니다. <code>setTimeout()</code>은 브라우저 화면 갱신 주기 밖에서 실행될 수 있습니다.</p>
      </div>
    </section>
  )
}
