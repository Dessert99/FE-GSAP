/** 한 Draggable instance의 enable·drag·kill 상태 전이를 실제 method 호출로 실행한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useCallback, useRef, useState } from 'react'
import type { PointerEvent } from 'react'

/** control이 실행할 lifecycle method와 code panel 문장을 함께 고정한다. */
export type LifecycleCommand = 'enable' | 'disable' | 'startDrag' | 'endDrag' | 'kill' | 'recreate'

/** P03 lookup을 lifecycle state가 실제 instance를 가리키는지 검증하는 좁은 결과다. */
type LookupState = 'same instance' | 'different instance' | 'removed'

/** 화면에 보일 instance state는 enabled·pointer-ready·disposed만 표현한다. */
export type LifecycleSnapshot = { enabled: boolean | null; pointerReady: boolean; programmaticDrag: boolean; disposed: boolean; lookup: LookupState; notice: string; returnValue: string }

/** control label·호출 method·표시 code를 한 descriptor에서 소비한다. */
export const lifecycleCommands: { id: LifecycleCommand; label: string; code: string }[] = [
  { id: 'enable', label: 'enable()', code: 'draggable.enable()' },
  { id: 'disable', label: 'disable()', code: 'draggable.disable()' },
  { id: 'startDrag', label: 'startDrag(event)', code: 'draggable.startDrag(pointerEvent, false)' },
  { id: 'endDrag', label: 'endDrag(event)', code: 'draggable.endDrag(pointerEvent)' },
  { id: 'kill', label: 'kill()', code: 'draggable.kill()' },
  { id: 'recreate', label: 'recreate instance', code: 'Draggable.create(target)[0]' },
]

// import한 plugin을 GSAP에 한 번 등록해 instance method 호출을 준비한다
gsap.registerPlugin(Draggable)

/** rendered undefined branch와 non-null d.ts 차이를 lifecycle inspector 안에서만 좁힌다. */
function readLookupState(target: HTMLDivElement, instance: Draggable): LookupState {
  const lookup = Draggable.get(target) as Draggable | undefined
  return lookup === instance ? 'same instance' : lookup ? 'different instance' : 'removed'
}

