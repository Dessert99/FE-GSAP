/** complex string·unit conversion·CSS variable의 실제 vars와 표시 코드를 동기화한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './CssValueParsingExample.css'
import { type CssValueMode, useCssValueParsingAnimation } from './useCssValueParsingAnimation'

// select의 값과 학습자가 읽을 질문을 같은 목록으로 관리한다.
const modeLabels: Record<CssValueMode, string> = {
  complex: 'complex string',
  units: '50% → 200px',
  variable: 'CSS variable',
}

// runtime config의 key/value를 의미 변경 없이 JavaScript vars 문법으로 바꾼다.
function serializeConfig(config: Record<string, unknown>) {
  return Object.entries(config).map(([key, value]) => {
    // CSS variable만 따옴표가 필요한 property 문법으로 표시한다.
    const property = key.startsWith('--') ? `'${key}'` : key
    // 실제 string과 number 타입을 그대로 구분해 code에 적는다.
    const serialized = typeof value === 'string' ? `'${value}'` : String(value)
    return `  ${property}: ${serialized}`
  }).join(',\n')
}

// 선택한 descriptor에서 관찰해야 할 단 하나의 CSS 변화를 설명한다.
function describeChange(mode: CssValueMode) {
  if (mode === 'units') return '현재 width 50%를 읽고 다른 단위인 200px까지 변환하며 보간합니다.'
  if (mode === 'variable') return '--css-demo-hue가 20에서 190으로 바뀌며 배경색 계산도 함께 달라집니다.'
  return 'boxShadow의 여러 숫자·색과 borderRadius 두 값을 각각 대응해 보간합니다.'
}

export function CssValueParsingExample() {
  // hook이 반환한 실제 config와 control을 화면에서 그대로 소비한다.
  const runtime = useCssValueParsingAnimation()
  // code panel은 실제 Tween에 전달된 최종 config만 syntax로 직렬화한다.
  const code = `gsap.to('.${runtime.targetClassName}', {\n${serializeConfig(runtime.animationConfig)}\n})`

  return (
    <div ref={runtime.scope}>
      <InteractiveExample
        title="CSS 값은 어떻게 읽고 보간할까요?"
        description="한 대상에서 complex string, 서로 다른 단위, CSS custom property를 하나씩 실행합니다. 먼저 값 표현 방식을 고른 뒤 결과를 예상하고 실행하세요."
        sourcePath="src/content/gsap/fundamentals/css-animation/examples/CssValueParsingExample/useCssValueParsingAnimation.ts"
        reducedMotion={runtime.reducedMotion}
        controls={(
          <div className="interactive-example__control-list">
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading"><span>값 표현</span></span>
              <select value={runtime.mode} onChange={(event) => runtime.setMode(event.target.value as CssValueMode)}>
                {(Object.keys(modeLabels) as CssValueMode[]).map((mode) => <option key={mode} value={mode}>{modeLabels[mode]}</option>)}
              </select>
            </label>
          </div>
        )}
        preview={(
          <div className="css-value-example">
            <div className={runtime.targetClassName}>CSS</div>
            <p aria-live="polite">{runtime.hasRun ? `${modeLabels[runtime.mode]} 실행값을 적용했습니다.` : '값을 고른 뒤 실행하세요.'}</p>
          </div>
        )}
        code={code}
        propertyDetails={[
          { name: 'complex string', type: 'string', defaultValue: '현재 computed value', acceptedValues: '중간 상태가 유효한 숫자·색 조합' },
          { name: 'unit', type: 'number | string', defaultValue: 'property별 px·deg 등', acceptedValues: 'px·%·vw·rad 등 유효한 CSS 단위' },
          { name: '--custom-property', type: 'string | number', defaultValue: 'stylesheet의 현재값', acceptedValues: '브라우저가 지원하고 보간 가능한 CSS variable 값' },
        ]}
        changes={[describeChange(runtime.mode), 'camelCase property와 --custom-property 이름이 실제 실행 값과 표시된 코드에서 같습니다.']}
        watchFor={['실행 전 시작 CSS와 실행 후 목표 CSS의 단위 또는 문자열 조각을 비교합니다.', '모션 감소 환경에서도 같은 최종값을 0초로 적용해 계산 결과는 남깁니다.']}
        explanation={<p>CSSPlugin은 시작값과 목표값을 CSS가 이해할 수 있는 숫자·단위 조각으로 나눕니다. 중간값도 유효할 때만 연속적으로 보간할 수 있습니다.</p>}
        onReplay={runtime.replay}
      />
    </div>
  )
}
