/** 네 생성 method의 실제 호출과 현재·시작·끝 소유권을 같은 descriptor로 표시한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './EndpointOwnershipExample.css'
import { endpointPositions, type EndpointDescriptor, type EndpointMethod, useEndpointOwnershipAnimation } from './useEndpointOwnershipAnimation'

// radio control에 표시할 method 이름과 짧은 목적을 고정한다.
const methods: { value: EndpointMethod; label: string }[] = [
  { value: 'to', label: 'to · 현재 → 목표' },
  { value: 'from', label: 'from · 시작 → 현재' },
  { value: 'fromTo', label: 'fromTo · 시작 → 끝' },
  { value: 'set', label: 'set · 즉시 적용' },
]

// runtime descriptor를 의미 변경 없이 GSAP 문법으로만 직렬화한다.
function createEndpointCode(descriptor: EndpointDescriptor) {
  // 네 비교가 공유하는 생성 전 현재 상태도 runtime과 같은 순서로 표시한다.
  const initialState = `gsap.set('.box', { x: ${descriptor.initialVars.x} }) // 예제의 현재 상태`
  if (descriptor.method === 'to') return `${initialState}\ngsap.to('.box', { x: ${descriptor.vars.x}, duration: ${descriptor.vars.duration}, ease: '${descriptor.vars.ease}' })`
  if (descriptor.method === 'from') return `${initialState}\ngsap.from('.box', { x: ${descriptor.vars.x}, duration: ${descriptor.vars.duration}, ease: '${descriptor.vars.ease}' })`
  if (descriptor.method === 'fromTo') return `${initialState}\ngsap.fromTo('.box',\n  { x: ${descriptor.fromVars.x} },\n  { x: ${descriptor.toVars.x}, duration: ${descriptor.toVars.duration}, ease: '${descriptor.toVars.ease}' }\n)`
  return `${initialState}\ngsap.set('.box', { x: ${descriptor.vars.x} })`
}

/** method를 바꾸며 같은 target의 두 끝이 어디에서 오는지 관찰하게 한다. */
export function EndpointOwnershipExample() {
  // runtime이 소유한 method·descriptor·실행 action을 화면에 연결한다.
  const { scope, targetClassName, method, setMethod, descriptor, reducedMotion, replay } = useEndpointOwnershipAnimation()
  // 현재 선택의 시작값과 끝값을 preview에서 텍스트로도 전달한다.
  const ownershipRows = [
    { label: '생성 전 현재값', value: `x ${descriptor.initialVars.x}` },
    { label: '실제 시작값', value: descriptor.ownership.start },
    { label: '실제 끝값', value: descriptor.ownership.end },
  ]
  // 표시 코드는 실제 호출에 사용된 descriptor만 직렬화한다.
  const code = createEndpointCode(descriptor)

  return (
    <div ref={scope}>
      <InteractiveExample
        title="current·start·end 소유권 비교"
        description="method를 고른 뒤 생성 전 현재값, 실제 시작값, 실제 끝값을 먼저 읽고 실행 결과를 확인합니다."
        sourcePath="src/content/gsap/fundamentals/tween-start-end-values/examples/EndpointOwnershipExample/useEndpointOwnershipAnimation.ts"
        reducedMotion={reducedMotion}
        controls={(
          <fieldset className="endpoint-ownership-example__methods">
            <legend>생성 method</legend>
            {methods.map((option) => (
              <label key={option.value}>
                <input type="radio" name="endpoint-method" value={option.value} checked={method === option.value} onChange={() => setMethod(option.value)} />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>
        )}
        preview={(
          <div className="endpoint-ownership-example">
            <div className="endpoint-ownership-example__track" aria-hidden="true">
              <span>from x {endpointPositions.start}</span><span>현재 x {endpointPositions.current}</span><span>목표 x {endpointPositions.end}</span>
              <div className={targetClassName}>{method}</div>
            </div>
            <dl className="endpoint-ownership-example__status">
              {ownershipRows.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}
            </dl>
          </div>
        )}
        code={code}
        propertyDetails={[
          { name: 'targets', type: 'string | Element | object | Array', defaultValue: '없음', acceptedValues: 'selector, DOM element, 일반 object, object array' },
          { name: 'vars', type: 'object', defaultValue: '없음', acceptedValues: 'animation 값과 special property' },
          { name: 'fromVars', type: 'object', defaultValue: '없음', acceptedValues: 'fromTo의 명시적 시작값' },
          { name: 'duration', type: 'number', defaultValue: '0.5초', acceptedValues: 'set은 0초, 나머지는 0 이상의 초' },
        ]}
        changes={[
          `${method}를 고르면 시작값은 ${descriptor.ownership.start}, 끝값은 ${descriptor.ownership.end}이 됩니다.`,
          reducedMotion ? '모션 감소 설정에서는 같은 method의 최종 상태를 0초로 적용합니다.' : '현재 값으로 실행을 누르면 같은 descriptor를 출발점부터 다시 확인합니다.',
        ]}
        watchFor={[
          `to와 from은 현재 x ${endpointPositions.current}를 서로 다른 끝으로 사용하는지 확인합니다.`,
          `fromTo는 현재 x ${endpointPositions.current}와 무관하게 ${endpointPositions.start}에서 ${endpointPositions.end}까지 가는지 봅니다.`,
          `set은 출발과 이동 과정 없이 x ${endpointPositions.end}을 즉시 적용하는지 봅니다.`,
        ]}
        explanation={<p>네 method는 모두 Tween 생성 API지만 값의 출처가 다릅니다. 현재 상태에 맡길 끝이 없다면 <code>fromTo()</code>, 보간 자체가 필요 없다면 <code>set()</code>을 선택합니다.</p>}
        onReplay={replay}
      />
    </div>
  )
}
