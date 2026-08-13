/** 하나의 coordinate descriptor로 네 MotionPath utility와 sparse snapshot을 연결한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// MotionPath가 반환하는 apply 가능한 2D matrix 최소 표면이다
type Matrix = {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
  apply: (point: { x: number; y: number }) => { x: number; y: number }
}
/** 네 utility call과 표시 code가 함께 읽는 좌표 입력이다. */
export type CoordinateDescriptor = {
  point: { x: number; y: number }
  fromOrigin: [number, number]
  toOrigin: [number, number]
  travel: boolean
}
/** action 뒤에만 갱신하는 실제 matrix/point 관찰값이다. */
export type CoordinateSnapshot = {
  converted: { x: number; y: number }
  relative: { x: number; y: number }
  global: Matrix | null
  align: Matrix | null
  notice: string
}

// static utility를 호출하기 전에 MotionPathPlugin을 등록한다
gsap.registerPlugin(MotionPathPlugin)

export function useCoordinateMatrixLab() {
  // useGSAP cleanup 범위를 lab DOM으로 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // from local axes의 실제 source element다
  const fromRef = useRef<SVGCircleElement>(null)
  // to local axes의 실제 target element다
  const toRef = useRef<SVGRectElement>(null)
  // converted point를 target axes에 표시하는 overlay다
  const overlayRef = useRef<SVGCircleElement>(null)
  // reduced motion에서는 optional travel을 생략한다
  const reducedMotion = useReducedMotion()
  // continuous matrix 값은 action 뒤 snapshot으로만 표시한다
  const [snapshot, setSnapshot] = useState<CoordinateSnapshot>({
    converted: { x: 0, y: 0 },
    relative: { x: 0, y: 0 },
    global: null,
    align: null,
    notice: 'calculate를 눌러 static axes의 좌표를 읽으세요.',
  })
  // descriptor는 calls, tables, code와 optional travel 선택을 하나로 고정한다
  const descriptor: CoordinateDescriptor = {
    point: { x: 12, y: 8 },
    fromOrigin: [0.5, 0.5],
    toOrigin: [0.5, 0.5],
    travel: !reducedMotion,
  }
  // 네 static utility의 실제 결과를 한 번 읽고 overlay를 target axes에 둔다
  const calculate = () => {
    // from local coordinate의 기준 element를 읽는다
    const from = fromRef.current
    // to local coordinate의 기준 element를 읽는다
    const to = toRef.current
    // converted point를 찍을 target-local marker를 읽는다
    const overlay = overlayRef.current
    if (!from || !to || !overlay) return
    // 이전 optional travel tween을 제거해 snapshot과 화면을 동기화한다
    gsap.killTweensOf(overlay)
    // from point를 to local axes의 새 point로 바꾼다
    const converted = MotionPathPlugin.convertCoordinates(
      from,
      to,
      descriptor.point,
    )
    // source local axes에서 viewport까지의 matrix를 읽는다
    const global = MotionPathPlugin.getGlobalMatrix(from) as Matrix
    // descriptor origin 두 개를 맞추는 matrix를 읽는다
    const align = MotionPathPlugin.getAlignMatrix(
      from,
      to,
      descriptor.fromOrigin,
      descriptor.toOrigin,
    ) as Matrix
    // from parent axes에서 두 origin 사이의 gap을 읽는다
    const relative = MotionPathPlugin.getRelativePosition(
      from,
      to,
      descriptor.fromOrigin,
      descriptor.toOrigin,
    )
    // converted point를 target group의 local 좌표로 바로 표시한다
    overlay.setAttribute('cx', String(converted.x))
    overlay.setAttribute('cy', String(converted.y))
    // reduced motion이 아니면 marker의 등장만 짧게 보인다
    if (descriptor.travel)
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35 })
    // reduced motion에서는 이동 없이 marker의 최종 가시 상태만 즉시 적용한다
    else gsap.set(overlay, { opacity: 1 })
    // explicit action이 끝난 뒤에만 표와 status snapshot을 갱신한다
    setSnapshot({
      converted,
      relative,
      global,
      align,
      notice: descriptor.travel
        ? 'static result 위에 optional travel을 짧게 표시했습니다.'
        : 'reduced motion: travel 없이 static result만 표시합니다.',
    })
  }
  // mount/unmount cleanup은 overlay transform과 tween을 원상태로 되돌린다
  useGSAP(
    () => {
      // cleanup에서 복원할 marker element를 mount 시점에 보관한다
      const overlay = overlayRef.current
      return () => {
        if (overlay) {
          gsap.killTweensOf(overlay)
          overlay.removeAttribute('style')
          overlay.removeAttribute('cx')
          overlay.removeAttribute('cy')
          overlay.setAttribute('opacity', '0')
        }
      }
    },
    // scope만 지정해 page의 다른 animation cleanup과 분리한다
    { scope },
  )
  // consumer가 동일 descriptor와 action 결과를 함께 사용한다
  return { scope, fromRef, toRef, overlayRef, descriptor, snapshot, calculate }
}
