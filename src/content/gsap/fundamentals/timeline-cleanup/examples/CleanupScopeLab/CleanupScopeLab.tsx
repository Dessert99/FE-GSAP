/** 여섯 cleanup을 같은 fixture에 적용하고 전후 snapshot과 실제 호출 코드를 한 화면에 조립한다. */
import type { CleanupDescriptor, CleanupMode, CleanupSnapshot } from './useCleanupScopeAnimation'
import { useCleanupScopeAnimation } from './useCleanupScopeAnimation'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './CleanupScopeLab.css'

// radio에 노출할 여섯 공식 선택과 가장 짧은 보존 범위 설명이다
const modeOptions: { value: CleanupMode; label: string; hint: string }[] = [
  { value: 'remove', label: 'remove(child)', hint: 'child 하나만 떼기' },
  { value: 'clear', label: 'clear(labels)', hint: 'container 내용 비우기' },
  { value: 'kill-tweens-of', label: 'killTweensOf()', hint: 'target/property 범위 중단' },
  { value: 'kill', label: 'kill()', hint: 'Timeline 폐기, 화면 유지' },
  { value: 'revert', label: 'revert()', hint: '화면 복원 뒤 폐기' },
  { value: 'auto-remove', label: 'autoRemoveChildren', hint: '완료 child 자동 배출' },
]

// 전후 표가 같은 순서와 같은 실제 snapshot 필드를 읽게 하는 행 descriptor다
const snapshotRows: { label: string; read: (snapshot: CleanupSnapshot) => string }[] = [
  { label: '부모에 Timeline 연결', read: (snapshot) => snapshot.attachedToParent ? '연결됨' : '분리됨' },
  { label: '남은 child 수', read: (snapshot) => String(snapshot.childCount) + '개' },
  { label: 'label 이름', read: (snapshot) => snapshot.labelNames },
  { label: 'animated child 연결', read: (snapshot) => snapshot.animatedChildAttached ? 'Timeline 안' : '분리됨' },
  { label: 'target x', read: (snapshot) => String(snapshot.targetX) },
  { label: 'target opacity', read: (snapshot) => String(snapshot.targetOpacity) },
  { label: 'inline style', read: (snapshot) => snapshot.inlineStyle },
  { label: 'onComplete event callback', read: (snapshot) => snapshot.eventCallbackKept ? '남음' : '없음' },
]

/** runtime descriptor를 뜻을 더하지 않고 실제 호출 문법 한 줄로 직렬화한다. */
function formatCleanupCall(descriptor: CleanupDescriptor) {
  if (descriptor.mode === 'remove') return 'timeline.remove(animatedChild)'
  if (descriptor.mode === 'clear') return 'timeline.clear(' + String(descriptor.clearLabels) + ')'
  if (descriptor.mode === 'kill-tweens-of') {
    // runtime이 null descriptor를 선택 인자 생략값으로 바꾼 결과까지 그대로 표시한다
    const properties = descriptor.killProperties === null ? 'undefined' : "'" + descriptor.killProperties + "'"
    return 'timeline.killTweensOf(target, ' + properties + ', ' + String(descriptor.onlyActive) + ')\ntimeline.progress(1, true)'
  }
  if (descriptor.mode === 'kill') return 'timeline.kill()'
  if (descriptor.mode === 'revert') return 'timeline.revert()'
  return 'timeline.autoRemoveChildren = true\ntimeline.totalTime(timeline.totalDuration(), true)\ntimeline.totalTime(0, true)'
}

