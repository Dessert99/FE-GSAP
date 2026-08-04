/** 콜백 여섯 종류와 Params, callbackScope의 호출 순서를 로그로 보여준다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './CallbacksExample.css'
import { type LoggedCallbackDescriptor, useCallbacksAnimation } from './useCallbacksAnimation'

/** runtime과 공유한 callback descriptor를 callback·Params 코드 쌍으로 표시한다. */
function serializeLoggedCallbacks(loggedCallbacks: LoggedCallbackDescriptor[]) {
  return loggedCallbacks.map(({ name, paramsValue }) => `  ${name}: log,\n  ${name}Params: ['${paramsValue}']`).join(',\n')
}

/** Tween 생명주기 callback과 Params 및 callbackScope의 호출 결과를 설명한다. */
export function CallbacksExample() {
  // controls·preview·표시 코드가 공유할 실제 callback 실행 상태를 받는다.
  const { scope, targetClassName, meter, logs, reducedMotion, animationConfig, callbackScopeLabel, updateParamsValue, loggedCallbacks, restart, reverse, kill, replay } = useCallbacksAnimation()
  // 실제 callback descriptor 목록을 코드 패널의 callback·Params 속성으로 만든다.
  const loggedCallbackCode = serializeLoggedCallbacks(loggedCallbacks)

  // runtime이 사용한 animationConfig와 callback 목록을 그대로 Tween 코드로 표시한다.
  const code = `const callbackScope = { label: '${callbackScopeLabel}' }
let tween

function syncProgress(progressLabel) {
  if (!tween) return
  meter.value = Math.round(tween.progress() * 100) + '%'
  meter.setAttribute('aria-label', progressLabel + ' 진행률')
}

tween = gsap.to('.box', {
  x: ${animationConfig.x}, duration: ${animationConfig.duration.toFixed(1)},
  repeat: ${animationConfig.repeat}, repeatDelay: ${animationConfig.repeatDelay.toFixed(2)}, yoyo: ${animationConfig.yoyo},
  callbackScope,
  onUpdate: syncProgress,
  onUpdateParams: ['${updateParamsValue}'],
${loggedCallbackCode}
})

syncProgress('${updateParamsValue}')

tween.restart()
tween.reverse()
tween.kill()`

  return (
    <div ref={scope} id="callbacks-example">
      <InteractiveExample
        title="콜백이 호출되는 실제 순서"
        description="시작·갱신·반복·완료·역방향 완료·중단 이벤트와 Params, callbackScope를 한 로그에서 확인합니다."
        sourcePath="src/content/gsap/fundamentals/gsap-to/examples/CallbacksExample/useCallbacksAnimation.ts"
        reducedMotion={reducedMotion}
        controls={<div className="callbacks-example__actions"><button type="button" onClick={restart}>restart()</button><button type="button" onClick={reverse}>reverse()</button><button type="button" onClick={kill}>kill()</button></div>}
        preview={<div className="callbacks-example"><div className="callbacks-example__lane"><div className={targetClassName} /></div><p>progress <output ref={meter}>0%</output></p><ol aria-live="polite">{logs.length ? logs.map((log, index) => <li key={`${log}-${index}`}>{log}</li>) : <li>콜백을 기다리는 중…</li>}</ol></div>}
        code={code}
        propertyDetails={[
          { name: 'callbackScope', type: '공식 페이지에 명시 없음', defaultValue: '공식 페이지에 명시 없음', acceptedValues: '공식 gsap.to(): 모든 콜백의 scope로 사용할 값' },
          { name: 'onStart / Params', type: '공식 gsap.to(): 함수 / 배열', defaultValue: '공식 페이지에 명시 없음', acceptedValues: '시작 시 호출할 함수와 인자' },
          { name: 'onUpdate / Params', type: '공식 gsap.to(): 함수 / 배열', defaultValue: '공식 페이지에 명시 없음', acceptedValues: '매 tick 호출할 함수와 인자' },
          { name: 'onRepeat / Params', type: '공식 gsap.to(): 함수 / 배열', defaultValue: '공식 페이지에 명시 없음', acceptedValues: '새 반복 회차의 함수와 인자' },
          { name: 'onComplete / Params', type: '공식 gsap.to(): 함수 / 배열', defaultValue: '공식 페이지에 명시 없음', acceptedValues: '정방향 완료 함수와 인자' },
          { name: 'onReverseComplete / Params', type: '공식 gsap.to(): 함수 / 배열', defaultValue: '공식 페이지에 명시 없음', acceptedValues: '역방향 완료 함수와 인자' },
          { name: 'onInterrupt / Params', type: '공식 gsap.to(): 함수 / 배열', defaultValue: '공식 페이지에 명시 없음', acceptedValues: '완료 전 중단 함수와 인자' },
        ]}
        changes={['onUpdate는 onUpdateParams의 progress 식별값을 받아 화면의 진행률만 갱신합니다.', '나머지 Params의 문자열과 callbackScope.label이 실제 이벤트 로그 문장을 구성합니다.']}
        watchFor={['정상 왕복은 onStart → onRepeat → onComplete 순서인지 확인합니다.', '재생 중 kill()하면 onComplete 대신 onInterrupt가 기록되는지 확인합니다.']}
        explanation={<p>콜백 이름은 호출 시점을, 같은 이름의 <code>Params</code> 속성은 전달할 인자를 정합니다. <code>callbackScope</code>는 일반 함수 내부의 <code>this</code>를 모든 콜백에 공통 적용합니다. 콜백 로그는 호출 순서와 누락된 이벤트, 완료 전에 중단된 원인을 찾는 디버깅 기록이고, 진행률 갱신은 Tween 상태를 UI와 앱 상태에 맞추는 동기화 작업입니다.</p>}
        onReplay={replay}
      />
    </div>
  )
}
