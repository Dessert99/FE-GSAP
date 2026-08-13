/** SplitText lifecycle command가 original DOM과 owned animation을 안전하게 전이한다. */
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'
import {
  splitTextLifecycleCommands,
  splitTextLifecycleConfig,
  type SplitTextLifecycleCommand,
} from '../../split-text-lifecycle.descriptor'

// actual SplitText instance를 만들기 전에 GSAP plugin을 등록한다.
gsap.registerPlugin(SplitText)

/** command 뒤 실제 DOM과 accessibility 속성을 비교할 snapshot shape다. */
type DomSnapshot = {
  html: string
  ariaLabel: string | null
  ariaHidden: string | null
  childCount: number
}

/** command와 actual SplitText state를 lab UI에 전달한다. */
export function useSplitTextLifecycleRuntime() {
  // SplitText가 wrapper를 넣고 revert가 original DOM을 되돌릴 stable React-owned target이다.
  const targetRef = useRef<HTMLParagraphElement>(null)
  // 현재 lifecycle command가 조작할 page-owned SplitText instance다.
  const splitRef = useRef<SplitText | null>(null)
  // re-split 전에 반드시 멈출 onSplit에서 만든 page-owned animation이다.
  const animationRef = useRef<gsap.core.Tween | null>(null)
  // command descriptor가 actual method와 code panel을 함께 결정한다.
  const [command, setCommand] = useState<SplitTextLifecycleCommand>('split')
  // width slider가 line wrapping과 autoSplit resize work를 바꾸도록 보관한다.
  const [width, setWidth] = useState(420)
  // original innerHTML을 비교 기준으로 보관해 revert 결과를 눈으로 확인한다.
  const [beforeSnapshot, setBeforeSnapshot] = useState<DomSnapshot | null>(null)
  // command 직후 split wrapper DOM을 표시한다.
  const [afterSnapshot, setAfterSnapshot] = useState<DomSnapshot | null>(null)
  // instance가 보고한 actual split state를 별도 label로 표시한다.
  const [isSplit, setIsSplit] = useState(false)
  // 현재 DOM 전이를 설명하는 짧은 status를 제공한다.
  const [status, setStatus] = useState('initial DOM')
  // media preference가 staggered onSplit animation을 즉시 settle하게 한다.
  const reducedMotion = useReducedMotion()
  // React state에 복사할 DOM/accessibility snapshot을 한 형식으로 읽는다.
  const readSnapshot = (): DomSnapshot | null => {
    // target이 mount되기 전에는 DOM snapshot을 만들지 않는다.
    const target = targetRef.current
    if (!target) return null
    return {
      html: target.innerHTML,
      ariaLabel: target.getAttribute('aria-label'),
      ariaHidden: target.getAttribute('aria-hidden'),
      childCount: target.childElementCount,
    }
  }
  // instance와 target이 실제로 가진 값을 UI state로 복사한다.
  const refreshSnapshot = (nextStatus: string, split = splitRef.current) => {
    // pre-split original DOM은 처음 한 번만 보관한다.
    const snapshot = readSnapshot()
    if (!snapshot) return
    setBeforeSnapshot((current) => current ?? snapshot)
    setAfterSnapshot(snapshot)
    setIsSplit(Boolean(split?.isSplit))
    setStatus(nextStatus)
  }
  // previous character tween을 kill해 obsolete wrapper를 계속 참조하지 않게 한다.
  const stopOwnedAnimation = () => {
    animationRef.current?.kill()
    animationRef.current = null
  }
  // 같은 descriptor에서 autoSplit config와 animation cleanup callback을 만든다.
  const createConfig = () => ({
    ...splitTextLifecycleConfig,
    onSplit: (split: SplitText) => {
      // 새 wrapper만 대상으로 만든 tween을 이전 tween과 교체한다.
      stopOwnedAnimation()
      // reduced motion에서는 wrapper animation을 즉시 final state로 settle한다.
      const animation = gsap.from(split.chars, {
        autoAlpha: 0,
        y: reducedMotion ? 0 : 10,
        duration: reducedMotion ? 0 : 0.25,
        stagger: reducedMotion ? 0 : 0.015,
      })
      animationRef.current = animation
      // SplitText가 추가한 wrapper와 accessibility state를 바로 기록한다.
      refreshSnapshot('split complete', split)
      return animation
    },
  })
  // original DOM 위에서 새 instance를 만들기 전에 page-owned animation과 instance를 정리한다.
  const createSplit = () => {
    // existing character tween은 re-split/recreate 이전에 먼저 중지한다.
    stopOwnedAnimation()
    // existing instance는 original DOM을 복원하면서 internal resize/font work를 정리한다.
    splitRef.current?.revert()
    // SplitText가 실제로 mutate할 React-owned paragraph를 읽는다.
    const target = targetRef.current
    if (!target) return
    // wrapper를 넣기 전 original DOM/accessibility snapshot을 한 번만 고정한다.
    const originalSnapshot = readSnapshot()
    if (originalSnapshot)
      setBeforeSnapshot((current) => current ?? originalSnapshot)
    // lines/words/chars와 autoSplit을 포함한 actual SplitText instance를 생성한다.
    const split = SplitText.create(target, createConfig())
    splitRef.current = split
    // create가 끝난 current instance의 actual DOM state를 한번 더 읽는다.
    refreshSnapshot('created and split', split)
  }
  // descriptor가 가리키는 instance method를 실제 DOM에 적용한다.
  const runCommand = () => {
    // descriptor action은 code panel과 이 lifecycle branch가 공유한다.
    const descriptor = splitTextLifecycleCommands[command]
    // create는 old instance를 dispose한 뒤 original DOM에서 새로 시작한다.
    if (descriptor.action === 'create') return createSplit()
    // create effect가 끝나기 전에는 current instance method를 호출하지 않는다.
    const split = splitRef.current
    if (!split) return
    // re-split에는 stale wrapper animation을 먼저 kill한다.
    if (descriptor.action === 'resplit') {
      stopOwnedAnimation()
      // split()은 필요하면 revert()를 먼저 호출한 뒤 current config로 다시 나눈다.
      split.split(createConfig())
      return refreshSnapshot('animation을 멈춘 뒤 re-split', split)
    }
    // revert는 original innerHTML과 original aria attributes를 복원하고 kill도 수행한다.
    if (descriptor.action === 'revert') {
      stopOwnedAnimation()
      split.revert()
      return refreshSnapshot('reverted to original DOM', split)
    }
    // kill은 split DOM을 유지한 채 internal autoSplit resize/font work만 중지한다.
    stopOwnedAnimation()
    split.kill()
    refreshSnapshot('killed autoSplit; DOM remains split', split)
  }
  // mount에서 one actual instance를 만들고 unmount에서 original DOM과 resize work를 정리한다.
  useEffect(() => {
    // initial split lets the lab show true isSplit and wrapper snapshots immediately.
    createSplit()
    // unmount stops only this lab's tween then revert calls kill for internal observer/font cleanup.
    return () => {
      stopOwnedAnimation()
      splitRef.current?.revert()
      splitRef.current = null
    }
  }, [reducedMotion])
  // lab가 target, descriptor state, snapshots, width control, and actual handler를 받는다.
  return {
    targetRef,
    command,
    setCommand,
    width,
    setWidth,
    beforeSnapshot,
    afterSnapshot,
    isSplit,
    status,
    reducedMotion,
    runCommand,
  }
}
