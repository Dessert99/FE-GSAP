/** 같은 utility의 두 호출 방식을 나란히 조작·읽기·코드로 확인하는 학습 패널을 조립한다. */
import { useState } from 'react'
import type { UtilityMode } from './ValueOrFunctionLab.example'
import { createDescriptor, normalizeInput, runValueOrFunction } from './ValueOrFunctionLab.example'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './ValueOrFunctionLab.css'

// radio에 노출할 두 호출 방식과 읽기 쉬운 이름이다
const modeOptions: { value: UtilityMode; label: string }[] = [
  { value: 'value', label: '값 모드 — 인자를 끝까지 넘긴다' },
  { value: 'function', label: '함수 모드 — 마지막 인자를 뺀다' },
]

export function ValueOrFunctionLab() {
  // 어떤 호출 방식을 실행할지 정한다
  const [mode, setMode] = useState<UtilityMode>('value')
  // 잘라 낼 대상 숫자 — 공식 pipe 예제가 쓴 8에서 출발한다
  const [rawInput, setRawInput] = useState('8')
  // controls 값을 실제 호출과 코드 패널이 함께 쓸 하나의 descriptor로 정규화한다
  const descriptor = createDescriptor(mode, normalizeInput(rawInput))
  // descriptor대로 gsap.utils를 실제로 부른 결과만 표에 싣는다
  const readings = runValueOrFunction(descriptor)
  // 현재 모드의 마지막 실행 결과를 controls 변경 알림과 코드 패널이 같은 snapshot에서 읽는다
  const finalReading = readings[readings.length - 1]

  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code =
    descriptor.mode === 'value'
      ? `// 인자를 끝까지 넘기면 계산이 끝난 값이 돌아옵니다.
const limited = gsap.utils.clamp(${descriptor.min}, ${descriptor.max}, ${descriptor.input})`
      : `// 마지막 인자를 빼면 값 대신 함수가 돌아옵니다.
const limit = gsap.utils.clamp(${descriptor.min}, ${descriptor.max})

// 그 함수는 나중에 아무 값에나 쓸 수 있고,
limit(${descriptor.input})

// 다른 함수와 이어 붙일 수도 있습니다.
gsap.utils.pipe(limit, gsap.utils.snap(${descriptor.increment}))(${descriptor.input})`

  return (
    <section className="value-or-function-lab" aria-labelledby="value-or-function-lab-title">
      <h3 id="value-or-function-lab-title">같은 함수, 인자 하나 차이</h3>
      <p className="value-or-function-lab__goal">
        이 예제는 <strong>화면을 전혀 움직이지 않습니다.</strong> <code>gsap.utils.clamp</code>를 두 가지 방식으로 실제로 부르고, 각각{' '}
        <strong>무엇이 돌아왔는지</strong>만 읽습니다. 아래 <code>돌아온 타입</code> 칸이 <code>number</code>인지 <code>function</code>인지를
        보세요.
      </p>

      <div className="value-or-function-lab__body">
        <div className="value-or-function-lab__table-wrap">
          <table className="value-or-function-lab__table">
            <caption>지금 이 방식으로 실제 호출한 결과</caption>
            <thead>
              <tr>
                <th scope="col">부른 식</th>
                <th scope="col">돌아온 타입</th>
                <th scope="col">결과</th>
                <th scope="col">무엇을 뜻하나</th>
              </tr>
            </thead>
            <tbody>
              {readings.map((reading) => (
                <tr key={reading.expression}>
                  <th scope="row">
                    <code>{reading.expression}</code>
                  </th>
                  <td>
                    <code>{reading.returned}</code>
                  </td>
                  <td>{reading.result}</td>
                  <td>{reading.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <fieldset className="value-or-function-lab__controls">
          <legend>부르는 방식</legend>

          <div className="value-or-function-lab__radio-group" role="radiogroup" aria-labelledby="value-or-function-mode-label">
            <p id="value-or-function-mode-label">호출 방식</p>
            {modeOptions.map((option) => (
              <label key={option.value} htmlFor={`value-or-function-mode-${option.value}`}>
                <input
                  id={`value-or-function-mode-${option.value}`}
                  type="radio"
                  name="value-or-function-mode"
                  value={option.value}
                  checked={mode === option.value}
                  onChange={() => setMode(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>

          <label htmlFor="value-or-function-input">자를 값</label>
          <input
            id="value-or-function-input"
            type="number"
            value={descriptor.input}
            onChange={(event) => setRawInput(event.target.value)}
            autoComplete="off"
          />
          <small>
            범위는 공식 예제와 같은 <code>{descriptor.min}</code>~<code>{descriptor.max}</code>으로 고정했습니다.
          </small>
        </fieldset>
      </div>

      <p className="value-or-function-lab__status" role="status">
        {descriptor.mode === 'value'
          ? `값 모드입니다. 입력 ${descriptor.input}을 잘라 ${finalReading.result}을 받았습니다.`
          : `함수 모드입니다. 입력 ${descriptor.input}을 자른 뒤 ${descriptor.increment} 단위로 붙여 ${finalReading.result}을 받았습니다.`}
      </p>

      <pre className="value-or-function-lab__code">
        <code>{code}</code>
      </pre>

      <div className="value-or-function-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <strong>함수 모드</strong>로 바꾸면 첫 줄의 <code>돌아온 타입</code>이 <code>number</code>에서 <code>function</code>으로
            바뀝니다. 부르는 함수도, 넘긴 범위도 똑같은데 <strong>마지막 인자 하나를 뺐을 뿐</strong>입니다. 그리고 표에 줄이 두 개 더
            생깁니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            두 모드의 <strong>마지막 숫자가 서로 다를 수 있다는 것</strong>입니다. 값 모드는 자르기만 하지만, 함수 모드에서는 자르는 함수를{' '}
            <code>pipe</code>로 <code>snap</code>에 이어 붙였기 때문에 <code>{descriptor.increment}</code> 단위로 한 번 더 붙습니다. 자를 값을{' '}
            <code>8</code>로 두고 두 모드를 번갈아 보세요.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서는 <strong>"많은 utility가 값 대신 FUNCTION을 돌려주도록 선택할 수 있고, 그래야 tween에 바로 꽂을 수 있다"</strong>고
            적습니다. 계산에 필요한 재료 중 <strong>마지막 하나(계산할 값)</strong>만 비워 두면, GSAP은 "아직 계산할 수 없구나"라고 보고 그
            나머지를 기억한 함수를 돌려줍니다. 값이 도착하는 시점을 뒤로 미루는 셈입니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            <strong>값 모드</strong>는 지금 당장 숫자 하나가 필요할 때 씁니다. <strong>함수 모드</strong>는 값이 나중에, 그리고 여러 번
            도착할 때 씁니다. 공식이 든 예가 바로 그것으로, 이 함수를 tween의 값 자리에 그대로 넣으면{' '}
            <strong>모든 target에 같은 끝값을 쓰는 대신 target마다 한 번씩 호출</strong>됩니다.
          </p>
        </article>
      </div>

      <p className="value-or-function-lab__source">
        실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/gsap-utils/examples/ValueOrFunctionLab/ValueOrFunctionLab.example.ts" />
      </p>
    </section>
  )
}
