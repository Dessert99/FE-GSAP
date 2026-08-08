/** 실제 Observer callback으로 gesture phase snapshot을 만든다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { useRef, useState } from 'react'

/** tolerance와 Observer vars/code가 공유하는 하나의 descriptor다. */
export const gestureDescriptor = {
  dragMinimum: 12,
  type: 'pointer,touch',
} as const

// Observer callback이 browser target에서 실행되도록 plugin을 등록한다
gsap.registerPlugin(Observer)

/** stable target의 Observer lifecycle과 keyboard simulation을 소유한다. */
export function useGestureStateRuntime() {
  // Observer listener와 cleanup을 one lab DOM으로 한정한다
  const scope = useRef<HTMLDivElement>(null)
  // React가 유지하는 target node에 실제 listener를 연결한다
  const targetRef = useRef<HTMLButtonElement>(null)
  // callback 순간의 discrete state만 화면에 남긴다
  const [state, setState] = useState({
    phase: 'ready',
    pressed: false,
    dragging: false,
  })

  useGSAP(
    () => {
      // stable React node가 없으면 Observer를 만들지 않는다
      const target = targetRef.current
      if (!target) return undefined

      // press·threshold crossing·release에서 Observer boolean을 같은 snapshot으로 읽는다
      const observer = Observer.create({
        target,
        type: gestureDescriptor.type,
        dragMinimum: gestureDescriptor.dragMinimum,
        onPress: (self) => {
          setState({
            phase: 'pressed',
            pressed: self.isPressed,
            dragging: self.isDragging,
          })
        },
        onDrag: (self) => {
          // continuous drag callback은 첫 phase 전환에서만 새 status snapshot을 만든다
          setState((current) =>
            current.phase === 'dragging'
              ? current
              : {
                  phase: 'dragging',
                  pressed: self.isPressed,
                  dragging: self.isDragging,
                },
          )
        },
        onRelease: (self) => {
          setState({
            phase: 'released',
            pressed: self.isPressed,
            dragging: self.isDragging,
          })
        },
      })

      // local target가 사라질 때 owned Observer listener를 해제한다
      return () => observer.kill()
    },
    // scope 안의 stable target lifecycle에만 Observer를 묶는다
    { scope },
  )

  // keyboard control이 target과 owner document의 실제 pointer listener chain을 호출한다
  const simulate = (phase: 'press' | 'drag' | 'release') => {
    // target가 없으면 synthetic event를 만들지 않는다
    const target = targetRef.current
    if (!target) return

    // press는 target에서, move와 release는 Observer가 구독한 owner document에서 보낸다
    const eventTarget = phase === 'press' ? target : target.ownerDocument
    // drag만 tolerance보다 큰 좌표를 보내 threshold를 넘긴다
    const clientX = phase === 'drag' ? gestureDescriptor.dragMinimum + 4 : 0
    // 세 단계가 같은 pointer identity로 이어지게 한다
    const eventType =
      phase === 'press'
        ? 'pointerdown'
        : phase === 'drag'
          ? 'pointermove'
          : 'pointerup'

    eventTarget.dispatchEvent(
      new PointerEvent(eventType, {
        bubbles: true,
        pointerId: 1,
        clientX,
        clientY: 0,
      }),
    )
  }

  // lab은 stable refs, descriptor-derived simulation과 sparse callback snapshot을 받는다
  return { scope, targetRef, state, simulate }
}
