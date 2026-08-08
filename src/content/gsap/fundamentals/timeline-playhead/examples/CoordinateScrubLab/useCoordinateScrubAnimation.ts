/** 네 direct setter가 같은 입력을 local·total 좌표로 다르게 해석한 단일 snapshot을 만든다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

/** 사용자가 고르는 네 좌표 setter 이름이다. */
export type CoordinateMethod = 'progress' | 'time' | 'totalProgress' | 'totalTime'

// 실행과 code serializer가 함께 소비하는 반복 Timeline 설정이다
const coordinateDescriptor = { duration: 2, repeat: 1, repeatDelay: 0.5, distance: 140 } as const

// UI가 한 render에서 읽을 네 getter와 실제 target 값이다
type CoordinateSnapshot = { progress: number; time: number; totalProgress: number; totalTime: number; x: number }

/** direct setter controls와 Timeline getter snapshot을 예제에 제공한다. */
export function useCoordinateScrubAnimation() {
  // GSAP selector와 cleanup 범위를 예제 DOM 안으로 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 실제 Timeline과 JSX가 같은 target 문자열을 공유한다
  const targetClassName = 'coordinate-scrub-lab__card'
  // slider 값을 어떤 좌표로 해석할지 선택한다
  const [method, setMethod] = useState<CoordinateMethod>('progress')
  // 모든 좌표를 비교하기 위한 0~1 입력이다
  const [value, setValue] = useState(0.35)
  // Timeline getter와 GSAP target cache에서 한 번에 읽은 관찰값이다
  const [snapshot, setSnapshot] = useState<CoordinateSnapshot>({ progress: 0, time: 0, totalProgress: 0, totalTime: 0, x: 0 })
  // 실행과 표시 코드가 같은 상수를 사용한다
  const descriptor = coordinateDescriptor

  useGSAP(
    () => {
      // 이전 scrub이 남긴 transform을 지워 매 선택을 같은 출발값에서 계산한다
      gsap.set(`.${targetClassName}`, { x: 0 })
      // 현재 cycle과 전체 repeat 좌표를 함께 관찰할 paused Timeline을 만든다
      const timeline = gsap.timeline({ paused: true, repeat: descriptor.repeat, repeatDelay: descriptor.repeatDelay })
      // 한 대상의 x 변화만 넣어 playhead 좌표 차이에 집중한다
      timeline.to(`.${targetClassName}`, { x: descriptor.distance, duration: descriptor.duration, ease: 'none' })
      // progress 입력은 current cycle의 0~1로 즉시 이동한다
      if (method === 'progress') timeline.progress(value)
      // time 입력은 current cycle duration에 맞춘 초로 즉시 이동한다
      if (method === 'time') timeline.time(value * timeline.duration())
      // totalProgress 입력은 repeatDelay까지 포함한 전체 0~1로 즉시 이동한다
      if (method === 'totalProgress') timeline.totalProgress(value)
      // totalTime 입력은 totalDuration에 맞춘 전체 초로 즉시 이동한다
      if (method === 'totalTime') timeline.totalTime(value * timeline.totalDuration())
      // 이동 뒤 동일 Timeline의 getter와 실제 x를 한 snapshot으로 읽는다
      setSnapshot({ progress: timeline.progress(), time: timeline.time(), totalProgress: timeline.totalProgress(), totalTime: timeline.totalTime(), x: Number(gsap.getProperty(`.${targetClassName}`, 'x')) })
    },
    // method나 slider가 바뀌면 이전 Timeline을 되돌리고 같은 descriptor로 다시 계산한다
    { scope, dependencies: [method, value], revertOnUpdate: true },
  )

  // 화면은 실행에 사용한 descriptor·입력·snapshot만 받는다
  return { scope, targetClassName, descriptor, method, setMethod, value, setValue, snapshot }
}
