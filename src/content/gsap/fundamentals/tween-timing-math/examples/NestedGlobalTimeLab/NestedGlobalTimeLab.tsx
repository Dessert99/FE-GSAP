/** 삼중 중첩에서 local time 하나가 전역 시각으로 변환되는 과정을 층별 시간축·표·코드로 확인한다. */
import { innerTimeScaleOptions, useNestedGlobalTimeRuntime } from './useNestedGlobalTimeRuntime'
import './NestedGlobalTimeLab.css'

// 전역 시간축의 최대 초 — inner 4초 + (tween 3초 + duration 2초) ÷ 최소 배속 0.5다
const axisEnd = 14

export function NestedGlobalTimeLab() {
  // runtime이 소유한 controls·descriptor·getter 반환값을 그대로 받아 화면에만 쓴다
  const {
    scope,
    innerPosition,
    setInnerPosition,
    tweenPosition,
    setTweenPosition,
    innerTimeScale,
    setInnerTimeScale,
    localTime,
    setLocalTime,
    descriptor,
    readout,
    reducedMotion,
    round,
  } = useNestedGlobalTimeRuntime()

  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `const outer = gsap.timeline({ paused: true })
outer.startTime(0)

const inner = gsap.timeline()
outer.add(inner, ${descriptor.innerPosition})

const tween = gsap.to({ v: 0 }, { v: 1, duration: ${descriptor.tweenDuration} })
inner.add(tween, ${descriptor.tweenPosition})
inner.timeScale(${descriptor.innerTimeScale})

tween.startTime()   // ${readout ? round(readout.tweenStartTime) : '…'}  (inner 기준)
inner.startTime()   // ${readout ? round(readout.innerStartTime) : '…'}  (outer 기준)
outer.startTime()   // ${readout ? round(readout.outerStartTime) : '…'}  (전역 기준)

tween.globalTime(${descriptor.localTime}) // ${readout ? round(readout.globalTime) : '…'}
tween.globalTime(0) // ${readout ? round(readout.globalStart) : '…'}
tween.globalTime(${descriptor.tweenDuration}) // ${readout ? round(readout.globalEnd) : '…'}`

  // 전역 시간축 위에서 tween이 차지하는 구간과 현재 표시자의 위치를 백분율로 배치한다
  const spanLeft = readout ? (readout.globalStart / axisEnd) * 100 : 0
  const spanWidth = readout ? ((readout.globalEnd - readout.globalStart) / axisEnd) * 100 : 0
  const markerLeft = readout ? (readout.globalTime / axisEnd) * 100 : 0

  return (
    <section className="nested-lab" aria-labelledby="nested-lab-title">
      <h3 id="nested-lab-title">local time 하나가 전역 시각이 되기까지</h3>
      <p className="nested-lab__goal">
        tween은 inner timeline 안에 있고, inner는 outer timeline 안에 있습니다. 아래 값을 조절하면서{' '}
        <code>globalTime()</code>이 두 timeline의 위치와 배속을 어떻게 반영하는지 보세요. 여기서도{' '}
        <strong>아무것도 재생되지 않습니다</strong>.
      </p>

      <div className="nested-lab__body" ref={scope}>
        <div className="nested-lab__stage">
          <ol className="nested-lab__layers">
            <li>
              <span className="nested-lab__layer-name">전역 시계</span>
              <span className="nested-lab__layer-value">
                <code>gsap.globalTimeline</code> · outer는 {readout ? round(readout.outerStartTime) : '…'}초에 놓임
              </span>
            </li>
            <li>
              <span className="nested-lab__layer-name">outer timeline</span>
              <span className="nested-lab__layer-value">
                inner를 {readout ? round(readout.innerStartTime) : '…'}초에 담고 있음
              </span>
            </li>
            <li>
              <span className="nested-lab__layer-name">inner timeline</span>
              <span className="nested-lab__layer-value">
                tween을 {readout ? round(readout.tweenStartTime) : '…'}초에 담고, 배속은{' '}
                {readout ? round(readout.innerTimeScale) : '…'}
              </span>
            </li>
            <li>
              <span className="nested-lab__layer-name">tween 자기 시계</span>
              <span className="nested-lab__layer-value">
                지금 읽는 지점은 local {descriptor.localTime}초
              </span>
            </li>
          </ol>

          <p className="nested-lab__axis-caption">전역 시간축 · 0초부터 {axisEnd}초까지</p>
          <div
            className="nested-lab__axis"
            role="img"
            aria-label={
              readout
                ? `전역 시간축. tween은 ${round(readout.globalStart)}초부터 ${round(readout.globalEnd)}초까지 차지하고, local ${descriptor.localTime}초는 전역 ${round(readout.globalTime)}초에 해당합니다.`
                : '전역 시간축을 준비하는 중입니다.'
            }
          >
            <span
              className={`nested-lab__span${reducedMotion ? '' : ' nested-lab__span--animated'}`}
              style={{ left: `${spanLeft}%`, width: `${spanWidth}%` }}
            />
            <span
              className={`nested-lab__marker${reducedMotion ? '' : ' nested-lab__marker--animated'}`}
              style={{ left: `${markerLeft}%` }}
            />
          </div>
          <p className="nested-lab__axis-readout">
            <strong>{readout ? round(readout.globalTime) : '…'}초</strong> — local {descriptor.localTime}초가 전역 시계에서 놓이는
            자리입니다.
          </p>
        </div>

        <fieldset className="nested-lab__controls">
          <legend>조절할 값</legend>

          <label htmlFor="nested-inner-position">outer 위 inner의 위치</label>
          <output htmlFor="nested-inner-position">{innerPosition}초</output>
          <input
            id="nested-inner-position"
            type="range"
            min="0"
            max="4"
            step="0.5"
            value={innerPosition}
            onChange={(event) => setInnerPosition(Number(event.target.value))}
          />

          <label htmlFor="nested-tween-position">inner 위 tween의 위치</label>
          <output htmlFor="nested-tween-position">{tweenPosition}초</output>
          <input
            id="nested-tween-position"
            type="range"
            min="0"
            max="3"
            step="0.5"
            value={tweenPosition}
            onChange={(event) => setTweenPosition(Number(event.target.value))}
          />

          <label htmlFor="nested-local-time">globalTime()에 넣을 local time</label>
          <output htmlFor="nested-local-time">{localTime}초</output>
          <input
            id="nested-local-time"
            type="range"
            min="0"
            max={descriptor.tweenDuration}
            step="0.25"
            value={localTime}
            onChange={(event) => setLocalTime(Number(event.target.value))}
          />

          <div className="nested-lab__radio-group" role="radiogroup" aria-labelledby="nested-scale-label">
            <p id="nested-scale-label">inner timeline의 timeScale</p>
            {innerTimeScaleOptions.map((option) => (
              <label key={option} htmlFor={`nested-scale-${option}`}>
                <input
                  id={`nested-scale-${option}`}
                  type="radio"
                  name="nested-scale"
                  value={option}
                  checked={innerTimeScale === option}
                  onChange={() => setInnerTimeScale(option)}
                />
                {option} {option === 1 ? '(정상)' : option < 1 ? '(느리게)' : '(빠르게)'}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <pre className="nested-lab__code">
        <code>{code}</code>
      </pre>

      <div className="nested-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <strong>inner의 위치</strong>를 옮기면 전역 시각이 그만큼 통째로 밀립니다. 그런데{' '}
            <strong>inner의 timeScale</strong>을 2로 바꾸면 밀리는 게 아니라 <strong>구간 자체가 짧아집니다</strong>. 위치는 더하기로,
            배속은 나누기로 들어오기 때문입니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            층 목록의 세 <code>startTime()</code>은 <strong>각자 다른 기준</strong>의 숫자입니다. tween의 1초는 inner 기준이고, inner의
            3초는 outer 기준입니다. 배속이 1이면 위치를 더해 볼 수 있고, 배속이 다르면 local time과 안쪽 위치를 배율로 나눈 뒤 바깥
            위치에 더해야 합니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            <code>startTime()</code>은 언제나 <strong>바로 위 부모 하나만</strong> 아는 값입니다. 그래서 층이 깊어지면 혼자서는 답을
            줄 수 없습니다. <code>globalTime()</code>은 자기 자신부터 부모를 따라 올라가며 각 층의 시작 지점과 배속을 차례로 반영해
            전역 시각을 반환합니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            여러 timeline이 중첩된 상태에서 <strong>"이 애니메이션은 실제로 몇 초에 시작하지?"</strong>를 알아야 할 때 씁니다. 스크롤
            연동 애니메이션을 디버깅하거나, 서로 다른 timeline에 있는 두 애니메이션의 실제 선후 관계를 비교할 때가 대표적입니다.
          </p>
        </article>
      </div>

      <p className="nested-lab__source">
        실행 코드 위치 · <code>examples/NestedGlobalTimeLab/useNestedGlobalTimeRuntime.ts</code>
      </p>
    </section>
  )
}
