/** repeatRefresh가 목적지를 다시 계산하는 시점을 한 대상의 단계별 흐름으로 설명한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './RepeatRefreshExample.css'
import { type RepeatRefreshStep, useRepeatRefreshAnimation } from './useRepeatRefreshAnimation'

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
  const { scope, targetClassName, selectedStep, selectStep, cycle, destinations, animationConfig, reducedMotion, replay } = useRepeatRefreshAnimation()
  const step = repeatRefreshSteps[selectedStep]
  const totalCycles = animationConfig.repeat + 1
  const currentDestination = destinations.at(-1)

  const changes = {
    initial: ['random() 함수가 호출되어 이번 Tween이 사용할 목적지 하나를 정했습니다.'],
    repeat: ['회차는 네 번으로 늘었지만 목적지를 계산한 기록은 하나뿐입니다. 같은 목적지를 네 번 재사용합니다.'],
    refresh: ['새 회차가 시작될 때마다 목적지 계산 기록이 추가됩니다. 새로 뽑은 값은 이전 값과 같을 수도 있습니다.'],
    use: ['같은 애니메이션 코드를 반복하면서 목적지를 계속 다시 뽑아 기계적이지 않은 움직임을 만들 수 있습니다.'],
  }[selectedStep]

  const watchFor = {
    initial: ['공이 움직이기 전에 목적지 숫자가 한 번 표시되는지 봅니다.'],
    repeat: ['현재 회차는 증가하지만 목적지를 계산한 횟수와 기록은 1회로 남는지 봅니다.'],
    refresh: ['회차가 바뀔 때 계산 횟수가 늘어나는지 봅니다. 목적지 숫자는 무작위라 같은 값이 다시 나올 수도 있습니다.'],
    use: ['떠다니는 입자처럼 같은 동작이 반복될 때마다 목적지를 다시 선택하는 모습을 봅니다.'],
  }[selectedStep]

  return (
    <div ref={scope} id="repeat-refresh">
      <InteractiveExample
        title="repeatRefresh는 반복 전에 목적지를 다시 계산합니다"
        description="repeat는 같은 Tween을 다시 실행하고, random()은 호출될 때 목적지 하나를 뽑습니다. repeatRefresh는 새 회차 전에 그 값을 다시 뽑을지 결정합니다."
        sourcePath="src/content/gsap/methods/gsap-to/examples/RepeatRefreshExample/useRepeatRefreshAnimation.ts"
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
        code={`gsap.to('.box', {
  x: () => gsap.utils.random(40, 230, 10),
  duration: ${animationConfig.duration.toFixed(1)},
  repeat: ${animationConfig.repeat},
  repeatDelay: ${animationConfig.repeatDelay.toFixed(2)},
  repeatRefresh: ${animationConfig.repeatRefresh},
  ease: '${animationConfig.ease}'
})`}
        propertyDetails={[
          { name: 'repeat', type: 'number', defaultValue: '0', acceptedValues: '반복 횟수, -1은 무한 반복' },
          { name: 'repeatRefresh', type: 'boolean', defaultValue: 'false', acceptedValues: 'true면 새 정방향 회차 전에 동적 값 재계산' },
          { name: 'random()', type: 'function | string', defaultValue: '해당 없음', acceptedValues: 'gsap.utils.random(min, max, increment) 또는 random(min, max, increment) 문자열' },
        ]}
        changes={changes}
        watchFor={watchFor}
        explanation={<p><code>random()</code> 같은 함수 기반 값은 Tween이 처음 값을 준비할 때 계산되고 그 결과가 저장됩니다. <code>repeat</code>만 쓰면 저장된 값을 재사용합니다. <code>repeatRefresh: true</code>를 추가하면 새 정방향 회차 전에 저장된 값을 버리고 함수를 다시 호출합니다.</p>}
        onReplay={replay}
      />
    </div>
  )
}
