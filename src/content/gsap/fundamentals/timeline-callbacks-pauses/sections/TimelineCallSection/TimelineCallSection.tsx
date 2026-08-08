/** call()이 고정 position에 남는 child callback이라는 점을 onComplete와 갈라 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 signature와 반환 타입을 그대로 보여준다
const signature = `call( callback:Function, params:Array, position:* ) : self`

// 공식이 identical results라고 밝힌 두 표현을 나란히 보존한다
const equivalentCalls = `tl.add(gsap.delayedCall(0, myFunction, ['param1', 'param2']))
tl.call(myFunction, ['param1', 'param2'])`

// 공식 chaining 예제가 중간 call과 Timeline 전체 onComplete를 함께 배치한 형태다
const chainedSequence = `const tl = gsap.timeline({ onComplete: myFunction })
  .to('.class', { duration: 1, x: 100 })
  .set('.class', { color: 'red' })
  .call(myFunction, ['param1', 'param2'])`

export function TimelineCallSection() {
  return (
    <section id="timeline-call" className="schedule-page__section" aria-labelledby="timeline-call-title">
      <SectionHeading number="03" id="timeline-call" title="Timeline 안에 함수를 꽂아 두기" description="call()은 Timeline의 특정 시각에 callback child를 붙이고 Timeline 자신을 돌려줍니다." />

      <pre className="schedule-page__signature"><code>{signature}</code></pre>
      <div className="schedule-page__table-wrap">
        <table className="schedule-page__table">
          <caption>call() 인자와 반환</caption>
          <thead><tr><th scope="col">자리</th><th scope="col">타입·기본값</th><th scope="col">역할</th></tr></thead>
          <tbody>
            <tr><th scope="row"><code>callback</code></th><td>Function</td><td>부를 함수</td></tr>
            <tr><th scope="row"><code>params</code></th><td>Array · <code>null</code></td><td>함수에 넘길 parameter 배열</td></tr>
            <tr><th scope="row"><code>position</code></th><td>* · <code>&quot;+=0&quot;</code></td><td>Timeline 안 삽입 위치, 기본은 끝</td></tr>
            <tr><th scope="row">반환</th><td><code>self</code></td><td>같은 Timeline에 chaining</td></tr>
          </tbody>
        </table>
      </div>

      <div className="schedule-page__prose"><p>공식 설명에서 <code>call()</code>은 <code>add(gsap.delayedCall(...))</code>과 정확히 같은 일을 더 짧게 하는 편의 메서드입니다.</p></div>
      <pre className="schedule-page__code"><code>{equivalentCalls}</code></pre>
      <pre className="schedule-page__code"><code>{chainedSequence}</code></pre>

      <div className="schedule-page__warning">
        <h3>call은 그 자리에 남고 onComplete는 끝을 따라갑니다</h3>
        <p>1초 Tween 뒤에 call을 넣고 다시 1초 Tween을 붙이면 call은 여전히 1초에 실행됩니다. Timeline 생성자의 <code>onComplete</code>는 새 끝인 2초로 이동합니다. 중간 장면 이벤트와 전체 완료를 구분해야 하는 이유입니다.</p>
      </div>

      <div className="schedule-page__note schedule-page__note--probe">
        <h3>실행으로 확인한 child 모양</h3>
        <p><code>call()</code>은 Timeline 자신을 돌려주고 duration 0인 Tween child를 position에 넣습니다. position을 생략하면 child의 <code>startTime()</code>은 그때의 Timeline 끝과 같았습니다.</p>
      </div>
    </section>
  )
}
