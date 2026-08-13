/** scope 인자 하나가 선택 범위를 바꾸는 과정의 컨트롤·두 카드 무대·관찰 표·학습 패널을 조립한다. */
import { boxesPerCard, useScopedSelectorAnimation } from './useScopedSelectorAnimation'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './ScopedSelectorLab.css'

/** 두 카드가 같은 개수의 박스를 갖도록 렌더링에 쓰는 index 목록이다. */
const boxIndexes = Array.from({ length: boxesPerCard }, (_, index) => index + 1)

export function ScopedSelectorLab() {
  // runtime이 소유한 실행 descriptor와 관찰값을 그대로 받아 화면에만 쓴다
  const {
    scope,
    cardOneRef,
    cardTwoRef,
    mode,
    setMode,
    descriptor,
    cards,
    hasContext,
    didRevert,
    status,
    reducedMotion,
    run,
    revert,
  } = useScopedSelectorAnimation()

  // 실행에 쓰인 descriptor를 코드 문법으로만 포맷한다 — 두 번째 인자 유무가 실행과 같은 값에서 나온다
  const code = `const boxes = gsap.utils.toArray('${descriptor.selector}', labRef.current)
gsap.set(boxes, { y: 0 })

const ctx = gsap.context(() => {
  gsap.to('${descriptor.selector}', { y: ${descriptor.y}, duration: ${descriptor.duration}, ease: 'power2.out', onComplete: readCards })
}${descriptor.scopeExpression ? `, ${descriptor.scopeExpression}` : ''})
${
  descriptor.scopeExpression
    ? '// scope가 있으니 cardOneRef의 자손 중에서만 찾습니다'
    : '// scope가 없으니 문서 전체에서 이 class를 찾습니다'
}

${didRevert ? 'ctx.revert()' : '// 아직 revert()를 부르지 않았습니다'}`

  return (
    <section className="scoped-selector-lab" aria-labelledby="scoped-selector-lab-title">
      <h3 id="scoped-selector-lab-title">같은 class가 두 곳에 있을 때</h3>
      <p className="scoped-selector-lab__goal">
        목표는 하나입니다 — <strong>선택자를 그대로 두고 scope만 바꾸면 무엇이 달라지는가</strong>. 아래 두 카드의 박스는 class
        이름이 같습니다. 선택자 문자열도 두 경우 모두 <code>{descriptor.selector}</code> 하나뿐입니다.
      </p>

      <div ref={scope}>
        <fieldset className="scoped-selector-lab__controls">
          <legend>Context에 scope를 넘길까요?</legend>
          <label>
            <input
              type="radio"
              name="scoped-selector-mode"
              value="scoped"
              checked={mode === 'scoped'}
              onChange={() => setMode('scoped')}
            />
            넘긴다 — 카드 1을 scope로
          </label>
          <label>
            <input
              type="radio"
              name="scoped-selector-mode"
              value="unscoped"
              checked={mode === 'unscoped'}
              onChange={() => setMode('unscoped')}
            />
            안 넘긴다 — 두 번째 인자 없음
          </label>
          <div className="scoped-selector-lab__buttons">
            <button type="button" onClick={run}>
              같은 선택자로 실행
            </button>
            <button type="button" onClick={revert} disabled={!hasContext}>
              revert()
            </button>
          </div>
        </fieldset>

        <div className="scoped-selector-lab__stage">
          <div
            className={`scoped-selector-lab__card${mode === 'scoped' ? ' scoped-selector-lab__card--scoped' : ''}`}
            ref={cardOneRef}
          >
            <p className="scoped-selector-lab__card-title">
              카드 1{mode === 'scoped' ? ' — 이 영역을 scope로 넘겼습니다' : ''}
            </p>
            <div className="scoped-selector-lab__row">
              {boxIndexes.map((index) => (
                <div key={index} className="scoped-selector-lab__box" />
              ))}
            </div>
          </div>

          <div className="scoped-selector-lab__card" ref={cardTwoRef}>
            <p className="scoped-selector-lab__card-title">카드 2 — scope 밖</p>
            <div className="scoped-selector-lab__row">
              {boxIndexes.map((index) => (
                <div key={index} className="scoped-selector-lab__box" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="scoped-selector-lab__table-wrap">
        <table className="scoped-selector-lab__table">
          <caption>실제로 움직인 박스 개수 — 각 카드 안에서 직접 세었습니다</caption>
          <thead>
            <tr>
              <th scope="col">영역</th>
              <th scope="col">박스 수</th>
              <th scope="col">움직인 수</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.key}>
                <th scope="row">{card.label}</th>
                <td>{card.total}</td>
                <td>{card.moved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="scoped-selector-lab__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 이동 없이 최종 상태로 바뀝니다.)' : ''}
      </p>

      <pre className="scoped-selector-lab__code">
        <code>{code}</code>
      </pre>

      <div className="scoped-selector-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            선택자 문자열은 한 글자도 바뀌지 않았습니다. 바뀐 것은 <code>gsap.context()</code>의{' '}
            <strong>두 번째 인자 하나</strong>뿐인데, 움직이는 박스가 3개에서 6개로 늘어납니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            표의 <strong>카드 2</strong> 행입니다. scope를 넘겼을 때는 0, 넘기지 않았을 때는 {boxesPerCard}입니다. 카드 2는 내가
            건드릴 생각이 없던 영역인데도 선택자만으로는 막을 방법이 없습니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서의 표현으로 scope를 주면 함수 안의 <strong>모든</strong> selector text가 그 Element/Ref로 scope되고, 그{' '}
            <strong>자손(descendant)</strong>에만 적용됩니다. 내부적으로는 <code>document.querySelectorAll()</code> 대신 그
            element의 <code>querySelectorAll()</code>을 부르는 것과 같습니다. scope가 없으면 기준이 문서 전체가 됩니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            같은 컴포넌트를 한 화면에 여러 번 그릴 때입니다. 카드 목록·아코디언·탭처럼 같은 마크업이 반복되면 클래스 이름은
            중복될 수밖에 없습니다. 컨테이너 하나만 scope로 넘기면 그 인스턴스 안에서만 동작합니다.
          </p>
        </article>
      </div>

      <p className="scoped-selector-lab__source">
        실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/gsap-context/examples/ScopedSelectorLab/useScopedSelectorAnimation.ts" />
      </p>
    </section>
  )
}
