/** reverse()의 인자별 시작 지점과 방향 스위치 변화를 조작·관찰·코드로 확인하는 학습 패널을 조립한다. */
import { useDirectionFlipAnimation } from './useDirectionFlipAnimation'
import type { DirectionFlipCommand } from './useDirectionFlipAnimation'
import './DirectionFlipLab.css'

export function DirectionFlipLab() {
  // runtime이 소유한 controls·관찰값·명령 action을 그대로 받아 화면에만 쓴다
  const { scope, placeAt, setPlaceAt, position, observation, lastCommand, descriptor, reducedMotion, run } =
    useDirectionFlipAnimation()

  // 방금 실행된 호출을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const callSyntax: Record<DirectionFlipCommand, string> = {
    placeAt: `tween.pause(${descriptor.placeAt})`,
    reverse: 'tween.reverse()',
    reverseFromEnd: 'tween.reverse(0)',
    reverseNegative: `tween.reverse(${descriptor.negativeFrom})`,
    play: 'tween.play()',
  }

  // 되감기 버튼들 — 인자만 다르고 부르는 메서드는 하나다
  const reverseCommands: { id: DirectionFlipCommand; label: string; note: string }[] = [
    { id: 'reverse', label: 'reverse()', note: '지금 자리에서' },
    { id: 'reverseFromEnd', label: 'reverse(0)', note: '맨 끝에서' },
    { id: 'reverseNegative', label: `reverse(${descriptor.negativeFrom})`, note: '공식 설명대로면 끝에서 1초 전' },
  ]

  // 마지막 호출과 그 직후 상태를 한 덩어리 코드로 직렬화한다
  const code = `// 이 예제가 미리 만들어 둔 Tween 하나입니다. duration이 ${descriptor.duration}초입니다.
const tween = gsap.to(target, {
  value: 100,
  duration: ${descriptor.duration},
  ease: 'none',
  paused: true,
})

// 방금 누른 버튼이 부른 호출입니다.
${lastCommand ? callSyntax[lastCommand] : '// 아직 아무 명령도 부르지 않았습니다.'}

// 그 직후 상태를 Tween에서 그대로 읽은 값입니다.
tween.time()     // → ${observation.time}
tween.reversed() // → ${observation.reversed}
tween.paused()   // → ${observation.paused}`

  return (
    <section className="direction-flip-lab" aria-labelledby="direction-flip-lab-title">
      <h3 id="direction-flip-lab-title">reverse()에 인자를 바꿔 가며 눌러 보기</h3>
      <p className="direction-flip-lab__goal">
        먼저 slider로 시각을 고르고 <code>pause(atTime)</code>을 눌러 표시자를 원하는 자리에 놓으세요. 그다음 아래 세 되감기 버튼을
        차례로 눌러 <strong>어느 지점에서 되감기가 시작되는지</strong>와 <strong>reversed()가 어떤 값이 되는지</strong>를 확인하세요.
      </p>

      <div className="direction-flip-lab__body" ref={scope}>
        <div className="direction-flip-lab__stage">
          {reducedMotion ? (
            <p className="direction-flip-lab__static">
              모션 감소 설정이 켜져 있어 움직이는 표시자를 그리지 않습니다. 아래 숫자만으로 같은 내용을 확인할 수 있습니다. 현재 위치는{' '}
              {Math.round(position)}%입니다.
            </p>
          ) : (
            <div className="direction-flip-lab__track">
              <span className="direction-flip-lab__marker" style={{ left: `${position}%` }} />
            </div>
          )}
          <p className="direction-flip-lab__scale">
            <span>0초 · 시작</span>
            <span>{descriptor.duration}초 · 끝</span>
          </p>
        </div>

        <div className="direction-flip-lab__controls">
          <fieldset>
            <legend>먼저 자리 잡기</legend>
            <label htmlFor="direction-flip-place">놓아 둘 시각</label>
            <output htmlFor="direction-flip-place">{placeAt}초</output>
            <input
              id="direction-flip-place"
              type="range"
              min="0"
              max={descriptor.duration}
              step="0.1"
              value={placeAt}
              onChange={(event) => setPlaceAt(Number(event.target.value))}
            />
            <button type="button" onClick={() => run('placeAt')}>
              pause(atTime)
            </button>
          </fieldset>

          <fieldset>
            <legend>되감기</legend>
            {reverseCommands.map((command) => (
              <button key={command.id} type="button" onClick={() => run(command.id)}>
                {command.label}
                <small>{command.note}</small>
              </button>
            ))}
          </fieldset>

          <fieldset>
            <legend>다시 앞으로</legend>
            <button type="button" onClick={() => run('play')}>
              play()
            </button>
          </fieldset>
        </div>
      </div>

      {/* 매 프레임 바뀌는 time은 넣지 않는다 — 넣으면 live region이 프레임마다 다시 읽힌다 */}
      <p className="direction-flip-lab__status" role="status">
        {lastCommand ? `방금 ${callSyntax[lastCommand]} 을(를) 불렀습니다.` : '아직 아무 명령도 부르지 않았습니다.'} 현재 상태 — 뒤로{' '}
        {String(observation.reversed)}, 멈춤 {String(observation.paused)}, 움직이는 중 {String(observation.active)}.
      </p>

      <dl className="direction-flip-lab__observation">
        {/* 매 프레임 바뀌는 값이라 output 대신 일반 요소로 둔다 — output은 스스로 live region이 된다 */}
        <div>
          <dt id="dfl-time">time()</dt>
          <dd aria-labelledby="dfl-time">{observation.time}초</dd>
        </div>
        <div>
          <dt id="dfl-reversed">reversed()</dt>
          <dd>
            <output aria-labelledby="dfl-reversed">{String(observation.reversed)}</output>
          </dd>
        </div>
        <div>
          <dt id="dfl-paused">paused()</dt>
          <dd>
            <output aria-labelledby="dfl-paused">{String(observation.paused)}</output>
          </dd>
        </div>
        <div>
          <dt id="dfl-active">isActive()</dt>
          <dd>
            <output aria-labelledby="dfl-active">{String(observation.active)}</output>
          </dd>
        </div>
      </dl>

      <pre className="direction-flip-lab__code">
        <code>{code}</code>
      </pre>

      <div className="direction-flip-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            세 버튼 모두 같은 <code>reverse()</code>인데 시작 지점이 다릅니다. 인자가 없으면 <strong>지금 자리</strong>,{' '}
            <code>0</code>이면 <strong>맨 끝</strong>, <code>{descriptor.negativeFrom}</code>이면 <strong>맨 처음</strong>으로
            갑니다. 그리고 어느 것을 눌러도 <code>reversed()</code>는 <code>true</code>가 됩니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            버튼을 누른 직후 <strong>time()</strong> 한 칸을 먼저 보세요. <code>reverse(0)</code>은 {descriptor.duration}초로 뛰고,{' '}
            <code>reverse({descriptor.negativeFrom})</code>은 <strong>0초로 잘립니다.</strong> 공식 설명대로라면{' '}
            {descriptor.duration - 1}초여야 하는 자리입니다. 그다음 <strong>reversed()</strong>가 <code>true</code>인 것을
            확인하세요.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            되감는 입장에서는 <strong>0이 출발선</strong>이고 그 출발선이 animation의 끝입니다. 그래서 <code>reverse(0)</code>이
            맨 끝으로 갑니다. 음수는 공식 문서가 끝 기준이라고 적었지만 설치본 3.15.0은 그렇게 환산하지 않고 0으로 잘랐습니다. 끝에서
            얼마 전부터 되감고 싶다면 <strong>양수 초를 직접 계산해</strong> 넘기세요.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            열고 닫는 UI에 그대로 쓰입니다. 메뉴를 여는 Tween 하나만 만들어 두고, 닫을 때는 <code>reverse()</code>를 부르면 됩니다. 열린
            상태에서 시작해야 하는 화면이라면 <code>reverse(0)</code>으로 맨 끝에 놓고 되감으면 닫히는 모습만 보여 줄 수 있습니다.
          </p>
        </article>
      </div>

      <p className="direction-flip-lab__source">
        실행 코드 위치 · <code>examples/DirectionFlipLab/useDirectionFlipAnimation.ts</code>
      </p>
    </section>
  )
}
