/** 함수·랜덤·상대값이 target별 목표값을 만드는 방식을 전환해 보여준다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './ValueModesExample.css'
import { type ValueDescriptor, type ValueMode, useValueModesAnimation } from './useValueModesAnimation'

const modeLabels: Record<ValueMode, string> = {
  absolute: '절대값', relativeAdd: '상대값 +=', relativeSubtract: '상대값 -=',
  function: '함수 기반 값', randomRange: 'random 범위·반올림', randomArray: 'random 배열', utilsRandom: 'gsap.utils.random()',
}

function serializeCodeValue(descriptor: ValueDescriptor) {
  switch (descriptor.mode) {
    case 'absolute': return `${descriptor.value}`
    case 'relativeAdd': return `'+=${descriptor.amount}'`
    case 'relativeSubtract': return `'-=${descriptor.amount}'`
    case 'function': return `(index, target, targets) =>\n    ${descriptor.base} + Math.max(index, targets.indexOf(target)) * ${descriptor.step}`
    case 'randomRange': return `'random(${descriptor.minimum}, ${descriptor.maximum}, ${descriptor.increment})'`
    case 'randomArray': return `'random([${descriptor.values.join(', ')}])'`
    case 'utilsRandom': return `() => gsap.utils.random(${descriptor.minimum}, ${descriptor.maximum}, ${descriptor.increment})`
  }
}

function describeChange(descriptor: ValueDescriptor) {
  switch (descriptor.mode) {
    case 'absolute': return `모든 대상의 최종 x가 ${descriptor.value}px로 같아집니다.`
    case 'relativeAdd': return `현재 x 120px에서 ${descriptor.amount}px씩 더 이동합니다.`
    case 'relativeSubtract': return `현재 x 120px에서 ${descriptor.amount}px씩 차감합니다.`
    case 'function': return `index가 커질 때마다 목표 x가 ${descriptor.step}px씩 증가합니다. target과 targets 인자도 함께 전달됩니다.`
    case 'randomRange': return `각 대상은 ${descriptor.minimum}~${descriptor.maximum}px 범위에서 ${descriptor.increment}px 단위 값을 고릅니다.`
    case 'randomArray': return `각 대상은 배열에 적힌 ${descriptor.values.length}개 값 중 하나를 고릅니다.`
    case 'utilsRandom': return '함수가 대상마다 실행되며 gsap.utils.random()의 결과를 반환합니다.'
  }
}

export function ValueModesExample() {
  const { scope, targetClassName, mode, setMode, amount, setAmount, duration, setDuration, valueDescriptor, animationConfig, reducedMotion, replay } = useValueModesAnimation()
  const codeValue = serializeCodeValue(valueDescriptor)

  return <div ref={scope}>
    <InteractiveExample
      title="Function · Random · Relative values"
      description="공식 문서가 소개하는 함수 인자, random의 범위·배열·반올림, utils.random(), +=·-= 상대값을 모두 전환합니다."
      sourcePath="src/content/gsap/methods/gsap-to/examples/ValueModesExample/useValueModesAnimation.ts"
      reducedMotion={reducedMotion}
      controls={<div className="interactive-example__control-list">
        <label className="interactive-example__control"><span className="interactive-example__control-heading"><span>값 표현 방식</span></span><select value={mode} onChange={(event) => setMode(event.target.value as ValueMode)}>{(Object.keys(modeLabels) as ValueMode[]).map((value) => <option key={value} value={value}>{modeLabels[value]}</option>)}</select></label>
        <label className="interactive-example__control"><span className="interactive-example__control-heading"><span>기준값</span><output>{amount}px</output></span><input type="range" min="60" max="210" step="10" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /></label>
        <label className="interactive-example__control"><span className="interactive-example__control-heading"><span>duration</span><output>{duration.toFixed(1)}s</output></span><input type="range" min="0.2" max="1.6" step="0.1" value={duration} onChange={(event) => setDuration(Number(event.target.value))} /></label>
      </div>}
      preview={<div className="value-modes-example">{[0, 1, 2, 3].map((index) => <div key={index} className="value-modes-example__row"><span>{index}</span><div className="value-modes-example__lane"><div className={targetClassName} /></div></div>)}</div>}
      code={`gsap.to('.box', {
  x: ${codeValue},
  duration: ${animationConfig.duration.toFixed(1)},
  ease: '${animationConfig.ease}'
})`}
      propertyDetails={[
        { name: 'function', type: '(index, target, targets) => value', defaultValue: '해당 없음', acceptedValues: '각 target에 사용할 속성값 반환' },
        { name: 'random()', type: 'string', defaultValue: '해당 없음', acceptedValues: '범위·반올림 단위 또는 값 배열' },
        { name: 'relative', type: 'string', defaultValue: '해당 없음', acceptedValues: '+=값 또는 -=값' },
      ]}
      changes={[describeChange(valueDescriptor), `현재 선택한 표현은 ${modeLabels[valueDescriptor.mode]}입니다.`]}
      watchFor={['함수와 랜덤 모드에서 대상별 도착점이 달라지는 이유를 코드와 함께 봅니다.', '현재 x가 120px인 상태에서 절대값과 +=·-=의 도착점을 비교합니다.']}
      explanation={<p>함수는 각 target마다 <code>index, target, targets</code>를 받습니다. random 문자열은 GSAP이 해석하고, <code>gsap.utils.random()</code>은 일반 JavaScript 값으로 직접 사용할 수 있습니다.</p>}
      onReplay={replay}
    />
  </div>
}
