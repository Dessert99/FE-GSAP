/** 재생 옵션 예제의 값 배치와 Tween 방향 제어를 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 역방향 ease 선택값을 제한한다. */
export type ReverseEase = 'false' | 'true' | 'power3.out' | 'back.out(1.7)'

type PlaybackOptionsState = {
  delay: number
  startAt: boolean
  runBackwards: boolean
  reversed: boolean
  easeReverse: ReverseEase
}

type PlaybackConfig = {
  x: number
  duration: number
  delay: number
  ease: string
  easeReverse: boolean | string
  runBackwards: boolean
  reversed: boolean
  startAt: { x: number; opacity: number } | undefined
}

const initialOptions: PlaybackOptionsState = {
  delay: 0.3,
  startAt: true,
  runBackwards: false,
  reversed: false,
  easeReverse: 'true',
}

function resolveEaseReverse(value: ReverseEase) {
  if (value === 'false') return false
  if (value === 'true') return true
  return value
}

function createPlaybackConfig(options: PlaybackOptionsState, reducedMotion: boolean): PlaybackConfig {
  return {
    x: 210,
    duration: reducedMotion ? 0 : 1.4,
    delay: reducedMotion ? 0 : options.delay,
    ease: 'power3.out',
    easeReverse: resolveEaseReverse(options.easeReverse),
    runBackwards: options.runBackwards,
    reversed: options.reversed,
    startAt: options.startAt ? { x: -55, opacity: 0.35 } : undefined,
  }
}

/** 재생 옵션 예제가 조절할 값과 실제 실행 설정을 제공한다. */
export function usePlaybackOptionsAnimation() {
  const scope = useRef<HTMLDivElement>(null)
  const tween = useRef<gsap.core.Tween | null>(null)
  const targetClassName = 'playback-options-example__target'
  const [options, setOptions] = useState<PlaybackOptionsState>(initialOptions)
  const [manuallyReversed, setManuallyReversed] = useState(false)
  const [runKey, setRunKey] = useState(0)
  const reducedMotion = useReducedMotion()
  const animationConfig = createPlaybackConfig(options, reducedMotion)

  useGSAP(
    () => {
      // 모션 감소 환경에서는 같은 설정의 시작·종료 상태만 즉시 확인하게 한다.
      gsap.set(`.${targetClassName}`, { x: 0, opacity: 1 })
      tween.current = gsap.to(`.${targetClassName}`, animationConfig)
      // reversed는 0초에서 더 뒤로 갈 수 없으므로 끝점에 둔 뒤 역방향으로 출발시킨다.
      if (animationConfig.reversed) tween.current.progress(1).resume()
    },
    {
      scope,
      dependencies: [options, reducedMotion, runKey],
      revertOnUpdate: true,
    },
  )

  function updateOption<Key extends keyof PlaybackOptionsState>(key: Key, value: PlaybackOptionsState[Key]) {
    setOptions((current) => ({ ...current, [key]: value }))
    setManuallyReversed(false)
  }

  function replay() {
    setManuallyReversed(false)
    setRunKey((key) => key + 1)
  }

  function reverseFromCurrentPosition() {
    tween.current?.reverse()
    setManuallyReversed(true)
  }

  return {
    scope,
    targetClassName,
    options,
    updateOption,
    manuallyReversed,
    reducedMotion,
    animationConfig,
    replay,
    reverseFromCurrentPosition,
  }
}
