/** direct effect의 defaults merge·target 정규화·반환 Tween을 같은 runtime에서 보여준다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './RegisteredEffectExample.css'
import { registeredEffectRegistration, useRegisteredEffectAnimation } from './useRegisteredEffectAnimation'

export function RegisteredEffectExample() {
  // controls·effect call·관찰값·serializer가 공유하는 runtime 상태다.
  const { scope, targetClassName, mode, setMode, descriptor, observation, status, reducedMotion, run } = useRegisteredEffectAnimation()
  // 실제 direct call에서 duration을 생략했는지 명시했는지 그대로 직렬화한다.
  const durationLine = descriptor.callConfig.duration === undefined ? '' : `\n  duration: ${descriptor.callConfig.duration},`
  // registration descriptor와 실제 call config를 코드 문법으로만 표시한다.
  const code = `gsap.registerEffect({
  name: '${registeredEffectRegistration.name}',
  effect: (targets, config) => gsap.fromTo(
    targets,
    { autoAlpha: 0, y: 18 },
    {
      autoAlpha: 1,
      y: 0,
      duration: config.duration,
      ease: config.ease,
      paused: config.paused,
      immediateRender: false
    }
  ),
  defaults: { duration: ${registeredEffectRegistration.defaults.duration} },
  extendTimeline: ${registeredEffectRegistration.extendTimeline}
})

const tween = gsap.effects.${registeredEffectRegistration.name}(
  '.${targetClassName}',
  {${durationLine}
    ease: '${descriptor.callConfig.ease}',
    paused: ${descriptor.callConfig.paused}
  }
)`

  return (
    <div ref={scope}>
      <InteractiveExample
        title="등록된 fade effect 직접 호출"
        description="duration을 생략하거나 명시해 callback에 도착한 effective config가 달라지는지 확인합니다. radio를 바꿔도 Tween은 자동 재생되지 않습니다."
        sourcePath="src/content/gsap/fundamentals/reusable-effects/examples/RegisteredEffectExample/useRegisteredEffectAnimation.ts"
        controls={<fieldset className="registered-effect-example__fieldset"><legend>duration 전달 방식</legend><label><input type="radio" name="registered-effect-duration" value="default" checked={mode === 'default'} onChange={() => setMode('default')} /><span>default 생략</span><output>{registeredEffectRegistration.defaults.duration}초</output></label><label><input type="radio" name="registered-effect-duration" value="override" checked={mode === 'override'} onChange={() => setMode('override')} /><span>호출값 override</span><output>0.8초</output></label></fieldset>}
        preview={<div className="registered-effect-example"><div className={targetClassName}><span>NOTICE</span><strong>등록된 effect 함수</strong></div><dl><div><dt>callback targets</dt><dd>Array · {observation.targetCount}개</dd></div><div><dt>effective duration</dt><dd>{observation.effectiveDuration}초</dd></div><div><dt>직접 호출 반환</dt><dd>{observation.returnedTween ? 'Tween' : '준비 중'}</dd></div></dl><p role="status">{status}</p></div>}
        code={code}
        propertyDetails={[
          { name: 'targets', type: 'Array', defaultValue: '필수', acceptedValues: 'selector · Element · object · group이 callback 전에 array로 정규화' },
          { name: 'defaults.duration', type: 'number', defaultValue: '등록값 2', acceptedValues: '호출 config에서 생략한 key만 채움' },
          { name: '직접 호출 반환값', type: 'callback 반환 타입', defaultValue: 'effect callback 결과', acceptedValues: '이 예제는 Tween' },
        ]}
        changes={[mode === 'default' ? '호출 config에 duration이 없어 registration defaults의 2초가 적용됩니다.' : '호출 config의 0.8초가 registration defaults보다 우선합니다.', `selector 한 개가 callback 전에 ${observation.targetCount}개 target의 Array로 정규화됩니다.`, ...(reducedMotion ? ['모션 감소 설정에서는 duration 의미를 유지하고 재생 헤드를 즉시 끝으로 옮겨 정적 결과만 보여줍니다.'] : [])]}
        watchFor={['radio를 바꾼 직후에는 target이 움직이지 않고 실행 버튼에서만 시작하는지 확인합니다.', '코드에서 생략한 duration과 관찰 패널의 effective duration이 일치하는지 비교합니다.']}
        explanation={<p><code>registerEffect()</code>는 effect callback을 등록하고 animation instance는 반환하지 않습니다. 현재 설치된 GSAP 3.15.0에서 <code>gsap.effects[name]()</code>을 호출하면 targets를 array로 바꾸고 defaults를 merge한 뒤 callback이 반환한 Tween을 그대로 돌려줍니다.</p>}
        onReplay={run}
      />
    </div>
  )
}
