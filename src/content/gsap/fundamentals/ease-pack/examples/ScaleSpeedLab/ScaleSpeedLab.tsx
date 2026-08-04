/** scale 구간을 지나는 두 방식의 배율 차이를 조작·관찰·코드로 동시에 확인하는 학습 패널을 조립한다. */
import type { ScaleEaseMode } from './useScaleSpeedAnimation'
import { useScaleSpeedAnimation } from './useScaleSpeedAnimation'
import './ScaleSpeedLab.css'

// radio에 노출할 시작 scale 후보 — 공식 경고대로 0은 넣지 않는다
const startOptions = [0.25, 0.5, 1]

// radio에 노출할 끝 scale 후보 — 시작보다 항상 크게 두어 커지는 방향만 비교한다
const endOptions = [1.5, 2, 3, 4]

// radio에 노출할 ease 후보와 읽기 쉬운 이름이다
const easeOptions: { value: ScaleEaseMode; label: string }[] = [
  { value: 'none', label: 'none (시간에 대해 등속)' },
  { value: 'expoScale', label: 'expoScale (배율에 대해 등속)' },
]

export function ScaleSpeedLab() {
  // runtime이 소유한 controls·descriptor·관찰값을 그대로 받아 화면에만 쓴다
  const { scope, startScale, setStartScale, endScale, setEndScale, easeMode, setEaseMode, descriptor, samples, status, reducedMotion, run } =
    useScaleSpeedAnimation()

  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `gsap.fromTo(
  '${descriptor.selector}',
  { scale: ${descriptor.startScale} },
  {
    scale: ${descriptor.endScale},
    duration: ${descriptor.duration},
    ease: '${descriptor.easeExpression}',
  },
)`

  return (
    <section className="scale-speed-lab" aria-labelledby="scale-speed-lab-title">
      <h3 id="scale-speed-lab-title">같은 크기 구간을 두 가지 방식으로 지나가 보기</h3>
      <p className="scale-speed-lab__goal">
        상자 하나가 <code>{descriptor.startScale}</code>배에서 <code>{descriptor.endScale}</code>배로 커집니다. ease만 바꿔 실행하고,
        표의 <strong>직전 구간 대비 배율</strong> 열이 일정한지 아닌지 확인하세요.
      </p>

      <div className="scale-speed-lab__body" ref={scope}>
        <div className="scale-speed-lab__stage">
          <div className="scale-speed-lab__target" aria-hidden="true" />
        </div>

        <fieldset className="scale-speed-lab__controls">
          <legend>조절할 값</legend>

          <div className="scale-speed-lab__radio-group" role="radiogroup" aria-labelledby="scale-speed-start-label">
            <p id="scale-speed-start-label">시작 scale</p>
            {startOptions.map((option) => (
              <label key={option} htmlFor={`scale-speed-start-${option}`}>
                <input
                  id={`scale-speed-start-${option}`}
                  type="radio"
                  name="scale-speed-start"
                  value={option}
                  checked={startScale === option}
                  onChange={() => setStartScale(option)}
                />
                {option}배
              </label>
            ))}
          </div>

          <div className="scale-speed-lab__radio-group" role="radiogroup" aria-labelledby="scale-speed-end-label">
            <p id="scale-speed-end-label">끝 scale</p>
            {endOptions.map((option) => (
              <label key={option} htmlFor={`scale-speed-end-${option}`}>
                <input
                  id={`scale-speed-end-${option}`}
                  type="radio"
                  name="scale-speed-end"
                  value={option}
                  checked={endScale === option}
                  onChange={() => setEndScale(option)}
                />
                {option}배
              </label>
            ))}
          </div>

          <div className="scale-speed-lab__radio-group" role="radiogroup" aria-labelledby="scale-speed-ease-label">
            <p id="scale-speed-ease-label">ease</p>
            {easeOptions.map((option) => (
              <label key={option.value} htmlFor={`scale-speed-ease-${option.value}`}>
                <input
                  id={`scale-speed-ease-${option.value}`}
                  type="radio"
                  name="scale-speed-ease"
                  value={option.value}
                  checked={easeMode === option.value}
                  onChange={() => setEaseMode(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>

          <button type="button" onClick={run}>
            실행
          </button>
        </fieldset>
      </div>

      <p className="scale-speed-lab__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 이동 없이 결과만 표시합니다.)' : ''}
      </p>

      <div className="scale-speed-lab__table-wrap">
        <table className="scale-speed-lab__table">
          <caption>ease '{descriptor.easeExpression}'가 실제로 쓴 scale 값</caption>
          <thead>
            <tr>
              <th scope="col">progress</th>
              <th scope="col">그때의 scale</th>
              <th scope="col">직전 구간 대비 배율</th>
            </tr>
          </thead>
          <tbody>
            {samples.map((sample) => (
              <tr key={sample.progress}>
                <th scope="row">{sample.progress}</th>
                <td>{sample.scale}</td>
                <td>{sample.growth === null ? '기준점' : `×${sample.growth}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre className="scale-speed-lab__code">
        <code>{code}</code>
      </pre>

      <div className="scale-speed-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            ease를 <code>none</code>에서 <code>expoScale</code>로 바꾸면 시작 크기도 끝 크기도 그대로인데 중간 값이 전부 달라집니다.
            표의 가운데 열을 비교해 보세요. 도착점은 같고 가는 길만 바뀝니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            오른쪽 <strong>직전 구간 대비 배율</strong> 열입니다. <code>none</code>에서는 이 숫자가 점점 작아집니다. 뒤로 갈수록 덜
            커지는 셈이라 눈에는 느려지는 것처럼 보입니다. <code>expoScale</code>에서는 네 구간의 배율이 거의 같은 값으로 유지됩니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            사람 눈은 "몇 픽셀 커졌나"가 아니라 <strong>"몇 배 커졌나"</strong>로 크기 변화를 느낍니다. 공식 문서는 이것을 scale을
            animate할 때 linear ease로도 속도가 변해 보이는 현상이라고 설명하고, ExpoScaleEase가 그에 맞게{' '}
            <strong>easing curve를 구부려 보정한다</strong>고 적었습니다. 그래서 시작·끝 scale을 문자열에 알려 줘야 합니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            지도 확대, 이미지 갤러리의 zoom in·out, 배경을 천천히 확대하는 Ken Burns 효과처럼 <strong>크기 자체가 주인공</strong>인
            연출에 씁니다. 반대로 아이콘이 살짝 커지는 hover 같은 작은 변화에서는 차이가 거의 보이지 않아 굳이 쓰지 않습니다.
          </p>
        </article>
      </div>

      <p className="scale-speed-lab__source">
        실행 코드 위치 · <code>examples/ScaleSpeedLab/useScaleSpeedAnimation.ts</code>
      </p>
    </section>
  )
}
