/** 끝내는 방법 세 가지의 결과를 비교하는 무대·버튼·관찰 패널·학습 패널을 조립한다. */
import { endingMethods, useRevertKillAnimation } from './useRevertKillAnimation'
import './RevertKillLab.css'

export function RevertKillLab() {
  // runtime이 소유한 실행 descriptor와 관찰값을 그대로 받아 화면에만 쓴다
  const { scope, descriptor, hasContext, observation, status, reducedMotion, create, end } = useRevertKillAnimation()

  // 실행에 쓰인 descriptor와 마지막으로 고른 종료 방법을 코드 문법으로만 포맷한다
  const endingCall = endingMethods.find((method) => method.value === observation.endedBy)?.call ?? 'ctx.revert()'
  const code = `const ctx = gsap.context(() => {
  gsap.to('${descriptor.selector}', { x: ${descriptor.to}, duration: ${descriptor.duration} })

  // 이 함수는 되돌릴 때 불립니다
  return () => {
    // 내가 직접 만든 정리 코드
  }
}, containerRef)

// 지금까지 cleanup function이 불린 횟수: ${observation.cleanupCalls}
${endingCall}`

  return (
    <section className="revert-kill-lab" aria-labelledby="revert-kill-lab-title">
      <h3 id="revert-kill-lab-title">revert()와 kill()은 무엇이 다른가</h3>
      <p className="revert-kill-lab__goal">
        목표는 하나입니다 — <strong>끝내는 방법에 따라 화면에 무엇이 남는가</strong>. 박스 하나가 오른쪽으로 옮겨진 뒤, 세 가지
        방법 중 하나로 Context를 끝냅니다. 박스가 <strong>제자리로 오는지</strong> 그 자리에 <strong>남는지</strong>를 보세요.
      </p>

      <div className="revert-kill-lab__body" ref={scope}>
        <div className="revert-kill-lab__stage">
          <div className="revert-kill-lab__box" />
        </div>

        <dl className="revert-kill-lab__observation">
          <div>
            <dt id="rkl-x">박스의 지금 x</dt>
            <dd>
              <output aria-labelledby="rkl-x">{observation.boxX}</output>
            </dd>
          </div>
          <div>
            <dt id="rkl-reverted">isReverted</dt>
            <dd>
              <output aria-labelledby="rkl-reverted">{String(observation.isReverted)}</output>
            </dd>
          </div>
          <div>
            <dt id="rkl-recorded">남은 기록 수</dt>
            <dd>
              <output aria-labelledby="rkl-recorded">{observation.recorded}개</output>
            </dd>
          </div>
          <div>
            <dt id="rkl-cleanup">cleanup function 호출 횟수</dt>
            <dd>
              <output aria-labelledby="rkl-cleanup">{observation.cleanupCalls}회</output>
            </dd>
          </div>
        </dl>
      </div>

      <div className="revert-kill-lab__buttons">
        <button type="button" onClick={create}>
          1. Context 만들고 옮기기
        </button>
        {endingMethods.map((method) => (
          <button key={method.value} type="button" onClick={() => end(method.value)} disabled={!hasContext}>
            {method.call}
          </button>
        ))}
      </div>

      <p className="revert-kill-lab__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 이동 없이 최종 상태로 바뀝니다.)' : ''}
      </p>

      <div className="revert-kill-lab__table-wrap">
        <table className="revert-kill-lab__table">
          <caption>세 방법이 남기는 것 — GSAP 3.15.0을 직접 실행해 확인했습니다</caption>
          <thead>
            <tr>
              <th scope="col">끝내는 방법</th>
              <th scope="col">움직인 값</th>
              <th scope="col">isReverted</th>
              <th scope="col">cleanup function</th>
            </tr>
          </thead>
          <tbody>
            <tr aria-current={observation.endedBy === 'revert' ? 'true' : undefined}>
              <th scope="row">
                <code>ctx.revert()</code>
              </th>
              <td>시작 값으로 되돌린다</td>
              <td>true</td>
              <td>불린다</td>
            </tr>
            <tr aria-current={observation.endedBy === 'kill' ? 'true' : undefined}>
              <th scope="row">
                <code>ctx.kill()</code>
              </th>
              <td>지금 자리에 그대로 둔다</td>
              <td>false</td>
              <td>불리지 않는다</td>
            </tr>
            <tr aria-current={observation.endedBy === 'killRevert' ? 'true' : undefined}>
              <th scope="row">
                <code>ctx.kill(true)</code>
              </th>
              <td>시작 값으로 되돌린다</td>
              <td>true</td>
              <td>불린다</td>
            </tr>
          </tbody>
        </table>
      </div>

      <pre className="revert-kill-lab__code">
        <code>{code}</code>
      </pre>

      <div className="revert-kill-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            세 방법 모두 애니메이션을 없애고 기록 수를 0으로 만듭니다. 다른 것은 <strong>값</strong>입니다.{' '}
            <code>kill()</code>만 박스를 x {descriptor.to}에 두고, 나머지 둘은 x {descriptor.from}으로 되돌립니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <strong>cleanup function 호출 횟수</strong>입니다. <code>kill()</code>로 끝내면 이 숫자가 늘지 않습니다. 내가 직접
            적어 둔 정리 코드가 실행되지 않는다는 뜻이라, 이벤트 해제 같은 걸 거기에 넣어 두었다면 그대로 남습니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서는 Context가 <code>revert()</code> 또는 <code>kill()</code>로 정리된다고만 밝히고 둘의 차이는 적어 두지
            않았습니다. 실행해 보면 "되돌리기"와 "없애기"가 나뉘어 있습니다. <strong>되돌리기</strong>는 원래 값 복원까지 하고,{' '}
            <strong>없애기</strong>는 애니메이션 연결만 끊습니다. <code>kill(true)</code>은 없애면서 되돌리라는 뜻입니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            화면을 떠나며 원래 모습으로 되돌려야 하면 <code>revert()</code>입니다. 반대로 애니메이션이 도착한 상태가 그 화면의
            정상 상태여서 그대로 유지해야 하면 <code>kill()</code>입니다. 헷갈리면 <code>revert()</code>를 쓰세요. 이 페이지가
            해결하려는 문제가 "흔적을 남기지 않는 것"이기 때문입니다.
          </p>
        </article>
      </div>

      <p className="revert-kill-lab__source">
        실행 코드 위치 · <code>examples/RevertKillLab/useRevertKillAnimation.ts</code>
      </p>
    </section>
  )
}
