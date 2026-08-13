/** 입력 단위를 떼고 숫자를 계산한 뒤 보존하거나 강제해 되붙이는 lab이다. */
import type { UnitMode } from './useUnitLabRuntime'
import { useUnitLabRuntime } from './useUnitLabRuntime'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './UnitLab.css'

// unitize의 선택 인자가 만드는 세 출력 정책이다
const unitModes: { value: UnitMode; label: string }[] = [
  { value: 'preserve', label: '입력 단위를 보존' },
  { value: 'px', label: '항상 px' },
  { value: 'percent', label: '항상 %' },
]

export function UnitLab() {
  // runtime이 소유한 controls와 한 번 실행 snapshot만 받아 화면을 조립한다
  const { input, setInput, mode, setMode, snapshot } = useUnitLabRuntime()

  return (
    <section className="utility-lab" aria-labelledby="unit-lab-title">
      <div className="utility-lab__intro">
        <div>
          <p className="utility-lab__eyebrow">UNIT LAB</p>
          <h3 id="unit-lab-title">단위는 계산의 어느 지점에서 사라지고 돌아오나요?</h3>
          <p><code>getUnit</code>은 단위를 읽고, <code>unitize</code>는 <code>parseFloat</code>로 숫자만 안쪽 함수에 넘긴 뒤 단위를 결과에 붙입니다. 입력과 정책을 바꿔 세 경계를 확인하세요.</p>
        </div>
        <fieldset className="utility-lab__controls">
          <legend>입력과 출력 단위</legend>
          <label htmlFor="unit-value">CSS 값
            <input id="unit-value" type="text" value={input} onChange={(event) => setInput(event.target.value)} autoComplete="off" spellCheck="false" />
          </label>
          {unitModes.map((option) => (
            <label key={option.value} htmlFor={`unit-mode-${option.value}`}>
              <input id={`unit-mode-${option.value}`} type="radio" name="unit-mode" checked={mode === option.value} onChange={() => setMode(option.value)} />
              {option.label}
            </label>
          ))}
        </fieldset>
      </div>

      <dl className="unit-readings">
        <div><dt><code>getUnit</code>가 읽은 단위</dt><dd>{snapshot.extractedUnit || '(빈 문자열)'}</dd></div>
        <div><dt>안쪽 <code>wrap</code>이 받은 값</dt><dd>{Number.isNaN(snapshot.receivedNumber) ? 'NaN' : snapshot.receivedNumber}</dd></div>
        <div><dt><code>unitize</code> 최종 반환</dt><dd>{snapshot.output}</dd></div>
      </dl>

      <p className="utility-lab__status" role="status">입력 {snapshot.descriptor.input || '(빈 문자열)'}의 현재 출력은 {snapshot.output}입니다.</p>
      {Number.isNaN(snapshot.receivedNumber) && <p className="utility-lab__status">숫자로 시작하지 않아 wrap을 실행하지 않았습니다. <code>{snapshot.output}</code>은 유효한 CSS 값이 아닙니다.</p>}
      <pre className="utility-lab__code"><code>{snapshot.code}</code></pre>

      <div className="utility-lab__explanation">
        <article><h4>무엇이 달라졌나요?</h4><p>단위 보존에서는 150px가 50px가 되고 130%가 30%가 됩니다. 강제 모드에서는 입력 단위와 상관없이 px 또는 %로 끝납니다.</p></article>
        <article><h4>무엇을 봐야 하나요?</h4><p>가운데 값은 항상 단위 없는 number입니다. 이 숫자만 wrap이 계산하고, 문자열 조립은 unitize가 경계에서 맡습니다.</p></article>
        <article><h4>왜 이렇게 동작하나요?</h4><p>공식 Note대로 unitize가 parseFloat를 사용하기 때문입니다. 숫자로 시작하지 않는 auto나 calc()는 NaN이 되어 이 pipeline과 호환되지 않습니다.</p></article>
        <article><h4>실제로 언제 쓰나요?</h4><p>modifier가 매번 “143.2px” 같은 문자열을 줄 때 숫자 utility를 재사용하고 CSS 단위를 잃지 않으려는 경우에 씁니다.</p></article>
      </div>
      <p className="utility-lab__source">실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/utility-pipelines-units/examples/UnitLab/useUnitLabRuntime.ts" /></p>
    </section>
  )
}
