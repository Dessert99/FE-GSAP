/** 같은 progress에서 ease curve·Tween 위치·표의 value를 함께 비교한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './EaseCurveExplorer.css'
import { useEaseCurveAnimation } from './useEaseCurveAnimation'
import type { EaseFamily, EaseVariant } from './useEaseCurveAnimation'

// selector에 표시할 Core ease family 전체 선택지다.
const easeFamilies: EaseFamily[] = ['none', 'power1', 'power2', 'power3', 'power4', 'back', 'bounce', 'circ', 'elastic', 'expo', 'sine']
// family의 가속 방향을 비교할 선택지다.
const easeVariants: EaseVariant[] = ['out', 'inOut', 'in']

export function EaseCurveExplorer() {
  // controls·paused Tween·curve sample이 공유하는 runtime 상태다.
  const { scope, targetClassName, family, setFamily, variant, setVariant, progress, setProgress, descriptor, samples, currentValue, replay } = useEaseCurveAnimation()
  // runtime sample을 SVG 좌표 문법으로만 직렬화한다.
  const graphPoints = samples.map((sample) => `${sample.progress * 240},${100 - sample.value * 100}`).join(' ')
  // 실제 paused Tween descriptor를 학습 패널의 코드 문법으로만 직렬화한다.
  const code = `const tween = gsap.to('.box', {
  x: ${descriptor.x},
  duration: ${descriptor.duration},
  ease: '${descriptor.easeExpression}',
  paused: true
})

tween.progress(${descriptor.progress.toFixed(3)})`

  return (
    <div ref={scope}>
      <InteractiveExample
        title="같은 progress에서 curve 비교"
        description="family와 방향을 고른 뒤 progress를 움직여 같은 시간 위치가 서로 다른 value와 화면 위치로 번역되는지 확인합니다."
        sourcePath="src/content/gsap/fundamentals/easing/examples/EaseCurveExplorer/useEaseCurveAnimation.ts"
        controls={
          <div className="interactive-example__control-list">
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading"><span>family</span></span>
              <select value={family} onChange={(event) => setFamily(event.target.value as EaseFamily)}>
                {easeFamilies.map((ease) => <option key={ease}>{ease}</option>)}
              </select>
            </label>
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading"><span>방향</span></span>
              <select value={variant} disabled={family === 'none'} onChange={(event) => setVariant(event.target.value as EaseVariant)}>
                {easeVariants.map((easeVariant) => <option key={easeVariant}>{easeVariant}</option>)}
              </select>
            </label>
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading"><span>progress</span><output>{progress.toFixed(3)}</output></span>
              <input type="range" min="0" max="1" step="0.025" value={progress} onChange={(event) => setProgress(Number(event.target.value))} />
            </label>
          </div>
        }
        preview={
          <div className="ease-curve-explorer">
            <div className="ease-curve-explorer__track" aria-label={`progress ${progress.toFixed(3)}, value ${currentValue.toFixed(3)}`}>
              <div className={targetClassName}>value</div>
            </div>
            <svg className="ease-curve-explorer__graph" viewBox="0 0 240 100" role="img" aria-labelledby="ease-curve-title ease-curve-description">
              <title id="ease-curve-title">{descriptor.easeExpression} curve</title>
              <desc id="ease-curve-description">가로축 progress와 세로축 value의 관계를 표와 같은 아홉 지점으로 연결한 그래프</desc>
              <line x1="0" y1="100" x2="240" y2="0" className="ease-curve-explorer__guide" />
              <polyline points={graphPoints} className="ease-curve-explorer__line" />
            </svg>
            <p className="ease-curve-explorer__reading" aria-live="polite"><code>{progress.toFixed(3)}</code> progress → <code>{currentValue.toFixed(3)}</code> value</p>
          </div>
        }
        code={code}
        propertyDetails={[
          { name: 'ease', type: 'string | function', defaultValue: 'power1.out', acceptedValues: 'Core family 이름, family.variant, 설정 문자열, easing function' },
          { name: 'progress()', type: 'number', defaultValue: '현재 playhead', acceptedValues: '0~1 normalized progress' },
        ]}
        changes={[
          `${descriptor.easeExpression}은 progress ${descriptor.progress.toFixed(3)}을 value ${currentValue.toFixed(3)}으로 바꿉니다.`,
          'none은 대각선과 겹치고, 다른 family는 같은 progress에서도 target 위치가 달라집니다.',
        ]}
        watchFor={[
          'out과 in을 바꿨을 때 곡선이 시작과 끝 중 어느 쪽에서 더 크게 휘는지 봅니다.',
          'back·elastic에서는 value가 1을 넘어 target이 목표 위치를 잠시 초과할 수 있습니다.',
        ]}
        explanation={
          <><p>GSAP은 먼저 시간 비율인 <code>progress</code>를 계산하고 easing function의 반환값을 property 보간 비율로 사용합니다. 그래서 duration과 거리가 같아도 curve가 다르면 현재 화면 위치가 달라집니다.</p><div className="ease-curve-explorer__table-wrap"><table><thead><tr><th scope="col">progress</th><th scope="col">value</th></tr></thead><tbody>{samples.map((sample) => <tr key={sample.progress}><td>{sample.progress.toFixed(3)}</td><td>{sample.value.toFixed(3)}</td></tr>)}</tbody></table></div></>
        }
        onReplay={replay}
      />
    </div>
  )
}
