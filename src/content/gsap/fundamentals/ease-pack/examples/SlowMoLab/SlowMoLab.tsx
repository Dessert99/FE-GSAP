/** SlowMo의 세 파라미터가 만드는 구간 분배와 companion 동기화를 조작·관찰·코드로 확인하는 학습 패널을 조립한다. */
import { useSlowMoAnimation } from './useSlowMoAnimation'
import './SlowMoLab.css'

export function SlowMoLab() {
  // runtime이 소유한 controls·descriptor·관찰값을 그대로 받아 화면에만 쓴다
  const { scope, linearRatio, setLinearRatio, power, setPower, companionEnabled, setCompanionEnabled, descriptor, samples, segments, status, reducedMotion, run } =
    useSlowMoAnimation()

  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `gsap.to('${descriptor.selector}', {
  x: ${descriptor.x},
  duration: ${descriptor.duration},
  ease: '${descriptor.easeExpression}',
})${
    descriptor.companionEnabled
      ? `

gsap.from('${descriptor.selector}', {
  opacity: 0,
  duration: ${descriptor.duration},
  ease: '${descriptor.companionEaseExpression}',
  immediateRender: false,
})`
      : ''
  }`

  return (
    <section className="slow-mo-lab" aria-labelledby="slow-mo-lab-title">
      <h3 id="slow-mo-lab-title">가운데 등속 구간을 직접 늘였다 줄여 보기</h3>
      <p className="slow-mo-lab__goal">
        상자 하나가 왼쪽에서 오른쪽으로 이동합니다. <code>linearRatio</code>를 바꾸면 구간 비율이 즉시 다시 계산되고, companion을 켜면
        같은 값으로 만든 <code>yoyoMode</code> ease가 투명도를 함께 움직입니다.
      </p>

      <div className="slow-mo-lab__body" ref={scope}>
        <div className="slow-mo-lab__stage">
          <div className="slow-mo-lab__track">
            <div className="slow-mo-lab__target" aria-hidden="true" />
          </div>
          <ul className="slow-mo-lab__segments">
            <li>
              <span>앞 ease out</span>
              <strong>{segments.easeOut}%</strong>
            </li>
            <li>
              <span>가운데 선형</span>
              <strong>{segments.linear}%</strong>
            </li>
            <li>
              <span>뒤 ease in</span>
              <strong>{segments.easeIn}%</strong>
            </li>
          </ul>
        </div>

        <fieldset className="slow-mo-lab__controls">
          <legend>조절할 값</legend>

          <label htmlFor="slow-mo-linear-ratio">linearRatio</label>
          <output htmlFor="slow-mo-linear-ratio">{linearRatio}</output>
          <input
            id="slow-mo-linear-ratio"
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={linearRatio}
            onChange={(event) => setLinearRatio(Number(event.target.value))}
          />

          <label htmlFor="slow-mo-power">power</label>
          <output htmlFor="slow-mo-power">{power}</output>
          <input
            id="slow-mo-power"
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={power}
            onChange={(event) => setPower(Number(event.target.value))}
          />

          <label className="slow-mo-lab__check" htmlFor="slow-mo-companion">
            <input
              id="slow-mo-companion"
              type="checkbox"
              checked={companionEnabled}
              onChange={(event) => setCompanionEnabled(event.target.checked)}
            />
            opacity companion tween 켜기
          </label>

          <button type="button" onClick={run}>
            실행
          </button>
        </fieldset>
      </div>

      <p className="slow-mo-lab__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 이동 없이 결과만 표시합니다.)' : ''}
      </p>

      <div className="slow-mo-lab__table-wrap">
        <table className="slow-mo-lab__table">
          <caption>
            같은 progress에서 두 ease가 내놓는 값 · 위치는 '{descriptor.easeExpression}', companion은 '
            {descriptor.companionEaseExpression}'
          </caption>
          <thead>
            <tr>
              <th scope="col">progress</th>
              <th scope="col">위치 ease 값</th>
              <th scope="col">companion ease 값</th>
            </tr>
          </thead>
          <tbody>
            {samples.map((sample) => (
              <tr key={sample.progress}>
                <th scope="row">{sample.progress}</th>
                <td>{sample.position}</td>
                <td>{sample.companion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre className="slow-mo-lab__code">
        <code>{code}</code>
      </pre>

      <div className="slow-mo-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <code>linearRatio</code>를 키우면 가운데 선형 구간의 퍼센트가 커지고 양 끝 ease가 그만큼 짧아집니다. 표의{' '}
            <strong>위치 ease 값</strong> 열도 가운데에서 progress와 거의 같은 속도로 올라갑니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <code>power</code>를 <strong>1보다 크게</strong> 올려 보세요. 표의 가운데 값이 오히려 줄어듭니다. 공식 문서가 말한{' '}
            "가운데 선형 구간이 뒤집힌다"가 이 숫자입니다. companion 열은 progress 0과 1에서 모두 0이고 가운데에서 1입니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            SlowMo는 감속 → 등속 → 가속을 <strong>하나의 곡선</strong>으로 이어 붙인 ease입니다. tween 3개를 붙이면 이음매에서 속도가
            튀지만, 하나의 곡선이면 그 이음매가 없습니다. <code>yoyoMode: true</code>는 같은 비율을 쓰되 값이 0에서 1로 갔다가 다시
            0으로 돌아오는 곡선이라, <strong>duration만 같게 맞추면</strong> fade in·out 타이밍이 저절로 맞습니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            자막이나 알림 배너처럼 <strong>들어오고 → 읽히고 → 나가는</strong> 요소에 씁니다. 배너가 등속으로 지나가는 동안 사용자가
            읽고, 양 끝에서는 부드럽게 들어오고 나갑니다. companion tween은 그 배너의 투명도를 따로 계산하지 않고 붙일 때 씁니다.
          </p>
        </article>
      </div>

      <p className="slow-mo-lab__source">
        실행 코드 위치 · <code>examples/SlowMoLab/useSlowMoAnimation.ts</code>
      </p>
    </section>
  )
}
