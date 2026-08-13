/** delayedCall의 예약·호출·두 취소 경로를 같은 Tween 관찰값으로 보여준다. */
import { useDelayedCallAnimation } from './useDelayedCallAnimation'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './DelayedCallLab.css'

export function DelayedCallLab() {
  // runtime이 소유한 descriptor·관찰값·action을 화면 표시와 control에 그대로 연결한다
  const {
    scope,
    delay,
    setDelay,
    withParams,
    setWithParams,
    status,
    cancelRoute,
    observation,
    descriptor,
    reducedMotion,
    schedule,
    cancel,
    reset,
  } = useDelayedCallAnimation()

  // 실제 호출에 params가 있을 때만 세 번째 인자를 표시해 runtime 분기와 같은 문법을 보여준다
  const paramsSyntax = descriptor.params ? `, [${descriptor.params.map((value) => `'${value}'`).join(', ')}]` : ''
  // descriptor와 마지막 취소 경로를 코드 문법으로만 포맷한다
  const code = `import gsap from 'gsap'

let status = 'waiting'
let receivedParams = []
function handleFire(...params) {
  receivedParams = params
  status = 'fired'
}

const delayedCall = gsap.delayedCall(
  ${descriptor.delay},
  handleFire${paramsSyntax},
)

${cancelRoute === 'killTweensOf' ? "gsap.killTweensOf(handleFire)\nstatus = 'cancelled'" : cancelRoute === 'kill' ? "delayedCall.kill()\nstatus = 'cancelled'" : '// 아직 취소하지 않았습니다.'}

function cleanup() {
  delayedCall.kill()
}`

  return (
    <section className="delayed-call-lab" aria-labelledby="delayed-call-lab-title">
      <h3 id="delayed-call-lab-title">한 번 예약하고 두 방법으로 취소하기</h3>
      <p className="delayed-call-lab__goal">
        delay와 params를 정해 예약한 뒤, 기다리는 동안 <code>kill()</code> 또는 <code>killTweensOf()</code>로 취소해 보세요. 두
        경로 모두 같은 delayedCall Tween을 예약 목록에서 제거합니다.
      </p>

      <div className="delayed-call-lab__body" ref={scope}>
        <div className="delayed-call-lab__timer">
          <span>남은 시간</span>
          {/* 매 frame 바뀌는 값은 live region이 아닌 일반 텍스트로만 표시한다 */}
          <strong>{observation.remaining}초</strong>
          <div className="delayed-call-lab__track" aria-hidden="true">
            <span style={{ width: `${descriptor.delay === 0 ? 100 : (observation.remaining / descriptor.delay) * 100}%` }} />
          </div>
          {reducedMotion && <small>모션 감소 설정에서는 막대 transition 없이 숫자만 갱신합니다.</small>}
        </div>

        <fieldset className="delayed-call-lab__controls">
          <legend>예약 설정과 조작</legend>
          <label htmlFor="delayed-call-delay">기다릴 시간</label>
          <output htmlFor="delayed-call-delay">{delay}초</output>
          <input
            id="delayed-call-delay"
            type="range"
            min="1"
            max="4"
            step="0.5"
            value={delay}
            disabled={status === 'waiting'}
            onChange={(event) => setDelay(Number(event.target.value))}
          />
          <label className="delayed-call-lab__check">
            <input
              type="checkbox"
              checked={withParams}
              disabled={status === 'waiting'}
              onChange={(event) => setWithParams(event.target.checked)}
            />
            params 배열 함께 넘기기
          </label>
          <div className="delayed-call-lab__buttons">
            <button type="button" disabled={status === 'waiting'} onClick={schedule}>
              예약하기
            </button>
            <button type="button" disabled={status !== 'waiting'} onClick={() => cancel('kill')}>
              delayedCall.kill()
            </button>
            <button type="button" disabled={status !== 'waiting'} onClick={() => cancel('killTweensOf')}>
              killTweensOf(handleFire)
            </button>
            <button type="button" onClick={reset}>
              초기화
            </button>
          </div>
        </fieldset>
      </div>

      <p className="delayed-call-lab__status" role="status">
        {status === 'idle' && '아직 예약하지 않았습니다.'}
        {status === 'waiting' && '함수 호출을 기다리고 있습니다.'}
        {status === 'fired' && `예약된 함수가 실행됐습니다. 받은 params: ${observation.receivedParams}.`}
        {status === 'cancelled' && `예약을 ${cancelRoute === 'kill' ? 'Tween 참조' : '함수 target'}로 취소했습니다.`}
      </p>

      <dl className="delayed-call-lab__observation">
        <div><dt>duration()</dt><dd>{observation.tweenDuration}</dd></div>
        <div><dt>delay()</dt><dd>{observation.tweenDelay}</dd></div>
        <div><dt>targets()[0] === 함수</dt><dd>{observation.targetIsTheFunction}</dd></div>
        <div><dt>parent가 남아 있나</dt><dd>{observation.stillScheduled}</dd></div>
      </dl>

      <pre className="delayed-call-lab__code"><code>{code}</code></pre>

      <div className="delayed-call-lab__panels">
        <article><h4>무엇이 달라졌나요?</h4><p>예약하면 남은 시간이 줄고, 실행되거나 취소되면 parent가 없어져 예약 목록에서 빠집니다.</p></article>
        <article><h4>무엇을 봐야 하나요?</h4><p><code>duration()</code>은 0이고 기다리는 시간은 <code>delay()</code>에 들어갑니다. target은 DOM이 아니라 호출할 함수입니다.</p></article>
        <article><h4>왜 이렇게 동작하나요?</h4><p>공식 설명대로 delayedCall은 함수를 target으로 삼고 <code>onComplete</code>에서 부르는 zero-duration Tween입니다.</p></article>
        <article><h4>실제로 언제 쓰나요?</h4><p>툴팁 닫기, 입력 완료 뒤 안내처럼 Timeline을 만들 필요가 없는 한 번의 지연 작업에 씁니다.</p></article>
      </div>

      <p className="delayed-call-lab__source">실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/timeline-callbacks-pauses/examples/DelayedCallLab/useDelayedCallAnimation.ts" /></p>
    </section>
  )
}
