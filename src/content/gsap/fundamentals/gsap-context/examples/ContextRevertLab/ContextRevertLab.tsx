/** 세 Tween을 한 번에 되돌리는 과정의 컨트롤·무대·관찰 표·학습 패널을 조립한다. */
import { useContextRevertAnimation } from './useContextRevertAnimation'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './ContextRevertLab.css'

export function ContextRevertLab() {
  // runtime이 소유한 실행 descriptor와 관찰값을 그대로 받아 화면에만 쓴다
  const { scope, descriptor, stage, boxes, contextObservation, status, reducedMotion, create, revert } =
    useContextRevertAnimation()

  // 실제로 되돌린 뒤에만 실행된 revert 호출을 코드 패널에 표시한다
  const revertCall = stage === 'reverted' ? 'ctx.revert()' : '// 아직 revert()를 부르지 않았습니다'

  // 실행에 쓰인 descriptor를 코드 문법으로만 포맷한다 — 값을 다시 조립하지 않는다
  const code = `${descriptor.steps
    .map(
      (step) =>
        `gsap.set(gsap.utils.toArray('${step.selector}', containerRef.current)[0], { ${step.property}: ${step.from} })`,
    )
    .join('\n')}

// 이 함수 안에서 만든 GSAP 작업을 Context가 전부 기록합니다
const ctx = gsap.context(() => {
${descriptor.steps
  .map(
    (step, index) =>
      `  gsap.to('${step.selector}', { ${step.property}: ${step.to}, duration: ${descriptor.duration}, ease: 'power2.out'${
        index === descriptor.steps.length - 1 ? ', onComplete: readBoxes' : ''
      } })`,
  )
  .join('\n')}
}, containerRef)

// 기록된 ${contextObservation.recorded}개를 한 번에 되돌립니다
${revertCall}`

  return (
    <section className="context-revert-lab" aria-labelledby="context-revert-lab-title">
      <h3 id="context-revert-lab-title">세 개를 만들고 한 번에 되돌리기</h3>
      <p className="context-revert-lab__goal">
        목표는 하나입니다 — <strong>"한 번에 되돌린다"는 게 정확히 무엇을 되돌리는가</strong>. 박스 세 개가 각각 다른 속성으로
        움직이는데, 그 셋을 만든 코드는 함수 하나 안에 있습니다. <code>revert()</code>를 누른 뒤 아래 표의 숫자가 어디로 가는지
        보세요.
      </p>

      <div className="context-revert-lab__body" ref={scope}>
        <div className="context-revert-lab__stage">
          <div className="context-revert-lab__box context-revert-lab__box--a">A</div>
          <div className="context-revert-lab__box context-revert-lab__box--b">B</div>
          <div className="context-revert-lab__box context-revert-lab__box--c">C</div>
        </div>

        <div className="context-revert-lab__side">
          <dl className="context-revert-lab__observation">
            <div>
              <dt id="crl-recorded">Context가 기록한 항목 수</dt>
              <dd>
                <output aria-labelledby="crl-recorded">{contextObservation.recorded}개</output>
              </dd>
            </div>
            <div>
              <dt id="crl-reverted">isReverted</dt>
              <dd>
                <output aria-labelledby="crl-reverted">{String(contextObservation.isReverted)}</output>
              </dd>
            </div>
          </dl>

          <fieldset className="context-revert-lab__controls">
            <legend>조작</legend>
            <button type="button" onClick={create}>
              Context 안에서 3개 만들기
            </button>
            <button type="button" onClick={revert} disabled={stage !== 'created'}>
              revert() 한 번 부르기
            </button>
          </fieldset>
        </div>
      </div>

      <div className="context-revert-lab__table-wrap">
        <table className="context-revert-lab__table">
          <caption>박스별 현재 값 — GSAP이 element에 쓴 값을 그대로 읽었습니다</caption>
          <thead>
            <tr>
              <th scope="col">대상</th>
              <th scope="col">움직이는 속성</th>
              <th scope="col">시작 값</th>
              <th scope="col">지금 값</th>
            </tr>
          </thead>
          <tbody>
            {boxes.map((box) => (
              <tr key={box.key}>
                <th scope="row">{box.label}</th>
                <td>
                  <code>{box.property}</code>
                </td>
                <td>{box.from}</td>
                <td>{box.current}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="context-revert-lab__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 이동 없이 최종 상태로 바뀝니다.)' : ''}
      </p>

      <pre className="context-revert-lab__code">
        <code>{code}</code>
      </pre>

      <div className="context-revert-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            Tween을 세 개 만들었는데 코드에는 그 셋을 담아 둔 변수가 하나도 없습니다. 그런데도{' '}
            <code>revert()</code> 한 번에 셋이 모두 처음 값으로 돌아갑니다. <code>ctx.data</code>에 기록된 항목 수가{' '}
            <strong>3에서 0으로</strong> 떨어지는 것도 함께 보세요.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            표의 <strong>지금 값</strong> 열입니다. <code>x</code>는 132에서 0으로, <code>rotation</code>은 45에서 0으로,{' '}
            <code>scale</code>은 1.6에서 1로 돌아갑니다. 되돌린 것은 화면 위치가 아니라 <strong>GSAP이 건드린 각 속성값</strong>
            입니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서의 표현으로 Context는 그 함수 안에서 만들어진 모든 GSAP animation과 ScrollTrigger를{' '}
            <strong>기록</strong>합니다. 그래서 나중에 <code>revert()</code>는 Context에 기록된 작업을 모두 되돌릴 수 있고, 각
            Tween의 변수를 따로 보관할 필요가 없습니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            화면을 떠날 때입니다. 모달·탭·라우트가 사라질 때 그 안에서 만든 애니메이션을 남겨 두면 이미 없어진 element를 계속
            붙잡고 있게 됩니다. 진입할 때 Context를 만들고 떠날 때 <code>revert()</code>를 부르면 그 영역의 흔적이 함께
            사라집니다.
          </p>
        </article>
      </div>

      <p className="context-revert-lab__source">
        실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/gsap-context/examples/ContextRevertLab/useContextRevertAnimation.ts" />
      </p>
    </section>
  )
}
