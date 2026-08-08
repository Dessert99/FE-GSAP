/** 손으로 계산한 delay와 Timeline sequence를 나란히 놓아 container가 해결하는 문제부터 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// gsap.timeline() 공식 페이지의 delay 기반 예제를 그대로 보존한다
const withoutTimeline = `gsap.to('#id', { x: 100, duration: 1 })
gsap.to('#id', { y: 50, duration: 1, delay: 1 })
gsap.to('#id', { opacity: 0, duration: 1, delay: 2 })`

// 같은 세 Tween을 Timeline 하나에 넣고 전체를 조작하는 공식 흐름이다
const withTimeline = `const timeline = gsap.timeline({ repeat: 2, repeatDelay: 1 })
timeline.to('#id', { x: 100, duration: 1 })
  .to('#id', { y: 50, duration: 1 })
  .to('#id', { opacity: 0, duration: 1 })

timeline.pause()
timeline.resume()
timeline.seek(1.5)
timeline.reverse()`

export function WhyTimelineSection() {
  return (
    <section id="why-timeline" className="timeline-page__section" aria-labelledby="why-timeline-title">
      <SectionHeading number="01" id="why-timeline" title="delay를 손으로 계산하지 않으려면" description="Timeline은 Tween을 다시 만드는 API가 아니라 여러 animation의 시간 관계를 한 container에 맡기는 도구입니다." />

      <div className="timeline-page__prose">
        <p><strong>sequence</strong>는 여러 animation이 언제 시작하고 끝나는지 정한 순서입니다. Tween마다 delay를 직접 적으면 앞 duration 하나가 바뀔 때 뒤 delay를 모두 다시 계산해야 합니다.</p>
      </div>

      <pre className="timeline-page__code"><code>{`// 하나의 Tween
gsap.to('.box', { rotation: 27, x: 100, duration: 1 })

// 차례로 놓인 Tween 세 개를 담은 Timeline
const timeline = gsap.timeline()
timeline.to('#green', { duration: 1, x: 786 })
  .to('#blue', { duration: 2, x: 786 })
  .to('#orange', { duration: 1, x: 786 })`}</code></pre>

      <div className="timeline-page__split">
        <article><h3>Timeline 없이</h3><pre className="timeline-page__code"><code>{withoutTimeline}</code></pre><p>첫 Tween이 길어지면 뒤의 <code>delay</code> 1과 2를 직접 고쳐야 합니다.</p></article>
        <article><h3>Timeline으로</h3><pre className="timeline-page__code"><code>{withTimeline}</code></pre><p>앞 child의 길이가 바뀌면 뒤 child가 자동으로 밀리고 전체를 한 번에 제어합니다.</p></article>
      </div>

      <div className="timeline-page__note">
        <h3>Timeline 클래스 페이지의 예제는 숫자만 조금 다릅니다</h3>
        <p>두 페이지는 Positioning·Special Properties·Setting Defaults·Nesting·Other Features·How timelines work 여섯 절을 같은 내용으로 싣습니다. 다만 <code>gsap.timeline()</code> 페이지는 duration 1·delay 1·2를, 클래스 페이지는 두 번째 duration 2·마지막 delay 3을 써 공식 예제의 차이를 합쳐 지우지 않습니다.</p>
      </div>

      <div className="timeline-page__note timeline-page__note--probe">
        <h3>인자 없이 만든 초기 상태</h3>
        <p>GSAP 3.15.0에서 <code>gsap.timeline()</code>은 <code>Timeline</code> instance를 돌려주고, 빈 vars·duration 0·totalDuration 0·paused false로 시작하며 parent는 <code>gsap.globalTimeline</code>이었습니다. 공식은 이 초기값 묶음을 게시하지 않습니다.</p>
      </div>
    </section>
  )
}
