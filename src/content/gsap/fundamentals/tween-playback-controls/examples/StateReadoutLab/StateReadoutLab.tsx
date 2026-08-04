/** 괄호에 값을 넣었는지에 따라 돌려받는 것이 달라지는 것을 조작·반환값 관찰·코드로 확인하는 학습 패널을 조립한다. */
import { useStateReadoutAnimation } from './useStateReadoutAnimation'
import type { StateReadoutCommand } from './useStateReadoutAnimation'
import './StateReadoutLab.css'

// 괄호를 비운 호출들 — 지금 값을 물어보기만 한다
const getterCommands: { id: StateReadoutCommand; label: string }[] = [
  { id: 'readPaused', label: 'tween.paused()' },
  { id: 'readReversed', label: 'tween.reversed()' },
  { id: 'readActive', label: 'tween.isActive()' },
]

// 괄호에 값을 넣은 호출들 — 상태를 바꾼다
const setterCommands: { id: StateReadoutCommand; label: string; note: string }[] = [
  { id: 'setPausedFalse', label: 'tween.paused(false)', note: '움직이게 한다' },
  { id: 'setPausedTrue', label: 'tween.paused(true)', note: '멈춘다' },
  { id: 'toggleReversed', label: 'tween.reversed(!tween.reversed())', note: '방향을 뒤집는다' },
]

