/** Draggable listener 등록·event log·recent-drag 결정을 실제 instance에서 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useRef, useState } from 'react'

/** lab이 등록하고 code panel에 직렬화하는 event 이름이다. */
export type GestureEventName =
  'press' | 'dragstart' | 'drag' | 'dragend' | 'release' | 'click'

/** 한 event descriptor가 listener registration·simulation·표시 코드를 함께 정한다. */
export type GestureEventDescriptor = { name: GestureEventName; label: string }

/** event가 발생한 순간만 기록하는 log 행이다. */
export type GestureLogEntry = {
  id: number
  event: GestureEventName
  pressed: boolean
  elapsed: number
  origin: 'listener' | 'simulation'
}

/** descriptor는 runtime 등록과 TSX serializer의 유일한 event 목록이다. */
export const gestureEventDescriptors: GestureEventDescriptor[] = [
  { name: 'press', label: 'press' },
  { name: 'dragstart', label: 'dragstart' },
  { name: 'drag', label: 'drag' },
  { name: 'dragend', label: 'dragend' },
  { name: 'release', label: 'release' },
  { name: 'click', label: 'click' },
]

// GSAP이 Draggable instance와 event dispatcher를 준비하도록 plugin을 한 번 등록한다
gsap.registerPlugin(Draggable)

/** 실제 pointer event와 keyboard simulation을 polling 없이 log로 바꾸는 runtime이다. */
export function useGestureEventRuntime() {
  // useGSAP cleanup이 lab DOM과 instance listener를 같이 소유하도록 범위를 둔다
  const scope = useRef<HTMLDivElement>(null)
  // Draggable.create에 전달할 focusable target element다
  const targetRef = useRef<HTMLDivElement>(null)
  // simulation button이 현재 instance를 정확히 dispatch하도록 보관한다
  const instanceRef = useRef<Draggable | null>(null)
  // listener가 발생시킨 순서를 렌더와 무관한 stable key로 남긴다
  const nextLogIdRef = useRef(0)
  // event마다 한 번만 갱신하는 gesture history다
  const [entries, setEntries] = useState<GestureLogEntry[]>([])
  // actual instance에서 읽은 마지막 pressed state다
  const [isPressed, setIsPressed] = useState(false)
  // click decision 순간에만 읽은 elapsed seconds다
  const [elapsed, setElapsed] = useState(0)
  // threshold 비교가 action을 허용했는지 설명하는 결과다
  const [decision, setDecision] = useState(
    '아직 click 결정을 실행하지 않았습니다.',
  )
  // 0.2는 공식 click/drag 예제가 제시한 recent-drag boundary다
  const recentDragThreshold = 0.2

  useGSAP(
    () => {
      // DOM target이 mount된 경우에만 실제 Draggable instance를 만든다
      const target = targetRef.current
      if (!target) return undefined
      // 이전 drag transform을 즉시 지워 새 listener lab의 시작 위치를 맞춘다
      gsap.set(target, { clearProps: 'transform' })
      // callback이 실제 instance를 읽도록 create 뒤 할당될 변수를 준비한다
      let instance: Draggable
      // listener는 event가 발생한 때만 pressed와 static elapsed를 읽는다
      const listener = (event?: { type?: string }) => {
        // dispatcher payload의 type을 log가 소비할 gesture 이름으로 읽는다
        const eventName = event?.type as GestureEventName
        // 이번 event 순간의 static recent-drag seconds만 한 번 읽는다
        const nowElapsed = Draggable.timeSinceDrag()
        nextLogIdRef.current += 1
        setIsPressed(instance.isPressed)
        setElapsed(nowElapsed)
        setEntries((current) =>
          [
            {
              id: nextLogIdRef.current,
              event: eventName,
              pressed: instance.isPressed,
              elapsed: nowElapsed,
              origin: 'listener' as const,
            },
            ...current,
          ].slice(0, 8),
        )
      }
      // descriptor 목록의 같은 callback을 Draggable event마다 등록한다
      instance = Draggable.create(target, {
        type: 'x,y',
        dragClickables: true,
      })[0]
      instanceRef.current = instance
      gestureEventDescriptors.forEach((descriptor) =>
        instance.addEventListener(descriptor.name, listener),
      )
      // 초기 상태도 polling 없이 한 번 읽어 visible contract를 만든다
      setIsPressed(instance.isPressed)
      setElapsed(Draggable.timeSinceDrag())

      return () => {
        // 등록한 모든 event는 동일 callback reference로 먼저 제거한다
        gestureEventDescriptors.forEach((descriptor) =>
          instance.removeEventListener(descriptor.name, listener),
        )
        // component 밖에 pointer listener가 남지 않도록 instance를 dispose한다
        instance.kill()
        // stale simulation이 cleanup 뒤 instance를 dispatch하지 못하게 비운다
        instanceRef.current = null
        // 다음 mount가 이전 drag transform을 상속하지 않게 즉시 지운다
        gsap.set(target, { clearProps: 'transform' })
      }
    },
    // lab은 descriptor가 고정되어 mount와 unmount lifecycle만 관리한다
    { scope, dependencies: [], revertOnUpdate: true },
  )

  // button simulation은 등록된 listener를 dispatch하지만 physical pointer state를 흉내 내지는 않는다
  const simulate = (descriptor: GestureEventDescriptor) => {
    // cleanup 뒤 stale button이 event를 보내지 않도록 현재 instance만 읽는다
    const instance = instanceRef.current
    if (!instance) return
    instance.dispatchEvent(descriptor.name)
    setEntries((current) =>
      current.map((entry, index) =>
        index === 0 ? { ...entry, origin: 'simulation' } : entry,
      ),
    )
  }
  // continuous clock 없이 click decision 순간에만 static elapsed를 다시 읽는다
  const checkClickDecision = () => {
    // threshold 비교가 필요한 지금의 elapsed seconds를 한 번 읽는다
    const seconds = Draggable.timeSinceDrag()
    setElapsed(seconds)
    setDecision(
      seconds > recentDragThreshold
        ? `허용: 마지막 drag 뒤 ${seconds.toFixed(2)}초가 지나 click action을 실행할 수 있습니다.`
        : `건너뜀: 마지막 drag 뒤 ${seconds.toFixed(2)}초라 ${recentDragThreshold}초 threshold 안입니다.`,
    )
  }

  // TSX는 ref·descriptor·event snapshot과 두 action만 소비한다
  return {
    scope,
    targetRef,
    entries,
    isPressed,
    elapsed,
    decision,
    recentDragThreshold,
    simulate,
    checkClickDecision,
  }
}
