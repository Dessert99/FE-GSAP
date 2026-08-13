/** 네 가지 중단 범위를 조작·관찰·코드로 동시에 확인하는 학습 패널을 조립한다. */
import type { KillMode } from './useKillScopeAnimation'
import { useKillScopeAnimation } from './useKillScopeAnimation'
import './KillScopeLab.css'

// radio에 노출할 중단 범위와 읽기 쉬운 이름이다
const modeOptions: { value: KillMode; label: string; scope: string }[] = [
  { value: 'global-all', label: 'target의 Tween 전부', scope: '전역 조회' },
  { value: 'global-prop', label: 'target의 x만', scope: '전역 조회' },
  { value: 'instance-all', label: '이 Tween 전부', scope: 'instance' },
  { value: 'instance-prop', label: '이 Tween의 x만', scope: 'instance' },
]

/** 고른 범위가 실제로 어떤 호출로 실행되는지를 코드 한 줄로 포맷한다. */
function formatStopCall(mode: KillMode, property: string) {
  if (mode === 'global-all') return 'gsap.killTweensOf(box)'
  if (mode === 'global-prop') return `gsap.killTweensOf(box, '${property}')`
  if (mode === 'instance-all') return 'tween.kill()'
  return `tween.kill(box, '${property}')`
}

export function KillScopeLab() {
  // runtime이 소유한 descriptor·관찰값·조작 action을 그대로 받아 화면에만 쓴다
  const {
    scope,
    descriptor,
    mode,
    setMode,
    progress,
    appliedMode,
    appliedProgress,
    observation,
    status,
    seek,
    applyStop,
    reset,
  } = useKillScopeAnimation()

  // 중단 전후 slider 이동을 실제 실행 순서대로 코드 패널에 표시한다
  const progressBeforeStop = appliedProgress ?? descriptor.progress
  // 중단 뒤 slider를 더 옮긴 경우에만 두 번째 progress 호출을 표시한다
  const progressAfterStop = appliedMode && descriptor.progress !== appliedProgress ? `\ntween.progress(${descriptor.progress})` : ''
  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `const box = gsap.utils.toArray('${descriptor.selector}', scope.current)[0]
gsap.set(box, { x: 0, opacity: 1 })

const tween = gsap.to(box, {
  x: ${descriptor.targetX},
  opacity: ${descriptor.targetOpacity},
  duration: ${descriptor.duration},
  ease: 'none',
  paused: true,
})

tween.progress(${progressBeforeStop})
${appliedMode ? `${formatStopCall(appliedMode, descriptor.killedProperty)}${progressAfterStop}` : `// 아직 중단하지 않았습니다 — 고른 범위: ${formatStopCall(mode, descriptor.killedProperty)}`}

gsap.getProperty(box, 'x')       // → ${observation.x}
gsap.getProperty(box, 'opacity') // → ${observation.opacity}
gsap.getTweensOf(box).length     // → ${observation.remainingTweens}`

  return (
    <section className="kill-scope-lab" aria-labelledby="kill-scope-lab-title">
      <h3 id="kill-scope-lab-title">범위를 바꿔 가며 멈춰 보기</h3>
      <p className="kill-scope-lab__goal">
        상자 하나가 <code>x</code>와 <code>opacity</code> 두 값을 함께 바꿉니다. 재생 헤드를 중간까지 옮긴 뒤 범위를 골라 멈추고,{' '}
        <strong>헤드를 더 옮겨</strong> 어떤 값이 아직 반응하는지 확인하세요.
      </p>

      <div className="kill-scope-lab__body" ref={scope}>
        <div className="kill-scope-lab__stage">
          <div className="kill-scope-lab__box" />
        </div>

        <fieldset className="kill-scope-lab__controls">
          <legend>조작</legend>

          <label htmlFor="kill-scope-progress">재생 헤드 위치</label>
          <output htmlFor="kill-scope-progress">{progress.toFixed(2)}</output>
          <input
            id="kill-scope-progress"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={progress}
            onChange={(event) => seek(Number(event.target.value))}
          />

          <div className="kill-scope-lab__radio-group" role="radiogroup" aria-labelledby="kill-scope-mode-label">
            <p id="kill-scope-mode-label">중단 범위</p>
            {modeOptions.map((option) => (
              <label key={option.value} htmlFor={`kill-scope-mode-${option.value}`}>
                <input
                  id={`kill-scope-mode-${option.value}`}
                  type="radio"
                  name="kill-scope-mode"
                  value={option.value}
                  checked={mode === option.value}
                  onChange={() => setMode(option.value)}
                />
                <span>
                  {option.label}
                  <small>{option.scope}</small>
                </span>
              </label>
            ))}
          </div>

          <button type="button" onClick={applyStop}>
            이 범위로 멈추기
          </button>
          <button type="button" onClick={reset}>
            Tween 새로 만들기
          </button>
        </fieldset>
      </div>

      <p className="kill-scope-lab__status" role="status">
        {status}
      </p>

      <dl className="kill-scope-lab__observation">
        <div>
          <dt id="kill-scope-obs-x">현재 x</dt>
          <dd>
            <output aria-labelledby="kill-scope-obs-x">{observation.x}</output>
          </dd>
        </div>
        <div>
          <dt id="kill-scope-obs-opacity">현재 opacity</dt>
          <dd>
            <output aria-labelledby="kill-scope-obs-opacity">{observation.opacity}</output>
          </dd>
        </div>
        <div>
          <dt id="kill-scope-obs-remaining">이 target에 남은 Tween</dt>
          <dd>
            <output aria-labelledby="kill-scope-obs-remaining">{observation.remainingTweens}개</output>
          </dd>
        </div>
        <div>
          <dt id="kill-scope-obs-applied">실행한 중단 호출</dt>
          <dd>
            <output aria-labelledby="kill-scope-obs-applied">
              {appliedMode ? formatStopCall(appliedMode, descriptor.killedProperty) : '아직 없음'}
            </output>
          </dd>
        </div>
      </dl>

      <pre className="kill-scope-lab__code">
        <code>{code}</code>
      </pre>

      <div className="kill-scope-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            범위를 좁힌 두 가지(<code>x만</code>)로 멈춘 뒤 헤드를 더 옮기면 <code>x</code>는 유지되고 <code>opacity</code>만
            바뀝니다. 범위를 좁히지 않으면 헤드를 더 옮겨도 두 값 모두 유지됩니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <strong>남은 Tween 수</strong>를 보세요. 전부 멈추면 <code>0개</code>, <code>x</code>만 멈추면 <code>1개</code>입니다. 아직
            할 일(<code>opacity</code>)이 남은 Tween은 살아 있습니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서는 <code>propertiesList</code>의 기본값이 <code>"all"</code>이고, 이름을 콤마로 나열하면{' '}
            <strong>그 property만 더 이상 animate하지 않는다</strong>고 밝힙니다. 실행 결과에서도 <code>x</code>만 중단하면 Tween이
            조회에 남아 <code>opacity</code>를 계속 갱신하고, 전체를 중단하면 조회 결과가 0개가 됩니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            드래그로 위치를 직접 잡는 동안에는 위치 tween만 멈추고 페이드는 그대로 두고 싶을 때 범위를 좁힙니다. 반대로 화면을 떠날 때는
            남기지 말고 전부 멈추는 쪽이 안전합니다.
          </p>
        </article>
      </div>

      <p className="kill-scope-lab__source">
        실행 코드 위치 · <code>examples/KillScopeLab/useKillScopeAnimation.ts</code>
      </p>
    </section>
  )
}
