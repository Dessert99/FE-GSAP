/** children 기반 raw 길이와 duration setter 뒤 timeScale·부모 endTime을 실제 getter로 비교한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'

/** duration setter 실험에 필요한 반복 횟수와 부모가 원하는 cycle 길이다. */
export type FitDescriptor = { repeat: number; requestedDuration: number }

/** setter 전후의 raw 길이·배속·부모 시간축 끝을 GSAP getter 그대로 보존한다. */
export type FitReadout = { duration: number; totalDuration: number; timeScale: number; startTime: number; endTime: number; childDurations: number[] }

// child 두 개가 만드는 Timeline 한 cycle의 고정 raw 길이다
const childDuration = 10

// repeat cycle 사이에만 들어갈 고정 대기 시간이다
const repeatDelay = 2

// Timeline을 부모 local time 1초에 넣어 startTime과 endTime을 분리한다
const parentPosition = 1

// getter 숫자를 소수 셋째 자리까지만 표시해 비교를 안정시킨다
function round(value: number) { return Math.round(value * 1000) / 1000 }

/** repeat·요청 길이를 실제 duration setter와 getter snapshot에 연결한다. */
export function useDurationFitRuntime() {
  // GSAP context가 이 예제 root와 함께 정리되도록 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // Timeline의 추가 repeat 횟수를 control에서 고른다
  const [repeat, setRepeat] = useState(1)
  // 부모 시간축에서 한 cycle이 차지하길 원하는 초를 고른다
  const [requestedDuration, setRequestedDuration] = useState(10)
  // 실제 getter snapshot을 화면 표와 code 결과에 전달한다
  const [readout, setReadout] = useState<FitReadout | null>(null)
  // controls와 GSAP 호출이 공유할 단일 descriptor다
  const descriptor = useMemo(() => ({ repeat, requestedDuration }), [repeat, requestedDuration])

  useGSAP(
    () => {
      // 외부 부모는 멈춰 두어 계산만 관찰하고 자동 재생하지 않는다
      const parent = gsap.timeline({ paused: true })
      // child Timeline은 repeat과 repeatDelay를 포함한 total 길이를 만든다
      const timeline = gsap.timeline({ repeat: descriptor.repeat, repeatDelay })
      // 첫 child가 raw duration의 앞 10초를 만든다
      timeline.to({ value: 0 }, { value: 1, duration: childDuration, ease: 'none' })
      // 둘째 child가 이어져 한 cycle raw duration을 20초로 만든다
      timeline.to({ value: 0 }, { value: 1, duration: childDuration, ease: 'none' })
      // 부모 1초 위치에 넣어 setter가 부모에게 배정하는 폭을 endTime으로 읽는다
      parent.add(timeline, parentPosition)
      // raw child 길이는 건드리지 않고 Timeline 자신의 timeScale만 다시 계산한다
      timeline.duration(descriptor.requestedDuration)
      // setter 뒤 모든 숫자를 GSAP instance에서 직접 읽는다
      setReadout({ duration: round(timeline.duration()), totalDuration: round(timeline.totalDuration()), timeScale: round(timeline.timeScale()), startTime: round(timeline.startTime()), endTime: round(timeline.endTime()), childDurations: timeline.getChildren(false, true, false).map((child) => round(child.duration())) })
      // descriptor 변경과 unmount 때 부모와 child를 한 번에 정리한다
      return () => parent.kill()
    },
    // repeat나 요청 길이가 바뀌면 fixture 전체를 되돌리고 같은 순서로 다시 만든다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // TSX가 controls·getter·code를 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return { scope, repeat, setRepeat, requestedDuration, setRequestedDuration, descriptor, readout, childDuration, repeatDelay, parentPosition }
}
