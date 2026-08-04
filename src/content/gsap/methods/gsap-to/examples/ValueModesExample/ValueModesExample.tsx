/** 함수·랜덤·상대값이 target별 목표값을 만드는 방식을 전환해 보여준다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './ValueModesExample.css'
import { type ValueDescriptor, type ValueMode, useValueModesAnimation } from './useValueModesAnimation'

// 값 표현 mode를 초보자가 구분할 수 있는 control 문구로 연결한다.
const modeLabels: Record<ValueMode, string> = {
  absolute: '절대값', relativeAdd: "상대값 '+=' + 변수", relativeSubtract: '상대값 `-=${변수}`',
  function: '함수 기반 값', randomRange: 'random 범위·반올림', randomArray: 'random 배열', utilsRandom: 'gsap.utils.random()',
}

/** 실제 descriptor를 코드 패널의 x 표현과 앞선 변수 선언으로 직렬화한다. */
type SerializedCodeValue = { declaration: string, value: string }

/** 실행 descriptor와 같은 값으로 GSAP의 여러 x 문법을 표시한다. */
function serializeCodeValue(descriptor: ValueDescriptor): SerializedCodeValue {
  switch (descriptor.mode) {
    case 'absolute': return { declaration: '', value: `${descriptor.value}` }
    case 'relativeAdd': return { declaration: `const distance = ${descriptor.amount}\n\n`, value: "'+=' + distance" }
    case 'relativeSubtract': return { declaration: `const distance = ${descriptor.amount}\n\n`, value: '`-=${distance}`' }
    case 'function': return { declaration: '', value: `(index, target, targets) =>\n    ${descriptor.base} + Math.max(index, targets.indexOf(target)) * ${descriptor.step}` }
    case 'randomRange': return { declaration: '', value: `'random(${descriptor.minimum}, ${descriptor.maximum}, ${descriptor.increment})'` }
    case 'randomArray': return { declaration: '', value: `'random([${descriptor.values.join(', ')}])'` }
    case 'utilsRandom': return { declaration: '', value: `() => gsap.utils.random(${descriptor.minimum}, ${descriptor.maximum}, ${descriptor.increment})` }
  }
}

/** 선택한 값 표현이 target들의 도착점에 만드는 변화를 설명한다. */
function describeChange(descriptor: ValueDescriptor) {
  switch (descriptor.mode) {
    case 'absolute': return `모든 대상의 최종 x가 ${descriptor.value}px로 같아집니다.`
    case 'relativeAdd': return `Tween 시작 시 읽은 x 120px에 변수 distance의 ${descriptor.amount}px를 더합니다.`
    case 'relativeSubtract': return `Tween 시작 시 읽은 x 120px에서 변수 distance의 ${descriptor.amount}px를 뺍니다.`
    case 'function': return `index가 커질 때마다 목표 x가 ${descriptor.step}px씩 증가합니다. target과 targets 인자도 함께 전달됩니다.`
    case 'randomRange': return `각 대상은 ${descriptor.minimum}~${descriptor.maximum}px 범위에서 ${descriptor.increment}px 단위 값을 고릅니다.`
    case 'randomArray': return `각 대상은 배열에 적힌 ${descriptor.values.length}개 값 중 하나를 고릅니다.`
    case 'utilsRandom': return '함수가 대상마다 실행되며 gsap.utils.random()의 결과를 반환합니다.'
  }
}

/** target별 값 평가와 상대값 기준 시점을 실제 실행 설정으로 설명한다. */
export function ValueModesExample() {
  // controls·preview·표시 코드가 공유할 실제 값 표현 상태를 받는다.
  const { scope, targetClassName, mode, setMode, amount, setAmount, duration, setDuration, valueDescriptor, animationConfig, reducedMotion, replay } = useValueModesAnimation()
  // 현재 descriptor에서 실행과 같은 변수 선언 및 x 문법을 만든다.
  const codeValue = serializeCodeValue(valueDescriptor)

  return <div ref={scope}>
    <InteractiveExample
      title="Function · Random · Relative values"
      description="함수 인자, random 문법과 함께 '+=' + 변수·템플릿 리터럴 상대값을 비교하고, Tween 시작 시 현재값을 기준으로 삼는 시점을 확인합니다."
      sourcePath="src/content/gsap/methods/gsap-to/examples/ValueModesExample/useValueModesAnimation.ts"
      reducedMotion={reducedMotion}
      controls={<div className="interactive-example__control-list">
        <label className="interactive-example__control"><span className="interactive-example__control-heading"><span>값 표현 방식</span></span><select value={mode} onChange={(event) => setMode(event.target.value as ValueMode)}>{(Object.keys(modeLabels) as ValueMode[]).map((value) => <option key={value} value={value}>{modeLabels[value]}</option>)}</select></label>
        <label className="interactive-example__control"><span className="interactive-example__control-heading"><span>기준값</span><output>{amount}px</output></span><input type="range" min="60" max="210" step="10" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /></label>
        <label className="interactive-example__control"><span className="interactive-example__control-heading"><span>duration</span><output>{duration.toFixed(1)}s</output></span><input type="range" min="0.2" max="1.6" step="0.1" value={duration} onChange={(event) => setDuration(Number(event.target.value))} /></label>
      </div>}
      preview={<div className="value-modes-example">{[0, 1, 2, 3].map((index) => <div key={index} className="value-modes-example__row"><span>{index}</span><div className="value-modes-example__lane"><div className={targetClassName} /></div></div>)}</div>}
      code={`${codeValue.declaration}gsap.to('.box', {
  x: ${codeValue.value},
  duration: ${animationConfig.duration.toFixed(1)},
  ease: '${animationConfig.ease}'
      })`}
      propertyDetails={[
        { name: 'function', type: '공식 gsap.to(): (index, target, targets) => value', defaultValue: '함수 표현에는 기본값 없음', acceptedValues: '공식 gsap.to(): 각 target에 사용할 속성값 반환' },
        { name: 'random()', type: '공식 gsap.to(): random 문자열', defaultValue: 'random 표현에는 기본값 없음', acceptedValues: '공식 gsap.to(): 범위·반올림 단위 또는 값 배열' },
        { name: 'relative', type: '공식 gsap.to(): 상대값 문자열', defaultValue: '상대값 표현에는 기본값 없음', acceptedValues: "공식 gsap.to(): '+=' + 변수 또는 `-=${변수}`" },
      ]}
      changes={[describeChange(valueDescriptor), `현재 선택한 표현은 ${modeLabels[valueDescriptor.mode]}입니다.`]}
      watchFor={['함수와 랜덤 모드에서 대상별 도착점이 달라지는 이유를 코드와 함께 봅니다.', "상대값은 선언 때가 아니라 Tween이 시작될 때 읽은 x 120px에 '+=' 또는 '-=' 계산을 적용합니다."]}
      explanation={<p>함수는 각 target마다 <code>index, target, targets</code>를 받습니다. random 문자열은 GSAP이 해석하고, <code>gsap.utils.random()</code>은 일반 JavaScript 값으로 직접 사용할 수 있습니다. 상대값은 <code>{"'+=' + distance"}</code>나 <code>{'`-=${distance}`'}</code>처럼 변수로 조립할 수 있으며, 기준값은 Tween이 시작될 때 target에서 읽습니다.</p>}
      onReplay={replay}
    />
  </div>
}
