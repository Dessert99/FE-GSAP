/** Tween 제어 예제의 실행 상태와 반환된 인스턴스 조작을 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** Tween 제어 예제가 표시하고 실행할 설정과 조작 메서드를 제공한다. */
export function useTweenControlsAnimation() {
  const scope = useRef<HTMLDivElement>(null)
  const tween = useRef<gsap.core.Tween | null>(null)
  const meter = useRef<HTMLOutputElement>(null)
  const targetClassName = 'tween-controls-example__target'
  const [duration, setDuration] = useState(2)
  const [runKey, setRunKey] = useState(0)
  const reducedMotion = useReducedMotion()
  const animationConfig = {
    x: 220,
    rotation: 360,
    duration: reducedMotion ? 0 : duration,
    paused: true,
    id: 'controls-demo',
    data: { lesson: 'Tween controls' },
    ease: 'power1.inOut',
  }

  function syncProgress() {
    if (meter.current && tween.current) meter.current.value = `${Math.round(tween.current.progress() * 100)}%`
  }

  useGSAP(
    () => {
      if (meter.current) meter.current.value = '0%'
      gsap.set(`.${targetClassName}`, { x: 0, rotation: 0 })
      tween.current = gsap.to(`.${targetClassName}`, { ...animationConfig, onUpdate: syncProgress })
      syncProgress()
    },
    { scope, dependencies: [duration, reducedMotion, runKey], revertOnUpdate: true },
  )

  function play() {
    tween.current?.play()
    syncProgress()
  }

  function pause() {
    tween.current?.pause()
    syncProgress()
  }

  function reverse() {
    tween.current?.reverse()
    syncProgress()
  }

  function restart() {
    tween.current?.restart()
    syncProgress()
  }

  function seekToHalfDuration() {
    tween.current?.seek(animationConfig.duration / 2)
    syncProgress()
  }

  function showHalfProgress() {
    tween.current?.progress(0.5).pause()
    syncProgress()
  }

  return {
    scope,
    targetClassName,
    meter,
    duration,
    setDuration,
    reducedMotion,
    animationConfig,
    play,
    pause,
    reverse,
    restart,
    seekToHalfDuration,
    showHalfProgress,
    replay: () => setRunKey((key) => key + 1),
  }
}
