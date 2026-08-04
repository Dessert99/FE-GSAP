/** 재생 옵션 예제의 값 배치와 Tween 방향 제어를 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 역방향 ease 선택값을 제한한다. */
export type ReverseEase = 'false' | 'true' | 'power3.out' | 'back.out(1.7)'

// 시작값 배치와 playhead 방향을 서로 독립된 UI 상태로 보존한다.
type PlaybackOptionsState = {
  delay: number
  startAt: boolean
  runBackwards: boolean
  reversed: boolean
  easeReverse: ReverseEase
}

// 실제 gsap.to()에 전달할 정규화된 재생 옵션의 형태를 고정한다.
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

// 첫 화면에서 시작값과 역방향 ease를 바로 관찰할 기본 조합을 정한다.
const initialOptions: PlaybackOptionsState = {
  delay: 0.3,
  startAt: true,
  runBackwards: false,
  reversed: false,
  easeReverse: 'true',
}

// select 문자열을 GSAP이 받는 boolean 또는 ease 이름으로 변환한다.
function resolveEaseReverse(value: ReverseEase) {
  if (value === 'false') return false
  if (value === 'true') return true
  return value
}

// 모션 설정을 반영한 실제 gsap.to() vars를 UI 선택값에서 만든다.
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
  // 이 예제의 GSAP 선택자와 정리 범위를 감싸는 DOM을 가리킨다.
  const scope = useRef<HTMLDivElement>(null)
  // 생성된 Tween을 현재 위치에서 reverse()할 수 있도록 보관한다.
  const tween = useRef<gsap.core.Tween | null>(null)
  // 실행 코드와 미리보기가 같은 대상을 가리키도록 선택자를 공유한다.
  const targetClassName = 'playback-options-example__target'
  // 시작값 배치와 초기 playhead 방향을 한 상태로 조절한다.
  const [options, setOptions] = useState<PlaybackOptionsState>(initialOptions)
  // 생성 옵션의 reversed와 사용자가 누른 reverse()를 상태 안내에서 구분한다.
  const [manuallyReversed, setManuallyReversed] = useState(false)
  // 현재 설정의 Tween을 처음부터 다시 만들 재생 횟수를 센다.
  const [runKey, setRunKey] = useState(0)
  // 사용자 환경에서 지연과 지속 시간을 제거해야 하는지 확인한다.
  const reducedMotion = useReducedMotion()
  // 실제 Tween과 표시 코드가 함께 사용할 정규화 설정을 만든다.
  const animationConfig = createPlaybackConfig(options, reducedMotion)

  useGSAP(
    () => {
      // 이전 Tween이 남긴 transform과 opacity를 지워 같은 DOM 현재값에서 비교한다.
      gsap.set(`.${targetClassName}`, { x: 0, opacity: 1 })
      // 시작값 배치와 playhead 방향 옵션을 하나의 Tween에 적용한다.
      tween.current = gsap.to(`.${targetClassName}`, animationConfig)
      // reversed는 0초에서 더 뒤로 갈 수 없으므로 끝점에 둔 뒤 역방향으로 출발시킨다.
      if (animationConfig.reversed) tween.current.progress(1).resume()
    },
    // 옵션·모션 설정·재생 횟수가 바뀌면 이전 Tween을 되돌리고 다시 만든다.
    {
      scope,
      dependencies: [options, reducedMotion, runKey],
      revertOnUpdate: true,
    },
  )

  // 한 옵션만 바꾸고 수동 reverse() 표시를 새 Tween 상태로 초기화한다.
  function updateOption<Key extends keyof PlaybackOptionsState>(key: Key, value: PlaybackOptionsState[Key]) {
    setOptions((current) => ({ ...current, [key]: value }))
    setManuallyReversed(false)
  }

  // 같은 옵션으로 Tween을 다시 만들고 수동 방향 표시를 초기화한다.
  function replay() {
    setManuallyReversed(false)
    setRunKey((key) => key + 1)
  }

  // 저장한 Tween의 현재 playhead부터 시간축 방향만 뒤집는다.
  function reverseFromCurrentPosition() {
    tween.current?.reverse()
    setManuallyReversed(true)
  }

  // UI가 실행 설정과 같은 상태·제어 함수를 사용하도록 필요한 값만 전달한다.
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
