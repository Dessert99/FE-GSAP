/** 콜백 여섯 종류와 Params, callbackScope의 호출 순서를 로그로 보여준다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './CallbacksExample.css'
import { type LoggedCallbackDescriptor, useCallbacksAnimation } from './useCallbacksAnimation'

function serializeLoggedCallbacks(loggedCallbacks: LoggedCallbackDescriptor[]) {
  return loggedCallbacks.map(({ name, paramsValue }) => `  ${name}: log,\n  ${name}Params: ['${paramsValue}']`).join(',\n')
}

export function CallbacksExample() {
  const { scope, targetClassName, meter, logs, reducedMotion, animationConfig, callbackScopeLabel, loggedCallbacks, restart, reverse, kill, replay } = useCallbacksAnimation()
  const loggedCallbackCode = serializeLoggedCallbacks(loggedCallbacks)

  const code = `const callbackScope = { label: '${callbackScopeLabel}' }

const tween = gsap.to('.box', {
  x: ${animationConfig.x}, duration: ${animationConfig.duration.toFixed(1)},
  repeat: ${animationConfig.repeat}, repeatDelay: ${animationConfig.repeatDelay.toFixed(2)}, yoyo: ${animationConfig.yoyo},
  callbackScope,
  onUpdate: syncProgress,
${loggedCallbackCode}
})

tween.restart()
tween.reverse()
tween.kill()`

  return (
    <div ref={scope} id="callbacks-example">
      <InteractiveExample
        title="콜백이 호출되는 실제 순서"
        description="시작·갱신·반복·완료·역방향 완료·중단 이벤트와 Params, callbackScope를 한 로그에서 확인합니다."
        sourcePath="src/content/gsap/methods/gsap-to/examples/CallbacksExample/useCallbacksAnimation.ts"
        reducedMotion={reducedMotion}
        controls={<div className="callbacks-example__actions"><button type="button" onClick={restart}>restart()</button><button type="button" onClick={reverse}>reverse()</button><button type="button" onClick={kill}>kill()</button></div>}
        preview={<div className="callbacks-example"><div className="callbacks-example__lane"><div className={targetClassName} /></div><p>progress <output ref={meter}>0%</output></p><ol aria-live="polite">{logs.length ? logs.map((log, index) => <li key={`${log}-${index}`}>{log}</li>) : <li>콜백을 기다리는 중…</li>}</ol></div>}
        code={code}
        propertyDetails={[
          { name: 'callbackScope', type: 'object', defaultValue: 'Tween 인스턴스', acceptedValues: '모든 콜백의 this로 사용할 객체' },
          { name: 'onStart / Params', type: 'function / unknown[]', defaultValue: '지정 안 함', acceptedValues: '시작 시 호출할 함수와 인자' },
          { name: 'onUpdate / Params', type: 'function / unknown[]', defaultValue: '지정 안 함', acceptedValues: '매 tick 호출할 함수와 인자' },
          { name: 'onRepeat / Params', type: 'function / unknown[]', defaultValue: '지정 안 함', acceptedValues: '새 반복 회차의 함수와 인자' },
          { name: 'onComplete / Params', type: 'function / unknown[]', defaultValue: '지정 안 함', acceptedValues: '정방향 완료 함수와 인자' },
          { name: 'onReverseComplete / Params', type: 'function / unknown[]', defaultValue: '지정 안 함', acceptedValues: '역방향 완료 함수와 인자' },
          { name: 'onInterrupt / Params', type: 'function / unknown[]', defaultValue: '지정 안 함', acceptedValues: '완료 전 중단 함수와 인자' },
        ]}
        changes={['onUpdate는 화면의 progress만 갱신하고 이벤트 로그에는 쌓지 않아 차이를 분리했습니다.', 'Params의 문자열과 callbackScope.label이 실제 로그 문장을 구성합니다.']}
        watchFor={['정상 왕복은 onStart → onRepeat → onComplete 순서인지 확인합니다.', '재생 중 kill()하면 onComplete 대신 onInterrupt가 기록되는지 확인합니다.']}
        explanation={<p>콜백 이름은 호출 시점을, 같은 이름의 <code>Params</code> 속성은 전달할 인자를 정합니다. <code>callbackScope</code>는 일반 함수 내부의 <code>this</code>를 모든 콜백에 공통 적용합니다.</p>}
        onReplay={replay}
      />
    </div>
  )
}
