/** 다섯 값을 조절하며 일곱 getter의 반환값이 동시에 어떻게 변하는지 시간축·표·코드로 함께 확인하는 학습 패널을 조립한다. */
import { timeScaleOptions, useTimingMathRuntime } from './useTimingMathRuntime'
import './TimingMathLab.css'

// 시간축의 세 가지 칸을 화면에서 무슨 구간인지 글로 구분한다 — 색만으로 구분하지 않기 위해서다
const segmentKindLabel = {
  delay: '기다리는 중',
  cycle: '재생 중',
  'repeat-delay': '반복 사이 대기',
} as const

export function TimingMathLab() {
  // runtime이 소유한 controls·descriptor·getter 반환값을 그대로 받아 화면에만 쓴다
  const {
    scope,
    delay,
    setDelay,
    duration,
    setDuration,
    repeat,
    setRepeat,
    repeatDelay,
    setRepeatDelay,
    timeScale,
    setTimeScale,
    descriptor,
    readout,
    segments,
    reducedMotion,
    round,
  } = useTimingMathRuntime()

  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `const parent = gsap.timeline({ paused: true })

const tween = gsap.to({ v: 0 }, {
  v: 1,
  duration: ${descriptor.duration},
  delay: ${descriptor.delay},
  repeat: ${descriptor.repeat},
  repeatDelay: ${descriptor.repeatDelay},
})

parent.add(tween, ${descriptor.position})
tween.timeScale(${descriptor.timeScale})

tween.delay()          // ${readout ? round(readout.delay) : '…'}
tween.duration()       // ${readout ? round(readout.duration) : '…'}
tween.totalDuration()  // ${readout ? round(readout.totalDuration) : '…'}
tween.startTime()      // ${readout ? round(readout.startTime) : '…'}
tween.endTime()        // ${readout ? round(readout.endTime) : '…'}
tween.endTime(false)   // ${readout ? round(readout.endTimeWithoutRepeats) : '…'}
tween.timeScale()      // ${readout ? round(readout.timeScale) : '…'}`

  // 시간축 전체 폭을 endTime에 맞춰 각 칸을 백분율로 배치한다
  const axisEnd = readout && readout.endTime > 0 ? readout.endTime : 1

  return (
    <section className="timing-lab" aria-labelledby="timing-lab-title">
      <h3 id="timing-lab-title">다섯 값을 바꾸면 일곱 숫자가 어떻게 움직이나</h3>
      <p className="timing-lab__goal">
        아래 다섯 개를 조절하면 GSAP이 돌려주는 일곱 개의 숫자가 동시에 바뀝니다. 화면의 모든 숫자는 계산한 값이 아니라 방금{' '}
        <code>tween</code>에서 읽어 온 값입니다. <strong>아무것도 재생되지 않습니다</strong> — 부모 timeline이 멈춰 있어서 숫자만
        관찰하게 됩니다.
      </p>

      <div className="timing-lab__body" ref={scope}>
        <div className="timing-lab__stage">
          <p className="timing-lab__axis-caption">
            부모 timeline의 시간축 · 0초부터 {readout ? round(readout.endTime) : '…'}초까지
          </p>
          <div className="timing-lab__axis" role="img" aria-label={
            readout
              ? `시간축. delay ${round(readout.delay)}초 뒤 ${round(readout.startTime)}초에 시작해 ${round(readout.endTime)}초에 끝납니다. 재생 회차는 ${readout.repeat + 1}번입니다.`
              : '시간축을 준비하는 중입니다.'
          }>
            {segments.map((segment) => (
              <span
                key={segment.id}
                className={`timing-lab__segment timing-lab__segment--${segment.kind}${
                  reducedMotion ? '' : ' timing-lab__segment--animated'
                }`}
                style={{
                  left: `${(segment.start / axisEnd) * 100}%`,
                  width: `${((segment.end - segment.start) / axisEnd) * 100}%`,
                }}
              >
                <em>{segment.label}</em>
              </span>
            ))}
          </div>
          <ol className="timing-lab__axis-legend">
            {segments.map((segment) => (
              <li key={segment.id}>
                <strong>{segment.label}</strong>
                <span>
                  {segmentKindLabel[segment.kind]} · {round(segment.start)}초 → {round(segment.end)}초
                </span>
              </li>
            ))}
          </ol>
        </div>

        <fieldset className="timing-lab__controls">
          <legend>조절할 값</legend>

          <label htmlFor="timing-delay">delay</label>
          <output htmlFor="timing-delay">{delay}초</output>
          <input
            id="timing-delay"
            type="range"
            min="0"
            max="2"
            step="0.25"
            value={delay}
            onChange={(event) => setDelay(Number(event.target.value))}
          />

          <label htmlFor="timing-duration">duration</label>
          <output htmlFor="timing-duration">{duration}초</output>
          <input
            id="timing-duration"
            type="range"
            min="0.5"
            max="4"
            step="0.5"
            value={duration}
            onChange={(event) => setDuration(Number(event.target.value))}
          />

          <label htmlFor="timing-repeat">repeat</label>
          <output htmlFor="timing-repeat">{repeat}회 추가 반복</output>
          <input
            id="timing-repeat"
            type="range"
            min="0"
            max="3"
            step="1"
            value={repeat}
            onChange={(event) => setRepeat(Number(event.target.value))}
          />

          <label htmlFor="timing-repeat-delay">repeatDelay</label>
          <output htmlFor="timing-repeat-delay">{repeatDelay}초</output>
          <input
            id="timing-repeat-delay"
            type="range"
            min="0"
            max="1"
            step="0.25"
            value={repeatDelay}
            onChange={(event) => setRepeatDelay(Number(event.target.value))}
          />

          <div className="timing-lab__radio-group" role="radiogroup" aria-labelledby="timing-scale-label">
            <p id="timing-scale-label">timeScale</p>
            {timeScaleOptions.map((option) => (
              <label key={option} htmlFor={`timing-scale-${option}`}>
                <input
                  id={`timing-scale-${option}`}
                  type="radio"
                  name="timing-scale"
                  value={option}
                  checked={timeScale === option}
                  onChange={() => setTimeScale(option)}
                />
                {option} {option === 1 ? '(정상)' : option < 1 ? '(느리게)' : '(빠르게)'}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="timing-lab__table-wrap">
        <table className="timing-lab__table">
          <caption>지금 이 tween에서 읽어 온 값</caption>
          <thead>
            <tr>
              <th scope="col">호출</th>
              <th scope="col">반환값</th>
              <th scope="col">무엇을 세는가</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <code>delay()</code>
              </th>
              <td>{readout ? round(readout.delay) : '…'}</td>
              <td>시작 전에 기다리는 시간. timeScale을 바꿔도 그대로입니다.</td>
            </tr>
            <tr>
              <th scope="row">
                <code>duration()</code>
              </th>
              <td>{readout ? round(readout.duration) : '…'}</td>
              <td>한 회차의 길이. repeat을 아무리 늘려도 변하지 않습니다.</td>
            </tr>
            <tr>
              <th scope="row">
                <code>totalDuration()</code>
              </th>
              <td>{readout ? round(readout.totalDuration) : '…'}</td>
              <td>모든 회차와 회차 사이 대기를 더한 길이.</td>
            </tr>
            <tr>
              <th scope="row">
                <code>startTime()</code>
              </th>
              <td>{readout ? round(readout.startTime) : '…'}</td>
              <td>부모 timeline 위에서 시작하는 시각. 여기서는 delay와 같습니다.</td>
            </tr>
            <tr>
              <th scope="row">
                <code>endTime()</code>
              </th>
              <td>{readout ? round(readout.endTime) : '…'}</td>
              <td>반복까지 다 끝나는 시각. timeScale이 반영됩니다.</td>
            </tr>
            <tr>
              <th scope="row">
                <code>endTime(false)</code>
              </th>
              <td>{readout ? round(readout.endTimeWithoutRepeats) : '…'}</td>
              <td>첫 회차만 끝나는 시각. 반복을 세지 않습니다.</td>
            </tr>
            <tr>
              <th scope="row">
                <code>timeScale()</code>
              </th>
              <td>{readout ? round(readout.timeScale) : '…'}</td>
              <td>재생 배속. 길이가 아니라 걸리는 시간을 바꿉니다.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <pre className="timing-lab__code">
        <code>{code}</code>
      </pre>

      <div className="timing-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <strong>repeat</strong>을 올려 보세요. <code>totalDuration()</code>과 <code>endTime()</code>은 커지는데{' '}
            <code>duration()</code>과 <code>endTime(false)</code>는 꿈쩍도 하지 않습니다. 이번엔 <strong>timeScale</strong>을 2로
            바꿔 보세요. 이번에는 정반대로 <code>duration()</code>과 <code>totalDuration()</code>이 그대로이고{' '}
            <code>endTime()</code>만 절반이 됩니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            시간축 그림에서 <strong>맨 앞의 delay 칸</strong>이 어디서 끝나는지 보세요. 그 지점이 곧{' '}
            <code>startTime()</code>입니다. 그리고 <strong>회차 칸의 개수</strong>를 세어 보세요. <code>repeat</code>이 2면 칸은 3개
            입니다. 마지막 회차 뒤에는 <code>repeatDelay</code> 칸이 붙지 않는 것도 확인하세요.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            <code>duration</code>은 <strong>한 회차의 설계 길이</strong>이고 <code>totalDuration</code>은{' '}
            <strong>실제로 흘러야 하는 총량</strong>입니다. 서로 다른 질문에 답하므로 값도 따로 놉니다.{' '}
            <code>timeScale</code>은 그 총량을 <strong>얼마나 빨리 소비하느냐</strong>만 정하므로 길이 자체는 건드리지 않고{' '}
            <code>endTime</code>의 나눗셈에만 들어갑니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            로딩 애니메이션을 <strong>정확히 N초 뒤에 끝내야 할 때</strong> <code>endTime()</code>으로 실제 종료 시각을 확인합니다.
            반복하는 배경 애니메이션의 <strong>한 주기만 재고 싶을 때</strong>는 <code>endTime(false)</code>를 씁니다. 사용자가 "빨리
            감기"를 눌렀을 때는 <code>timeScale()</code>만 올리면 되고, 길이를 다시 계산할 필요가 없습니다.
          </p>
        </article>
      </div>

      <p className="timing-lab__source">
        실행 코드 위치 · <code>examples/TimingMathLab/useTimingMathRuntime.ts</code>
      </p>
    </section>
  )
}
