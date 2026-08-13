/** Timeline 위 네 이벤트의 위치·호출 순서·반환 차이를 조작 가능한 track으로 보여준다. */
import { useTimelineEventAnimation } from './useTimelineEventAnimation'
import './TimelineEventLab.css'

export function TimelineEventLab() {
  // runtime이 소유한 descriptor·실제 log·action을 화면에만 연결한다
  const { scope, descriptor, events, pauseEnabled, removeReturn, promiseStatus, status, play, restart, removePause, restorePause, reset } =
    useTimelineEventAnimation()

  // 실제 위치와 pause 존재 상태를 코드 문법으로만 직렬화한다
  const code = `import gsap from 'gsap'

const target = { value: 0 }
const events = []
let promiseStatus = 'pending'
const record = (label) => events.push({ label, time: timeline.time() })
const setPromiseStatus = (status) => { promiseStatus = status }

const timeline = gsap.timeline({ paused: true })
  .to(target, { value: 100, duration: ${descriptor.duration}, ease: 'none' })
  .call(() => record('call callback'), ['call'], ${descriptor.callAt})
  ${pauseEnabled ? `.addPause(${descriptor.pauseAt}, () => record('pause callback'))` : `// ${descriptor.pauseAt}초 pause child를 제거한 상태`}

timeline.eventCallback('onComplete', () => record('onComplete'))
timeline.then(() => setPromiseStatus('resolved'))

${pauseEnabled ? '// pause child가 남아 있어 removePause()를 호출하지 않았습니다.' : `timeline.removePause(${descriptor.pauseAt}) // → ${removeReturn}`}

function cleanup() {
  timeline.kill()
  events.length = 0
}`

  return (
    <section className="timeline-event-lab" aria-labelledby="timeline-event-lab-title">
      <h3 id="timeline-event-lab-title">한 시간축에서 callback·pause·완료 구분하기</h3>
      <p className="timeline-event-lab__goal">
        재생하면 <code>call()</code>을 지나 <code>addPause()</code>에서 멈춥니다. 계속 재생해 끝에 도달하면 lifecycle callback과 Promise가
        차례로 관찰됩니다.
      </p>

      <div className="timeline-event-lab__body" ref={scope}>
        <div className="timeline-event-lab__ruler" aria-label={`0초부터 ${descriptor.duration}초까지의 이벤트 위치`}>
          <span className="timeline-event-lab__line" />
          <span className="timeline-event-lab__pin" style={{ left: `${(descriptor.callAt / descriptor.duration) * 100}%` }}><strong>call</strong><small>{descriptor.callAt}초</small></span>
          {pauseEnabled && <span className="timeline-event-lab__pin timeline-event-lab__pin--pause" style={{ left: `${(descriptor.pauseAt / descriptor.duration) * 100}%` }}><strong>pause</strong><small>{descriptor.pauseAt}초</small></span>}
          <span className="timeline-event-lab__pin timeline-event-lab__pin--end" style={{ left: '100%' }}><strong>complete</strong><small>{descriptor.duration}초</small></span>
        </div>

        <div className="timeline-event-lab__controls">
          <button type="button" onClick={play}>재생 / 계속</button>
          <button type="button" onClick={restart}>처음부터 재생</button>
          <button type="button" disabled={!pauseEnabled} onClick={removePause}>pause 제거</button>
          <button type="button" disabled={pauseEnabled} onClick={restorePause}>pause 복원</button>
          <button type="button" onClick={reset}>초기화</button>
        </div>
      </div>

      <p className="timeline-event-lab__status" role="status">{status}</p>

      <div className="timeline-event-lab__results">
        <div><span>completion Promise</span><strong>{promiseStatus}</strong></div>
        <div><span>removePause() 실제 반환</span><strong>{removeReturn}</strong></div>
      </div>

      <div className="timeline-event-lab__log">
        <h4>실제 호출 순서</h4>
        {events.length === 0 ? <p>아직 불린 이벤트가 없습니다.</p> : <ol>{events.map((event) => <li key={event.id}><code>{event.time}초</code> {event.label}</li>)}</ol>}
      </div>

      <pre className="timeline-event-lab__code"><code>{code}</code></pre>

      <div className="timeline-event-lab__panels">
        <article><h4>무엇이 달라졌나요?</h4><p>call은 지나가며 함수를 부르고, pause는 함수를 부른 뒤 Timeline 자체를 멈춥니다. onComplete와 Promise는 끝에서만 바뀝니다.</p></article>
        <article><h4>무엇을 봐야 하나요?</h4><p>pause를 제거하고 처음부터 재생하면 call log는 남지만 중간 멈춤만 사라집니다. 제거 범위가 pause child 하나이기 때문입니다.</p></article>
        <article><h4>왜 이렇게 동작하나요?</h4><p>call과 pause는 시간축의 zero-duration child이고, eventCallback과 then은 Timeline 전체 생애를 관찰합니다.</p></article>
        <article><h4>실제로 언제 쓰나요?</h4><p>장면 중간의 분석 이벤트는 call, 사용자 확인 지점은 addPause, 전체 정리는 onComplete나 then으로 나누면 책임이 선명합니다.</p></article>
      </div>

      <p className="timeline-event-lab__source">실행 코드 위치 · <code>examples/TimelineEventLab/useTimelineEventAnimation.ts</code></p>
    </section>
  )
}
