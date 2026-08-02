/** 배열과 백분율 keyframes가 중간 상태를 배치하는 방식을 비교한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './KeyframesExample.css'
import { type KeyframesAnimationConfig, useKeyframesAnimation } from './useKeyframesAnimation'

const modes = ['array', 'percentage'] as const

function formatKeyframeVars(vars: Record<string, number>) {
  return Object.entries(vars).map(([name, value]) => `${name}: ${value}`).join(', ')
}

function serializeAnimationConfig(animationConfig: KeyframesAnimationConfig) {
  if (Array.isArray(animationConfig.keyframes)) {
    const keyframes = animationConfig.keyframes.map((vars) => `    { ${formatKeyframeVars(vars)} }`).join(',\n')
    return `gsap.to('.box', {
  keyframes: [
${keyframes}
  ],
  ease: '${animationConfig.ease}'
})`
  }

  const keyframes = Object.entries(animationConfig.keyframes).map(([position, vars]) => `    '${position}': { ${formatKeyframeVars(vars)} }`).join(',\n')
  const duration = 'duration' in animationConfig ? animationConfig.duration : 0
  return `gsap.to('.box', {
  keyframes: {
${keyframes}
  },
  duration: ${duration},
  ease: '${animationConfig.ease}'
})`
}

export function KeyframesExample() {
  const { scope, targetClassName, mode, setMode, animationConfig, reducedMotion, replay } = useKeyframesAnimation()
  const code = serializeAnimationConfig(animationConfig)

  return (
    <div ref={scope} id="keyframes-example">
      <InteractiveExample
        title="한 Tween 안의 여러 도착 상태"
        description="배열 방식은 단계별 시간을, 백분율 방식은 전체 시간 안의 위치를 중심으로 작성합니다."
        sourcePath="src/content/gsap/methods/gsap-to/examples/KeyframesExample/useKeyframesAnimation.ts"
        reducedMotion={reducedMotion}
        controls={<div className="interactive-example__control-list"><label className="interactive-example__control"><span className="interactive-example__control-heading"><span>keyframes 형식</span></span><select value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}>{modes.map((value) => <option key={value} value={value}>{value === 'array' ? 'vars 배열' : '백분율 객체'}</option>)}</select></label></div>}
        preview={<div className="keyframes-example"><div className="keyframes-example__path" /><div className={targetClassName}>KF</div></div>}
        code={code}
        propertyDetails={[{ name: 'keyframes', type: 'object[] | object', defaultValue: '지정 안 함', acceptedValues: 'vars 배열·백분율 객체·속성 기반 객체' }]}
        changes={[mode === 'array' ? '각 vars가 작은 to()처럼 순서대로 이어지고 각 단계의 duration을 사용합니다.' : `전체 ${'duration' in animationConfig ? animationConfig.duration : 0}초의 25%, 60%, 100% 지점에 상태를 배치합니다.`]}
        watchFor={['x만 적은 단계에서는 이전 y와 rotation 값이 유지되는지 봅니다.', '같은 대상을 반복해서 gsap.to()로 호출할 필요가 없다는 점을 코드에서 확인합니다.']}
        explanation={<p>배열의 각 항목은 앞 단계의 상태를 다음 단계의 시작값으로 사용합니다. 백분율 형식은 전체 duration을 먼저 정한 뒤 특정 진행률의 상태를 배치합니다.</p>}
        onReplay={replay}
      />
    </div>
  )
}
