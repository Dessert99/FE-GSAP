/** repeatRefresh가 목적지를 다시 계산하는 시점을 한 대상의 단계별 흐름으로 설명한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './RepeatRefreshExample.css'
import { type RepeatRefreshStep, useRepeatRefreshAnimation } from './useRepeatRefreshAnimation'

// 단계 버튼의 목표·관찰 문구를 실제 실행 설정의 네 상태와 연결한다.
const repeatRefreshSteps = {
  initial: {
    label: '1. 첫 실행',
    title: 'random()이 첫 목적지를 한 번 뽑습니다',
    description: 'Tween을 만들 때 이동할 x 값을 한 번 계산합니다.',
  },
  repeat: {
    label: '2. repeat',
    title: 'repeat는 같은 목적지를 재사용합니다',
    description: '같은 Tween을 다시 실행하지만 목적지 함수는 다시 호출하지 않습니다.',
  },
  refresh: {
    label: '3. 다시 계산',
    title: 'repeatRefresh가 목적지 함수를 다시 호출합니다',
    description: '새 반복이 시작되기 전에 값을 다시 뽑습니다. 무작위이므로 이전과 같은 숫자가 나올 수도 있습니다.',
  },
  use: {
    label: '4. 활용',
    title: '같은 반복에서 다양한 결과를 만들 수 있습니다',
    description: '입자나 장식 요소의 위치를 회차마다 다시 뽑아 불규칙한 움직임을 만들 수 있습니다.',
  },
} as const

/** repeat·random()·repeatRefresh의 관계를 첫 실행부터 실제 사용처까지 차례로 보여준다. */
export function RepeatRefreshExample() {
  // Hook이 실행한 단계·회차·목적지 기록을 그대로 받아 UI와 표시 코드를 맞춘다.
  const { scope, targetClassName, selectedStep, selectStep, cycle, destinations, randomRange, animationConfig, reducedMotion, replay } = useRepeatRefreshAnimation()
  // 현재 단계의 목표와 관찰 안내를 선택한다.
  const step = repeatRefreshSteps[selectedStep]
  // repeat가 최초 실행 이후 추가 횟수라는 점을 반영해 전체 회차를 계산한다.
  const totalCycles = animationConfig.repeat + 1
  // 함수 기반 x가 마지막으로 평가해 실제 Tween에 적용한 목적지를 표시한다.
  const currentDestination = destinations.at(-1)
  // 실제 descriptor와 관찰 로직을 GSAP 문법으로만 직렬화한다.
  const code = `const randomRange = { min: ${randomRange.min}, max: ${randomRange.max}, increment: ${randomRange.increment} }
let evaluationCount = 0

gsap.to('.box', {
  x: () => {
    const nextDestination = gsap.utils.random(randomRange.min, randomRange.max, randomRange.increment)
    evaluationCount += 1
    setDestinations((current) => evaluationCount === 1 ? [nextDestination] : [...current, nextDestination])
    return nextDestination
  },
  duration: ${animationConfig.duration.toFixed(1)},
  repeat: ${animationConfig.repeat},
  repeatDelay: ${animationConfig.repeatDelay.toFixed(2)},
  repeatRefresh: ${animationConfig.repeatRefresh},
  ease: '${animationConfig.ease}',
  onRepeat: () => setCycle((current) => current + 1)
})`

  // 현재 단계에서 설정 변화가 만든 결과만 학습 패널에 설명한다.
  const changes = {
    initial: ['random() 함수가 호출되어 이번 Tween이 사용할 목적지 하나를 정했습니다.'],
    repeat: animationConfig.repeat === 0
      ? ['실제 repeat가 0이므로 한 번 계산한 목적지에 즉시 도착하고 추가 회차는 만들지 않습니다.']
      : [`회차는 ${totalCycles}번으로 늘었지만 목적지를 계산한 기록은 하나뿐입니다. 같은 목적지를 ${totalCycles}번 재사용합니다.`],
    refresh: animationConfig.repeat === 0
      ? ['실제 repeat가 0이므로 목적지를 한 번만 계산하고 안정된 도착 상태를 유지합니다.']
      : ['새 회차가 시작될 때마다 목적지 계산 기록이 추가됩니다. 새로 뽑은 값은 이전 값과 같을 수도 있습니다.'],
    use: animationConfig.repeat === 0
      ? ['모션 감소 설정에서는 반복 재계산 없이 한 번 뽑은 목적지의 안정 상태만 보여줍니다.']
      : ['같은 애니메이션 코드를 반복하면서 목적지를 계속 다시 뽑아 기계적이지 않은 움직임을 만들 수 있습니다.'],
  }[selectedStep]

  // 현재 단계에서 학습자가 화면과 기록에서 확인할 단서를 고른다.
  const watchFor = {
    initial: ['공이 움직이기 전에 목적지 숫자가 한 번 표시되는지 봅니다.'],
    repeat: animationConfig.repeat === 0
      ? ['현재 회차와 목적지 계산 기록이 모두 1회로 유지되는지 봅니다.']
      : ['현재 회차는 증가하지만 목적지를 계산한 횟수와 기록은 1회로 남는지 봅니다.'],
    refresh: animationConfig.repeat === 0
      ? ['목적지를 한 번 계산한 뒤 추가 onRepeat 없이 1 / 1 회차로 유지되는지 봅니다.']
      : ['회차가 바뀔 때 계산 횟수가 늘어나는지 봅니다. 목적지 숫자는 무작위라 같은 값이 다시 나올 수도 있습니다.'],
    use: animationConfig.repeat === 0
      ? ['움직임을 반복하지 않고 한 번 계산한 목적지에 안정적으로 놓이는지 봅니다.']
      : ['떠다니는 입자처럼 같은 동작이 반복될 때마다 목적지를 다시 선택하는 모습을 봅니다.'],
  }[selectedStep]

  return (
    <div ref={scope} id="repeat-refresh">
      <InteractiveExample
        title="repeatRefresh는 반복 전에 목적지를 다시 계산합니다"
        description="repeat는 같은 Tween을 다시 실행하고, random()은 호출될 때 목적지 하나를 뽑습니다. repeatRefresh는 새 회차 전에 그 값을 다시 뽑을지 결정합니다."
        sourcePath="src/content/gsap/fundamentals/gsap-to/examples/RepeatRefreshExample/useRepeatRefreshAnimation.ts"
        reducedMotion={reducedMotion}
        controls={(
          <div className="repeat-refresh-example__controls">
            {(Object.keys(repeatRefreshSteps) as RepeatRefreshStep[]).map((stepId) => (
              <button
                key={stepId}
                type="button"
                aria-pressed={selectedStep === stepId}
                onClick={() => selectStep(stepId)}
              >
                {repeatRefreshSteps[stepId].label}
              </button>
            ))}
          </div>
        )}
        preview={(
          <div className="repeat-refresh-example">
            <div className="repeat-refresh-example__intro">
              <span>{step.label}</span>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </div>
            <div className="repeat-refresh-example__lane">
              <span className="repeat-refresh-example__origin">시작 0px</span>
              {currentDestination !== undefined ? (
                <span className="repeat-refresh-example__destination" style={{ left: currentDestination }}>
                  목적지 {currentDestination}px
                </span>
              ) : null}
              <div className={targetClassName} />
            </div>
            <dl className="repeat-refresh-example__readout">
              <div><dt>현재 회차</dt><dd>{cycle} / {totalCycles}</dd></div>
              <div><dt>목적지를 계산한 횟수</dt><dd>{destinations.length}회</dd></div>
            </dl>
            <div className="repeat-refresh-example__history">
              <span>이번 실행의 목적지 계산 기록</span>
              {destinations.length > 0 ? (
                <ol>
                  {destinations.map((destination, index) => <li key={`${index}-${destination}`}>{index + 1}회: {destination}px</li>)}
                </ol>
              ) : <p>목적지를 계산하고 있습니다.</p>}
            </div>
            {selectedStep === 'use' ? (
              <p className="repeat-refresh-example__use"><strong>어디에 쓰나요?</strong> 배경 입자, 떠다니는 배지, 자연스럽게 흔들리는 장식 요소처럼 반복마다 위치·크기·회전이 달라야 할 때 사용합니다.</p>
            ) : null}
          </div>
        )}
        code={code}
        propertyDetails={[
          { name: 'repeat', type: '공식 gsap.to(): number', defaultValue: '공식 gsap.to(): 0', acceptedValues: '공식 gsap.to(): 추가 반복 횟수·-1(무한)' },
          { name: 'repeatRefresh', type: '공식 gsap.to(): boolean', defaultValue: '공식 페이지에 명시 없음', acceptedValues: '공식 gsap.to(): true | false' },
          { name: 'random()', type: '공식 gsap.to(): random(...) 문자열 · 연결된 utility: 함수', defaultValue: '해당 없음', acceptedValues: '공식 gsap.to(): random(min, max, increment) · 연결된 utility: gsap.utils.random()' },
        ]}
        changes={changes}
        watchFor={[...watchFor, 'repeatRefresh는 duration·delay·stagger를 갱신하지 않으며, yoyo 복귀 구간도 새 전체 회차가 아니므로 다시 계산하지 않습니다.']}
        explanation={<p><code>random()</code> 같은 함수 기반 값은 Tween이 처음 값을 준비할 때 계산되고 그 결과가 저장됩니다. <code>repeat</code>만 쓰면 저장된 값을 재사용합니다. <code>repeatRefresh: true</code>는 yoyo 복귀 구간이 아닌 새 전체 반복 회차가 시작될 때 동적 속성 값을 다시 평가합니다. <code>duration</code>, <code>delay</code>, <code>stagger</code>는 이 갱신 대상에 포함되지 않습니다.</p>}
        onReplay={replay}
      />
    </div>
  )
}
