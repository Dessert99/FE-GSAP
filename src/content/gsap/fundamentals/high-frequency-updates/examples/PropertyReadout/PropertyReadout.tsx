/** getProperty()의 반환 형식을 조작·관찰·코드로 동시에 확인하는 학습 패널을 조립한다. */
import type { CallStyle, ReadUnit, ReadableProperty } from './usePropertyReadoutRuntime'
import { usePropertyReadoutRuntime } from './usePropertyReadoutRuntime'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './PropertyReadout.css'

// radio에 노출할 읽기 대상 property와 그 값이 어디에서 오는지의 짧은 설명이다
const propertyOptions: { value: ReadableProperty; label: string; hint: string }[] = [
  { value: 'x', label: 'x', hint: 'gsap.set()이 건 transform' },
  { value: 'width', label: 'width', hint: 'CSS로 정한 너비' },
  { value: 'backgroundColor', label: 'backgroundColor', hint: 'CSS로 정한 배경색' },
  { value: 'notARealProperty', label: 'notARealProperty', hint: '존재하지 않는 이름' },
]

// radio에 노출할 unit 후보와 읽기 쉬운 이름이다
const unitOptions: { value: ReadUnit; label: string }[] = [
  { value: 'none', label: '넘기지 않음' },
  { value: 'px', label: '"px"' },
  { value: 'em', label: '"em"' },
]

// radio에 노출할 호출 방식과 읽기 쉬운 이름이다
const callStyleOptions: { value: CallStyle; label: string }[] = [
  { value: 'direct', label: '직접 호출' },
  { value: 'getter', label: '재사용 getter' },
]

