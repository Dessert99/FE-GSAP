/** 여덟 메서드보다 먼저 부모 playhead·두 상태 스위치·계산값 하나의 멘탈 모델을 세운다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// paused·reversed·isActive가 서로 다른 질문에 답한다는 비교표다
const states = [
  { method: 'paused()', question: '부모 playhead를 멈춰 두었나?', kind: '읽기·쓰기', ancestors: '보지 않음' },
  { method: 'reversed()', question: '부모 시간이 뒤로 흐르나?', kind: '읽기·쓰기', ancestors: '보지 않음, yoyo도 무관' },
  { method: 'isActive()', question: '지금 실제로 time span 위를 움직이나?', kind: '읽기 전용 계산값', ancestors: 'paused 조상까지 봄' },
]

// 공식 문장이 active와 inactive를 가르는 조건을 빠짐없이 나눈다
const activityCases = [
  { when: 'sequence 중간을 재생 중', result: 'true' },
  { when: 'playhead가 시작 시각 바로 위', result: 'true · 아직 render 전이어도 포함' },
  { when: '시작 전 또는 완료 뒤', result: 'false' },
  { when: '자기 자신이 paused', result: 'false' },
  { when: '조상 timeline 중 하나라도 paused', result: 'false' },
]

export function PlaybackModelSection() {
  return (
    <section id="playback-model" className="timeline-playback-page__section" aria-labelledby="playback-model-title">
      <SectionHeading number="01" id="playback-model" title="부모 playhead 하나가 sequence 전체를 이끈다" description="Timeline은 children을 지우지 않고도 sequence 전체를 멈추고 되감습니다. 바꾸는 것은 부모의 시간 상태이고, children은 그 시간 좌표를 따라갑니다." />

      <div className="timeline-playback-page__prose">
        <p><strong>Timeline</strong>은 여러 child animation을 부모 시간축에 놓은 container입니다. <strong>playhead</strong>는 그 부모 시간축에서 지금 읽는 위치이고, 공식 반환 타입의 <strong>self</strong>는 호출한 Timeline 자신입니다.</p>
        <p><code>pause()</code>나 <code>reverse()</code>는 child마다 반복 호출하는 명령이 아닙니다. 부모 Timeline 하나의 playhead를 제어하면 A → B → C의 상대 배치는 그대로이고, 어느 child를 읽는지만 함께 바뀝니다.</p>
      </div>

      <div className="timeline-playback-page__table-wrap">
        <table className="timeline-playback-page__table">
          <caption>스위치 둘과 계산값 하나</caption>
          <thead><tr><th scope="col">메서드</th><th scope="col">답하는 질문</th><th scope="col">역할</th><th scope="col">조상을 보나?</th></tr></thead>
          <tbody>{states.map((state) => <tr key={state.method}><th scope="row"><code>{state.method}</code></th><td>{state.question}</td><td>{state.kind}</td><td>{state.ancestors}</td></tr>)}</tbody>
        </table>
      </div>

      <div className="timeline-playback-page__warning">
        <h3>자기 상태와 화면 결과는 다를 수 있습니다</h3>
        <p>공식 문서에서 <code>paused()</code>와 <code>reversed()</code>는 조상 Timeline을 보지 않습니다. 자신은 정방향·재생 상태여도 부모가 멈췄거나 뒤로 가면 화면에서는 멈추거나 뒤로 가는 것처럼 보입니다. <code>reversed()</code>는 yoyo 회차의 방향도 반영하지 않습니다.</p>
        <p>반대로 <code>isActive()</code>는 조상 paused 상태까지 고려합니다. 단, <code>progress()</code>와 <code>totalProgress()</code>는 paused나 부모 playhead 위치를 보지 않으므로 active 판정의 대체물이 아닙니다.</p>
      </div>

      <div className="timeline-playback-page__table-wrap">
        <table className="timeline-playback-page__table">
          <caption>isActive()가 계산하는 상태</caption>
          <thead><tr><th scope="col">상황</th><th scope="col">결과</th></tr></thead>
          <tbody>{activityCases.map((item) => <tr key={item.when}><th scope="row">{item.when}</th><td>{item.result}</td></tr>)}</tbody>
        </table>
      </div>

      <div className="timeline-playback-page__note">
        <h3>완료와 paused는 같은 말이 아닙니다</h3>
        <p>공식 문서는 animation이 완료돼도 paused 상태가 바뀌지 않는다고 명시합니다. 끝에 도착해 움직이지 않아도 <code>paused()</code>가 자동으로 <code>true</code>가 되지는 않습니다. 처음부터 멈춰 만들 때만 vars에 <code>paused: true</code>를 줍니다.</p>
        <p>또 animation을 pause해도 부모에서 제거되지는 않지만, 공식 문장상 부모의 <code>duration</code>/<code>totalDuration</code> 계산에는 포함되지 않습니다.</p>
      </div>

      <div className="timeline-playback-page__note timeline-playback-page__probe">
        <h3>부모 시간을 옮겨 child cascade를 확인했습니다</h3>
        <p><strong>측정 방법</strong> — duration 1초짜리 A·B·C child를 순서대로 넣고 부모 <code>time()</code>을 0.5초씩 옮겼습니다. 값은 A <code>0→50→100</code>, 이어 B, 이어 C 순으로 바뀌었습니다. 부모 playhead 하나가 같은 child 배치를 차례로 읽는다는 실행 근거입니다.</p>
        <p className="timeline-playback-page__provenance">Timeline <code>isActive()</code> 문서는 global timeline을 언제나 active로 간주한다고도 적습니다. 이 예제의 로컬 Timeline 상태와 global timeline을 같은 값으로 가정하면 안 됩니다.</p>
      </div>
    </section>
  )
}
