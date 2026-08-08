/** development-only GSDevTools instance와 labelled timeline을 같은 descriptor로 만든다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// create()가 돌려주는 instance의 page-local disposal surface다.
type DevToolsInstance = { kill: () => void }

/** native fallback과 inspector가 같은 paused timeline을 검사하도록 만든다. */
export function useGsDevToolsLabAnimation() {
  // useGSAP cleanup이 timeline target과 inspector container를 lab 안으로 제한한다.
  const scope = useRef<HTMLDivElement>(null)
  // dynamic plugin UI가 page 밖으로 퍼지지 않도록 받는 container다.
  const toolContainerRef = useRef<HTMLDivElement>(null)
  // native fallback control이 직접 재생할 labelled timeline이다.
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  // cleanup에서 tool DOM과 listener를 없앨 instance reference다.
  const toolsRef = useRef<DevToolsInstance | null>(null)
  // inspector가 처음 만들 timeline speed를 고른다.
  const [timeScale, setTimeScale] = useState(0.5)
  // native fallback이 만든 playback 상태를 문장으로 전달한다.
  const [playback, setPlayback] = useState<'paused' | 'playing' | 'reduced-final'>('paused')
  // development import/create 결과를 production boundary와 함께 보인다.
  const [inspectorStatus, setInspectorStatus] = useState('creating development inspector')
  // user preference가 autoplay 없이 final state를 정하게 한다.
  const reducedMotion = useReducedMotion()
  // timeline labels, create config, visible controls와 code panel이 공유하는 descriptor다.
  const descriptor = {
    timelineId: 'gsdevtools-lab-timeline',
    childIds: ['enter-dot', 'settle-dot'],
    duration: reducedMotion ? 0 : 0.6,
    timeScale,
    config: {
      id: 'gsdevtools-lab-inspector',
      paused: true,
      timeScale,
      minimal: true,
      visibility: 'auto',
      keyboard: false,
      persist: false,
      hideGlobalTimeline: true,
    },
  }

  useGSAP(
    () => {
      // inspector가 control할 short scene을 paused state와 label로 먼저 만든다.
      const timeline = gsap.timeline({ id: descriptor.timelineId, paused: true })
      // 첫 label은 dot를 오른쪽으로 보내는 scene 이름과 child id를 함께 남긴다.
      timeline.addLabel('enter').to('.gsdevtools-lab__dot', {
        x: 164,
        duration: descriptor.duration,
        ease: 'power2.out',
        id: descriptor.childIds[0],
      })
      // 둘째 label은 scale을 정착시키는 child tween을 구분한다.
      timeline.addLabel('settle').to('.gsdevtools-lab__dot', {
        scale: 0.82,
        duration: descriptor.duration,
        ease: 'power1.inOut',
        id: descriptor.childIds[1],
      })
      timelineRef.current = timeline
      toolsRef.current?.kill()
      toolsRef.current = null

      // production에는 debugging UI를 load하지 않고 native fallback만 남긴다.
      if (!import.meta.env.DEV) {
        setInspectorStatus('production: native fallback only')
      } else {
        let active = true
        setInspectorStatus('creating development inspector')
        // dev chunk에서만 plugin을 import/register해 실제 descriptor config로 tool을 만든다.
        void import('gsap/GSDevTools').then(({ GSDevTools }) => {
          if (!active || !toolContainerRef.current) return
          gsap.registerPlugin(GSDevTools)
          // create config는 descriptor가 노출한 paused/timeScale/UI values를 그대로 쓴다.
          toolsRef.current = GSDevTools.create({
            animation: timeline,
            container: toolContainerRef.current,
            ...descriptor.config,
          })
          setInspectorStatus('development inspector connected')
        })

        return () => {
          active = false
          toolsRef.current?.kill()
          toolsRef.current = null
          timeline.kill()
          timelineRef.current = null
        }
      }

      return () => {
        timeline.kill()
        timelineRef.current = null
      }
    },
    // timeScale 또는 reduced motion이 바뀌면 paused timeline과 inspector config를 같은 값으로 다시 만든다.
    { scope, dependencies: [descriptor.timeScale, descriptor.duration], revertOnUpdate: true },
  )

  // native play는 reduced motion에서 autoplay 대신 final time으로 즉시 정착한다.
  const play = () => {
    const timeline = timelineRef.current
    if (!timeline) return
    if (reducedMotion) {
      timeline.progress(1).pause()
      setPlayback('reduced-final')
      return
    }
    timeline.play()
    setPlayback('playing')
  }

  // native pause는 tool UI가 없어도 playhead를 멈추게 한다.
  const pause = () => {
    timelineRef.current?.pause()
    setPlayback('paused')
  }

  // native rewind는 labelled timeline을 initial paused state로 되돌린다.
  const rewind = () => {
    timelineRef.current?.pause(0)
    setPlayback('paused')
  }

  // display layer에는 shared descriptor와 native fallback action만 돌려준다.
  return {
    scope,
    toolContainerRef,
    timeScale,
    setTimeScale,
    playback,
    inspectorStatus,
    descriptor,
    reducedMotion,
    play,
    pause,
    rewind,
  }
}
