/** local scroller의 ScrollTrigger geometry를 request-to-freeze snapshot으로 읽는다. */
import { useGSAP } from '@gsap/react'
import { useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** snapshot table가 표시할 fourteen geometry readout의 string shape를 고정한다. */
export type GeometrySnapshot = Record<string, string>

/** actual create·utility calls와 serialized code가 공유하는 one ruler descriptor다. */
export type GeometryDescriptor = {
  start: string
  end: string
  markerLabel: string
}

// ScrollTrigger instance와 static utility를 local runtime에서 사용할 수 있게 등록한다
gsap.registerPlugin(ScrollTrigger)

/** one local scroll ruler와 owned trigger/timeline/listener lifecycle을 소유한다. */
export function useGeometryRulerRuntime() {
  // useGSAP context가 local ruler DOM과 owned cleanup만 되돌리도록 scope를 둔다
  const scope = useRef<HTMLDivElement>(null)
  // actual scroller ownership을 ScrollTrigger config와 maxScroll call에 전달한다
  const scrollerRef = useRef<HTMLDivElement>(null)
  // numeric start/end를 계산할 trigger element를 실제 instance에 전달한다
  const triggerRef = useRef<HTMLDivElement>(null)
  // optional pin owner를 reduced-motion branch와 snapshot에서 구분한다
  const pinRef = useRef<HTMLDivElement>(null)
  // current UI가 아닌 request 순간의 discrete geometry만 table에 고정한다
  const [snapshot, setSnapshot] = useState<GeometrySnapshot>({})
  // OS preference에 따라 pin/tween을 끄되 geometric trigger measurement는 유지한다
  const reducedMotion = useReducedMotion()
  // one descriptor가 create vars와 code panel start/end/label 값을 공유한다
  const descriptor = useMemo<GeometryDescriptor>(
    () => ({ start: 'top 70%', end: 'bottom 30%', markerLabel: 'measure' }),
    [],
  )
  // latest owned trigger를 click snapshot callback이 actual instance에서 읽게 보관한다
  const triggerInstanceRef = useRef<ScrollTrigger | null>(null)

  // descriptor와 motion preference가 바뀌면 one local trigger를 재생성하고 prior pin/tween을 정리한다
  useGSAP(
    () => {
      // required local elements가 mount 전이면 unsafe global fallback을 만들지 않는다
      const scroller = scrollerRef.current
      // start/end와 viewport utility가 읽을 trigger element다
      const triggerElement = triggerRef.current
      // reduced-motion 여부에 따라 pin에 전달할 별도 element다
      const pinElement = pinRef.current
      if (!scroller || !triggerElement || !pinElement) return undefined
      // labelToScroll과 animation field를 동시에 갖도록 paused timeline에 one label을 둔다
      const timeline = gsap
        .timeline({ paused: true })
        .addLabel(descriptor.markerLabel)
        .to({}, { duration: 1 })
      // reduced motion에서는 animation/pin 없이 same geometry instance를 만들어 static measurements를 남긴다
      const instance = ScrollTrigger.create({
        trigger: triggerElement,
        scroller,
        start: descriptor.start,
        end: descriptor.end,
        pin: reducedMotion ? false : pinElement,
        animation: reducedMotion ? undefined : timeline,
      })
      // capture callback이 only this owned instance를 읽도록 ref를 갱신한다
      triggerInstanceRef.current = instance
      // refresh 뒤 start/end numeric px measurement를 초기 snapshot으로 한 번 고정한다
      const capture = () => {
        // callback 시점에 살아 있는 이 예제의 instance만 읽는다
        const current = triggerInstanceRef.current
        if (!current) return
        // current scroll direction/progress를 live announce하지 않고 user request 때만 문자열로 고정한다
        setSnapshot({
          animation: current.animation
            ? current.animation.constructor.name
            : 'undefined',
          direction: String(current.direction),
          end: `${Math.round(current.end)} px`,
          isActive: String(current.isActive),
          labelToScroll: `${Math.round(current.labelToScroll(descriptor.markerLabel))} px`,
          pin: current.pin ? current.pin.tagName.toLowerCase() : 'undefined',
          progress: current.progress.toFixed(3),
          scroll: `${Math.round(current.scroll())} px`,
          scroller:
            current.scroller === window
              ? 'window'
              : (current.scroller as Element).tagName.toLowerCase(),
          start: `${Math.round(current.start)} px`,
          isInViewport: String(ScrollTrigger.isInViewport(triggerElement)),
          maxScroll: `${Math.round(ScrollTrigger.maxScroll(scroller))} px`,
          positionInViewport: ScrollTrigger.positionInViewport(
            triggerElement,
            'center',
          ).toFixed(3),
          trigger: current.trigger
            ? current.trigger.tagName.toLowerCase()
            : 'undefined',
        })
      }
      // refresh timing이 settled geometry를 만든 뒤 first sparse snapshot을 읽는다
      ScrollTrigger.addEventListener('refresh', capture)
      // local container geometry를 instance creation 직후 확정한다
      instance.refresh()
      // refresh event가 skipped되는 environment도 initial snapshot을 받도록 직접 읽는다
      capture()

      // context cleanup은 listener, pin, trigger, timeline, and ref ownership을 exact order로 되돌린다
      return () => {
        ScrollTrigger.removeEventListener('refresh', capture)
        instance.kill(true)
        timeline.kill()
        triggerInstanceRef.current = null
      }
    },
    // local descriptor/motion branch가 바뀔 때 previous pin and listener를 먼저 cleanup한다
    { scope, dependencies: [descriptor, reducedMotion], revertOnUpdate: true },
  )

  // native scroll control은 only local ruler scrollTop을 바꾸고 then sparse snapshot을 요청한다
  const captureSnapshot = () => {
    // button이 눌린 시점의 current instance를 고정해 읽는다
    const current = triggerInstanceRef.current
    if (!current) return
    // getter로 읽은 same position을 setter에 넘겨 위치를 바꾸지 않고 양쪽 signature를 실제 호출한다
    const position = current.scroll()
    current.scroll(position)
    current.update()
    current.refresh()
  }

  // TSX는 local refs, descriptor, frozen snapshot, motion outcome, user request action을 받는다
  return {
    scope,
    scrollerRef,
    triggerRef,
    pinRef,
    descriptor,
    snapshot,
    reducedMotion,
    captureSnapshot,
  }
}
