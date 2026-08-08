/** 두 child Timeline의 repeat·gap·yoyo 시간표를 manual playhead로 읽게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** controls·GSAP 호출·표시 코드가 함께 쓰는 sequence 설정이다. */
export type SequenceDescriptor = { firstSelector: string; secondSelector: string; distance: number; childDuration: number; repeat: number; repeatDelay: number; yoyo: boolean; totalProgress: number }

/** 실제 Timeline getter와 target에서 읽은 현재 snapshot이다. */
export type SequenceObservation = { iteration: number; time: number; totalTime: number; duration: number; totalDuration: number; firstX: number; secondX: number; reversed: boolean }

// 첫 child의 실행 선택자와 JSX className을 같은 문자열로 쓴다
const firstSelector = '.sequence-cycle-lab__box--a'
// 두 번째 child의 실행 선택자와 JSX className을 같은 문자열로 쓴다
const secondSelector = '.sequence-cycle-lab__box--b'
// 두 child가 같은 거리만큼 움직여 순서만 비교하게 한다
const distance = 170
// 한 child의 길이를 1초로 고정해 sequence 한 회차를 2초로 만든다
const childDuration = 1

/** control 값을 실행 가능한 descriptor 하나로 고정한다. */
function createDescriptor(repeat: number, repeatDelay: number, yoyo: boolean, totalProgress: number): SequenceDescriptor {
  return { firstSelector, secondSelector, distance, childDuration, repeat, repeatDelay, yoyo, totalProgress }
}

/** 화면 숫자가 불필요하게 길어지지 않도록 표시 정밀도만 줄인다. */
function round(value: number) { return Math.round(value * 100) / 100 }

/** sequence cycle lab의 controls와 실제 Timeline snapshot을 제공한다. */
export function useSequenceCycleRuntime() {
  // 두 target 선택을 이 lab DOM 안으로 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 최초 회차 뒤 추가할 sequence 횟수를 정한다
  const [repeat, setRepeat] = useState(2)
  // 회차 사이에만 들어갈 초 단위 틈을 정한다
  const [repeatDelay, setRepeatDelay] = useState(0.5)
  // 짝수 회차의 sequence 방향을 뒤집을지 정한다
  const [yoyo, setYoyo] = useState(true)
  // 자동 재생 없이 반복 전체 시간 위의 위치를 직접 정한다
  const [totalProgress, setTotalProgress] = useState(0)
  // Timeline getter와 두 target에서 읽은 현재 값을 보관한다
  const [observation, setObservation] = useState<SequenceObservation>({ iteration: 1, time: 0, totalTime: 0, duration: 2, totalDuration: 7, firstX: 0, secondX: 0, reversed: false })
  // 모션 감소 여부를 표시하고 장식 transition을 끈다
  const reducedMotion = useReducedMotion()
  // controls·실행·표시 코드가 같은 설정을 보도록 memoized descriptor를 만든다
  const descriptor = useMemo(() => createDescriptor(repeat, repeatDelay, yoyo, totalProgress), [repeat, repeatDelay, yoyo, totalProgress])

  useGSAP(
    () => {
      // 이전 Timeline이 남긴 A transform을 출발점으로 되돌린다
      gsap.set(descriptor.firstSelector, { x: 0 })
      // 이전 Timeline이 남긴 B transform도 같은 출발점으로 되돌린다
      gsap.set(descriptor.secondSelector, { x: 0 })
      // repeat 설정을 sequence 부모에 두고 manual playhead를 위해 paused로 만든다
      const timeline = gsap.timeline({ paused: true, repeat: descriptor.repeat, repeatDelay: descriptor.repeatDelay, yoyo: descriptor.yoyo, defaults: { duration: descriptor.childDuration, ease: 'none' } })
      // 첫 회차의 앞 절반에서 A를 이동시킨다
      timeline.to(descriptor.firstSelector, { x: descriptor.distance })
      // 첫 회차의 뒤 절반에서 B를 이동시킨다
      timeline.to(descriptor.secondSelector, { x: descriptor.distance })
      // repeat를 포함한 전체 시간 위에서 사용자가 고른 위치로 playhead를 옮긴다
      timeline.totalProgress(descriptor.totalProgress, true)
      // 다시 계산하지 않고 Timeline getter와 실제 target property를 snapshot으로 읽는다
      setObservation({ iteration: timeline.iteration(), time: round(timeline.time()), totalTime: round(timeline.totalTime()), duration: timeline.duration(), totalDuration: timeline.totalDuration(), firstX: Math.round(Number(gsap.getProperty(descriptor.firstSelector, 'x'))), secondX: Math.round(Number(gsap.getProperty(descriptor.secondSelector, 'x'))), reversed: timeline.reversed() })
    },
    // 설정이나 manual playhead가 바뀌면 이전 context를 되돌리고 같은 descriptor로 다시 만든다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // TSX가 controls·time strip·getter·코드를 같은 descriptor와 snapshot으로 그리게 한다
  return { scope, repeat, setRepeat, repeatDelay, setRepeatDelay, yoyo, setYoyo, totalProgress, setTotalProgress, descriptor, observation, reducedMotion }
}
