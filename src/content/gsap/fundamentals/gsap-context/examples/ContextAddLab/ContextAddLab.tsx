/** 클릭 시점 애니메이션의 기록 여부를 네 경로로 비교하는 컨트롤·무대·관찰 패널·학습 패널을 조립한다. */
import { creationModes, useContextAddAnimation } from './useContextAddAnimation'
import './ContextAddLab.css'

/** 각 경로가 기록되는지 아닌지를 표에서 한 단어로 알려 준다. */
const recordedByMode: Record<string, string> = {
  outside: '기록 안 됨',
  named: '기록됨',
  immediate: '기록됨',
  ignored: '기록 안 됨 (일부러 제외)',
}

export function ContextAddLab() {
  // runtime이 소유한 실행 descriptor와 관찰값을 그대로 받아 화면에만 쓴다
  const { scope, mode, setMode, descriptor, stage, observation, status, reducedMotion, createContext, makeAnimation, revert } =
    useContextAddAnimation()

  // 실행에 쓰인 경로와 값을 코드 문법으로만 포맷한다 — 의미를 다시 조립하지 않는다
  const bodyByMode: Record<string, string> = {
    outside: `// Context를 거치지 않습니다
gsap.to('${descriptor.selector}', { x: ${descriptor.x}, duration: ${descriptor.duration} })`,
    named: `// 만들 때 등록해 둔 메서드로 부릅니다
ctx.onClick()`,
    immediate: `// 함수를 첫 인자로 넘기면 그 자리에서 실행됩니다
ctx.add(() => {
  gsap.to('${descriptor.selector}', { x: ${descriptor.x}, duration: ${descriptor.duration} })
})`,
    ignored: `// 일부러 기록에서 뺍니다
ctx.ignore(() => {
  gsap.to('${descriptor.selector}', { x: ${descriptor.x}, duration: ${descriptor.duration} })
})`,
  }

  const code = `// 1. 함수 안에서는 이름만 등록하고 애니메이션은 만들지 않습니다
const ctx = gsap.context((self) => {
  self.add('onClick', () => {
    gsap.to('${descriptor.selector}', { x: ${descriptor.x}, duration: ${descriptor.duration} })
  })
}, containerRef)

// 2. 클릭이 일어난 지금, 고른 방법으로 만듭니다
${bodyByMode[descriptor.mode]}

// 3. 기록된 것만 되돌립니다 — 지금 기록 ${observation.recorded}개
ctx.revert()`

  return (
    <section className="context-add-lab" aria-labelledby="context-add-lab-title">
      <h3 id="context-add-lab-title">클릭한 뒤에 만든 애니메이션은 누가 기록하나</h3>
      <p className="context-add-lab__goal">
        목표는 하나입니다 — <strong>Context 함수가 끝난 뒤 만든 애니메이션도 함께 되돌릴 수 있는가</strong>. 아래 네 경로는 모두
        같은 <code>gsap.to()</code>를 실행합니다. 다른 것은 <strong>감싸는 방법</strong>뿐입니다.
      </p>

      <div className="context-add-lab__body" ref={scope}>
        <div className="context-add-lab__stage">
          <div className="context-add-lab__box" />
        </div>

        <div className="context-add-lab__side">
          <dl className="context-add-lab__observation">
            <div>
              <dt id="cal-recorded">Context가 기록한 항목 수</dt>
              <dd>
                <output aria-labelledby="cal-recorded">{observation.recorded}개</output>
              </dd>
            </div>
            <div>
              <dt id="cal-x">박스의 지금 x</dt>
              <dd>
                <output aria-labelledby="cal-x">{observation.boxX}</output>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <fieldset className="context-add-lab__controls">
        <legend>클릭 시점 애니메이션을 어떻게 만들까요?</legend>
        {creationModes.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name="context-add-mode"
              value={option.value}
              checked={mode === option.value}
              onChange={() => setMode(option.value)}
            />
            <span>
              {option.label} <code>{option.call}</code>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="context-add-lab__buttons">
        <button type="button" onClick={createContext}>
          1. Context 만들기
        </button>
        <button type="button" onClick={makeAnimation} disabled={stage === 'idle'}>
          2. 클릭 시점 애니메이션 만들기
        </button>
        <button type="button" onClick={revert} disabled={stage === 'idle'}>
          3. revert()
        </button>
      </div>

      <p className="context-add-lab__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 이동 없이 최종 상태로 바뀝니다.)' : ''}
      </p>

      <div className="context-add-lab__table-wrap">
        <table className="context-add-lab__table">
          <caption>네 경로가 각각 무엇을 하는가</caption>
          <thead>
            <tr>
              <th scope="col">경로</th>
              <th scope="col">부르는 코드</th>
              <th scope="col">Context 기록</th>
              <th scope="col">revert() 대상</th>
            </tr>
          </thead>
          <tbody>
            {creationModes.map((option) => (
              <tr key={option.value} aria-current={mode === option.value ? 'true' : undefined}>
                <th scope="row">{option.label}</th>
                <td>
                  <code>{option.call}</code>
                </td>
                <td>{recordedByMode[option.value]}</td>
                <td>{option.value === 'named' || option.value === 'immediate' ? '예' : '아니오'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre className="context-add-lab__code">
        <code>{code}</code>
      </pre>

      <div className="context-add-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <strong>Context 밖에서 그냥 만든</strong> 경우에는 기록 수가 0에서 움직이지 않고, <code>revert()</code>를 눌러도 박스가
            제자리로 오지 않습니다. 나머지 두 경로(<code>ctx.onClick()</code>, <code>ctx.add()</code>)에서는 기록 수가 1이 되고{' '}
            <code>revert()</code>가 박스를 되돌립니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <strong>박스의 지금 x</strong>입니다. <code>revert()</code> 뒤에도 x가 {descriptor.x}에 머물러 있다면 그 애니메이션은
            아무도 기록하지 않았다는 뜻입니다. 화면을 떠날 때 남는 것이 바로 이런 애니메이션입니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            Context는 <strong>자기 함수가 실행되는 동안</strong>에만 옆에서 기록합니다. 클릭은 그 함수가 끝난 한참 뒤에
            일어나므로 그냥 만들면 아무도 보고 있지 않습니다. <code>self.add(이름, 함수)</code>와 <code>ctx.add(함수)</code>는
            "지금부터 이 함수가 실행되는 동안 다시 기록해 달라"고 알리는 방법입니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            hover·click·scroll처럼 사용자의 동작이 애니메이션을 만드는 경우 전부입니다. 이 부분을 빠뜨리면 화면을 떠난 뒤에도
            그때 만든 애니메이션만 살아남습니다. 반대로 <code>ignore()</code>는 화면이 사라져도 계속돼야 하는 전역 표시처럼
            드문 경우에만 씁니다.
          </p>
        </article>
      </div>

      <p className="context-add-lab__source">
        실행 코드 위치 · <code>examples/ContextAddLab/useContextAddAnimation.ts</code>
      </p>
    </section>
  )
}