/** pointer capture와 control descriptor로 한 instance의 실제 lifecycle을 제공한다. */
export function useLifecycleAnimation() {
  // Draggable listener와 cleanup 범위를 lab DOM 안으로 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // create에 넘길 실제 DOM target이다
  const targetRef = useRef<HTMLDivElement>(null)
  // useGSAP callback 밖의 control이 현재 instance를 호출하도록 보관한다
  const instanceRef = useRef<Draggable | null>(null)
  // official method에 넘길 실제 browser pointer event만 보관한다
  const pointerEventRef = useRef<globalThis.PointerEvent | null>(null)
  // recreate control이 새 instance creation path를 실행할 신호다
  const [recreateKey, setRecreateKey] = useState(0)
  // instance가 만든 현재 lifecycle 관찰값을 화면에 고정한다
  const [snapshot, setSnapshot] = useState<LifecycleSnapshot>({ enabled: null, pointerReady: false, programmaticDrag: false, disposed: false, lookup: 'removed', notice: 'instance를 만드는 중입니다.', returnValue: '아직 호출 전' })
  // 마지막 control descriptor가 code panel과 실행 결과를 같은 입력으로 묶는다
  const [lastCommand, setLastCommand] = useState<LifecycleCommand>('disable')

  useGSAP(
    () => {
      // ref가 연결된 뒤에만 DOM target 하나의 instance를 만든다
      const target = targetRef.current
      if (!target) return undefined
      // recreate 전에 남은 transform을 즉시 지워 새 instance의 시작점을 고정한다
      gsap.set(target, { clearProps: 'transform' })
      // target 하나를 lifecycle control이 다룰 instance로 만든다
      const instance = Draggable.create(target, { type: 'x,y' })[0]
      // control callback이 방금 만든 instance만 호출하도록 연결한다
      instanceRef.current = instance
      // P03 lookup이 create 직후 바로 그 instance를 찾는지 실제로 읽는다
      const lookup = readLookupState(target, instance)
      // enabled getter로 creation 뒤의 실제 state를 읽어 snapshot을 만든다
      setSnapshot({ enabled: instance.enabled(), pointerReady: false, programmaticDrag: instance.isDragging, disposed: lookup === 'removed', lookup, notice: lookup === 'same instance' ? '새 instance가 enabled 상태로 준비되었고 P03 lookup도 같은 instance를 찾습니다.' : '새 instance 뒤 lookup 결과를 다시 확인하세요.', returnValue: 'create()는 instance array를 반환' })
      // 이전 pointer event가 다른 instance에 전달되지 않도록 지운다
      pointerEventRef.current = null

      return () => {
        // unmount 또는 recreate 때 listener와 lookup을 남기지 않도록 instance를 폐기한다
        instance.kill()
        // stale control이 폐기된 instance를 다시 호출하지 않도록 ref를 비운다
        if (instanceRef.current === instance) instanceRef.current = null
        // 다음 instance가 이전 위치를 이어받지 않도록 즉시 원상태로 둔다
        gsap.set(target, { clearProps: 'transform' })
      }
    },
    // recreate control만 새 instance를 만들고 다른 method는 같은 instance에 직접 호출한다
    { scope, dependencies: [recreateKey], revertOnUpdate: true },
  )

  // card에서 실제로 발생한 native PointerEvent만 programmatic method의 입력으로 기록한다
  const capturePointerEvent = useCallback((event: PointerEvent<HTMLDivElement>) => {
    pointerEventRef.current = event.nativeEvent
    setSnapshot((current) => ({ ...current, pointerReady: true, notice: '실제 pointer event를 기록했습니다. 이제 startDrag() 또는 endDrag()에 같은 event를 줄 수 있습니다.' }))
  }, [])

  // descriptor id가 정한 한 method만 호출하고 그 return과 state transition을 읽는다
  const runCommand = useCallback((command: LifecycleCommand) => {
    setLastCommand(command)
    if (command === 'recreate') {
      setRecreateKey((key) => key + 1)
      return
    }
    const instance = instanceRef.current
    if (!instance) {
      setSnapshot((current) => ({ ...current, notice: 'live instance가 없습니다. recreate로 새 instance를 만드세요.', returnValue: '호출하지 않음' }))
      return
    }
    // current target과 instance의 lookup 관계를 method 호출 전후에 같은 기준으로 읽는다
    const target = targetRef.current
    if (!target) return
    if ((command === 'startDrag' || command === 'endDrag') && !pointerEventRef.current) {
      setSnapshot((current) => ({ ...current, notice: '공식 계약상 original pointer event가 필요합니다. 먼저 card의 빈 공간을 pointer로 누르세요.', returnValue: 'precondition 미충족 · 호출하지 않음' }))
      return
    }
    // disabled instance에는 startDrag를 호출하지 않고 현재 instance state를 그대로 보인다
    if (command === 'startDrag' && !instance.enabled()) {
      const lookup = readLookupState(target, instance)
      setSnapshot((current) => ({ ...current, enabled: false, programmaticDrag: instance.isDragging, disposed: lookup === 'removed', lookup, notice: 'disabled instance에는 startDrag()를 호출하지 않았습니다. enable() 뒤 다시 시도하세요.', returnValue: 'precondition 미충족 · 호출하지 않음' }))
      return
    }
    // 실제 startDrag 결과가 아닌 상태에서는 endDrag를 호출하지 않는다
    if (command === 'endDrag' && !instance.isDragging) {
      const lookup = readLookupState(target, instance)
      setSnapshot((current) => ({ ...current, enabled: instance.enabled(), programmaticDrag: instance.isDragging, disposed: lookup === 'removed', lookup, notice: 'instance.isDragging가 false라 endDrag()를 호출하지 않았습니다.', returnValue: 'precondition 미충족 · 호출하지 않음' }))
      return
    }
    if (command === 'enable') {
      // chaining return이 실제로 같은 instance인지 비교한다
      const returned = instance.enable()
      // P03 lookup과 enabled getter를 action 뒤에 다시 읽는다
      const lookup = readLookupState(target, instance)
      setSnapshot((current) => ({ ...current, enabled: instance.enabled(), programmaticDrag: instance.isDragging, disposed: lookup === 'removed', lookup, notice: lookup === 'same instance' ? 'enable() 뒤에도 lookup은 같은 instance를 가리키고 pointer drag가 허용됩니다.' : 'enable() 뒤 lookup 결과를 다시 확인하세요.', returnValue: returned === instance ? '같은 instance 반환' : '반환을 확인할 수 없음' }))
      return
    }
    if (command === 'disable') {
      // chaining return이 실제로 같은 instance인지 비교한다
      const returned = instance.disable()
      // disable 뒤에도 P03 lookup이 같은 instance를 유지하는지 읽는다
      const lookup = readLookupState(target, instance)
      setSnapshot((current) => ({ ...current, enabled: instance.enabled(), programmaticDrag: instance.isDragging, disposed: lookup === 'removed', lookup, notice: lookup === 'same instance' ? 'disable()은 pointer drag만 잠시 막고 lookup의 같은 instance는 유지합니다.' : 'disable() 뒤 lookup 결과를 다시 확인하세요.', returnValue: returned === instance ? '같은 instance 반환' : '반환을 확인할 수 없음' }))
      return
    }
    if (command === 'startDrag') {
      // 실제로 capture한 native event로 startDrag를 호출한다
      instance.startDrag(pointerEventRef.current!, false)
      // 호출 성공을 가정하지 않고 instance가 보고한 dragging state를 읽는다
      const isDragging = instance.isDragging
      // programmatic call 뒤에도 같은 instance lookup인지 읽는다
      const lookup = readLookupState(target, instance)
      setSnapshot((current) => ({ ...current, enabled: instance.enabled(), programmaticDrag: isDragging, disposed: lookup === 'removed', lookup, notice: isDragging ? 'startDrag() 뒤 instance.isDragging가 true입니다.' : 'startDrag()는 호출됐지만 instance.isDragging가 false입니다.', returnValue: 'void' }))
      return
    }
    if (command === 'endDrag') {
      // 실제로 capture한 native event로 endDrag를 호출한다
      instance.endDrag(pointerEventRef.current!)
      // 종료 결과도 수동 false가 아닌 instance state에서 읽는다
      const isDragging = instance.isDragging
      // endDrag 뒤 lookup 유지 여부를 다시 확인한다
      const lookup = readLookupState(target, instance)
      setSnapshot((current) => ({ ...current, enabled: instance.enabled(), programmaticDrag: isDragging, disposed: lookup === 'removed', lookup, notice: isDragging ? 'endDrag() 뒤에도 instance.isDragging가 true입니다.' : 'endDrag() 뒤 instance.isDragging가 false이고 instance는 enabled 상태로 남습니다.', returnValue: 'void' }))
      return
    }
    // kill chaining return이 실제로 같은 instance인지 비교한다
    const returned = instance.kill()
    // kill 뒤 P03 lookup이 제거됐는지 실제로 읽는다
    const lookup = readLookupState(target, instance)
    instanceRef.current = null
    setSnapshot((current) => ({ ...current, enabled: lookup === 'removed' ? null : instance.enabled(), programmaticDrag: instance.isDragging, disposed: lookup === 'removed', lookup, notice: lookup === 'removed' ? 'kill() 뒤 Draggable.get(target)이 instance를 더 찾지 못합니다. recreate로 새 instance를 만드세요.' : 'kill() 뒤에도 lookup이 남아 있어 disposal을 확정하지 않았습니다.', returnValue: returned === instance ? '같은 instance 반환' : '반환을 확인할 수 없음' }))
  }, [])

  // JSX는 target·state·captured event·descriptor 실행 함수만 받아 실제 runtime을 제어한다
  return { scope, targetRef, snapshot, lastCommand, capturePointerEvent, runCommand }
}
