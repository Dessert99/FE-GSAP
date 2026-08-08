/** 같은 Timeline fixture에 여섯 cleanup 선택을 적용하고 전후 object graph·target snapshot을 직접 읽는다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'

/** 한 번에 적용할 cleanup 선택 — 여섯 공식 source와 일대일로 대응한다. */
export type CleanupMode = 'remove' | 'clear' | 'kill-tweens-of' | 'kill' | 'revert' | 'auto-remove'

/** controls·실제 GSAP 호출·표시 코드가 공유하는 정규화된 실행값이다. */
export type CleanupDescriptor = {
  selector: string
  mode: CleanupMode
  clearLabels: boolean
  killProperties: 'x' | null
  onlyActive: boolean
  sampleProgress: number
}

/** cleanup 전후에 같은 질문으로 읽는 Timeline object graph와 target 상태다. */
export type CleanupSnapshot = {
  attachedToParent: boolean
  childCount: number
  labelNames: string
  animatedChildAttached: boolean
  targetX: number
  targetOpacity: number
  inlineStyle: string
  eventCallbackKept: boolean
}

/** 실행 선택자이자 JSX className — 실제 target과 표시 코드를 같은 문자열로 묶는다. */
const targetSelector = '.cleanup-scope-lab__box'
// 모든 수동 cleanup이 같은 중간 지점에서 시작하도록 재생 헤드를 고정한다
const sampleProgress = 0.5
// 아직 fixture가 만들어지기 전에도 전후 표의 열 수를 안정적으로 유지한다
const emptySnapshot: CleanupSnapshot = {
  attachedToParent: false,
  childCount: 0,
  labelNames: '(없음)',
  animatedChildAttached: false,
  targetX: 0,
  targetOpacity: 0.25,
  inlineStyle: '(없음)',
  eventCallbackKept: false,
}

/** style attribute 자체가 없으면 revert가 CSS 주도권을 되찾은 상태로 표시한다. */
function readInlineStyle(target: HTMLElement) {
  // 빈 style 문자열도 attribute가 없는 것과 같은 관찰값으로 정규화한다
  const rawStyle = target.getAttribute('style')
  return rawStyle && rawStyle.trim() ? rawStyle.trim() : '(없음)'
}

/** 반환값을 실제 identity 비교로 읽어 공식 self 설명과 실행 차이를 드러낸다. */
function describeReturnValue(returned: unknown, timeline: gsap.core.Timeline) {
  if (returned === timeline) return 'self'
  if (returned === undefined) return 'undefined'
  return String(returned)
}

/** 여섯 모드에 공통인 control 값을 실제 호출 descriptor 하나로 만든다. */
function createDescriptor(
  mode: CleanupMode,
  clearLabels: boolean,
  killProperties: 'x' | null,
  onlyActive: boolean,
): CleanupDescriptor {
  return { selector: targetSelector, mode, clearLabels, killProperties, onlyActive, sampleProgress }
}

/** Timeline과 element에서 관찰값을 다시 읽어 화면이 실행 결과를 추론하지 않게 한다. */
function readSnapshot(
  parent: gsap.core.Timeline,
  timeline: gsap.core.Timeline,
  animatedChild: gsap.core.Tween,
  target: HTMLElement,
): CleanupSnapshot {
  // label object의 실제 key가 label 보존 여부를 결정한다
  const labelNames = Object.keys(timeline.labels)
  return {
    attachedToParent: timeline.parent === parent,
    childCount: timeline.getChildren(true, true, true).length,
    labelNames: labelNames.length ? labelNames.join(', ') : '(없음)',
    animatedChildAttached: animatedChild.parent === timeline,
    targetX: Number(Number(gsap.getProperty(target, 'x')).toFixed(1)),
    targetOpacity: Number(Number.parseFloat(String(gsap.getProperty(target, 'opacity'))).toFixed(3)),
    inlineStyle: readInlineStyle(target),
    eventCallbackKept: typeof timeline.eventCallback('onComplete') === 'function',
  }
}

