/** call과 addPause가 공유하는 position 문법 전체를 기준점과 퍼센트 분모로 묶는다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function PositionParameterSection() {
  return (
    <section id="position-parameter" className="schedule-page__section" aria-labelledby="position-parameter-title">
      <SectionHeading number="04" id="position-parameter" title="어디에 놓을지 정하는 문법" description="position은 숫자 하나가 아니라 Timeline 끝·label·최근 child의 시작과 끝을 기준점으로 삼는 좌표 문법입니다." />

      <div className="schedule-page__table-wrap">
        <table className="schedule-page__table">
          <caption>공식 call()·addPause() 페이지가 각각 게시한 position 형태 전체</caption>
          <thead><tr><th scope="col">형태</th><th scope="col">기준</th><th scope="col">공식 예</th></tr></thead>
          <tbody>
            <tr><th scope="row">Number</th><td>Timeline 시작부터 센 절대 초</td><td><code>3</code></td></tr>
            <tr><th scope="row">Label</th><td>이름이 가리키는 시각, 없으면 Timeline 끝에 label 추가</td><td><code>'someLabel'</code></td></tr>
            <tr><th scope="row"><code>&lt;</code> / <code>&gt;</code></th><td>가장 최근에 삽입한 animation의 시작 / 끝</td><td><code>'&lt;'</code>, <code>'&gt;'</code></td></tr>
            <tr><th scope="row">상대 초</th><td>Timeline 끝·label·최근 animation 기준 앞뒤 이동</td><td><code>{"'+=1', '-=1', 'myLabel+=2', '<+=3', '<3', '>-0.5'"}</code></td></tr>
            <tr><th scope="row">퍼센트</th><td><code>+=/-=</code> 뒤면 삽입 대상, <code>&lt;/&gt;</code> 뒤면 이전 animation의 total duration</td><td><code>{"'-=25%', '+=50%', '<25%' (= '>-75%'), '<+=25%', 'myLabel+=30%'"}</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="schedule-page__note">
        <h3>퍼센트의 분모부터 확인하세요</h3>
        <p><code>'&lt;25%'</code>는 이전 animation 길이의 25%지만 <code>'&lt;+=25%'</code>는 지금 삽입하는 animation 길이의 25%입니다. total duration에는 repeat과 yoyo가 포함되며 퍼센트 문법은 GSAP 3.7.0에 추가됐습니다.</p>
      </div>

      <div className="schedule-page__warning">
        <h3>previous는 시간상 가장 가까운 child가 아닙니다</h3>
        <p>공식 각주의 previous animation은 <strong>가장 최근에 삽입한 animation</strong>입니다. Timeline 끝에 가장 가까운 child라는 뜻이 아닙니다.</p>
      </div>

      <pre className="schedule-page__code"><code>{`tl.call(myFunction, null, 3)
tl.call(myFunction, null, 'someLabel')
tl.addPause('<')
tl.addPause('>')`}</code></pre>
    </section>
  )
}
