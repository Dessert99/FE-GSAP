/** target으로 무엇을 넘겼는지에 따라 targets()가 어떻게 달라지는지를 조작·관찰·코드로 동시에 확인하는 학습 패널을 조립한다. */
import type { TargetMode } from './useTargetsReadbackAnimation'
import { boxCount, useTargetsReadbackAnimation } from './useTargetsReadbackAnimation'
import './TargetsReadbackLab.css'

// radio에 노출할 네 가지 target 형태 — 공식 targets 인자 설명이 나열한 순서를 그대로 따른다
const modeOptions: { value: TargetMode; label: string; hint: string }[] = [
  { value: 'selector', label: 'selector text', hint: `'.box' — 매치되는 상자 ${boxCount}개 전부` },
  { value: 'element', label: 'element 직접 참조', hint: '1번 상자 하나' },
  { value: 'elementArray', label: 'element 배열', hint: '1번과 2번 상자' },
  { value: 'plainObject', label: '일반 JavaScript object', hint: 'DOM이 아닌 { score: 0 }' },
]

// 화면에 그릴 상자 번호 — selector text가 몇 개를 잡는지 눈으로 세기 위한 고정 목록이다
const boxLabels = Array.from({ length: boxCount }, (_, index) => `${index + 1}번 상자`)

