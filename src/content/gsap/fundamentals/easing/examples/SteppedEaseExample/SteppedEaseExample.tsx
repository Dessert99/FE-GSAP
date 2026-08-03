/** step 수와 progress를 수동 조절해 연속 보간과 다른 현재 계단값을 보여준다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './SteppedEaseExample.css'
import { useSteppedEaseAnimation } from './useSteppedEaseAnimation'

export function SteppedEaseExample() {
  // controls·paused Tween·현재 step text가 공유하는 runtime 상태다.
  const { scope, targetClassName, steps, setSteps, progress, setProgress, descriptor, currentValue, steppedValue, replay } = useSteppedEaseAnimation()
  // 시작값 0을 포함해 runtime step 수가 만드는 0→100 경계값을 모두 표시한다.
  const stepValues = Array.from({ length: steps + 1 }, (_, index) => Math.round((index / steps) * 100))
  // 실제 paused Tween과 playhead setter를 코드 문법으로만 직렬화한다.
  const code = `const tween = gsap.to('.box', {
  x: ${descriptor.x},
  duration: ${descriptor.duration},
  ease: '${descriptor.easeExpression}',
  paused: true
})

tween.progress(${descriptor.progress.toFixed(2)})`

  return (
    <div ref={scope}>
      <InteractiveExample
        title="progress를 계단값으로 바꾸기"
        description="step 수와 progress를 직접 바꿔 0→100이 연속된 소수가 아니라 정해진 계단값으로 전환되는 순간을 확인합니다."
        sourcePath="src/content/gsap/fundamentals/easing/examples/SteppedEaseExample/useSteppedEaseAnimation.ts"
        controls={
          <div className="interactive-example__control-list">
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading"><span>steps</span><output>{steps}</output></span>
              <input type="range" min="2" max="10" step="1" value={steps} onChange={(event) => setSteps(Number(event.target.value))} />
            </label>
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading"><span>progress</span><output>{progress.toFixed(2)}</output></span>
              <input type="range" min="0" max="1" step="0.01" value={progress} onChange={(event) => setProgress(Number(event.target.value))} />
            </label>
          </div>
        }
        preview={
          <div className="stepped-ease-example">
            <div className="stepped-ease-example__track"><div className={targetClassName}>{steppedValue}</div></div>
            <ol className="stepped-ease-example__values" aria-label={`${steps}단계의 경계값`}>{stepValues.map((value) => <li key={value} className={value === steppedValue ? 'is-current' : undefined} aria-current={value === steppedValue ? 'step' : undefined}>{value}</li>)}</ol>
            <p aria-live="polite"><code>{progress.toFixed(2)}</code> progress → <code>{currentValue.toFixed(2)}</code> ratio → <strong>{steppedValue}</strong></p>
          </div>
        }
        code={code}
        propertyDetails={[
          { name: 'steps()', type: 'number', defaultValue: '없음', acceptedValues: '1 이상의 step 수를 담은 ease 설정 문자열' },
          { name: 'progress()', type: 'number', defaultValue: '현재 playhead', acceptedValues: '0~1 normalized progress' },
        ]}
        changes={[
          `0→100이 ${steps}단계로 이동하며 경계값은 ${stepValues.join(', ')}입니다.`,
          `progress ${progress.toFixed(2)}에서 현재 적용값은 ${steppedValue}입니다.`,
        ]}
        watchFor={[
          'progress를 조금 움직여도 같은 구간 안에서는 target이 멈춰 있는지 확인합니다.',
          '경계를 넘는 순간 target과 현재 값이 다음 계단으로 동시에 바뀌는지 봅니다.',
        ]}
        explanation={<p><code>steps(n)</code>은 연속 progress를 n개의 불연속 반환값으로 양자화합니다. 그래서 sprite frame, 숫자 tick처럼 중간값을 보여주면 안 되는 변화에 적합합니다.</p>}
        onReplay={replay}
      />
    </div>
  )
}
