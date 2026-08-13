/** from 계열의 생성 직후·시작·완료 snapshot과 실행 코드를 함께 표시한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './ImmediateRenderExample.css'
import { type ImmediateMethod, type ImmediateRenderDescriptor, useImmediateRenderAnimation } from './useImmediateRenderAnimation'

// runtime descriptor를 실제 method 문법과 reduced-motion 정적 단계로 직렬화한다.
function createImmediateRenderCode(descriptor: ImmediateRenderDescriptor, targetSelector: string) {
  // phase 비교가 항상 같은 현재 x에서 시작하도록 runtime 초기화도 표시한다.
  const initialState = `gsap.set('${targetSelector}', { x: ${descriptor.currentX} }) // 생성 전 현재 상태`
  // 실제 호출에 공통으로 들어가는 timing property를 한 줄씩 표시한다.
  const timing = `duration: ${descriptor.timing.duration}, delay: ${descriptor.timing.delay}, immediateRender: ${descriptor.timing.immediateRender}, ease: 'none', onStart: observeStart, onComplete: observeComplete`
  // 선택한 method의 인자 구조를 descriptor 그대로 옮긴다.
  const call = descriptor.method === 'from'
    ? `gsap.from('${targetSelector}', { x: ${descriptor.fromVars.x}, ${timing} })`
    : `gsap.fromTo('${targetSelector}',\n  { x: ${descriptor.fromVars.x} },\n  { x: ${descriptor.toVars.x}, ${timing} }\n)`
  // 모션 감소 환경의 두 정적 snapshot도 runtime 실행 순서와 맞춰 표시한다.
  const staticSteps = descriptor.reducedMotion
    ? `\n\ngsap.set('${targetSelector}', { x: ${descriptor.createdX} }) // 생성 직후 snapshot\ngsap.set('${targetSelector}', { x: ${descriptor.finalX} }) // 완료 snapshot`
    : ''

  return `${initialState}\n${call}${staticSteps}`
}

// phase 식별자를 화면에서 읽기 쉬운 한국어 상태로 바꾼다.
const phaseLabels = {
  ready: '생성 준비',
  created: '생성 직후 · delay 대기',
  started: 'Tween 시작',
  finished: 'Tween 완료',
} as const

/** immediateRender가 delay 전 화면에 미치는 영향을 실제 snapshot으로 비교한다. */
export function ImmediateRenderExample() {
  // runtime의 control·descriptor·관찰 상태를 학습 UI에 연결한다.
  const { scope, targetSelector, targetClassName, method, setMethod, immediateRender, setImmediateRender, descriptor, snapshots, reducedMotion, replay } = useImmediateRenderAnimation()
  // 실제 실행 descriptor만 문법으로 바꿔 code panel에 전달한다.
  const code = createImmediateRenderCode(descriptor, targetSelector)
  // null인 초기 관찰값을 아직 읽지 않았다는 문장으로 표시한다.
  const formatSnapshot = (value: number | null) => value === null ? '관찰 전' : `x ${value}`

  return (
    <div ref={scope}>
      <InteractiveExample
        title="delay 전에도 시작값이 보일까요?"
        description="생성 직후 snapshot과 Tween 시작 snapshot을 비교해 immediateRender가 어느 시점에 화면을 바꾸는지 확인합니다."
        sourcePath="src/content/gsap/fundamentals/tween-start-end-values/examples/ImmediateRenderExample/useImmediateRenderAnimation.ts"
        reducedMotion={reducedMotion}
        controls={(
          <div className="interactive-example__control-list">
            <fieldset className="immediate-render-example__methods">
              <legend>from 계열 method</legend>
              {(['from', 'fromTo'] as ImmediateMethod[]).map((value) => (
                <label key={value}><input type="radio" name="immediate-method" checked={method === value} onChange={() => setMethod(value)} /><span>{value}</span></label>
              ))}
            </fieldset>
            <label className="interactive-example__check">
              <input type="checkbox" checked={immediateRender} onChange={(event) => setImmediateRender(event.target.checked)} />
              immediateRender
            </label>
          </div>
        )}
        preview={(
          <div className="immediate-render-example">
            <div className="immediate-render-example__track" aria-hidden="true">
              <span>시작 x {descriptor.fromVars.x}</span><span>현재 x {descriptor.currentX}</span><span>끝 x {descriptor.finalX}</span>
              <div className={targetClassName}>{method}</div>
            </div>
            <p className="immediate-render-example__phase" aria-live="polite">현재 phase · {phaseLabels[snapshots.phase]}</p>
            <dl className="immediate-render-example__snapshots">
              <div><dt>생성 직후</dt><dd>{formatSnapshot(snapshots.createdX)}</dd></div>
              <div><dt>시작 frame</dt><dd>{formatSnapshot(snapshots.startedX)}</dd></div>
              <div><dt>완료</dt><dd>{formatSnapshot(snapshots.finalX)}</dd></div>
            </dl>
          </div>
        )}
        code={code}
        propertyDetails={[
          { name: 'immediateRender', type: 'boolean', defaultValue: 'true', acceptedValues: 'true면 from()의 vars 또는 fromTo()의 fromVars를 생성 즉시 적용, false면 실제 시작까지 현재 상태 유지' },
          { name: 'delay', type: 'number', defaultValue: '0초', acceptedValues: 'Tween이 시작되기 전 대기할 0 이상의 초' },
          { name: 'fromVars', type: 'object', defaultValue: '없음', acceptedValues: 'fromTo의 시작 상태, animation 값 중심' },
          { name: 'toVars', type: 'object', defaultValue: '없음', acceptedValues: 'fromTo의 끝 상태와 duration·ease·callback' },
        ]}
        changes={[
          immediateRender ? `생성 직후부터 시작 x ${descriptor.fromVars.x}이 적용됩니다.` : `생성 직후에는 현재 x ${descriptor.currentX}을 유지하고 Tween 시작 때 시작값을 적용합니다.`,
          method === 'from' ? `from은 현재 x ${descriptor.currentX}으로 돌아옵니다.` : `fromTo는 현재값과 무관하게 x ${descriptor.finalX}로 끝납니다.`,
        ]}
        watchFor={[
          `delay 대기 중 생성 직후 snapshot이 ${descriptor.fromVars.x}인지 ${descriptor.currentX}인지 비교합니다.`,
          'from과 fromTo의 시작은 같아도 완료 x가 서로 다른지 확인합니다.',
          reducedMotion ? '모션 없이 생성 직후와 완료 snapshot의 숫자를 비교합니다.' : '현재 phase가 생성 직후, 시작, 완료 순서로 바뀌는지 봅니다.',
        ]}
        explanation={<p><code>immediateRender</code>는 재생 속도가 아니라 시작값을 언제 target에 쓰는지 정합니다. 그래서 delay가 있어도 기본값 <code>true</code>이면 생성한 순간부터 시작 모습이 보입니다.</p>}
        onReplay={replay}
      />
    </div>
  )
}
