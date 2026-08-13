/** 세 child Timeline 하나를 여덟 playback API로 조작하고 실제 상태 snapshot을 제공한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** controls·Timeline 구성·표시 코드가 공유하는 sequence 설정이다. */
export type SequencePlaybackDescriptor = {
  selectors: readonly [string, string, string]
  labels: { intro: string; middle: string; finish: string }
  childDuration: number
  distance: number
}

/** 버튼 하나가 Timeline에 전달할 메서드와 실제 인자를 함께 보관한다. */
export type PlaybackCommand =
  | { method: 'pause' | 'play' | 'reverse'; position?: number | string; suppressEvents?: boolean }
  | { method: 'resume' | 'restart' }
  | { method: 'reversed'; value: boolean }

/** 화면 전체가 같은 순간을 보게 하는 Timeline·child 단일 관찰값이다. */
export type PlaybackSnapshot = {
  time: number
  progress: number
  paused: boolean
  reversed: boolean
  active: boolean
  activeChild: '대기' | 'A' | 'B' | 'C' | '완료'
  childX: readonly [number, number, number]
}

// GSAP selector와 JSX className이 어긋나지 않도록 한 tuple에서 공유한다
const selectors = ['.sequence-playback-lab__box--a', '.sequence-playback-lab__box--b', '.sequence-playback-lab__box--c'] as const
// label 버튼과 Timeline.addLabel이 같은 문자열을 쓰게 한다
const labels = { intro: 'intro', middle: 'middle', finish: 'finish' }
// 한 child의 구간을 1초로 만들어 전체 3초를 읽기 쉽게 한다
const childDuration = 1
// 세 child가 같은 변화를 순서대로 수행하도록 이동 거리를 고정한다
const distance = 150
// controls·실행·serializer가 함께 읽는 단일 descriptor다
const sequenceDescriptor: SequencePlaybackDescriptor = { selectors, labels, childDuration, distance }

/** 연속 값이 학습 패널을 흔들지 않도록 표시 정밀도만 줄인다. */
function round(value: number) {
  return Math.round(value * 100) / 100
}

/** 현재 부모 time이 어느 child 구간을 읽는지 계산한다. */
function getActiveChild(time: number, duration: number): PlaybackSnapshot['activeChild'] {
  if (time <= 0) return '대기'
  if (time >= duration) return '완료'
  if (time < childDuration) return 'A'
  if (time < childDuration * 2) return 'B'
  return 'C'
}

