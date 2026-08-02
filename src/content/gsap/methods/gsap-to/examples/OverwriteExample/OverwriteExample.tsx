/** 겹친 Tween에서 overwrite 값별 속성 충돌 처리 차이를 보여준다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './OverwriteExample.css'
import { type OverwriteValue, useOverwriteAnimation } from './useOverwriteAnimation'

const overwriteValues = ['false', 'auto', 'true'] as const
export function OverwriteExample() {
  const { scope, targetClassName, overwrite, setOverwrite, initialTweenConfig, overwriteTweenConfig, reducedMotion, replay } = useOverwriteAnimation()
  const description = reducedMotion
    ? `모션 감소 설정에서는 두 Tween의 duration과 delay를 ${overwriteTweenConfig.delay.toFixed(2)}초로 정규화해 최종 충돌 결과를 즉시 보여줍니다.`
    : '두 Tween을 함께 생성합니다. true는 즉시 첫 Tween 전체를 kill하고, auto는 0.65초 뒤 첫 render에서 겹치는 x만 정리합니다.'
  const changes = reducedMotion
    ? [`첫 Tween duration ${initialTweenConfig.duration.toFixed(1)}초, 두 번째 Tween duration ${overwriteTweenConfig.duration.toFixed(1)}초·delay ${overwriteTweenConfig.delay.toFixed(2)}초로 시간 기반 비교를 생략합니다.`]
    : [overwrite === 'auto' ? '0.65초 뒤 두 번째 Tween이 첫 render할 때 x만 정리하므로 rotation은 계속됩니다.' : overwrite === 'true' ? '두 번째 Tween의 delay와 관계없이 생성 즉시 첫 Tween 전체를 kill해 x와 rotation이 멈춥니다.' : 'overwrite를 하지 않아 0.65초 후부터 두 Tween이 x를 쓰며 경쟁합니다.']
  const watchFor = reducedMotion
    ? ['모션 감소 환경에서는 시간에 따른 충돌 차이 대신 즉시 적용된 최종 상태를 확인합니다.']
    : ['true는 0.65초 delay를 기다리지 않고 회전까지 생성 즉시 멈추는지 봅니다.', 'auto는 0.65초 뒤 x만 정리해 회전을 남기고, false는 x 경쟁을 남기는지 비교합니다.']
  const explanation = reducedMotion
    ? <p>정규화된 <code>duration: {initialTweenConfig.duration}</code>과 <code>delay: {overwriteTweenConfig.delay}</code>로 즉시 최종 상태를 만듭니다. overwrite 규칙은 같지만 지연 후 충돌이나 지속 경쟁은 관찰하지 않습니다.</p>
    : <p><code>overwrite: true</code>는 새 Tween을 생성하는 순간 같은 target의 기존 Tween 전체를 kill하므로 <code>delay</code>와 관계없이 <code>x</code>와 <code>rotation</code>이 멈춥니다. <code>'auto'</code>는 0.65초 뒤 첫 render에서 활성 중인 충돌 속성 <code>x</code>만 kill해 <code>rotation</code>을 남기고, <code>false</code>는 두 Tween의 경쟁을 허용합니다.</p>

  return (
    <div ref={scope} id="overwrite">
      <InteractiveExample
        title="같은 target의 Tween이 겹칠 때"
        description={description}
        sourcePath="src/content/gsap/methods/gsap-to/examples/OverwriteExample/useOverwriteAnimation.ts"
        reducedMotion={reducedMotion}
        controls={<div className="interactive-example__control-list"><label className="interactive-example__control"><span className="interactive-example__control-heading"><span>overwrite</span></span><select value={overwrite} onChange={(event) => setOverwrite(event.target.value as OverwriteValue)}>{overwriteValues.map((value) => <option key={value}>{value}</option>)}</select></label></div>}
        preview={<div className="overwrite-example"><div className={targetClassName}>↗</div></div>}
        code={`gsap.to('.box', {
  x: ${initialTweenConfig.x}, rotation: ${initialTweenConfig.rotation}, duration: ${initialTweenConfig.duration.toFixed(1)},
  ease: '${initialTweenConfig.ease}'
})

gsap.to('.box', {
  x: ${overwriteTweenConfig.x}, duration: ${overwriteTweenConfig.duration.toFixed(1)}, delay: ${overwriteTweenConfig.delay.toFixed(2)},
  overwrite: ${typeof overwriteTweenConfig.overwrite === 'string' ? "'auto'" : overwriteTweenConfig.overwrite},
  ease: '${overwriteTweenConfig.ease}'
})`}
        propertyDetails={[{ name: 'overwrite', type: 'boolean | "auto"', defaultValue: 'false', acceptedValues: 'false·true·"auto"' }]}
        changes={changes}
        watchFor={watchFor}
        explanation={explanation}
        onReplay={replay}
      />
    </div>
  )
}
