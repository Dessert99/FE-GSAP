/** 배열과 백분율 keyframes가 중간 상태를 배치하는 방식을 비교한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './KeyframesExample.css'
import { type KeyframesAnimationConfig, useKeyframesAnimation } from './useKeyframesAnimation'

// canonical 배열을 먼저 두고 linked-guide 백분율 확장을 다음 선택지로 둔다.
const modes = ['array', 'percentage'] as const

/** 한 keyframe의 vars를 실행값 그대로 코드 속성 목록으로 표시한다. */
function formatKeyframeVars(vars: Record<string, number>) {
  return Object.entries(vars).map(([name, value]) => `${name}: ${value}`).join(', ')
}

/** mode별 실제 animationConfig를 gsap.to() 코드 문법으로 직렬화한다. */
function serializeAnimationConfig(animationConfig: KeyframesAnimationConfig) {
  if (Array.isArray(animationConfig.keyframes)) {
    // canonical 배열의 각 to-style vars를 표시할 코드 행으로 바꾼다.
    const keyframes = animationConfig.keyframes.map((vars) => `    { ${formatKeyframeVars(vars)} }`).join(',\n')
    return `gsap.to('.box', {
  keyframes: [
${keyframes}
  ],
  ease: '${animationConfig.ease}'
})`
  }

  // linked-guide 백분율 지점과 vars를 표시할 코드 행으로 바꾼다.
  const keyframes = Object.entries(animationConfig.keyframes).map(([position, vars]) => `    '${position}': { ${formatKeyframeVars(vars)} }`).join(',\n')
  // 백분율 위치를 실제 시간으로 환산할 전체 duration을 표시한다.
  const duration = 'duration' in animationConfig ? animationConfig.duration : 0
  return `gsap.to('.box', {
  keyframes: {
${keyframes}
  },
  duration: ${duration},
  ease: '${animationConfig.ease}'
})`
}

/** canonical 배열과 linked-guide 확장의 출처 경계를 실행 예제로 비교한다. */
export function KeyframesExample() {
  // controls·preview·표시 코드가 공유할 실제 keyframes 실행 상태를 받는다.
  const { scope, targetClassName, mode, setMode, animationConfig, reducedMotion, replay } = useKeyframesAnimation()
  // 선택한 mode의 실제 config를 코드 패널 문자열로 만든다.
  const code = serializeAnimationConfig(animationConfig)

  return (
    <div ref={scope} id="keyframes-example">
      <InteractiveExample
        title="한 Tween 안의 여러 도착 상태"
        description="먼저 gsap.to() 공식 페이지의 to-style vars 배열을 익히고, 백분율 객체는 linked Keyframes guide가 넓혀 주는 별도 형식으로 비교합니다."
        sourcePath="src/content/gsap/methods/gsap-to/examples/KeyframesExample/useKeyframesAnimation.ts"
        reducedMotion={reducedMotion}
        controls={<div className="interactive-example__control-list"><label className="interactive-example__control"><span className="interactive-example__control-heading"><span>keyframes 형식</span></span><select value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}>{modes.map((value) => <option key={value} value={value}>{value === 'array' ? '공식 gsap.to() · vars 배열' : 'linked guide 확장 · 백분율 객체'}</option>)}</select></label></div>}
        preview={<div className="keyframes-example"><div className="keyframes-example__path" /><div className={targetClassName}>KF</div></div>}
        code={code}
        propertyDetails={[{ name: 'keyframes', type: '공식 gsap.to(): to-vars 배열 · 연결된 Keyframes 문서: 객체', defaultValue: '공식 페이지에 명시 없음', acceptedValues: '공식 gsap.to(): to-style vars 배열 · 연결된 Keyframes 문서: 백분율·속성 기반 객체' }]}
        changes={[mode === 'array' ? '공식 gsap.to()의 각 vars가 작은 to()처럼 순서대로 이어지고 각 단계의 duration을 사용합니다.' : `linked guide 확장에서는 전체 ${'duration' in animationConfig ? animationConfig.duration : 0}초의 25%, 60%, 100% 지점에 상태를 배치합니다.`]}
        watchFor={['x만 적은 단계에서는 이전 y와 rotation 값이 유지되는지 봅니다.', '같은 target에 반복한 gsap.to() 호출을 keyframes 하나로 바꿔 순서를 한곳에서 읽는지 확인합니다.']}
        explanation={<p>공식 <code>gsap.to()</code> 페이지의 배열은 각 항목을 to-style 상태로 이어 붙여 같은 target의 반복 호출을 줄입니다. 그래서 연속 상태를 한 설정에서 읽기 쉽고 CSS <code>@keyframes</code> 애니메이션도 GSAP 생명주기로 옮기기 쉽습니다. 백분율·속성 기반 객체는 linked Keyframes guide의 확장 형식이며 canonical 배열 설명과 구분합니다.</p>}
        onReplay={replay}
      />
    </div>
  )
}