export function PropertyReadout() {
  // runtime이 소유한 controls·descriptor·관찰값을 그대로 받아 화면에만 쓴다
  const { scope, property, setProperty, unit, setUnit, callStyle, setCallStyle, descriptor, observation } =
    usePropertyReadoutRuntime()

  // 실행에 쓰인 unit 인자를 코드 문법으로만 포맷한다. 값을 다시 판단하지 않는다
  const unitArgument = descriptor.effectiveUnit === 'none' ? '' : `, '${descriptor.effectiveUnit}'`

  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code =
    descriptor.callStyle === 'getter'
      ? `// 1. 읽을 대상에 transform x를 한 번 걸어 둡니다.
gsap.set('${descriptor.selector}', { x: ${descriptor.presetX} })

// 2. property를 생략하면 getter 함수가 돌아옵니다.
const getter = gsap.getProperty('${descriptor.selector}')

// 3. 그 함수에 property와 unit만 넘겨 반복해서 읽습니다.
const value = getter('${descriptor.property}'${unitArgument})

value // ${observation.raw}  (typeof ${observation.valueType})`
      : `// 1. 읽을 대상에 transform x를 한 번 걸어 둡니다.
gsap.set('${descriptor.selector}', { x: ${descriptor.presetX} })

// 2. target·property·unit을 한 번에 넘겨 읽습니다.
const value = gsap.getProperty('${descriptor.selector}', '${descriptor.property}'${unitArgument})

value // ${observation.raw}  (typeof ${observation.valueType})`

  return (
    <section className="property-readout" aria-labelledby="property-readout-title">
      <h3 id="property-readout-title">같은 element를 여러 형식으로 읽어 보기</h3>
      <p className="property-readout__goal">
        아래 사각형 하나를 읽습니다. 무엇을 읽을지, unit 인자를 넘길지, 어떤 문법으로 부를지 세 가지만 바꾸면서{' '}
        <strong>돌아오는 값과 그 값의 타입</strong>이 어떻게 달라지는지 확인하세요.
      </p>

      <div className="property-readout__body" ref={scope}>
        <div className="property-readout__stage">
          <div className="property-readout__target" />
          <p className="property-readout__legend">
            이 사각형에는 CSS로 정한 너비·배경색이 있고, <code>gsap.set()</code>이 transform <code>x</code>를{' '}
            {descriptor.presetX}로 걸어 두었습니다.
          </p>
        </div>

        <fieldset className="property-readout__controls">
          <legend>읽는 방법</legend>

          <div className="property-readout__radio-group" role="radiogroup" aria-labelledby="property-readout-prop-label">
            <p id="property-readout-prop-label">무엇을 읽을까요 (property)</p>
            {propertyOptions.map((option) => (
              <label key={option.value} htmlFor={`property-readout-prop-${option.value}`}>
                <input
                  id={`property-readout-prop-${option.value}`}
                  type="radio"
                  name="property-readout-prop"
                  value={option.value}
                  checked={property === option.value}
                  onChange={() => setProperty(option.value)}
                />
                <span>
                  <code>{option.label}</code> <small>{option.hint}</small>
                </span>
              </label>
            ))}
          </div>

          <div className="property-readout__radio-group" role="radiogroup" aria-labelledby="property-readout-unit-label">
            <p id="property-readout-unit-label">unit 인자 (3번째 인자)</p>
            {unitOptions.map((option) => (
              <label key={option.value} htmlFor={`property-readout-unit-${option.value}`}>
                <input
                  id={`property-readout-unit-${option.value}`}
                  type="radio"
                  name="property-readout-unit"
                  value={option.value}
                  checked={unit === option.value}
                  onChange={() => setUnit(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <div className="property-readout__radio-group" role="radiogroup" aria-labelledby="property-readout-call-label">
            <p id="property-readout-call-label">호출 방식</p>
            {callStyleOptions.map((option) => (
              <label key={option.value} htmlFor={`property-readout-call-${option.value}`}>
                <input
                  id={`property-readout-call-${option.value}`}
                  type="radio"
                  name="property-readout-call"
                  value={option.value}
                  checked={callStyle === option.value}
                  onChange={() => setCallStyle(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <dl className="property-readout__result" aria-live="polite">
        <div>
          <dt>돌아온 값</dt>
          <dd>{observation.raw}</dd>
        </div>
        <div>
          <dt>그 값의 타입</dt>
          <dd>{observation.valueType}</dd>
        </div>
        <div>
          <dt>실제로 넘긴 unit</dt>
          <dd>
            {descriptor.effectiveUnit === 'none' ? '없음' : `"${descriptor.effectiveUnit}"`}
            {descriptor.requestedUnit !== descriptor.effectiveUnit ? ' · 숫자가 아닌 값이라 unit을 빼고 읽었습니다' : ''}
          </dd>
        </div>
      </dl>

      <pre className="property-readout__code">
        <code>{code}</code>
      </pre>

      <div className="property-readout__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <code>x</code>를 고른 채 unit만 <strong>넘기지 않음 → "px"</strong>로 바꾸면, 돌아온 값이 <code>40</code>에서{' '}
            <code>"40px"</code>로 바뀌고 타입도 <code>number</code>에서 <code>string</code>으로 바뀝니다. 화면의 사각형은 전혀 움직이지
            않습니다. <strong>읽기만 했을 뿐 아무것도 쓰지 않았기 때문입니다.</strong>
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <code>width</code>를 <code>"em"</code>으로 읽어 보세요. CSS에는 <code>px</code>로 적혀 있는데 <code>em</code> 기준 숫자가
            문자열로 돌아옵니다. 공식 문서가 말하는 <strong>"DOM element라면 특정 unit으로 변환까지 시킬 수 있다"</strong>가 이
            장면입니다. <code>notARealProperty</code>도 눌러 보세요. 공식 문장은 <strong>"없으면 null을 돌려준다"</strong>이고, 위
            출력은 브라우저에서 실제로 돌아온 값을 그대로 보여줍니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            unit을 생략하면 GSAP은 <strong>숫자로 바꿀 수 있는 값을 숫자로</strong> 돌려줍니다. 공식 문서는 그 이유를 밝혀 두었습니다.
            애니메이션에서는 숫자를 다루는 일이 워낙 흔해서, <code>"20px"</code>를 받아 매번 <code>parseFloat()</code>으로 감싸는 것이
            실무에서 번거롭기 때문입니다. unit을 넘기면 그 편의를 끄고 단위가 붙은 문자열을 그대로 받습니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            드래그를 시작할 때 <strong>현재 위치를 기준점으로 잡을 때</strong>, 애니메이션이 실제로 쓴 값을 확인할 때, CSS에 적힌 값을
            계산에 쓰려고 숫자로 받을 때 씁니다. <strong>재사용 getter</strong>는 같은 element에서 여러 property를 연달아 읽어야 할 때
            target 해석을 한 번으로 줄여 줍니다.
          </p>
        </article>
      </div>

      <p className="property-readout__source">
        실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/high-frequency-updates/examples/PropertyReadout/usePropertyReadoutRuntime.ts" />
      </p>
    </section>
  )
}