export function StateReadoutLab() {
  // runtime이 소유한 반환값·관찰값·명령 action을 그대로 받아 화면에만 쓴다
  const { scope, position, result, observation, lastCommand, descriptor, reducedMotion, run } = useStateReadoutAnimation()

  // 방금 실행된 호출을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const callSyntax: Record<StateReadoutCommand, string> = {
    readPaused: 'tween.paused()',
    readReversed: 'tween.reversed()',
    readActive: 'tween.isActive()',
    setPausedTrue: 'tween.paused(true)',
    setPausedFalse: 'tween.paused(false)',
    toggleReversed: 'tween.reversed(!tween.reversed())',
    recenter: `tween.pause(${descriptor.startAt})`,
  }

  // 마지막 호출과 그 호출이 돌려준 것을 한 덩어리 코드로 직렬화한다
  const code = `// 이 예제가 미리 만들어 둔 Tween 하나입니다. ${descriptor.startAt}초 지점에 멈춰 둡니다.
const tween = gsap.to(target, {
  value: 100,
  duration: ${descriptor.duration},
  ease: 'none',
  paused: true,
})
tween.pause(${descriptor.startAt})

// 방금 누른 버튼이 부른 호출과 그 호출이 돌려준 것입니다.
${lastCommand ? `const returned = ${callSyntax[lastCommand]}` : '// 아직 아무것도 부르지 않았습니다.'}
// → ${result.text}`

  return (
    <section className="state-readout-lab" aria-labelledby="state-readout-lab-title">
      <h3 id="state-readout-lab-title">괄호를 비우고 눌러 보고, 값을 넣고 눌러 보기</h3>
      <p className="state-readout-lab__goal">
        왼쪽 버튼들은 괄호가 비어 있고 오른쪽 버튼들은 괄호에 값이 있습니다. 누를 때마다 <strong>그 호출이 무엇을 돌려줬는지</strong>가
        아래에 그대로 표시됩니다. 먼저 <code>tween.paused(false)</code>로 움직이게 한 뒤 <code>tween.isActive()</code>를 눌러 보세요.
      </p>

      <div className="state-readout-lab__body" ref={scope}>
        <div className="state-readout-lab__stage">
          {reducedMotion ? (
            <p className="state-readout-lab__static">
              모션 감소 설정이 켜져 있어 움직이는 표시자를 그리지 않습니다. 아래 숫자만으로 같은 내용을 확인할 수 있습니다. 현재 위치는{' '}
              {Math.round(position)}%입니다.
            </p>
          ) : (
            <div className="state-readout-lab__track">
              <span className="state-readout-lab__marker" style={{ left: `${position}%` }} />
            </div>
          )}

          <div className="state-readout-lab__result">
            <p className="state-readout-lab__result-label">
              {lastCommand ? `${callSyntax[lastCommand]} 이(가) 돌려준 것` : '버튼을 눌러 보세요'}
            </p>
            {/* 아래 role="status" 문단이 이미 같은 내용을 읽어 주므로 여기서는 live region을 만들지 않는다 */}
            <p className="state-readout-lab__result-value">{result.text}</p>
            <p className="state-readout-lab__result-kind">
              {result.kind === 'tween'
                ? '값을 넣었으니 setter입니다. 그래서 점을 찍어 이어 쓸 수 있습니다.'
                : result.kind === 'boolean'
                  ? '값을 넣지 않았으니 getter입니다. Boolean이라 이어 쓸 수 없습니다.'
                  : '괄호가 비었는지 아닌지에 따라 이 자리의 답이 달라집니다.'}
            </p>
          </div>
        </div>

        <div className="state-readout-lab__controls">
          <fieldset>
            <legend>괄호를 비우고 (읽기)</legend>
            {getterCommands.map((command) => (
              <button key={command.id} type="button" onClick={() => run(command.id)}>
                {command.label}
              </button>
            ))}
          </fieldset>

          <fieldset>
            <legend>값을 넣고 (쓰기)</legend>
            {setterCommands.map((command) => (
              <button key={command.id} type="button" onClick={() => run(command.id)}>
                {command.label}
                <small>{command.note}</small>
              </button>
            ))}
          </fieldset>

          <fieldset>
            <legend>다시 해보기</legend>
            <button type="button" onClick={() => run('recenter')}>
              tween.pause({descriptor.startAt})
              <small>가운데로 되돌린다</small>
            </button>
          </fieldset>
        </div>
      </div>

      {/* 매 프레임 바뀌는 time은 넣지 않는다 — 넣으면 live region이 프레임마다 다시 읽힌다 */}
      <p className="state-readout-lab__status" role="status">
        {lastCommand
          ? `방금 ${callSyntax[lastCommand]} 을(를) 불렀고 ${result.text} 을(를) 돌려받았습니다.`
          : '아직 아무것도 부르지 않았습니다.'}{' '}
        현재 상태 — 멈춤 {String(observation.paused)}, 뒤로 {String(observation.reversed)}, 움직이는 중 {String(observation.active)}.
      </p>

      <dl className="state-readout-lab__observation">
        <div>
          <dt id="srl-paused">paused 스위치</dt>
          <dd>
            <output aria-labelledby="srl-paused">{String(observation.paused)}</output>
          </dd>
        </div>
        <div>
          <dt id="srl-reversed">reversed 스위치</dt>
          <dd>
            <output aria-labelledby="srl-reversed">{String(observation.reversed)}</output>
          </dd>
        </div>
        <div>
          <dt id="srl-active">계산된 isActive</dt>
          <dd>
            <output aria-labelledby="srl-active">{String(observation.active)}</output>
          </dd>
        </div>
        {/* 매 프레임 바뀌는 값이라 output 대신 일반 요소로 둔다 — output은 스스로 live region이 된다 */}
        <div>
          <dt id="srl-time">time()</dt>
          <dd aria-labelledby="srl-time">{observation.time}초</dd>
        </div>
      </dl>

      <pre className="state-readout-lab__code">
        <code>{code}</code>
      </pre>

      <div className="state-readout-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            같은 <code>paused</code>라는 이름인데 돌려주는 것이 다릅니다. 괄호를 비우면 <code>true</code>나 <code>false</code>가 오고,
            값을 넣으면 <strong>Tween 자신</strong>이 옵니다. 화면의 판정은 돌려받은 것을 <code>===</code>로 Tween과 직접 비교해서
            내린 결과입니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <code>tween.isActive()</code>를 <strong>멈춘 상태</strong>와 <strong>움직이는 상태</strong>에서 각각 눌러 비교하세요.
            멈춰 있으면 <code>false</code>, <code>paused(false)</code>로 풀고 움직이는 동안 누르면 <code>true</code>입니다. 끝까지 간
            뒤에 다시 누르면 또 <code>false</code>가 됩니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 signature가 <code>[Boolean | self]</code>로 적혀 있기 때문입니다. GSAP은 <strong>인자를 몇 개 받았는지</strong>를 보고
            읽기와 쓰기를 가릅니다. <code>isActive()</code>만 반환 타입이 <code>Boolean</code> 하나인데, 이 값은 우리가 정하는 게
            아니라 두 스위치와 playhead 위치로 계산되기 때문입니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            버튼 하나로 열고 닫는 UI에서 <code>tween.reversed(!tween.reversed())</code> 한 줄이면 토글이 끝납니다. 그리고 애니메이션이
            끝나기 전에 다시 눌리는 것을 막고 싶을 때 <code>if (tween.isActive()) return</code>으로 걸러 냅니다. 공식 데모가 정확히 이
            패턴입니다.
          </p>
        </article>
      </div>

      <p className="state-readout-lab__source">
        실행 코드 위치 · <code>examples/StateReadoutLab/useStateReadoutAnimation.ts</code>
      </p>
    </section>
  )
}
