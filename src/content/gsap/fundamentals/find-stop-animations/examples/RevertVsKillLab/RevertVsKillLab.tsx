/** kill과 revert의 결과 차이를 조작·관찰·코드로 동시에 확인하는 학습 패널을 조립한다. */
import type { StopMode } from './useRevertVsKillAnimation'
import { useRevertVsKillAnimation } from './useRevertVsKillAnimation'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './RevertVsKillLab.css'

// radio에 노출할 중단 방식과 읽기 쉬운 이름이다
const modeOptions: { value: StopMode; label: string; hint: string }[] = [
  { value: 'kill', label: 'tween.kill()', hint: '지금 값을 그대로 두고 멈춘다' },
  { value: 'revert', label: 'tween.revert()', hint: 'animation 이전 상태로 되돌린다' },
]

export function RevertVsKillLab() {
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
  } = useRevertVsKillAnimation()

  // 중단 전후 slider 이동을 실제 실행 순서대로 코드 패널에 표시한다
  const progressBeforeStop = appliedProgress ?? descriptor.progress
  // 중단 뒤 slider를 더 옮긴 경우에만 두 번째 progress 호출을 표시한다
  const progressAfterStop = appliedMode && descriptor.progress !== appliedProgress ? `\ntween.progress(${descriptor.progress})` : ''
  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `const box = gsap.utils.toArray('${descriptor.selector}', scope.current)[0]

// 시작 투명도는 stylesheet가 정합니다. vars에 시작값을 적지 않습니다.
gsap.set(box, { clearProps: 'opacity' })

const tween = gsap.to(box, {
  opacity: ${descriptor.targetOpacity},
  duration: ${descriptor.duration},
  ease: 'none',
  id: '${descriptor.tweenId}',
  paused: true,
})

tween.progress(${progressBeforeStop})
${appliedMode ? `tween.${appliedMode}()${progressAfterStop}` : `// 아직 중단하지 않았습니다 — 고른 방식: tween.${mode}()`}

gsap.getProperty(box, 'opacity') // → ${observation.opacity}
box.getAttribute('style')        // → ${observation.inlineStyle === '(없음)' ? 'null' : `"${observation.inlineStyle}"`}
gsap.getById('${descriptor.tweenId}')          // → ${observation.foundById ? 'Tween' : 'undefined'}
gsap.getTweensOf(box).length     // → ${observation.remainingTweens}`

  return (
    <section className="revert-vs-kill-lab" aria-labelledby="revert-vs-kill-lab-title">
      <h3 id="revert-vs-kill-lab-title">같은 지점에서 멈추기와 되돌리기 비교</h3>
      <p className="revert-vs-kill-lab__goal">
        상자의 <code>opacity</code>는 stylesheet가 <strong>0.25</strong>로 정해 뒀고, Tween이 그것을 1까지 올립니다. 같은 지점에서{' '}
        <code>kill()</code>과 <code>revert()</code>를 번갈아 실행하고, 상자와 <strong>inline style 문자열</strong>이 어떻게 달라지는지
        보세요.
      </p>

      <div className="revert-vs-kill-lab__body" ref={scope}>
        <div className="revert-vs-kill-lab__stage">
          <div className="revert-vs-kill-lab__box" />
          <p className="revert-vs-kill-lab__legend">stylesheet가 정한 시작 투명도 0.25 · Tween의 목적지 1</p>
        </div>

        <fieldset className="revert-vs-kill-lab__controls">
          <legend>조작</legend>

          <label htmlFor="revert-kill-progress">재생 헤드 위치</label>
          <output htmlFor="revert-kill-progress">{progress.toFixed(2)}</output>
          <input
            id="revert-kill-progress"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={progress}
            onChange={(event) => seek(Number(event.target.value))}
          />

          <div className="revert-vs-kill-lab__radio-group" role="radiogroup" aria-labelledby="revert-kill-mode-label">
            <p id="revert-kill-mode-label">중단 방식</p>
            {modeOptions.map((option) => (
              <label key={option.value} htmlFor={`revert-kill-mode-${option.value}`}>
                <input
                  id={`revert-kill-mode-${option.value}`}
                  type="radio"
                  name="revert-kill-mode"
                  value={option.value}
                  checked={mode === option.value}
                  onChange={() => setMode(option.value)}
                />
                <span>
                  <code>{option.label}</code>
                  <small>{option.hint}</small>
                </span>
              </label>
            ))}
          </div>

          <button type="button" onClick={applyStop}>
            이 방식으로 중단하기
          </button>
          <button type="button" onClick={reset}>
            Tween 새로 만들기
          </button>
        </fieldset>
      </div>

      <p className="revert-vs-kill-lab__status" role="status">
        {status}
      </p>

      <dl className="revert-vs-kill-lab__observation">
        <div>
          <dt id="revert-kill-obs-opacity">현재 opacity</dt>
          <dd>
            <output aria-labelledby="revert-kill-obs-opacity">{observation.opacity}</output>
          </dd>
        </div>
        <div>
          <dt id="revert-kill-obs-inline">element의 inline style</dt>
          <dd>
            <output aria-labelledby="revert-kill-obs-inline">{observation.inlineStyle}</output>
          </dd>
        </div>
        <div>
          <dt id="revert-kill-obs-id">gsap.getById('{descriptor.tweenId}')</dt>
          <dd>
            <output aria-labelledby="revert-kill-obs-id">{observation.foundById ? 'Tween' : 'undefined'}</output>
          </dd>
        </div>
        <div>
          <dt id="revert-kill-obs-remaining">이 target에 남은 Tween</dt>
          <dd>
            <output aria-labelledby="revert-kill-obs-remaining">{observation.remainingTweens}개</output>
          </dd>
        </div>
      </dl>

      <pre className="revert-vs-kill-lab__code">
        <code>{code}</code>
      </pre>

      <div className="revert-vs-kill-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <code>kill()</code>은 상자를 <strong>멈춘 그 밝기 그대로</strong> 두고, <code>revert()</code>는{' '}
            <strong>처음 밝기로 되돌립니다.</strong> 두 경우 모두 Tween 자체는 사라져서 <code>getById</code>가{' '}
            <code>undefined</code>가 됩니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <strong>inline style 줄</strong>이 이 예제의 핵심입니다. <code>kill()</code> 뒤에는{' '}
            <code>opacity: 0.6...</code>이 element에 붙어 있고, <code>revert()</code> 뒤에는 <strong>(없음)</strong>이 됩니다. 중단한
            뒤 재생 헤드를 아무리 움직여도 두 경우 모두 값이 더 바뀌지 않습니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서가 밝힌 대로 kill은 <strong>"즉시 멈추고 정리한다"</strong>까지만 합니다. 화면을 원래대로 돌리는 일은 포함되지
            않습니다. <code>revert()</code>는 GSAP 3.11에 추가된 메서드로,{' '}
            <strong>animation이 추가한 inline style을 제거하면서 이전 상태로 되돌리고 함께 kill</strong>합니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            드래그를 놓은 지점의 값을 유지하려면 <code>kill()</code>, 화면을 떠나거나 레이아웃을 다시 계산하기 전에 animation이 추가한
            inline style을 제거하려면 <code>revert()</code>를 씁니다. 그러면 media query의 class rule이 다시 적용될 수 있습니다.
          </p>
        </article>
      </div>

      <p className="revert-vs-kill-lab__source">
        실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/find-stop-animations/examples/RevertVsKillLab/useRevertVsKillAnimation.ts" />
      </p>
    </section>
  )
}
