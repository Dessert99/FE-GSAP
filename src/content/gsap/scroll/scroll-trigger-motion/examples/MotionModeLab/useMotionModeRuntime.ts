/** exclusive ScrollTrigger motion descriptor의 instance 생성과 cleanup을 소유한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** scrub·batch·snap 중 하나만 runtime과 code에 넘기는 descriptor다. */
export type MotionMode = 'scrub' | 'batch' | 'snap'
/** 각 mode가 실제 ScrollTrigger 호출에 넘길 수치만 보관한다. */
export const motionDescriptor = {
  scrub: { scrub: 0.4 },
  batch: { interval: 0.1, batchMax: 2 },
  snap: { increment: 0.25 },
} as const

/** selected mode만 만들고 reduced motion에서는 모든 target을 즉시 reveal한다. */
export function useMotionModeRuntime(mode: MotionMode) {
  // GSAP selector와 trigger를 이 example의 DOM으로 한정한다
  const scope = useRef<HTMLElement>(null)
  // 세 mode가 host page 대신 공유할 local scroll container다
  const scrollerRef = useRef<HTMLDivElement>(null)
  // 마지막 discrete execution 결과만 status와 code에 남긴다
  const [result, setResult] = useState('mode를 선택하세요.')
  // OS motion preference는 scroll-bound animation을 제거한다
  const reducedMotion = useReducedMotion()
  // selected mode의 actual instances를 context cleanup에 묶는다
  useGSAP(
    () => {
      // selected mode가 사용할 실제 local item을 scope 안에서만 찾는다
      const targets = gsap.utils.toArray<HTMLElement>(
        '.motion-mode-lab__item',
        scope.current,
      )
      // 모든 mode가 host page 대신 사용할 local scroll element다
      const scroller = scrollerRef.current
      if (!targets.length || !scope.current || !scroller) return undefined
      // actual ScrollTrigger calls 전에 plugin을 GSAP core에 등록한다
      gsap.registerPlugin(ScrollTrigger)
      if (reducedMotion) {
        // motion을 만들지 않고 모든 item을 readable final state로 즉시 드러낸다
        gsap.set(targets, { autoAlpha: 1, x: 0, y: 0 })
        setResult('reduced motion · reveal only')
        return undefined
      }
      if (mode === 'scrub') {
        // 첫 item 하나만 scroll position에 결합해 scrub query를 관찰한다
        const tween = gsap.to(targets[0], {
          x: 48,
          scrollTrigger: {
            trigger: targets[0],
            scroller,
            scrub: motionDescriptor.scrub.scrub,
          },
        })
        // numeric scrub이 만든 smoothing tween을 same instance에서 읽는다
        const scrubTween = tween.scrollTrigger?.getTween()
        // 같은 trigger의 signed pixels-per-second velocity를 snapshot으로 읽는다
        const velocity = tween.scrollTrigger?.getVelocity() ?? 0
        setResult(
          `scrub tween: ${Boolean(scrubTween)} · velocity: ${Math.round(velocity)} px/s`,
        )
        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      }
      if (mode === 'batch') {
        // batch callback 전 item을 숨겨 묶음 reveal의 시작 상태를 만든다
        gsap.set(targets, { autoAlpha: 0, y: 24 })
        // interval 안 진입을 batchMax 크기로 묶어 한 callback에 전달한다
        const triggers = ScrollTrigger.batch(targets, {
          scroller,
          interval: motionDescriptor.batch.interval,
          batchMax: motionDescriptor.batch.batchMax,
          onEnter: (items) => gsap.to(items, { autoAlpha: 1, y: 0 }),
        })
        setResult(`batch triggers: ${triggers.length}`)
        return () => {
          triggers.forEach((trigger) => trigger.kill())
          gsap.killTweensOf(targets)
        }
      }
      // increment와 current direction을 받는 snap function을 descriptor에서 만든다
      const directional = ScrollTrigger.snapDirectional(
        motionDescriptor.snap.increment,
      )
      // snap mode만 section scroll progress에 directional snap을 연결한다
      const trigger = ScrollTrigger.create({
        trigger: targets[0],
        scroller,
        snap: {
          snapTo: (value, self) => directional(value, self?.direction ?? 1),
        },
      })
      setResult(`snap(0.3, 1): ${directional(0.3, 1)}`)
      return () => trigger.kill()
    },
    // selected mode와 motion preference가 바뀌면 이전 mode의 owned work를 먼저 되돌린다
    {
      scope,
      dependencies: [mode, reducedMotion],
      revertOnUpdate: true,
    },
  )
  // display는 actual scope, result, motion branch와 같은 descriptor를 받는다
  return {
    scope,
    scrollerRef,
    result,
    reducedMotion,
    descriptor: motionDescriptor,
  }
}