export function CleanupScopeLab() {
  // runtime이 소유한 descriptor·전후 snapshot·실행 action을 화면에 그대로 사용한다
  const {
    scope,
    descriptor,
    mode,
    chooseMode,
    clearLabels,
    setClearLabels,
    killProperties,
    setKillProperties,
    onlyActive,
    setOnlyActive,
    before,
    after,
    returnValue,
    applied,
    status,
    applyCleanup,
    reset,
  } = useCleanupScopeAnimation()
  // 실제 descriptor를 실행 호출 문법으로만 포맷한다
  const cleanupCall = formatCleanupCall(descriptor)
  // fixture와 선택 호출, 실제 반환을 한 코드 snapshot으로 이어 붙인다
  const code = [
    "import gsap from 'gsap'",
    '',
    "const scope = document.querySelector('.cleanup-scope-lab__body')",
    "if (!scope) throw new Error('cleanup scope를 찾지 못했습니다.')",
    "const target = scope.querySelector('" + descriptor.selector + "')",
    "if (!target) throw new Error('animation target을 찾지 못했습니다.')",
    "const parent = gsap.timeline({ paused: true })",
    "const timeline = gsap.timeline({ paused: true, autoRemoveChildren: false, onComplete: () => undefined })",
    "timeline.to(target, { x: 160, opacity: 1, duration: 1, ease: 'none' })",
    'const animatedChild = timeline.getChildren(false, true, false)[0]',
    'timeline.call(() => undefined, [], 0.8)',
    "timeline.addLabel('scene', 0)",
    'parent.add(timeline, 0)',
    'timeline.progress(' + String(descriptor.sampleProgress) + ', true)',
    '',
    cleanupCall,
    '// 실제 반환 → ' + returnValue,
    '',
    'function cleanup() {',
    '  parent.revert()',
    "  gsap.set(target, { clearProps: 'all' })",
    '}',
  ].join('\n')

  return (
    <section className="cleanup-scope-lab" aria-labelledby="cleanup-scope-lab-title">
      <h3 id="cleanup-scope-lab-title">같은 Timeline에 cleanup 하나씩 적용하기</h3>
      <p className="cleanup-scope-lab__goal">Timeline 안에는 <strong>x·opacity Tween 하나, callback child 하나, scene label 하나, onComplete event callback 하나</strong>가 있습니다. 50% 지점의 같은 fixture에 선택한 cleanup을 적용하고, <strong>container → child → label → target style</strong> 순서로 전후를 읽으세요.</p>

      <div className="cleanup-scope-lab__body" ref={scope}>
        <div className="cleanup-scope-lab__stage">
          <div className="cleanup-scope-lab__box" aria-hidden="true" />
          <p>stylesheet 시작 opacity 0.25 · 중간 snapshot x 80 · 목적지 x 160</p>
        </div>

        <fieldset className="cleanup-scope-lab__controls">
          <legend>cleanup 선택</legend>
          <div className="cleanup-scope-lab__modes" role="radiogroup" aria-label="적용할 Timeline cleanup">
            {modeOptions.map((option) => (
              <label key={option.value}>
                <input type="radio" name="timeline-cleanup-mode" value={option.value} checked={mode === option.value} onChange={() => chooseMode(option.value)} />
                <span><code>{option.label}</code><small>{option.hint}</small></span>
              </label>
            ))}
          </div>

          {mode === 'clear' ? (
            <label className="cleanup-scope-lab__inline-control">
              <input type="checkbox" checked={clearLabels} disabled={applied} onChange={(event) => setClearLabels(event.target.checked)} />
              <span>labels도 지우기 <code>{String(clearLabels)}</code></span>
            </label>
          ) : null}

          {mode === 'kill-tweens-of' ? (
            <div className="cleanup-scope-lab__kill-controls">
              <label htmlFor="cleanup-kill-properties">property 범위</label>
              <select id="cleanup-kill-properties" value={killProperties ?? 'all'} disabled={applied} onChange={(event) => setKillProperties(event.target.value === 'all' ? null : 'x')}>
                <option value="x">x만</option>
                <option value="all">모든 property</option>
              </select>
              <label className="cleanup-scope-lab__inline-control">
                <input type="checkbox" checked={onlyActive} disabled={applied} onChange={(event) => setOnlyActive(event.target.checked)} />
                <span>onlyActive <code>{String(onlyActive)}</code></span>
              </label>
            </div>
          ) : null}

          <button type="button" onClick={applyCleanup} disabled={applied}>이 cleanup 실행</button>
          <button type="button" onClick={reset}>같은 fixture 다시 만들기</button>
        </fieldset>
      </div>

      <p className="cleanup-scope-lab__status" role="status">{status}</p>

      <div className="cleanup-scope-lab__table-wrap">
        <table className="cleanup-scope-lab__snapshot">
          <caption>실제 GSAP object와 element에서 읽은 단일 전후 snapshot</caption>
          <thead><tr><th scope="col">관찰</th><th scope="col">실행 전</th><th scope="col">실행 후</th></tr></thead>
          <tbody>{snapshotRows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.read(before)}</td><td>{row.read(after)}</td></tr>)}</tbody>
        </table>
      </div>

      <pre className="cleanup-scope-lab__code"><code>{code}</code></pre>

      <div className="cleanup-scope-lab__panels">
        <article><h4>무엇이 달라졌나요?</h4><p><code>remove</code>와 <code>clear</code>는 container를 남기고, <code>kill</code>과 <code>revert</code>는 부모에서 container를 떼며, <code>killTweensOf</code>는 target/property 범위만 바꿉니다. <code>autoRemoveChildren</code>은 완료 시점에 child만 빠집니다.</p></article>
        <article><h4>무엇을 봐야 하나요?</h4><p><strong>inline style</strong>과 <strong>animated child 연결</strong>을 함께 보세요. 구조가 사라져도 style은 남을 수 있고, revert만 animation이 추가한 inline style을 없앱니다.</p></article>
        <article><h4>왜 이렇게 동작하나요?</h4><p>여섯 API는 같은 “삭제”가 아니라 서로 다른 층을 조작합니다. 그래서 실행 전에 container, child graph, label/event callback, target state 중 무엇을 보존할지 먼저 정해야 합니다.</p></article>
        <article><h4>실제로 언제 쓰나요?</h4><p>편집 가능한 sequence에서는 <code>remove</code>·<code>clear</code>, 특정 대상 충돌 해소에는 <code>killTweensOf</code>, 폐기에는 <code>kill</code>, component나 반응형 style 복원에는 <code>revert</code>를 고릅니다.</p></article>
      </div>

      <p className="cleanup-scope-lab__source">실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/timeline-cleanup/examples/CleanupScopeLab/useCleanupScopeAnimation.ts" /></p>
    </section>
  )
}
