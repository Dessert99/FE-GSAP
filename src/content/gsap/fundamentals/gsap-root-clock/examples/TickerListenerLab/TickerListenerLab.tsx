/** ticker에 listener를 붙여 매 tick 넘어오는 time·deltaTime·frame을 직접 읽어 보는 학습 패널이다. */
import { useTickerListenerRuntime } from './useTickerListenerRuntime'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './TickerListenerLab.css'

export function TickerListenerLab() {
  // runtime이 소유한 관찰값과 등록·해제 action을 그대로 받아 화면에만 쓴다
  const { mode, chooseMode, listening, observation, status, reducedMotion, displayIntervalSeconds, start, stop } =
    useTickerListenerRuntime()

  // 실제 실행에 쓰인 once 인자와 방금 받은 값을 코드 문법으로만 포맷한다
  const code = `import gsap from 'gsap'
import { useEffect, useRef } from 'react'

function TickerListener() {
  const listenerRef = useRef(null)

  // 매 tick 실행할 함수를 ticker에 등록합니다 (두 번째 인자가 once)
function readTick(time, deltaTime, frame) {
  // time      → ${observation.time}
  // deltaTime → ${observation.deltaTime}
  // frame     → ${observation.frame}
  // 60fps 비율 → ${observation.deltaRatio60}
  if (${mode === 'once'}) listenerRef.current = null
}

  function start() {
    if (listenerRef.current) return
    listenerRef.current = gsap.ticker.add(readTick, ${mode === 'once'})
  }

  function stop() {
    const listener = listenerRef.current
    if (!listener) return
    // once일 때 반환되는 wrapper까지 정확히 제거합니다
    gsap.ticker.remove(listener)
    listenerRef.current = null
  }

  useEffect(() => () => {
    const listener = listenerRef.current
    if (listener) gsap.ticker.remove(listener)
    listenerRef.current = null
  }, [])

  return <><button onClick={start}>listener 붙이기</button><button onClick={stop}>listener 떼기</button></>
}`

  return (
    <section className="ticker-listener-lab" aria-labelledby="ticker-listener-lab-title">
      <h3 id="ticker-listener-lab-title">매 frame 오는 신호를 직접 받아 보기</h3>
      <p className="ticker-listener-lab__goal">
        GSAP이 animation을 진행시킬 때 쓰는 그 신호에 <strong>내 함수를 얹습니다.</strong> 아무것도 움직이지 않습니다. 매 tick 넘어오는{' '}
        <code>time</code>, <code>deltaTime</code>, <code>frame</code>이 어떤 값인지만 봅니다.
      </p>

      <div className="ticker-listener-lab__body">
        <dl className="ticker-listener-lab__observation">
          <div>
            <dt id="tll-time">time (초)</dt>
            <dd>
              <output aria-labelledby="tll-time">{observation.time}</output>
            </dd>
          </div>
          <div>
            <dt id="tll-delta">deltaTime (밀리초)</dt>
            <dd>
              <output aria-labelledby="tll-delta">{observation.deltaTime}</output>
            </dd>
          </div>
          <div>
            <dt id="tll-frame">frame (tick 번호)</dt>
            <dd>
              <output aria-labelledby="tll-frame">{observation.frame}</output>
            </dd>
          </div>
          <div>
            <dt id="tll-ratio">deltaRatio() · 60fps 기준</dt>
            <dd>
              <output aria-labelledby="tll-ratio">{observation.deltaRatio60}</output>
            </dd>
          </div>
          <div className="ticker-listener-lab__count">
            <dt id="tll-count">내 함수가 불린 횟수</dt>
            <dd>
              <output aria-labelledby="tll-count">{observation.tickCount}회</output>
            </dd>
          </div>
        </dl>

        <div className="ticker-listener-lab__controls">
          <fieldset>
            <legend>add()의 once 인자</legend>
            <label>
              <input
                type="radio"
                name="ticker-listen-mode"
                value="once"
                checked={mode === 'once'}
                onChange={() => chooseMode('once')}
              />
              once: true — 한 tick만 받고 자동 제거
            </label>
            <label>
              <input
                type="radio"
                name="ticker-listen-mode"
                value="continuous"
                checked={mode === 'continuous'}
                onChange={() => chooseMode('continuous')}
              />
              once: false — 뗄 때까지 계속 받기
            </label>
          </fieldset>
          <button type="button" onClick={start} disabled={listening}>
            listener 붙이기
          </button>
          <button type="button" onClick={stop} disabled={!listening}>
            listener 떼기
          </button>
        </div>
      </div>

      <p className="ticker-listener-lab__status" role="status">
        {status}
      </p>

      <pre className="ticker-listener-lab__code">
        <code>{code}</code>
      </pre>

      <div className="ticker-listener-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            지금까지 GSAP은 알아서 움직였습니다. 이제 <strong>그 알아서 움직이던 신호에 내 함수가 끼어들었습니다.</strong>{' '}
            <code>once: true</code>로 붙이면 횟수가 1에서 멈추고, <code>false</code>로 붙이면 뗄 때까지 계속 올라갑니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <code>frame</code>은 <strong>1씩</strong> 올라가고 <code>time</code>은 <strong>초 단위</strong>로 늘어납니다.{' '}
            <code>deltaTime</code>은 화면이 원활하면 16 언저리에서 흔들립니다. 표시는 {displayIntervalSeconds}초마다 갱신하지만{' '}
            <strong>불린 횟수는 매 tick 세므로</strong> 두 숫자의 증가 속도가 다릅니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서는 ticker를 <strong>GSAP 엔진의 심장 박동</strong>이라고 부릅니다. 매{' '}
            <code>requestAnimationFrame</code>마다 globalTimeline을 갱신하고, 그 <strong>갱신이 끝난 뒤</strong> 등록된 listener를
            순서대로 부릅니다. 그래서 내 함수는 GSAP이 값을 다 쓴 뒤의 화면을 봅니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            GSAP으로 표현하기 어려운 <strong>매 frame 계산</strong>을 얹을 때 씁니다. 물리 계산, 커서 추적, 게임 루프처럼요. 이때{' '}
            <code>deltaTime</code>이나 <code>deltaRatio()</code>를 곱해야 frame rate가 흔들려도 속도가 일정합니다.
          </p>
        </article>
      </div>

      <p className="ticker-listener-lab__note">
        이 예제는 화면에서 아무것도 움직이지 않고 숫자만 바꿉니다.
        {reducedMotion
          ? ' 모션 감소 설정이 켜져 있어 숫자 갱신 간격을 0.5초로 늘렸습니다.'
          : ' 숫자 갱신 간격은 0.1초입니다.'}{' '}
        자동으로 시작하지 않으므로 붙이지 않으면 아무 일도 일어나지 않습니다.
      </p>

      <p className="ticker-listener-lab__source">
        실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/gsap-root-clock/examples/TickerListenerLab/useTickerListenerRuntime.ts" />
      </p>
    </section>
  )
}
