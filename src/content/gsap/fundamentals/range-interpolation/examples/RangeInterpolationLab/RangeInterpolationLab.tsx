/** 한 입력이 clamp부터 splitColor까지 바뀌는 실제 결과와 같은 snapshot의 코드를 표시한다. */
import type { CSSProperties } from 'react'
import type { CallStyle, InterpolationMode } from './useRangeInterpolationRuntime'
import { useRangeInterpolationRuntime } from './useRangeInterpolationRuntime'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './RangeInterpolationLab.css'

// 마지막 값을 지금 넘기는 호출과 재사용 함수를 받는 호출을 고르는 label이다
const callStyleOptions: { value: CallStyle; label: string }[] = [
  { value: 'direct', label: '즉시 값 — 마지막 인자를 지금 넘기기' },
  { value: 'reusable', label: '재사용 함수 — 마지막 인자를 나중에 넘기기' },
]

// interpolate가 같은 progress를 바꿀 네 data shape다
const modeOptions: { value: InterpolationMode; label: string }[] = [
  { value: 'number', label: '숫자' },
  { value: 'color', label: '색' },
  { value: 'array', label: '배열' },
  { value: 'object', label: '객체' },
]

/** 소수 중간값을 비교하기 쉽도록 최대 세 자리만 표시한다. */
function showNumber(value: number) {
  return Number(value.toFixed(3))
}

