/** smoothChildTiming이 실행 중 child 변화에서 매끄러운 값과 고정 좌표 중 무엇을 지키는지 비교한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식이 startTime에 영향을 줄 수 있다고 열거한 열한 항목을 원문 순서대로 보존한다
const affectingChanges = ['reversed', 'timeScale', 'progress', 'totalProgress', 'time', 'totalTime', 'delay', 'pause', 'resume', 'duration', 'totalDuration'] as const

export function SmoothChildTimingSection() {
  return (
    <section id="smooth-child-timing" className="placement-page__section" aria-labelledby="smooth-child-timing-title">
      <SectionHeading
        number="06"
        id="smooth-child-timing"
        title="값이 바뀌면 좌표가 따라 움직일까"
        description="재생 중인 child를 reverse하거나 속도·시간을 바꾸면 원래 startTime을 지킬지, 현재 화면 값이 튀지 않도록 startTime을 다시 맞출지 선택해야 합니다. smoothChildTiming이 그 우선순위입니다."
      />

      <pre className="placement-page__code"><code>{'smoothChildTiming : Boolean'}</code></pre>

      <div className="placement-page__note">
        <p>메서드가 아니라 읽고 쓰는 Boolean 속성이라 공식 페이지에 <code>Parameters</code>와 <code>Returns</code> 절은 없습니다. child의 property가 실행 중 바뀔 때 매끄러운 재생을 유지하도록 <code>startTime</code>을 자동 재배치할지를 제어합니다.</p>
      </div>

      <div className="placement-page__subheading">
        <h3>공식의 75% 지점 reverse 상황</h3>
        <p>0에서 100으로 가는 child가 75% 완료된 순간 <code>reverse()</code>를 부른다고 가정합니다. 부모 playhead의 위치와 방향은 child 변경의 영향을 받지 않습니다.</p>
      </div>

      <div className="placement-page__split">
        <div className="placement-page__prose">
          <p><strong>false — 위치 일관성 우선</strong></p>
          <p>child가 원래 startTime을 지킨 채 제자리에서 뒤집힙니다. 같은 부모 playhead와 교차하는 child 지점이 75%에서 25%로 바뀌므로 값이 <strong>75 → 25로 튑니다.</strong></p>
        </div>
        <div className="placement-page__prose">
          <p><strong>true — 매끄러운 재생 우선</strong></p>
          <p>부모 playhead가 여전히 child의 75%와 만나도록 startTime을 옮깁니다. 값은 <strong>75에서 이어지고</strong>, reversed 상태라 이후 0 쪽으로 갑니다.</p>
        </div>
      </div>

      <div className="placement-page__warning">
        <h3>일반 Timeline의 기본값을 true로 바꾸지 않습니다</h3>
        <p>공식 문장은 <strong>"root timeline을 제외한 기본값은 false"</strong>이고, 별도로 <code>gsap.globalTimeline</code>은 true라고 밝힙니다. GSAP 3.15.0 실행에서도 <code>gsap.timeline().smoothChildTiming === false</code>, <code>gsap.globalTimeline.smoothChildTiming === true</code>였습니다.</p>
      </div>

      <div className="placement-page__subheading">
        <h3>공식이 startTime에 영향을 줄 수 있다고 열거한 값</h3>
        <p>true일 때 아래 열한 property·method의 실행 중 변경이 자동 재배치로 이어질 수 있습니다.</p>
      </div>
      <ul className="placement-page__method-list">
        {affectingChanges.map((name) => <li key={name}><code>{name}</code></li>)}
      </ul>

      <div className="placement-page__note placement-page__note--probe">
        <h3>"could affect"는 항상 옮긴다는 뜻이 아닙니다</h3>
        <p>같은 측정 조건에서 열한 항목 중 아홉 개가 startTime을 옮겼고 <code>pause</code>와 <code>resume</code>은 옮기지 않았습니다. 공식도 확정 표현이 아니라 영향을 줄 <strong>수 있다</strong>고 적습니다.</p>
        <p className="placement-page__provenance">GSAP 3.15.0에서 smoothChildTiming true인 부모, 진행 중인 같은 child fixture를 매 항목마다 새로 만들고 변경 직전·직후 startTime을 비교했습니다.</p>
      </div>
    </section>
  )
}
