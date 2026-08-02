/** 여러 targets의 stagger 간격과 출발 기준을 조절해 보여준다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './MultipleTargetsExample.css'
import { useMultipleTargetsAnimation } from './useMultipleTargetsAnimation'

const targets = ['A', 'B', 'C', 'D', 'E']
const origins = ['start', 'center', 'edges', 'random'] as const

export function MultipleTargetsExample() {
  const { scope, targetClassName, x, setX, duration, setDuration, animationDuration, stagger, setStagger, animationStagger, from, setFrom, reducedMotion, replay } = useMultipleTargetsAnimation()

  const startWindow = stagger * (targets.length - 1)
  const code = `gsap.to('.dot', {
  x: ${x},
  duration: ${animationDuration.toFixed(1)},
  stagger: {
    each: ${animationStagger.toFixed(2)},
    from: '${from}'
  },
  ease: 'power2.out'
})`

  return (
    <div ref={scope}>
      <InteractiveExample
        title="여러 대상과 stagger"
        description="같은 vars 객체를 다섯 대상에 적용하고 시작 시점만 일정한 간격으로 나눕니다."
        sourcePath="src/content/gsap/methods/gsap-to/examples/MultipleTargetsExample/useMultipleTargetsAnimation.ts"
        reducedMotion={reducedMotion}
        controls={
          <div className="interactive-example__control-list">
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                <span>x</span>
                <output>{x}px</output>
              </span>
              <input type="range" min="80" max="220" step="10" value={x} onChange={(event) => setX(Number(event.target.value))} />
            </label>
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                <span>duration</span>
                <output>{duration.toFixed(1)}s</output>
              </span>
              <input type="range" min="0.2" max="1.5" step="0.1" value={duration} onChange={(event) => setDuration(Number(event.target.value))} />
            </label>
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                <span>stagger</span>
                <output>{stagger.toFixed(2)}s</output>
              </span>
              <input type="range" min="0" max="0.5" step="0.02" value={stagger} onChange={(event) => setStagger(Number(event.target.value))} />
            </label>
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading"><span>from</span></span>
              <select value={from} onChange={(event) => setFrom(event.target.value as (typeof origins)[number])}>
                {origins.map((origin) => <option key={origin}>{origin}</option>)}
              </select>
            </label>
          </div>
        }
        preview={
          <div className="multiple-targets-example">
            {targets.map((target) => (
              <div key={target} className="multiple-targets-example__row">
                <span>{target}</span>
                <div className="multiple-targets-example__lane">
                  <div className={targetClassName} />
                </div>
              </div>
            ))}
          </div>
        }
        code={code}
        propertyDetails={[
          { name: 'x', type: 'number | string | function', defaultValue: '각 대상의 현재 x', acceptedValues: '숫자는 px, 단위 문자열, 상대값, 함수' },
          { name: 'duration', type: 'number | string | function', defaultValue: '0.5초', acceptedValues: '0 이상의 초 단위 값' },
          { name: 'stagger', type: 'number | function | object', defaultValue: '0', acceptedValues: '대상 사이의 초, 계산 함수, from·grid·ease 등을 가진 객체' },
          { name: 'ease', type: 'string | function', defaultValue: 'power1.out', acceptedValues: '내장 ease 이름, 설정 문자열, 사용자 함수' },
        ]}
        changes={[
          `다섯 대상은 모두 ${x}px 이동하지만 ${from} 기준으로 ${stagger.toFixed(2)}초 간격으로 출발합니다.`,
          `첫 출발과 마지막 출발 사이의 전체 시작 범위는 ${startWindow.toFixed(2)}초입니다.`,
        ]}
        watchFor={[
          'from을 start, center, edges, random으로 바꾸며 첫 출발 대상이 어떻게 달라지는지 봅니다.',
          'stagger는 각 대상의 duration을 바꾸는 값이 아니라 시작 시점의 간격이라는 점을 봅니다.',
        ]}
        explanation={
          <p>
            선택자가 여러 요소를 찾으면 GSAP은 같은 vars를 각각에 적용합니다. <code>stagger</code>는 대상 배열의 순서에 따라 시작 시각을
            나누므로, tween을 여러 번 작성하지 않고도 연속적인 그룹 움직임을 만들 수 있습니다.
          </p>
        }
        onReplay={replay}
      />
    </div>
  )
}