/** playback lab의 단일 Timeline·snapshot·command action을 제공한다. */
export function useSequencePlaybackAnimation() {
  // selector 탐색과 context 정리를 이 lab DOM 안으로 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 모든 버튼이 같은 Timeline instance를 계속 조작하도록 보관한다
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  // 마지막 실행 명령을 코드 패널과 이산 live status가 함께 읽는다
  const [lastCommand, setLastCommand] = useState<PlaybackCommand | null>(null)
  // 부모 getter와 실제 child target 값이 같은 render를 쓰도록 한 객체에 담는다
  const [snapshot, setSnapshot] = useState<PlaybackSnapshot>({ time: 0, progress: 0, paused: true, reversed: false, active: false, activeChild: '대기', childX: [0, 0, 0] })
  // 모션 감소 환경에서는 transform을 숨기고 같은 수치를 텍스트로 제공한다
  const reducedMotion = useReducedMotion()
  // hook과 TSX가 같은 설정 객체를 사용하게 외부 descriptor를 그대로 노출한다
  const descriptor = sequenceDescriptor

  // Timeline과 target에 실제로 기록된 현재 값을 단일 snapshot으로 읽는다
  function report() {
    // context가 준비되기 전 버튼 입력은 무시한다
    const timeline = timelineRef.current
    if (!timeline) return

    // 세 child transform을 GSAP cache에서 직접 읽어 화면 수치와 실행을 맞춘다
    const childX = descriptor.selectors.map((selector) => {
      // 같은 class가 다른 페이지에 있어도 이 lab scope 안의 실제 target만 읽는다
      const target = scope.current?.querySelector<HTMLElement>(selector)
      return target ? Math.round(Number(gsap.getProperty(target, 'x'))) : 0
    }) as [number, number, number]
    // 같은 프레임의 부모 getter와 child 값을 한 번에 교체한다
    setSnapshot({ time: round(timeline.time()), progress: round(timeline.progress()), paused: timeline.paused(), reversed: timeline.reversed(), active: timeline.isActive(), activeChild: getActiveChild(timeline.time(), timeline.duration()), childX })
  }

  useGSAP(
    () => {
      // 이전 context가 남긴 세 transform을 모두 같은 출발점으로 되돌린다
      gsap.set(descriptor.selectors, { x: 0 })
      // 자동 재생 없이 버튼으로만 부모 playhead를 움직이는 Timeline을 만든다
      const timeline = gsap.timeline({ paused: true, defaults: { duration: descriptor.childDuration, ease: 'none' }, onUpdate: report, onComplete: report, onReverseComplete: report })
      // 첫 child의 시작 위치를 intro label로 이름 붙인다
      timeline.addLabel(descriptor.labels.intro, 0)
      // 첫 구간에서 A만 같은 거리만큼 움직인다
      timeline.to(descriptor.selectors[0], { x: descriptor.distance })
      // 두 번째 child 시작 위치를 middle label로 이름 붙인다
      timeline.addLabel(descriptor.labels.middle)
      // 두 번째 구간에서 B가 이어서 움직인다
      timeline.to(descriptor.selectors[1], { x: descriptor.distance })
      // 세 번째 child 시작 위치를 finish label로 이름 붙인다
      timeline.addLabel(descriptor.labels.finish)
      // 마지막 구간에서 C가 sequence를 마친다
      timeline.to(descriptor.selectors[2], { x: descriptor.distance })
      // command handler와 report가 완성된 같은 Timeline을 보게 참조를 연결한다
      timelineRef.current = timeline
      // 생성 직후 paused 상태와 세 child 값을 화면에 반영한다
      report()
      // unmount 뒤 handler가 정리된 Timeline을 가리키지 않게 참조를 비운다
      return () => { timelineRef.current = null }
    },
    // Timeline은 한 번만 만들고 이후에는 command로 상태를 바꾼다
    { scope },
  )

  // command descriptor 하나를 실제 Timeline 호출로 실행한다
  function run(command: PlaybackCommand) {
    // context가 준비되기 전 입력은 화면과 상태를 바꾸지 않는다
    const timeline = timelineRef.current
    if (!timeline) return

    // 위치 인자가 있는 pause는 숫자와 label을 같은 overload로 전달한다
    if (command.method === 'pause') timeline.pause(command.position, command.suppressEvents)
    // play는 방향을 앞으로 돌리면서 선택한 위치 또는 현재 위치에서 재생한다
    if (command.method === 'play') timeline.play(command.position, command.suppressEvents)
    // resume은 현재 방향을 보존한 채 멈춤만 푼다
    if (command.method === 'resume') timeline.resume()
    // restart는 전체 sequence를 처음부터 정방향으로 다시 재생한다
    if (command.method === 'restart') timeline.restart()
    // reverse는 선택한 위치 또는 현재 위치부터 전체 sequence를 되감는다
    if (command.method === 'reverse') timeline.reverse(command.position, command.suppressEvents)
    // reversed setter는 방향 스위치만 직접 바꿔 getter/setter 차이를 드러낸다
    if (command.method === 'reversed') timeline.reversed(command.value)

    // 표시 코드는 실제로 실행한 동일 descriptor를 직렬화한다
    setLastCommand(command)
    // 명령 직후의 동기 상태를 animation frame 전에 먼저 반영한다
    report()
  }

  // TSX가 controls·preview·code·설명을 같은 runtime state에서 그리게 한다
  return { scope, descriptor, snapshot, lastCommand, reducedMotion, run }
}
