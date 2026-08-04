/** 세 명령의 차이를 버튼 조작·상태 관찰·코드로 동시에 확인하는 학습 패널을 조립한다. */
import { useStopAndGoAnimation } from './useStopAndGoAnimation'
import type { StopAndGoCommand } from './useStopAndGoAnimation'
import './StopAndGoLab.css'

// 인자 없이 지금 자리를 기준으로 동작하는 세 명령
const plainCommands: { id: StopAndGoCommand; label: string }[] = [
  { id: 'play', label: 'play()' },
  { id: 'pause', label: 'pause()' },
  { id: 'resume', label: 'resume()' },
]

// 아래 slider 값을 인자로 받아 점프까지 함께 하는 두 명령
const jumpCommands: { id: StopAndGoCommand; label: string }[] = [
  { id: 'playFrom', label: 'play(from)' },
  { id: 'pauseAt', label: 'pause(atTime)' },
]

export function StopAndGoLab() {
  // runtime이 소유한 controls·관찰값·명령 action을 그대로 받아 화면에만 쓴다
  const { scope, jumpTo, setJumpTo, position, observation, lastCommand, descriptor, reducedMotion, run } =
    useStopAndGoAnimation()

  // 방금 실행된 호출을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const callSyntax: Record<StopAndGoCommand, string> = {
    pause: 'tween.pause()',
    pauseAt: `tween.pause(${descriptor.jumpTo})`,
    play: 'tween.play()',
    playFrom: `tween.play(${descriptor.jumpTo})`,
    resume: 'tween.resume()',
    turnBackward: 'tween.reversed(true)',
  }

  // 마지막 호출과 그 직후 상태를 한 덩어리 코드로 직렬화한다
  const code = `// 이 예제가 미리 만들어 둔 Tween 하나입니다.
const tween = gsap.to(target, {
  value: 100,
  duration: ${descriptor.duration},
  ease: 'none',
  paused: true,
})

// 방금 누른 버튼이 부른 호출입니다.
${lastCommand ? callSyntax[lastCommand] : '// 아직 아무 명령도 부르지 않았습니다.'}

// 그 직후 상태를 Tween에서 그대로 읽은 값입니다.
tween.paused()   // → ${observation.paused}
tween.reversed() // → ${observation.reversed}
tween.isActive() // → ${observation.active}`

  return (
    <section className="stop-and-go-lab" aria-labelledby="stop-and-go-lab-title">
      <h3 id="stop-and-go-lab-title">같은 Tween에 세 명령을 눌러 보기</h3>
      <p className="stop-and-go-lab__goal">
        표시자 하나가 왼쪽에서 오른쪽으로 3초 동안 움직입니다. 자동으로 시작하지 않으니 <code>play()</code>를 먼저 누르세요. 목표는{' '}
        <strong>움직이는 중에 방향을 뒤로 돌려 놓고, 멈췄다가, play()와 resume()을 각각 눌러 보는 것</strong>입니다.
      </p>

      <div className="stop-and-go-lab__body" ref={scope}>
        <div className="stop-and-go-lab__stage">
          {reducedMotion ? (
            <p className="stop-and-go-lab__static">
              모션 감소 설정이 켜져 있어 움직이는 표시자를 그리지 않습니다. 아래 숫자만으로 같은 내용을 확인할 수 있습니다. 현재 위치는{' '}
              {Math.round(position)}%입니다.
            </p>
          ) : (
            <div className="stop-and-go-lab__track">
              <span className="stop-and-go-lab__marker" style={{ left: `${position}%` }} />
            </div>
          )}
          <p className="stop-and-go-lab__scale">
            <span>0초 · 시작</span>
            <span>{descriptor.duration}초 · 끝</span>
          </p>
        </div>

        <div className="stop-and-go-lab__controls">
          <fieldset>
            <legend>지금 자리에서</legend>
            {plainCommands.map((command) => (
              <button key={command.id} type="button" onClick={() => run(command.id)}>
                {command.label}
              </button>
            ))}
          </fieldset>

          <fieldset>
            <legend>방향 스위치 준비</legend>
            <button type="button" onClick={() => run('turnBackward')}>
              reversed(true)
            </button>
            <p className="stop-and-go-lab__hint">
              방향만 뒤로 돌려 둡니다. 이 문법은 05단계에서 자세히 봅니다. 이걸 누른 뒤 <code>resume()</code>과 <code>play()</code>를
              차례로 눌러 보세요.
            </p>
          </fieldset>

          <fieldset>
            <legend>인자를 주고</legend>
            <label htmlFor="stop-and-go-jump">점프할 시각</label>
            <output htmlFor="stop-and-go-jump">{jumpTo}초</output>
            <input
              id="stop-and-go-jump"
              type="range"
              min="0"
              max={descriptor.duration}
              step="0.1"
              value={jumpTo}
              onChange={(event) => setJumpTo(Number(event.target.value))}
            />
            {jumpCommands.map((command) => (
              <button key={command.id} type="button" onClick={() => run(command.id)}>
                {command.label}
              </button>
            ))}
            <p className="stop-and-go-lab__hint">
              slider를 0으로 두고 <code>pause(atTime)</code>을 누르면 처음으로 되돌아갑니다.
            </p>
          </fieldset>
        </div>
      </div>

      {/* 매 프레임 바뀌는 time은 넣지 않는다 — 넣으면 live region이 프레임마다 다시 읽힌다 */}
      <p className="stop-and-go-lab__status" role="status">
        {lastCommand ? `방금 ${callSyntax[lastCommand]} 을(를) 불렀습니다.` : '아직 아무 명령도 부르지 않았습니다.'} 현재 상태 —
        멈춤 {String(observation.paused)}, 뒤로 {String(observation.reversed)}, 움직이는 중 {String(observation.active)}.
      </p>

      <dl className="stop-and-go-lab__observation">
        <div>
          <dt id="sag-paused">paused()</dt>
          <dd>
            <output aria-labelledby="sag-paused">{String(observation.paused)}</output>
          </dd>
        </div>
        <div>
          <dt id="sag-reversed">reversed()</dt>
          <dd>
            <output aria-labelledby="sag-reversed">{String(observation.reversed)}</output>
          </dd>
        </div>
        <div>
          <dt id="sag-active">isActive()</dt>
          <dd>
            <output aria-labelledby="sag-active">{String(observation.active)}</output>
          </dd>
        </div>
        {/* 매 프레임 바뀌는 값이라 output 대신 일반 요소로 둔다 — output은 스스로 live region이 된다 */}
        <div>
          <dt id="sag-time">time · progress</dt>
          <dd aria-labelledby="sag-time">
            {observation.time}초 · {observation.progress}
          </dd>
        </div>
      </dl>

      <pre className="stop-and-go-lab__code">
        <code>{code}</code>
      </pre>

      <div className="stop-and-go-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <code>reversed(true)</code>를 누른 뒤 <code>resume()</code>을 부르면 표시자가 <strong>왼쪽으로</strong> 갑니다. 같은
            자리에서 <code>play()</code>를 부르면 <strong>오른쪽으로</strong> 갑니다. 두 명령 모두 멈춤은 똑같이 풀었는데 가는 방향이
            반대입니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            관찰 패널의 <strong>reversed()</strong> 한 칸만 보세요. <code>resume()</code> 뒤에는 <code>true</code>가 그대로 남아 있고,{' '}
            <code>play()</code> 뒤에는 <code>false</code>로 바뀝니다. <code>paused()</code>는 두 경우 모두 <code>false</code>라 구분에
            쓸 수 없습니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서가 그렇게 정해 두었습니다. <code>play()</code>는 "instance가 paused도 reversed도 아니게 만든다"고 적혀 있어서{' '}
            <strong>두 스위치를 모두 건드립니다.</strong> <code>resume()</code>은 "방향을 바꾸지 않고 재개한다"고 적혀 있어서{' '}
            <strong>멈춤 스위치 하나만 건드립니다.</strong>
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            마우스를 올리면 멈추고 떼면 이어 가는 자동 슬라이드에는 <code>resume()</code>이 맞습니다. 방향을 기억해야 하기 때문입니다.
            반대로 "처음처럼 앞으로 다시 보여 줘"라는 버튼에는 <code>play()</code>가 맞습니다. 이전에 무엇을 하고 있었든 앞으로
            되돌려 주기 때문입니다.
          </p>
        </article>
      </div>

      <p className="stop-and-go-lab__source">
        실행 코드 위치 · <code>examples/StopAndGoLab/useStopAndGoAnimation.ts</code>
      </p>
    </section>
  )
}
