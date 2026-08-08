/** P43의 owned trigger, global refresh listeners, command log cleanup을 소유한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'

/** display와 runtime switch가 공유하는 lifecycle command 식별자다. */
export type LifecycleCommandId =
  | 'update'
  | 'instanceRefresh'
  | 'globalRefresh'
  | 'disable'
  | 'enable'
  | 'sort'
  | 'kill'

/** button label과 표시 code를 actual command ID에 고정한다. */
export const lifecycleCommandDescriptor: ReadonlyArray<{
  id: LifecycleCommandId
  label: string
  code: string
}> = [
  {
    id: 'update',
    label: 'scroll state update',
    code: 'ScrollTrigger.update()',
  },
  {
    id: 'instanceRefresh',
    label: '이 trigger refresh',
    code: 'trigger.refresh()',
  },
  {
    id: 'globalRefresh',
    label: '모든 trigger refresh',
    code: 'ScrollTrigger.refresh()',
  },
  {
    id: 'disable',
    label: 'instance disable',
    code: 'trigger.disable(true, false)',
  },
  {
    id: 'enable',
    label: 'instance enable',
    code: 'trigger.enable(true, true)',
  },
  { id: 'sort', label: 'registry sort', code: 'ScrollTrigger.sort()' },
  {
    id: 'kill',
    label: 'owned instance kill',
    code: 'trigger.kill(true, false)',
  },
]

// actual lifecycle calls 전에 ScrollTrigger를 GSAP core에 등록한다
gsap.registerPlugin(ScrollTrigger)

/** resizable target과 실제 lifecycle command를 discrete log로 연결한다. */
export function useLifecycleRuntime() {
  // useGSAP selector와 cleanup을 이 example DOM에 한정한다
  const scope = useRef<HTMLDivElement>(null)
  // geometry를 측정할 local target element를 standalone instance에 전달한다
  const targetRef = useRef<HTMLDivElement>(null)
  // command가 page-wide registry 대신 owned instance만 다루게 보관한다
  const triggerRef = useRef<ScrollTrigger | null>(null)
  // layout change를 refresh 전후 비교할 두 높이로 제한한다
  const [tall, setTall] = useState(false)
  // continuous scroll 대신 최근 discrete command/event만 보존한다
  const [log, setLog] = useState<string[]>([])

  // event와 command가 같은 bounded log append 규칙을 사용한다
  const appendLog = (message: string) =>
    setLog((items) => [...items.slice(-5), message])

  // mount 동안 owned trigger와 refresh ordering listener를 한 번만 유지한다
  useGSAP(
    () => {
      // target mount 전에는 document fallback trigger를 만들지 않는다
      const target = targetRef.current
      if (!target) return undefined
      // global refresh가 측정에 들어가기 직전 event를 discrete log에 남긴다
      const onRefreshInit = () => appendLog('event 1 · refreshInit')
      // 모든 측정이 끝난 뒤 refresh event를 같은 log에 남긴다
      const onRefresh = () => appendLog('event 2 · refresh')
      // 두 listener는 cleanup에서 같은 callback identity로 제거한다
      ScrollTrigger.addEventListener('refreshInit', onRefreshInit)
      ScrollTrigger.addEventListener('refresh', onRefresh)
      // 한 local target의 start/end를 측정하는 standalone instance만 만든다
      const trigger = ScrollTrigger.create({
        trigger: target,
        start: 'top 80%',
        end: 'bottom 20%',
      })
      triggerRef.current = trigger

      // listener를 먼저 제거한 뒤 아직 살아 있는 owned instance만 폐기한다
      return () => {
        ScrollTrigger.removeEventListener('refreshInit', onRefreshInit)
        ScrollTrigger.removeEventListener('refresh', onRefresh)
        if (triggerRef.current === trigger) {
          trigger.kill(true, false)
          triggerRef.current = null
        }
      }
    },
    // tall state는 측정 전 layout change로 남겨 command 선택을 학습하게 한다
    { scope },
  )

  // descriptor ID를 exact public lifecycle call 하나로 실행한다
  const runCommand = (id: LifecycleCommandId) => {
    // update는 start/end를 다시 측정하지 않고 registry state만 갱신한다
    if (id === 'update') {
      ScrollTrigger.update()
      appendLog('command · update, geometry 유지')
      return
    }
    // global refresh는 refreshInit → refresh event ordering까지 관찰하게 한다
    if (id === 'globalRefresh') {
      ScrollTrigger.refresh()
      appendLog('command · global refresh')
      return
    }
    // sort는 global registry 순서를 정렬하고 반환된 instance 수만 기록한다
    if (id === 'sort') {
      const sorted = ScrollTrigger.sort()
      appendLog(`command · sorted ${sorted.length} triggers`)
      return
    }
    // 나머지 instance command는 kill 뒤에는 실행하지 않는다
    const trigger = triggerRef.current
    if (!trigger) {
      appendLog('owned trigger가 이미 kill되었습니다.')
      return
    }
    // 한 instance만 current layout에서 다시 측정한다
    if (id === 'instanceRefresh') trigger.refresh()
    // revert하되 linked animation을 보존하며 instance를 비활성화한다
    if (id === 'disable') trigger.disable(true, false)
    // reset/refresh를 요청해 같은 instance를 다시 활성화한다
    if (id === 'enable') trigger.enable(true, true)
    // owner disposal은 pin/style을 되돌리고 animation은 별도 owner에 남긴다
    if (id === 'kill') {
      trigger.kill(true, false)
      triggerRef.current = null
    }
    appendLog(`command · ${id}`)
  }

  // 높이만 바꾸고 자동 refresh하지 않아 learner가 decision matrix를 적용하게 한다
  const toggleHeight = () => {
    setTall((value) => !value)
    appendLog('layout changed · refresh를 선택하세요.')
  }

  // display는 actual refs, descriptor, layout, log와 command action만 받는다
  return {
    scope,
    targetRef,
    tall,
    log,
    commands: lifecycleCommandDescriptor,
    runCommand,
    toggleHeight,
  }
}
