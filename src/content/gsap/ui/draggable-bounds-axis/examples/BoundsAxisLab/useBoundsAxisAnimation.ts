/** bounded tray의 Draggable instance·constraint descriptor·keyboard resync를 함께 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// lab의 draggable type과 inspector code가 같은 x/y mode를 사용한다.
const type = 'x,y'

/** Draggable vars·코드·label이 공유할 제약 descriptor다. */
type ConstraintDescriptor = { type: 'x,y'; lockAxis: boolean; autoScroll: number; inertia: false; boundsLabel: string }

/** 타입 선언에 빠진 공식 lockedAxis property를 읽기 전용 optional field로 좁힌다. */
type DraggableWithLockedAxis = InstanceType<typeof Draggable> & { lockedAxis?: string | null; zIndex?: number }

export function useBoundsAxisAnimation() {
  // Draggable instance와 ticker cleanup을 한 DOM 범위에 제한한다.
  const scope = useRef<HTMLDivElement>(null)
  // bounds element를 직접 vars에 넣어 실제 측정 대상과 overlay를 일치시킨다.
  const trayRef = useRef<HTMLDivElement>(null)
  // target ref는 keyboard-equivalent 위치 변경과 Draggable 생성에 함께 쓴다.
  const targetRef = useRef<HTMLButtonElement>(null)
  // instance ref는 control이 update/applyBounds와 최신 inspector를 호출하게 한다.
  const instanceRef = useRef<DraggableWithLockedAxis | null>(null)
  // initial direction lock 요청을 control이 바꾼다.
  const [lockAxis, setLockAxis] = useState(true)
  // edge auto-scroll factor를 0 또는 1로 선택한다.
  const [autoScroll, setAutoScroll] = useState(0)
  // external layout change를 눈에 보이는 tray inset으로 만든다.
  const [layoutInset, setLayoutInset] = useState(0)
  // inspector는 frame마다 말하지 않고 control 실행 뒤 snapshot만 갱신한다.
  const [snapshot, setSnapshot] = useState({ minX: 0, maxX: 0, minY: 0, maxY: 0, lockedAxis: '없음', zIndex: 0, synced: '생성 전' })
  // reduced motion notice와 control 표시에 사용할 사용자 환경 설정이다.
  const reducedMotion = useReducedMotion()
  // runtime vars·code serializer·controls가 함께 쓰는 하나의 descriptor다.
  const descriptor: ConstraintDescriptor = { type, lockAxis, autoScroll, inertia: false, boundsLabel: 'trayRef.current' }

  // instance의 실제 bounds와 optional lockedAxis 값을 control 단위 snapshot으로 읽는다.
  function readSnapshot(synced: string) {
    const instance = instanceRef.current
    if (!instance) return
    setSnapshot({ minX: instance.minX, maxX: instance.maxX, minY: instance.minY, maxY: instance.maxY, lockedAxis: instance.lockedAxis ?? '아직 결정 전', zIndex: instance.zIndex ?? 0, synced })
  }

  // keyboard button도 target position을 바꾼 뒤 Draggable의 geometry를 다시 읽게 한다.
  function moveBy(x: number, y: number) {
    const target = targetRef.current
    const instance = instanceRef.current
    if (!target || !instance) return
    gsap.set(target, { x: `+=${x}`, y: `+=${y}` })
    instance.update(true)
    readSnapshot('keyboard move 뒤 update(true)')
  }

  // 외부 layout state를 바꾼 뒤에는 instance가 자동 측정하지 않았음을 분명히 표시한다.
  function changeLayout() {
    setLayoutInset((inset) => (inset === 0 ? 42 : 0))
    setSnapshot((current) => ({ ...current, synced: 'tray layout이 바뀜 — update() 대기' }))
  }

  // 같은 instance가 현재 DOM geometry를 다시 읽고 bounds를 적용하게 한다.
  function resync() {
    instanceRef.current?.update(true)
    readSnapshot('update(true)로 bounds 재계산')
  }

  useGSAP(
    () => {
      // Draggable plugin을 등록한 뒤 실제 target과 bounds element를 연결한다.
      gsap.registerPlugin(Draggable)
      const target = targetRef.current
      const tray = trayRef.current
      if (!target || !tray) return undefined
      // descriptor와 동일한 lockAxis·autoScroll vars로 target 하나의 instance를 만든다.
      const instance = Draggable.create(target, { type: descriptor.type, bounds: tray, lockAxis: descriptor.lockAxis, autoScroll: descriptor.autoScroll, inertia: descriptor.inertia })[0] as DraggableWithLockedAxis
      instanceRef.current = instance
      // 생성 직후 실제 계산 결과를 정적 inspector snapshot으로 읽는다.
      readSnapshot('생성 직후 bounds 측정')
      return () => {
        // instance와 ticker/listener work를 unmount·descriptor 변경 전에 함께 해제한다.
        instance.kill()
        instanceRef.current = null
      }
    },
    // constraint vars만 바뀔 때 instance를 재생성하고 layout inset은 update 비교를 위해 유지한다.
    { scope, dependencies: [descriptor.lockAxis, descriptor.autoScroll], revertOnUpdate: true },
  )

  // TSX가 descriptor·snapshot·keyboard/resync actions를 다시 조립하지 않도록 반환한다.
  return { scope, trayRef, targetRef, lockAxis, setLockAxis, autoScroll, setAutoScroll, layoutInset, descriptor, snapshot, reducedMotion, moveBy, changeLayout, resync }
}
