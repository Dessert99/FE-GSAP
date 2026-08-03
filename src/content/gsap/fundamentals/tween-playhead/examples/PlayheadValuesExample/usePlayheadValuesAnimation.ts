/** 반복 Tween의 local·total·eased playhead 값을 한 snapshot으로 관찰한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

// 같은 순간에 UI가 표시할 Tween의 다섯 playhead 값이다.
type PlayheadSnapshot = {
  progress: number
  ratio: number
  time: number
  totalProgress: number
  totalTime: number
}

// 실행 코드와 Tween이 함께 소비하는 고정 구성이다.
const playheadDescriptor = { duration: 2, repeat: 1, ease: 'power2.out', x: 130 } as const

/** 수동 totalProgress와 그 순간의 Tween 관찰값을 예제 UI에 제공한다. */
export function usePlayheadValuesAnimation() {
  // useGSAP이 target 탐색과 cleanup을 제한할 예제 DOM 범위다.
  const scope = useRef<HTMLDivElement>(null)
  // 실제 Tween과 code serializer가 공유하는 target class다.
  const targetClassName = 'playhead-values-example__target'
  // 전체 반복 구간에서 사용자가 직접 선택한 위치다.
  const [selectedTotalProgress, setSelectedTotalProgress] = useState(0)
  // 같은 playhead 순간에 Tween instance에서 읽은 값 묶음이다.
  const [snapshot, setSnapshot] = useState<PlayheadSnapshot>({ progress: 0, ratio: 0, time: 0, totalProgress: 0, totalTime: 0 })
  useGSAP(
    () => {
      // 매 scrub을 같은 시작 style에서 계산하도록 transform을 초기화한다.
      gsap.set(`.${targetClassName}`, { x: 0 })
      // 자동 재생하지 않는 반복 Tween을 만들어 local·total 값을 함께 관찰한다.
      const tween = gsap.to(`.${targetClassName}`, { ...playheadDescriptor, paused: true })
      // 사용자가 고른 전체 위치로 즉시 이동해 motion 없이 결과를 갱신한다.
      tween.totalProgress(selectedTotalProgress)
      // 이동 직후 instance가 가진 raw·eased·local·total 값을 하나의 snapshot으로 읽는다.
      setSnapshot({ progress: tween.progress(), ratio: tween.ratio, time: tween.time(), totalProgress: tween.totalProgress(), totalTime: tween.totalTime() })
    },
    // slider가 바뀔 때 이전 Tween을 되돌리고 같은 descriptor로 새 위치를 계산한다.
    { scope, dependencies: [selectedTotalProgress], revertOnUpdate: true },
  )

  // 화면은 동일 descriptor와 현재 playhead snapshot만 소비한다.
  return { scope, targetClassName, descriptor: playheadDescriptor, selectedTotalProgress, setSelectedTotalProgress, snapshot, reset: () => setSelectedTotalProgress(0) }
}