export function TargetsReadbackLab() {
  // runtime이 소유한 controls·descriptor·관찰값을 그대로 받아 화면에만 쓴다
  const { scope, mode, setMode, duration, setDuration, descriptor, observation, status, reducedMotion, run } =
    useTargetsReadbackAnimation()

  // 일반 object 모드의 실제 onUpdate 관찰 단계만 코드 패널에 덧붙인다
  const onUpdateLines =
    descriptor.mode === 'plainObject'
      ? `    onUpdate() {
      setObservation((previous) => ({
        ...previous,
        plainObjectScore: Math.round(plainObject.score),
      }))
    },
`
      : ''
  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `const tweenRef = useRef(null)

useGSAP(() => {
  const boxes = gsap.utils.toArray('.targets-readback-lab__box', scope.current)
  const plainObject = { score: 0 }

  // 모든 모드가 같은 출발점에서 시작합니다.
  gsap.set(boxes, { x: 0 })

  // 1. 첫 인자로 무엇을 넘길지가 targets()의 내용을 정합니다.
  const tween = gsap.to(${descriptor.targetExpression}, {
    ${descriptor.propertyLine},
    duration: ${descriptor.effectiveDuration},
    ease: 'none',
    paused: true,
${onUpdateLines}  })

  // 2. 재생하기 전에도 물어볼 수 있습니다.
  const targets = tween.targets() // 길이 ${observation.count}
  targets === tween.targets() // ${observation.sameArrayReference}
  tweenRef.current = tween

  return () => {
    tweenRef.current = null
  }
}, { scope, dependencies: [descriptor], revertOnUpdate: true })

// 실행 버튼은 준비된 같은 Tween을 처음부터 재생합니다.
function run() {
  tweenRef.current?.restart()
}`

  return (
    <section className="targets-readback-lab" aria-labelledby="targets-readback-lab-title">
      <h3 id="targets-readback-lab-title">무엇을 넘기면 targets()에 무엇이 들어오나</h3>
      <p className="targets-readback-lab__goal">
        네 가지 형태 중 하나를 골라 Tween을 만듭니다. 아직 재생하지 않은 상태에서 <code>targets()</code>가 무엇을 돌려주는지 먼저 읽고,
        그다음 실행해서 <strong>정말 그것들만 움직이는지</strong> 확인하세요.
      </p>

      <div className="targets-readback-lab__body" ref={scope}>
        <div className="targets-readback-lab__stage">
          <ul className="targets-readback-lab__boxes">
            {boxLabels.map((label) => (
              <li key={label}>
                <span className="targets-readback-lab__box" data-label={label}>
                  {label}
                </span>
              </li>
            ))}
          </ul>
          <p className="targets-readback-lab__score">
            DOM이 아닌 object의 <code>score</code> ·{' '}
            <output>{observation.plainObjectScore === null ? '이 모드에서는 쓰지 않음' : observation.plainObjectScore}</output>
          </p>
        </div>

        <fieldset className="targets-readback-lab__controls">
          <legend>조절할 값</legend>

          <div className="targets-readback-lab__radio-group" role="radiogroup" aria-labelledby="targets-readback-mode-label">
            <p id="targets-readback-mode-label">gsap.to()의 첫 인자</p>
            {modeOptions.map((option) => (
              <label key={option.value} htmlFor={`targets-readback-mode-${option.value}`}>
                <input
                  id={`targets-readback-mode-${option.value}`}
                  type="radio"
                  name="targets-readback-mode"
                  value={option.value}
                  checked={mode === option.value}
                  onChange={() => setMode(option.value)}
                />
                <span>
                  {option.label}
                  <small>{option.hint}</small>
                </span>
              </label>
            ))}
          </div>

          <label htmlFor="targets-readback-duration">duration</label>
          <output htmlFor="targets-readback-duration">{duration}초</output>
          <input
            id="targets-readback-duration"
            type="range"
            min="0.2"
            max="2"
            step="0.1"
            value={duration}
            onChange={(event) => setDuration(Number(event.target.value))}
          />

          <button type="button" onClick={run}>
            실행
          </button>
        </fieldset>
      </div>

      <p className="targets-readback-lab__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 이동 없이 결과만 표시합니다.)' : ''}
      </p>

      <div className="targets-readback-lab__table-wrap">
        <table className="targets-readback-lab__table">
          <caption>재생 전에 tween.targets()를 그대로 읽은 결과</caption>
          <thead>
            <tr>
              <th scope="col">읽은 식</th>
              <th scope="col">결과</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <code>tween.targets().length</code>
              </th>
              <td>{observation.count}</td>
            </tr>
            {observation.entries.map((entry, index) => (
              <tr key={entry + String(index)}>
                <th scope="row">
                  <code>tween.targets()[{index}]</code>
                </th>
                <td>{entry}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">
                <code>tween.targets() === tween.targets()</code>
              </th>
              <td>{String(observation.sameArrayReference)} · 같은 배열을 그대로 돌려줍니다</td>
            </tr>
          </tbody>
        </table>
      </div>

      <pre className="targets-readback-lab__code">
        <code>{code}</code>
      </pre>

      <div className="targets-readback-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            첫 인자만 바꿨을 뿐인데 표의 줄 수가 달라집니다. <strong>selector text</strong>는 매치된 상자 {boxCount}개가 모두 들어오고,{' '}
            <strong>element 직접 참조</strong>는 하나만 들어옵니다. Tween의 나머지 설정은 하나도 건드리지 않았습니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <strong>재생하기 전에 이미 표가 채워져 있다는 점</strong>입니다. <code>targets()</code>는 애니메이션 결과가 아니라{' '}
            <strong>만들 때 확정된 명단</strong>입니다. 그리고 <strong>일반 JavaScript object</strong>를 고르면 상자는 하나도 움직이지
            않고 아래 <code>score</code> 숫자만 올라갑니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서는 <code>targets()</code>를 <strong>"Tween이 property를 animate하는 target object들의 배열"</strong>이라고
            정의하고, selector text를 썼다면 <strong>"그 query string에 매치된 DOM element들"</strong>이 담긴다고 밝힙니다. GSAP은 만드는
            순간 selector를 한 번 풀어서 명단으로 굳혀 둡니다. 그래서 재생 여부와 무관하게 답할 수 있습니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            selector가 예상한 element를 잡았는지 확인할 때 쓸 수 있습니다. <code>tween.targets().length</code>가 <code>0</code>이면
            Tween을 만들 때 selector와 일치하는 element가 없었다는 뜻입니다. 대상별 정보를 읽어야 한다면 반환된 배열을 순회할 수도
            있습니다.
          </p>
        </article>
      </div>

      <p className="targets-readback-lab__source">
        실행 코드 위치 · <code>examples/TargetsReadbackLab/useTargetsReadbackAnimation.ts</code>
      </p>
    </section>
  )
}