export function RangeInterpolationLab() {
  // runtime이 소유한 controls와 단일 계산 snapshot을 화면에 그대로 쓴다
  const { input, setInput, callStyle, setCallStyle, mode, setMode, snapshot, inputControl } = useRangeInterpolationRuntime()
  // 네 number line의 marker가 같은 progress 위치를 공유한다
  const markerStyle = { '--range-position': `${snapshot.progress * 100}%` } as CSSProperties
  // 실제 snapshot 인자와 결과만 JavaScript 문법으로 직렬화한다
  const code =
    snapshot.callStyle === 'direct'
      ? `// 원본 입력을 공식 범위 안으로 먼저 제한합니다.
const limited = gsap.utils.clamp(${snapshot.inputMin}, ${snapshot.inputMax}, ${snapshot.input})
// 제한한 입력에서 0~1 상대 위치만 남깁니다.
const progress = gsap.utils.normalize(${snapshot.inputMin}, ${snapshot.inputMax}, limited)
// 같은 상대 위치를 animation에 쓸 0~360 숫자로 옮깁니다.
const degrees = gsap.utils.mapRange(0, 1, 0, 360, progress)
// 같은 progress를 현재 선택한 data shape의 중간값으로 바꿉니다.
const mixed = gsap.utils.interpolate(${snapshot.interpolation.startText}, ${snapshot.interpolation.endText}, progress)
// splitColor 표가 읽을 색도 바로 그 progress로 만듭니다.
const color = gsap.utils.interpolate(${snapshot.color.startText}, ${snapshot.color.endText}, progress)
// 실제 보간 color에서 RGB(A) 성분을 읽습니다.
const rgb = gsap.utils.splitColor(color)
// 같은 color에서 HSL(A) 성분을 읽습니다.
const hsl = gsap.utils.splitColor(color, true)`
      : `// 마지막 입력을 비워 범위를 기억하는 clamp 함수를 받습니다.
const limit = gsap.utils.clamp(${snapshot.inputMin}, ${snapshot.inputMax})
// 마지막 입력을 비워 범위를 기억하는 normalize 함수를 받습니다.
const toProgress = gsap.utils.normalize(${snapshot.inputMin}, ${snapshot.inputMax})
// progress를 받을 때마다 0~360으로 옮기는 함수를 받습니다.
const toDegrees = gsap.utils.mapRange(0, 1, 0, 360)
// 현재 data shape의 두 끝값을 기억하는 보간 함수를 받습니다.
const mix = gsap.utils.interpolate(${snapshot.interpolation.startText}, ${snapshot.interpolation.endText})
// splitColor 표가 쓸 두 끝색도 함수 하나에 기억시킵니다.
const mixColor = gsap.utils.interpolate(${snapshot.color.startText}, ${snapshot.color.endText})

// 값이 도착하면 기억해 둔 함수들을 순서대로 호출합니다.
const limited = limit(${snapshot.input})
// 제한된 값을 단위 없는 progress로 바꿉니다.
const progress = toProgress(limited)
// 같은 progress를 angle로 옮깁니다.
const degrees = toDegrees(progress)
// 같은 progress를 현재 data shape로 보간합니다.
const mixed = mix(progress)
// 같은 progress로 splitColor가 읽을 색을 만듭니다.
const color = mixColor(progress)
// 실제 보간 color에서 RGB(A) 성분을 읽습니다.
const rgb = gsap.utils.splitColor(color)
// 같은 color에서 HSL(A) 성분을 읽습니다.
const hsl = gsap.utils.splitColor(color, true)`

  return (
    <section className="range-lab" aria-labelledby="range-lab-title">
      <h3 id="range-lab-title">입력 하나의 변환 경로</h3>
      <p className="range-lab__goal" id="range-lab-instructions">
        slider를 움직이면 먼저 0~100으로 잘리고, 0~1 progress가 된 뒤, 0~360과 선택한 값 형태로 바뀝니다. 입력을 -25나 125로
        보내 <strong>첫 단계 뒤의 값이 더는 범위를 벗어나지 않는지</strong> 확인하세요. animation은 재생하지 않고 계산 결과만 즉시 바꿉니다.
      </p>

      <div className="range-lab__controls">
        <label htmlFor="range-lab-input">원본 입력</label>
        <output htmlFor="range-lab-input">{input}</output>
        <input
          id="range-lab-input"
          type="range"
          min={inputControl.min}
          max={inputControl.max}
          step={inputControl.step}
          value={input}
          aria-describedby="range-lab-instructions"
          onChange={(event) => setInput(Number(event.target.value))}
        />

        <fieldset>
          <legend>호출 방식</legend>
          {callStyleOptions.map((option) => (
            <label key={option.value} htmlFor={`range-call-${option.value}`}>
              <input
                id={`range-call-${option.value}`}
                type="radio"
                name="range-call-style"
                value={option.value}
                checked={callStyle === option.value}
                onChange={() => setCallStyle(option.value)}
              />
              {option.label}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>interpolate 결과 형태</legend>
          <div className="range-lab__mode-options">
            {modeOptions.map((option) => (
              <label key={option.value} htmlFor={`range-mode-${option.value}`}>
                <input
                  id={`range-mode-${option.value}`}
                  type="radio"
                  name="range-interpolation-mode"
                  value={option.value}
                  checked={mode === option.value}
                  onChange={() => setMode(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="range-lab__number-lines" style={markerStyle} aria-label="현재 계산 단계별 값">
        <article>
          <div>
            <strong>1. clamp</strong>
            <span>{snapshot.input} → {showNumber(snapshot.limited)}</span>
          </div>
          <div className="range-lab__track"><i /></div>
          <small>{snapshot.inputMin}에서 {snapshot.inputMax} 사이로 제한</small>
        </article>
        <article>
          <div>
            <strong>2. normalize</strong>
            <span>{showNumber(snapshot.progress)}</span>
          </div>
          <div className="range-lab__track"><i /></div>
          <small>어떤 입력 범위든 0~1 progress로 통일</small>
        </article>
        <article>
          <div>
            <strong>3. mapRange</strong>
            <span>{showNumber(snapshot.mappedDegrees)}°</span>
          </div>
          <div className="range-lab__track"><i /></div>
          <small>progress의 같은 위치를 0~360으로 이동</small>
        </article>
        <article>
          <div>
            <strong>4. interpolate · {mode}</strong>
            <span>{snapshot.interpolation.resultText}</span>
          </div>
          <div className="range-lab__track"><i /></div>
          <small>{snapshot.interpolation.startText}에서 {snapshot.interpolation.endText} 사이</small>
        </article>
      </div>

      <div className="range-lab__color-reading">
        <div className="range-lab__swatch" style={{ background: snapshot.color.value }} aria-hidden="true" />
        <div>
          <strong>같은 progress의 색 · {snapshot.color.value}</strong>
          <p>RGB(A) · [{snapshot.color.rgb.join(', ')}]</p>
          <p>HSL(A) · [{snapshot.color.hsl.join(', ')}]</p>
        </div>
      </div>

      <pre className="range-lab__code"><code>{code}</code></pre>

      <div className="range-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>입력이 범위 밖이어도 clamp 다음 값부터는 0~100, progress는 0~1을 지킵니다. 호출 방식을 바꿔도 최종값은 같습니다.</p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>네 marker가 늘 같은 상대 위치에 있습니다. 숫자 범위는 달라도 “전체 중 어디쯤인가”라는 정보는 progress 하나로 이어집니다.</p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>normalize가 입력 단위를 버리고 0~1 비율만 남깁니다. mapRange와 interpolate는 그 비율을 각자의 출력 형태에 다시 입힙니다.</p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>drag 거리로 회전각을 만들거나, scroll 비율로 색과 opacity를 함께 계산하거나, 센서값을 안전한 UI 범위로 옮길 때 씁니다.</p>
        </article>
      </div>

      <p className="range-lab__motion">모션 정책 · autoplay와 transition이 없는 직접 조작 계산이라 reduced-motion에서도 같은 정적 결과를 제공합니다.</p>
      <p className="range-lab__source">실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/range-interpolation/examples/RangeInterpolationLab/useRangeInterpolationRuntime.ts" /></p>
    </section>
  )
}
