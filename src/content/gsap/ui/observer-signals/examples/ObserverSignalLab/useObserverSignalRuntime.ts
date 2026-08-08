/** 실제 Observer signal을 rate-limited visual readout과 명시적 snapshot으로 분리한다. */
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { useCallback, useEffect, useRef, useState } from 'react'

/** signal이 읽힌 입력 단계를 화면과 snapshot에 함께 보관한다. */
export type ObserverSignalPhase =
  'waiting' | 'press' | 'move' | 'change' | 'wheel' | 'frozen'

/** optional coordinate를 좁힌 actual Observer readout의 한 시점이다. */
export type ObserverSignalReadout = {
  phase: ObserverSignalPhase
  startX: number | null
  startY: number | null
  x: number | null
  y: number | null
  deltaX: number
  deltaY: number
  velocityX: number
  velocityY: number
  eventType: string
  isTouch: number
}

/** Observer vars와 code serializer가 공유하는 하나의 signal descriptor다. */
export type ObserverSignalDescriptor = {
  id: string
  type: 'pointer,wheel'
  tolerance: number
  debounce: true
}

// input 전에는 좌표를 지어내지 않고 signal이 아직 없음을 표현한다
const waitingReadout: ObserverSignalReadout = {
  phase: 'waiting',
  startX: null,
  startY: null,
  x: null,
  y: null,
  deltaX: 0,
  deltaY: 0,
  velocityX: 0,
  velocityY: 0,
  eventType: 'none',
  isTouch: Observer.isTouch,
}

/** lab의 create vars와 code panel을 같은 literal로 고정한다. */
export const observerSignalDescriptor: ObserverSignalDescriptor = {
  id: 'p26-signal-scope',
  type: 'pointer,wheel',
  tolerance: 1,
  debounce: true,
}

// Observer callbacks가 browser listener를 만들 수 있도록 plugin을 등록한다
gsap.registerPlugin(Observer)

// optional d.ts coordinate를 display-safe nullable value로 좁힌다
const readSignal = (
  observer: Observer,
  phase: ObserverSignalPhase,
): ObserverSignalReadout => ({
  phase,
  startX: typeof observer.startX === 'number' ? observer.startX : null,
  startY: typeof observer.startY === 'number' ? observer.startY : null,
  x: typeof observer.x === 'number' ? observer.x : null,
  y: typeof observer.y === 'number' ? observer.y : null,
  deltaX: observer.deltaX,
  deltaY: observer.deltaY,
  velocityX: observer.velocityX,
  velocityY: observer.velocityY,
  eventType: observer.event?.type || 'none',
  isTouch: Observer.isTouch,
})

/** owned Observer lifecycle과 visual/snapshot publication을 one lab DOM에 한정한다. */
export function useObserverSignalRuntime() {
  // listener와 input target 범위를 local lab DOM으로 한정한다
  const scope = useRef<HTMLDivElement>(null)
  // 실제 Observer target으로 pointer와 wheel input을 받는다
  const inputPadRef = useRef<HTMLDivElement>(null)
  // freeze action이 같은 owned instance를 직접 읽도록 보관한다
  const observerRef = useRef<Observer | null>(null)
  // 한 frame 안의 많은 callback을 하나의 visual publication으로 합친다
  const frameRef = useRef<number | null>(null)
  // queued frame이 가장 마지막 실제 readout만 표시하도록 보관한다
  const pendingReadoutRef = useRef<ObserverSignalReadout | null>(null)
  // continuous signal은 visual-only readout으로 갱신한다
  const [visualReadout, setVisualReadout] = useState(waitingReadout)
  // freeze button을 누른 순간의 actual readout만 discrete snapshot으로 남긴다
  const [snapshot, setSnapshot] = useState<ObserverSignalReadout | null>(null)
  // live status는 continuous callback이 아니라 freeze 결과만 전달한다
  const [announcement, setAnnouncement] = useState('')

  // mount에서 actual Observer를 만들고 unmount에서 frame과 listener를 함께 정리한다
  useEffect(() => {
    // stable target이 없으면 browser listener를 만들지 않는다
    const target = inputPadRef.current
    if (!target) return undefined

    // rAF는 여러 input callback의 마지막 값만 다음 paint에 visual-only로 반영한다
    const publishVisual = (observer: Observer, phase: ObserverSignalPhase) => {
      pendingReadoutRef.current = readSignal(observer, phase)
      if (frameRef.current !== null) return

      // browser paint 하나에 하나의 latest readout만 반영하도록 frame을 예약한다
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null
        // queued callback 중 마지막 actual readout을 visual state로 가져온다
        const nextReadout = pendingReadoutRef.current
        pendingReadoutRef.current = null
        if (nextReadout) setVisualReadout(nextReadout)
      })
    }

    // one descriptor의 actual vars와 callback으로 one owned Observer를 만든다
    const observer = Observer.create({
      target,
      id: observerSignalDescriptor.id,
      type: observerSignalDescriptor.type,
      tolerance: observerSignalDescriptor.tolerance,
      debounce: observerSignalDescriptor.debounce,
      // press의 start/current coordinate를 rate-limited visual readout으로 보낸다
      onPress: (self) => publishVisual(self, 'press'),
      // pointer hover/move의 current coordinate를 rate-limited visual readout으로 보낸다
      onMove: (self) => publishVisual(self, 'move'),
      // delta-related callback의 current signal을 rate-limited visual readout으로 보낸다
      onChange: (self) => publishVisual(self, 'change'),
      // wheel callback의 delta·velocity·event signal을 rate-limited visual readout으로 보낸다
      onWheel: (self) => publishVisual(self, 'wheel'),
    })
    observerRef.current = observer

    // unmount에서는 queued frame을 취소하고 이 hook 소유 Observer만 제거한다
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      frameRef.current = null
      pendingReadoutRef.current = null
      observer.kill()
      observerRef.current = null
    }
  }, [])

  // user request 시에만 actual instance를 다시 읽어 stable snapshot으로 고정한다
  const requestFreeze = useCallback(() => {
    // mounted hook이 소유한 실제 Observer instance만 snapshot source로 사용한다
    const observer = observerRef.current
    if (!observer) {
      setAnnouncement(
        'Observer가 준비되기 전에는 snapshot을 고정할 수 없습니다.',
      )
      return
    }

    // button request 시점의 actual signal을 future input과 분리해 보관한다
    const frozenReadout = readSignal(observer, 'frozen')
    setSnapshot(frozenReadout)
    setAnnouncement(`snapshot fixed from ${frozenReadout.eventType} input`)
  }, [])

  // lab은 stable refs, descriptor, non-live visual state와 discrete snapshot action을 받는다
  return {
    scope,
    inputPadRef,
    descriptor: observerSignalDescriptor,
    visualReadout,
    snapshot,
    announcement,
    requestFreeze,
  }
}
