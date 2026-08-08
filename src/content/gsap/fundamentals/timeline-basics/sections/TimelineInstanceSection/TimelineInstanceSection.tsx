/** Timeline instance가 노출하는 일곱 property와 child에서 파생되는 길이 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function TimelineInstanceSection() {
  return (
    <section id="timeline-instance" className="timeline-page__section" aria-labelledby="timeline-instance-title">
      <SectionHeading number="02" id="timeline-instance" title="gsap.timeline()이 돌려주는 그릇" description="반환된 Timeline에는 children뿐 아니라 생성 설정·부모·label·연결 객체를 읽는 property가 함께 있습니다." />

      <pre className="timeline-page__signature"><code>gsap.timeline(vars?: Object) → Timeline</code></pre>
      <div className="timeline-page__table-wrap">
        <table className="timeline-page__table">
          <caption>Timeline 클래스의 Properties 표 7행</caption>
          <thead><tr><th scope="col">property</th><th scope="col">공식 타입</th><th scope="col">역할</th></tr></thead>
          <tbody>
            <tr><th scope="row"><code>autoRemoveChildren</code></th><td>Boolean</td><td>true면 완료된 child를 즉시 제거</td></tr>
            <tr><th scope="row"><code>data</code></th><td>*</td><td>원하는 데이터를 저장하며 처음에는 vars.data 사용</td></tr>
            <tr><th scope="row"><code>labels</code></th><td>Object</td><td>추가된 label과 시각을 저장</td></tr>
            <tr><th scope="row"><code>parent</code></th><td>Timeline</td><td>붙어 있는 부모, 직접 넣지 않으면 globalTimeline</td></tr>
            <tr><th scope="row"><code>scrollTrigger</code></th><td>ScrollTrigger | undefined</td><td>연결된 ScrollTrigger가 있을 때만 접근</td></tr>
            <tr><th scope="row"><code>smoothChildTiming</code></th><td>Boolean</td><td>실행 중 타이밍 변경 시 child startTime 재배치 여부</td></tr>
            <tr><th scope="row"><code>vars</code></th><td>Object</td><td>constructor에 원래 넘긴 설정 객체</td></tr>
          </tbody>
        </table>
      </div>

      <div className="timeline-page__prose">
        <p><code>Timeline.vars</code> 독립 페이지의 signature는 <code>vars : Object</code>이며 constructor에 넘긴 property와 value를 담는다고 설명합니다. 클래스 표의 <code>vars</code> 행과 같은 계약입니다.</p>
      </div>

      <div className="timeline-page__warning">
        <h3>Timeline duration은 고정 상자가 아니라 children에서 파생됩니다</h3>
        <p>실행 확인에서 child를 넣을 때 0 → 1 → 3 → 3.5로 늘었고 이미 들어 있는 child duration을 1에서 5로 바꾸자 부모도 5가 됐습니다. 정확한 duration 계산은 후속 타이밍 페이지가 소유하고, 여기서는 “children을 따라 자동 조정된다”까지만 사용합니다.</p>
      </div>

      <div className="timeline-page__note timeline-page__note--probe">
        <h3>vars는 원래 객체 그대로였습니다</h3>
        <p>GSAP 3.15.0에서 <code>timeline.vars === constructorVars</code>가 true였고 빈 객체·repeat·paused/yoyo·defaults·onComplete 다섯 조합 모두 GSAP이 새 key를 추가하지 않았습니다. 공식 문서는 원본인지 복사본인지 밝히지 않습니다.</p>
      </div>
    </section>
  )
}
