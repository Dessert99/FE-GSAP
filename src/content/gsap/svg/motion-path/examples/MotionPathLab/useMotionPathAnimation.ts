/** one SVG path와 stable follower를 MotionPathPlugin tween으로 연결한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// control, actual motionPath vars와 code panel이 공유하는 normalized descriptor다
export const motionPathDescriptor = {
  path: '#motion-path-lab-curve',
  alignOrigin: [0.5, 0.5] as const,
  duration: 1.2,
}
// plugin property를 tween vars에 인식시킨다
gsap.registerPlugin(MotionPathPlugin)
/** selected interval과 orientation을 one follower tween에 적용한다. */
export function useMotionPathAnimation() {
  // svg path와 follower query 및 cleanup을 lab 하나로 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // visible SVG curve는 actual motionPath와 align의 같은 stable element다
  const pathRef = useRef<SVGPathElement>(null)
  // React가 유지하는 follower가 tween target과 status snapshot의 기준이다
  const followerRef = useRef<HTMLButtonElement>(null)
  // start marker와 motionPath config가 공유하는 path progress다
  const [start, setStart] = useState(0)
  // end marker와 reduced-motion final position이 공유하는 path progress다
  const [end, setEnd] = useState(1)
  // tangent orientation을 config와 code에 함께 반영한다
  const [autoRotate, setAutoRotate] = useState(true)
  // motion preference는 selected end point의 instant alternative를 결정한다
  const reducedMotion = useReducedMotion()
  // action completion만 설명하는 sparse status다
  const [status, setStatus] = useState('path tween 준비 중')
  useGSAP(
    () => {
      const follower = followerRef.current
      const path = pathRef.current
      if (!follower || !path) return undefined
      // previous transform을 revert before new config가 항상 same path coordinates에서 출발한다
      gsap.set(follower, { x: 0, y: 0, rotation: 0 })
      // reduced motion은 같은 config의 selected end를 duration 0으로 즉시 적용한다
      // runtime config는 controls와 path refs로 정규화해 actual tween에 한 번만 전달한다
      const config = {
        path,
        align: path,
        alignOrigin: [...motionPathDescriptor.alignOrigin],
        autoRotate,
        start,
        end,
      }
      const tween = gsap.to(follower, {
        motionPath: config,
        duration: reducedMotion ? 0 : motionPathDescriptor.duration,
        ease: 'power1.inOut',
        onComplete: () =>
          setStatus(
            reducedMotion
              ? `reduced motion: end ${end}에 즉시 배치했습니다.`
              : `start ${start}에서 end ${end}까지 이동했습니다.`,
          ),
      })
      // unmount와 config update에 tween을 kill하고 saved transform을 revert한다
      return () => {
        tween.kill()
        gsap.set(follower, { clearProps: 'transform,transformOrigin' })
      }
    },
    {
      scope,
      dependencies: [start, end, autoRotate, reducedMotion],
      revertOnUpdate: true,
    },
  )
  // lab가 stable refs, descriptor-derived config, controls와 discrete status를 함께 받는다
  return {
    scope,
    pathRef,
    followerRef,
    start,
    end,
    autoRotate,
    reducedMotion,
    status,
    setStart,
    setEnd,
    setAutoRotate,
  }
}
