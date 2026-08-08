/** 한 Draggable instance에서 target·pointer·phase snapshot을 읽는 runtime이다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useRef, useState } from 'react'

/** lab이 선택하는 두 좌표 descriptor다. */
export type CoordinateMode = 'translation' | 'rotation'

/** 사용자 gesture에서 마지막으로 관찰한 단계다. */
export type CoordinatePhase = 'idle' | 'press' | 'drag' | 'release'

/** target과 pointer가 서로 다른 origin을 갖는 것을 code panel에 보인다. */
export type CoordinateDescriptor = {
  mode: CoordinateMode
  type: 'x,y' | 'rotation'
}

/** 화면에 그릴 수 있도록 instance read를 한 번에 고정한 결과다. */
export type CoordinateSnapshot = {
  phase: CoordinatePhase
  x: number
  y: number
  rotation: number
  startX: number
  startY: number
  deltaX: number
  deltaY: number
  endX: number
  endY: number
  endRotation: number
  pointerX: number
  pointerY: number
  pointerEvent: string
  direction: string
}

// GSAP이 Draggable.create를 해석하도록 plugin을 한 번 등록한다
gsap.registerPlugin(Draggable)

/** descriptor 변화와 reset마다 instance를 즉시 다시 만들고 관찰값을 반환한다. */
export function useCoordinateAnimation() {
  // useGSAP selector와 cleanup이 lab 내부에만 닿도록 DOM 범위를 잡는다
  const scope = useRef<HTMLDivElement>(null)
  // create가 연결할 실제 draggable puck DOM이다
  const targetRef = useRef<HTMLDivElement>(null)
  // requestAnimationFrame 하나만 예약해 drag readout 갱신을 묶는다
  const frameRef = useRef<number | null>(null)
  // transform translation과 rotation 중 현재 descriptor를 고른다
  const [mode, setMode] = useState<CoordinateMode>('translation')
  // reset은 tween 없이 새 instance를 만드는 signal이다
  const [resetKey, setResetKey] = useState(0)
  // 마지막 event 단계와 좌표를 화면용 snapshot으로 저장한다
  const [snapshot, setSnapshot] = useState<CoordinateSnapshot>({
    phase: 'idle',
    x: 0,
    y: 0,
    rotation: 0,
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    endX: 0,
    endY: 0,
    endRotation: 0,
    pointerX: 0,
    pointerY: 0,
    pointerEvent: '아직 없음',
    direction: '아직 없음',
  })
  // create config와 code panel이 같은 type을 읽도록 descriptor를 하나로 둔다
  const descriptor: CoordinateDescriptor = {
    mode,
    type: mode === 'translation' ? 'x,y' : 'rotation',
  }
  // 즉시 reset은 scheduled frame과 이전 transform을 새 instance cleanup에서 함께 비운다
  const reset = () => setResetKey((key) => key + 1)

  useGSAP(
    () => {
      // ref가 준비된 경우에만 실제 element를 draggable하게 만든다
      const target = targetRef.current
      if (!target) return undefined
      // 이전 gesture가 남긴 transform을 tween 없이 지워 같은 출발점을 만든다
      gsap.set(target, { clearProps: 'transform' })
      // instance read-only 값을 DOM update 한 번으로 바꾸는 reader다
      const read = (phase: CoordinatePhase, instance: Draggable) => {
        const direction = String(instance.getDirection('start'))
        setSnapshot({
          phase,
          x: instance.x,
          y: instance.y,
          rotation: instance.rotation,
          startX: instance.startX,
          startY: instance.startY,
          deltaX: instance.deltaX,
          deltaY: instance.deltaY,
          endX: instance.endX,
          endY: instance.endY,
          endRotation: instance.endRotation,
          pointerX: instance.pointerX,
          pointerY: instance.pointerY,
          pointerEvent: instance.pointerEvent?.type ?? '아직 없음',
          direction,
        })
      }
      // 한 animation frame에 하나의 visual readout만 반영한다
      const scheduleRead = (phase: CoordinatePhase, instance: Draggable) => {
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
        frameRef.current = requestAnimationFrame(() => {
          frameRef.current = null
          read(phase, instance)
        })
      }
      // descriptor와 press/drag/release callback으로 puck instance를 만든다
      const [instance] = Draggable.create(target, {
        type: descriptor.type,
        onPress() {
          scheduleRead('press', instance)
        },
        onDrag() {
          scheduleRead('drag', instance)
        },
        onRelease() {
          scheduleRead('release', instance)
        },
      })
      // 첫 render도 instance의 초기 좌표를 보여 준다
      read('idle', instance)

      return () => {
        // 예약된 DOM update가 unmount 뒤 실행되지 않도록 취소한다
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
        // instance가 설치한 pointer listener와 연결을 제거한다
        instance.kill()
        // 다음 descriptor가 이전 transform을 상속하지 않게 즉시 원상태로 둔다
        gsap.set(target, { clearProps: 'transform' })
      }
    },
    // mode나 reset이 바뀌면 이전 instance를 정리하고 동일한 descriptor에서 재생성한다
    { scope, dependencies: [descriptor.type, resetKey], revertOnUpdate: true },
  )

  // lab은 target ref·descriptor·snapshot과 두 control만 소비한다
  return { scope, targetRef, mode, setMode, descriptor, snapshot, reset }
}
