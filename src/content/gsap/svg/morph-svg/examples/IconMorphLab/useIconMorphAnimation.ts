/** 하나의 icon descriptor를 실제 MorphSVG vars·diagram·code·snapshot에 연결한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 실제 MorphSVG vars와 코드 패널이 공유하는 shape 설정이다. */
export type MorphDescriptor = {
  shape: string
  map: 'size' | 'position'
  shapeIndex: 'auto' | number
  type: 'linear' | 'rotational'
  origin: string
  duration: number
}
/** 고주파 갱신 없이 완료·복구 결과만 표시하는 상태다. */
export type MorphSnapshot = {
  current: 'diamond' | 'star'
  originalRestored: boolean
  note: string
}

gsap.registerPlugin(MorphSVGPlugin)

/** path morph와 원본 복구 lifecycle을 lab에 제공한다. */
export function useIconMorphAnimation() {
  // lab scope는 revert와 cleanup을 icon 하나로 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // path ref는 실제 d mutation과 original d restoration의 대상이다
  const pathRef = useRef<SVGPathElement>(null)
  // mount d baseline은 MorphSVG가 만든 data-original과 별개로 직접 보관한다
  const originalD = useRef<string | null>(null)
  // type은 winding interpolation을 바꾸는 descriptor input이다
  const [type, setType] = useState<MorphDescriptor['type']>('linear')
  // operating-system motion preference는 tween 대신 final d 직접 적용을 고른다
  const reducedMotion = useReducedMotion()
  // 현재 표시는 tween 진행 중에 false completion을 꾸미지 않는다
  const [snapshot, setSnapshot] = useState<MorphSnapshot>({
    current: 'diamond',
    originalRestored: false,
    note: 'diamond 원본 path',
  })
  // descriptor는 vars, winding diagram, point labels와 code가 함께 읽는 단일 값이다
  const descriptor: MorphDescriptor = {
    shape:
      'M50 5 L61 37 L95 37 L68 57 L79 91 L50 70 L21 91 L32 57 L5 37 L39 37 Z',
    map: 'size',
    shapeIndex: 'auto',
    type,
    origin: '50% 50%',
    duration: 0.7,
  }
  // path d를 mount baseline으로 되돌리고 실행 중 tween을 남기지 않는다
  const restore = () => {
    const path = pathRef.current
    if (!path || originalD.current === null) return
    gsap.killTweensOf(path)
    path.setAttribute('d', originalD.current)
    setSnapshot({
      current: 'diamond',
      originalRestored: path.getAttribute('d') === originalD.current,
      note: '원본 d를 직접 복구했습니다.',
    })
  }
  // descriptor morphSVG config를 그대로 실행하거나 reduced motion에서 final d를 즉시 적용한다
  const morph = () => {
    const path = pathRef.current
    if (!path) return
    gsap.killTweensOf(path)
    if (reducedMotion) {
      path.setAttribute('d', descriptor.shape)
      setSnapshot({
        current: 'star',
        originalRestored: false,
        note: 'reduced motion: final path를 즉시 전환했습니다.',
      })
      return
    }
    gsap.to(path, {
      duration: descriptor.duration,
      ease: 'power2.inOut',
      morphSVG: {
        shape: descriptor.shape,
        map: descriptor.map,
        shapeIndex: descriptor.shapeIndex,
        type: descriptor.type,
        origin: descriptor.origin,
      },
      onComplete: () =>
        setSnapshot({
          current: 'star',
          originalRestored: false,
          note: 'MorphSVG tween completion의 실제 path입니다.',
        }),
    })
  }
  useGSAP(
    () => {
      // original d는 MorphSVG 실행 전 한 번만 기록한다
      const path = pathRef.current
      if (path) originalD.current = path.getAttribute('d')
      // global default는 이 lab에서 쓰지 않아 다른 페이지의 값을 바꿀 필요가 없다
      return () => {
        if (path) {
          gsap.killTweensOf(path)
          if (originalD.current !== null)
            path.setAttribute('d', originalD.current)
        }
      }
    },
    { scope },
  )
  return {
    scope,
    pathRef,
    descriptor,
    snapshot,
    reducedMotion,
    setType,
    morph,
    restore,
  }
}