/** cleanup scope 예제의 controls, Timeline fixture, 실행 action과 전후 snapshot을 제공한다. */
export function useCleanupScopeAnimation() {
  // 이 예제 밖의 element를 선택하지 않도록 useGSAP 실행 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // cleanup 뒤에도 held reference로 내부 graph을 읽기 위해 부모 Timeline을 보관한다
  const parentRef = useRef<gsap.core.Timeline | null>(null)
  // 여섯 cleanup 호출이 모두 같은 Timeline instance를 대상으로 삼는다
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  // remove와 child 연결 snapshot이 같은 Tween을 가리키게 참조를 보관한다
  const animatedChildRef = useRef<gsap.core.Tween | null>(null)
  // GSAP이 실제로 쓴 style과 값을 직접 읽기 위한 element 참조다
  const targetRef = useRef<HTMLElement | null>(null)
  // 사용자가 비교할 공식 cleanup 선택이다
  const [mode, setMode] = useState<CleanupMode>('remove')
  // clear가 label map까지 비울지 정하는 공식 labels 인자다
  const [clearLabels, setClearLabels] = useState(true)
  // killTweensOf가 x만 멈출지 target의 모든 property를 멈출지 정한다
  const [killProperties, setKillProperties] = useState<'x' | null>('x')
  // killTweensOf가 지금 active인 Tween만 고를지 정한다
  const [onlyActive, setOnlyActive] = useState(false)
  // 전후 snapshot은 같은 필드로 화면에 전달한다
  const [before, setBefore] = useState<CleanupSnapshot>(emptySnapshot)
  // cleanup 뒤 GSAP에서 다시 읽은 snapshot만 결과 열에 쓴다
  const [after, setAfter] = useState<CleanupSnapshot>(emptySnapshot)
  // 실제 반환값을 identity로 읽어 self와 undefined를 구분한다
  const [returnValue, setReturnValue] = useState('(실행 전)')
  // 같은 fixture에 cleanup을 두 번 적용하지 않도록 실행 여부를 기록한다
  const [applied, setApplied] = useState(false)
  // screen reader에는 frame 값이 아니라 reset·실행 같은 이산 상태만 전달한다
  const [status, setStatus] = useState('cleanup을 고른 뒤 전후 snapshot을 비교하세요.')
  // reset과 모드 변경 때 기존 context를 되돌리고 같은 fixture를 새로 만든다
  const [runKey, setRunKey] = useState(0)
  // controls·실행 분기·serializer가 같은 정규화 값을 소비한다
  const descriptor = useMemo(
    () => createDescriptor(mode, clearLabels, killProperties, onlyActive),
    [mode, clearLabels, killProperties, onlyActive],
  )

  useGSAP(
    () => {
      // scope 안에서 target을 한 번만 찾아 모든 실행과 관찰이 같은 element를 가리키게 한다
      const target = scope.current?.querySelector<HTMLElement>(targetSelector)
      if (!target) return
      // 이전 fixture가 남긴 inline style을 제거해 stylesheet의 opacity 0.25에서 다시 시작한다
      target.removeAttribute('style')
      // cleanup 대상 Timeline이 부모에서 떨어졌는지를 관찰할 외부 container다
      const parent = gsap.timeline({ paused: true })
      // label과 event callback이 child graph와 별개로 남는지 보여줄 핵심 Timeline이다
      const timeline = gsap.timeline({ paused: true, autoRemoveChildren: false, onComplete: () => undefined })
      // child 전체와 일부 property cleanup을 같은 Tween 하나로 비교한다
      timeline.to(target, { x: 160, opacity: 1, duration: 1, ease: 'none' })
      // Timeline.to()는 container self를 반환하므로 실제 child는 방금 추가한 Tween 목록에서 읽는다
      const animatedChild = timeline.getChildren(false, true, false)[0] as gsap.core.Tween
      // clear와 autoRemoveChildren이 zero-duration callback child도 제거하는지 child 수에 포함한다
      timeline.call(() => undefined, [], 0.8)
      // label은 clear의 labels 인자와 autoRemoveChildren 보존 범위를 관찰하게 한다
      timeline.addLabel('scene', 0)
      // kill과 revert가 Timeline을 이 부모에서 떼는지 비교하도록 중첩한다
      parent.add(timeline, 0)
      // 모든 수동 cleanup은 같은 중간 target 상태에서 출발한다
      timeline.progress(sampleProgress, true)

      parentRef.current = parent
      timelineRef.current = timeline
      animatedChildRef.current = animatedChild
      targetRef.current = target
      // 전후 두 열을 처음에는 같은 실제 snapshot으로 채운다
      const initialSnapshot = readSnapshot(parent, timeline, animatedChild, target)
      setBefore(initialSnapshot)
      setAfter(initialSnapshot)
      setReturnValue('(실행 전)')
      setApplied(false)

      // context 정리 뒤 event handler가 폐기된 fixture를 다시 만지지 않게 참조를 비운다
      return () => {
        parentRef.current = null
        timelineRef.current = null
        animatedChildRef.current = null
        targetRef.current = null
      }
    },
    // reset·모드 변경 때 이전 fixture를 revert하고 동일한 시작 상태를 다시 만든다
    { scope, dependencies: [runKey], revertOnUpdate: true },
  )

  // 다른 cleanup을 고르면 전 실험을 되돌리고 같은 fixture에서 새 비교를 시작한다
  function chooseMode(nextMode: CleanupMode) {
    setMode(nextMode)
    setRunKey((key) => key + 1)
    setStatus('같은 Timeline fixture를 다시 만들었습니다. 선택한 cleanup을 실행하세요.')
  }

  // 선택한 공식 cleanup을 실제 Timeline에 한 번 적용하고 반환·snapshot을 즉시 다시 읽는다
  function applyCleanup() {
    // fixture가 준비되지 않았거나 이미 실행했으면 graph을 더 바꾸지 않는다
    const parent = parentRef.current
    const timeline = timelineRef.current
    const animatedChild = animatedChildRef.current
    const target = targetRef.current
    if (!parent || !timeline || !animatedChild || !target || applied) return

    // 각 분기는 표시 descriptor와 같은 인자를 실제 GSAP 메서드에 넘긴다
    let returned: unknown
    if (descriptor.mode === 'remove') {
      // child 하나만 부모 Timeline에서 떼고 나머지 graph을 남긴다
      returned = timeline.remove(animatedChild)
    } else if (descriptor.mode === 'clear') {
      // 모든 child를 비우되 labels 인자로 label map 보존 여부를 정한다
      returned = timeline.clear(descriptor.clearLabels)
    } else if (descriptor.mode === 'kill-tweens-of') {
      // 이 target의 x 또는 모든 property를 onlyActive 범위 안에서 중단한다
      returned = timeline.killTweensOf(target, descriptor.killProperties ?? undefined, descriptor.onlyActive)
      // cleanup 뒤 끝으로 옮겨 죽은 property와 계속 계산되는 property를 결과 snapshot에서 구분한다
      timeline.progress(1, true)
    } else if (descriptor.mode === 'kill') {
      // 현재 target 값을 남기고 Timeline을 부모에서 떼어 폐기한다
      returned = timeline.kill()
    } else if (descriptor.mode === 'revert') {
      // animation 이전 target 상태를 복원하고 Timeline도 함께 kill한다
      returned = timeline.revert()
    } else {
      // 완료된 child를 즉시 배출하도록 Timeline property를 켠다
      timeline.autoRemoveChildren = true
      // 모든 child를 완료 지점까지 render해 자동 배출 조건을 만든다
      timeline.totalTime(timeline.totalDuration(), true)
      // 제거된 child가 부모의 과거 시각에서 다시 render되는지 확인한다
      timeline.totalTime(0, true)
      returned = undefined
    }

    setAfter(readSnapshot(parent, timeline, animatedChild, target))
    setReturnValue(descriptor.mode === 'auto-remove' ? '(property 설정)' : describeReturnValue(returned, timeline))
    setApplied(true)
    setStatus('cleanup을 실행했습니다. 전후 표에서 container, child, label, target style을 차례로 비교하세요.')
  }

  // 현재 실험을 되돌리고 같은 control 값으로 pristine fixture를 다시 만든다
  function reset() {
    setRunKey((key) => key + 1)
    setStatus('Timeline fixture를 원래 상태로 다시 만들었습니다.')
  }

  // TSX가 controls·snapshot·표시 코드를 같은 runtime state에서 그리도록 필요한 값만 전달한다
  return {
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
  }
}
