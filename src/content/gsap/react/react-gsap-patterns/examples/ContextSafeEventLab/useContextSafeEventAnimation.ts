/** late button event의 tween을 Context cleanup에 안전하게 기록한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** pulse call과 code panel이 공유하는 one late-event descriptor다. */
export const lateEventDescriptor = {
  targetClassName: 'context-safe-event__target',
  duration: 0.32,
  scale: 1.12,
}

/** button click 뒤 생기는 tween도 local Context가 revert하게 만든다. */
export function useContextSafeEventAnimation() {
  // Context와 late event target를 one example subtree로 제한한다.
  const scope = useRef<HTMLDivElement>(null)
  // actual late-event target를 selector 문자열 없이 stable ref로 잡는다.
  const targetRef = useRef<HTMLDivElement>(null)
  // semantic button result만 discrete state로 남긴다.
  const [count, setCount] = useState(0)
  // OS preference가 event tween을 immediate final transform으로 바꾼다.
  const reducedMotion = useReducedMotion()
  // Context를 만든 hook return이 late callback wrapper를 공급한다.
  const { contextSafe } = useGSAP({ scope })
  // descriptor와 preference가 event call과 serializer에 공유하는 config다.
  const config = {
    duration: reducedMotion ? 0 : lateEventDescriptor.duration,
    scale: lateEventDescriptor.scale,
  }
  // contextSafe는 click 시점의 new tween을 component Context에 기록한다.
  const pulse = contextSafe(() => {
    // stable target가 있을 때만 late tween을 실행한다.
    const target = targetRef.current
    if (!target) return
    // click마다 origin scale부터 current config의 final scale로 움직인다.
    gsap.fromTo(
      target,
      { scale: 1 },
      {
        scale: config.scale,
        duration: config.duration,
        yoyo: !reducedMotion,
        repeat: reducedMotion ? 0 : 1,
      },
    )
    // event result는 screen reader가 한 번만 읽을 discrete count다.
    setCount((value) => value + 1)
  })

  // display는 scoped ref, event handler와 current descriptor-derived config를 받는다.
  return { scope, targetRef, count, reducedMotion, config, pulse }
}
