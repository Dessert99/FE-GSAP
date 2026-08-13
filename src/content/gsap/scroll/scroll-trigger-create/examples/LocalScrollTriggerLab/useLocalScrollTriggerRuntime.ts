/** local scroller의 standalone ScrollTrigger와 owned tween·pin cleanup을 소유한다. */
import { useGSAP } from '@gsap/react'
import { useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'
import {
  getScrollTriggerConstructionDescriptor,
  type ScrollTriggerConstructionDescriptor,
} from '../../scroll-trigger-create.descriptor'

/** vars inspector가 measured instance에서 고정해 보여 줄 최소 readout shape다. */
export type ScrollTriggerConstructionSnapshot = Record<string, string>

// standalone instance를 만들기 전에 ScrollTrigger plugin을 GSAP core에 등록한다
gsap.registerPlugin(ScrollTrigger)

/** actual create와 displayed code를 동일 descriptor로 다시 만든다. */
export function useLocalScrollTriggerRuntime() {
  // useGSAP이 local trigger와 pin style만 context cleanup으로 되돌릴 범위를 둔다
  const scope = useRef<HTMLDivElement>(null)
  // viewport가 아닌 local element만 ScrollTrigger scroller로 전달한다
  const scrollerRef = useRef<HTMLDivElement>(null)
  // start/end와 pin position을 계산할 trigger element를 보관한다
  const triggerRef = useRef<HTMLDivElement>(null)
  // pin 안에서만 tween해 pinned element measurement를 흔들지 않는다
  const followerRef = useRef<HTMLDivElement>(null)
  // current standalone instance가 inspector와 replay action에서 같은 vars를 읽게 한다
  const instanceRef = useRef<ScrollTrigger | null>(null)
  // 값 변화마다 announce하지 않고 refresh/replay 시점의 measured 값을 표시한다
  const [snapshot, setSnapshot] = useState<ScrollTriggerConstructionSnapshot>(
    {},
  )
  // OS preference는 descriptor의 scrub/pin과 follower distance를 함께 바꾼다
  const reducedMotion = useReducedMotion()
  // 하나의 descriptor가 runtime create vars, marker label, code panel의 source of truth다
  const descriptor = useMemo(
    () => getScrollTriggerConstructionDescriptor(reducedMotion),
    [reducedMotion],
  )

  // active instance를 읽어 vars와 refresh 뒤 numeric boundary를 table에 고정한다
  function captureSnapshot(instance: ScrollTrigger) {
    setSnapshot({
      trigger: instance.trigger ? 'local trigger element' : 'undefined',
      scroller:
        instance.scroller === window ? 'window' : 'local scroller element',
      start: `${Math.round(instance.start)} px`,
      end: `${Math.round(instance.end)} px`,
      toggleActions: String(instance.vars.toggleActions),
      scrub: String(instance.vars.scrub ?? false),
      pin: instance.pin ? 'local trigger element' : 'false',
      snap: String(instance.vars.snap ?? false),
      markers: String(instance.vars.markers),
    })
  }

  // descriptor/motion change마다 old trigger, tween, pin effects, default change를 먼저 정리한다
  useGSAP(
    () => {
      // 모든 required local node가 준비될 때만 explicit scroller create를 실행한다
      const scroller = scrollerRef.current
      // start/end와 pin 위치를 계산할 trigger element다
      const trigger = triggerRef.current
      // pin 안에서 x축으로 이동할 follower element다
      const follower = followerRef.current
      if (!scroller || !trigger || !follower) return undefined
      // defaults() runtime getter가 current object를 반환하므로 이 lab이 바꿀 key만 복사한다
      const defaultSnapshot = { ...ScrollTrigger.defaults({}) }
      // cleanup에서 이 예제가 바꾼 toggleActions 값만 되돌린다
      const previousToggleActions = defaultSnapshot.toggleActions
      // 생략한 vars는 explicit vars가 덮기 전에 이 local lifetime의 creation default를 받는다
      ScrollTrigger.defaults({
        toggleActions: descriptor.defaults.toggleActions,
      })
      // reduced motion도 owned no-distance tween을 만들어 cleanup ownership을 같게 둔다
      const tween = gsap.to(follower, {
        x: reducedMotion ? 0 : 96,
        duration: reducedMotion ? 0 : 0.5,
        ease: 'none',
        paused: true,
      })
      // standalone create는 descriptor의 local geometry, markers, motion branch를 받는다
      const instance = ScrollTrigger.create({
        trigger,
        scroller,
        start: descriptor.start,
        end: descriptor.end,
        toggleActions: descriptor.toggleActions,
        scrub: descriptor.scrub,
        pin: descriptor.pin ? trigger : false,
        markers: descriptor.markers,
        animation: tween,
        onRefresh: captureSnapshot,
      })
      // replay와 inspector는 page-wide trigger 대신 이 instance만 소유한다
      instanceRef.current = instance
      // create/refresh는 start/end가 measured numeric scroll position이 되는 시점이다
      instance.refresh()
      captureSnapshot(instance)

      // kill은 tween/default 복원 전에 pin DOM effect를 되돌리고 owner reference를 비운다
      return () => {
        instance.kill(true)
        tween.kill()
        gsap.set(follower, { clearProps: 'transform' })
        ScrollTrigger.defaults({ toggleActions: previousToggleActions })
        instanceRef.current = null
      }
    },
    // reduced motion change는 fresh descriptor를 만들고 prior pin lifecycle을 먼저 복원한다
    { scope, dependencies: [descriptor, reducedMotion], revertOnUpdate: true },
  )

  // user replay는 local layout 또는 scroll change 뒤 같은 instance에 remeasure를 요청한다
  function refreshSnapshot() {
    // refresh 뒤 vars와 측정 좌표를 읽을 현재 instance다
    const instance = instanceRef.current
    if (!instance) return
    instance.refresh()
    captureSnapshot(instance)
  }

  // TSX는 하나의 runtime descriptor, local refs, sparse inspector data, replay action만 받는다
  return {
    scope,
    scrollerRef,
    triggerRef,
    followerRef,
    descriptor,
    snapshot,
    reducedMotion,
    refreshSnapshot,
  }
}

/** 표시 코드가 global config mutation을 피하는 이유를 제공한다. */
export function getConfigBoundary(
  descriptor: ScrollTriggerConstructionDescriptor,
) {
  return `// config({ limitCallbacks: ${descriptor.config.limitCallbacks} })는 global이다.\n// config()에는 현재 값을 읽는 public getter가 없어 이 예제는 값을 바꾸지 않는다.\n// 앱 초기화 코드가 설정한 global 값은 같은 위치에서 보관하고 복원한다.`
}
