/** 한 fit descriptor로 calculate·apply·animate·absolute mutation을 실제 Flip call에 연결한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'
export type FitMode = 'calculate' | 'apply' | 'animate'
export type FitDescriptor = {
  mode: FitMode
  scale: boolean
  absolute: boolean
  duration: number
}
export type FitSnapshot = {
  returnKind: string
  absoluteAffected: number
  flowRemoved: boolean
}
/** original style attribute가 아직 capture되지 않았는지와 exact baseline을 구분한다. */
type OriginalStyleSnapshot =
  | { captured: false }
  | { captured: true; value: string | null }

gsap.registerPlugin(Flip)
export function useFitAbsoluteAnimation() {
  const scope = useRef<HTMLDivElement>(null)
  const sourceRef = useRef<HTMLDivElement>(null)
  const destinationRef = useRef<HTMLDivElement>(null)
  const originalStyleRef = useRef<OriginalStyleSnapshot>({ captured: false })
  const [mode, setMode] = useState<FitMode>('calculate')
  const [scale, setScale] = useState(true)
  const [absolute, setAbsolute] = useState(false)
  const reducedMotion = useReducedMotion()
  const [snapshot, setSnapshot] = useState<FitSnapshot>({
    returnKind: '아직 호출 전',
    absoluteAffected: 0,
    flowRemoved: false,
  })
  const descriptor: FitDescriptor = {
    mode,
    scale,
    absolute,
    duration: reducedMotion ? 0 : 0.6,
  }
  // mount 직후의 style attribute만 baseline으로 기록해 action이 반복돼도 바뀌지 않게 한다
  const captureOriginalStyle = (source: HTMLDivElement) => {
    if (!originalStyleRef.current.captured) {
      originalStyleRef.current = {
        captured: true,
        value: source.getAttribute('style'),
      }
    }
  }
  // React state 없이 tween과 inline style만 mount baseline으로 되돌린다
  const restoreDom = () => {
    const source = sourceRef.current
    if (!source) return
    gsap.killTweensOf(source)
    const originalStyle = originalStyleRef.current
    if (!originalStyle.captured || originalStyle.value === null) {
      source.removeAttribute('style')
    } else {
      source.setAttribute('style', originalStyle.value)
    }
  }
  // user control은 DOM 복원 뒤에만 사람이 읽을 snapshot을 갱신한다
  const restore = () => {
    restoreDom()
    setSnapshot({
      returnKind: 'inline style과 flow 복원',
      absoluteAffected: 0,
      flowRemoved: false,
    })
  }
  const run = () => {
    const source = sourceRef.current
    const destination = destinationRef.current
    if (!source || !destination) return
    captureOriginalStyle(source)
    gsap.killTweensOf(source)
    const vars = {
      scale: descriptor.scale,
      absolute: descriptor.absolute,
      duration: descriptor.duration,
      ease: 'power1.inOut',
    }
    if (descriptor.mode === 'calculate') {
      const returned = Flip.fit(source, destination, { ...vars, getVars: true })
      setSnapshot({
        returnKind: `getVars object · ${Object.keys(returned || {}).join(', ') || 'empty'}`,
        absoluteAffected: 0,
        flowRemoved: false,
      })
      return
    }
    if (descriptor.mode === 'apply') {
      const returned = Flip.fit(source, destination, { ...vars, duration: 0 })
      setSnapshot({
        returnKind:
          returned === null ? 'apply return null' : 'apply return 확인',
        absoluteAffected: 0,
        flowRemoved: descriptor.absolute,
      })
      return
    }
    const returned = Flip.fit(source, destination, vars)
    setSnapshot({
      returnKind: returned ? 'Tween 반환' : 'null 반환',
      absoluteAffected: 0,
      flowRemoved: descriptor.absolute,
    })
  }
  const makeAbsolute = () => {
    const source = sourceRef.current
    if (!source) return
    captureOriginalStyle(source)
    gsap.killTweensOf(source)
    const affected = Flip.makeAbsolute(source)
    setSnapshot({
      returnKind: 'makeAbsolute Element[] 반환',
      absoluteAffected: affected.length,
      flowRemoved: affected.length > 0,
    })
  }
  useGSAP(
    () => {
      // control 전에도 mount style을 먼저 capture해 cleanup baseline을 고정한다
      const source = sourceRef.current
      if (source) captureOriginalStyle(source)
      // unmount는 React state를 건드리지 않고 DOM/tween cleanup만 실행한다
      return () => restoreDom()
    },
    // lab DOM scope만 cleanup해 sibling page animation을 건드리지 않는다
    { scope },
  )
  return {
    scope,
    sourceRef,
    destinationRef,
    descriptor,
    snapshot,
    setMode,
    setScale,
    setAbsolute,
    run,
    makeAbsolute,
    restore,
  }
}
