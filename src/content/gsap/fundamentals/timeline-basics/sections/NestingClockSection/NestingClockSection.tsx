/** Timeline 중첩 구조와 부모 playhead가 자식 시간을 render하는 기본 시계 모델을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function NestingClockSection() {
  return (
    <section id="nesting-and-clock" className="timeline-page__section" aria-labelledby="nesting-and-clock-title">
      <SectionHeading number="07" id="nesting-and-clock" title="Timeline 안의 Timeline과 playhead" description="Timeline도 animation이라 다른 Timeline의 child가 될 수 있고, 부모가 이동할 때 각 child의 내부 playhead가 함께 render됩니다." />

      <pre className="timeline-page__code"><code>{`function intro() {
  return gsap.timeline().to('.intro', { x: 100 })
}

function middle() {
  return gsap.timeline().to('.middle', { rotation: 90 })
}

function conclusion() {
  return gsap.timeline().to('.end', { autoAlpha: 1 })
}

gsap.timeline()
  .add(intro())
  .add(middle(), '+=2')
  .add(conclusion(), '-=1')`}</code></pre>

      <div className="timeline-page__tree" aria-label="중첩 Timeline의 부모 자식 구조">
        <div><strong>master Timeline</strong><span>parent playhead</span></div>
        <ul>
          <li><strong>intro Timeline</strong><span>Tween children</span></li>
          <li><strong>middle Timeline</strong><span>2초 gap 뒤 시작</span></li>
          <li><strong>conclusion Timeline</strong><span>1초 overlap</span></li>
        </ul>
      </div>

      <div className="timeline-page__prose">
        <p>모든 Tween과 Timeline은 부모 Timeline 위에 놓이고 자기 <code>time</code> playhead를 가집니다. <code>totalTime</code>은 repeat와 repeatDelay까지 포함한다는 점이 다릅니다. 부모가 render될 때 각 child에게 해당하는 내부 시각을 계산해 render하라고 전달하고, 중첩 Timeline은 같은 일을 손자에게 반복합니다.</p>
        <p>paused child를 제외하면 부모 playhead가 이동할 때 child도 갱신됩니다. resume·play·reverse·timeScale 변경처럼 시간 관계가 바뀔 때 <code>smoothChildTiming</code>이 true면 engine이 startTime을 다시 배치해 playhead를 맞춥니다.</p>
      </div>

      <div className="timeline-page__warning">
        <h3>일반 Timeline 기본 false, globalTimeline만 true</h3>
        <p>공식 본문과 GSAP 3.15.0 실행 결과 모두 <code>gsap.timeline()</code>의 <code>smoothChildTiming</code> 기본은 false이고 <code>gsap.globalTimeline</code>만 true임을 확인했습니다. false면 child startTime을 고정해 실행 중 방향을 바꿀 때 부모와 내부 진행 위치가 재배치되지 않습니다.</p>
      </div>

      <div className="timeline-page__note">
        <h3>왜 startTime이 -3이 되나요?</h3>
        <p>root에서 2초가 흐른 10초 Tween에 <code>seek(5)</code>를 부르면 root는 계속 2초에 있지만 child는 5초를 보여야 합니다. 공식 예제는 두 playhead를 맞추기 위해 child startTime이 -3으로 이동한다고 설명합니다.</p>
      </div>
    </section>
  )
}
