/** 같은 이름의 메서드를 인자 없이도 부르고 인자를 넣고도 불러 돌려받는 것이 어떻게 달라지는지 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 버튼 하나하나가 실제로 부르는 Tween 호출을 구분한다. */
export type StateReadoutCommand =
  | 'readPaused'
  | 'readReversed'
  | 'readActive'
  | 'setPausedTrue'
  | 'setPausedFalse'
  | 'toggleReversed'
  | 'recenter'

/** 방금 부른 호출이 무엇을 돌려줬는지를 타입과 내용으로 나눠 보여준다. */
export type CallResult = {
  kind: 'boolean' | 'tween' | 'none'
  text: string
}

/** 명령 직후와 매 프레임마다 Tween에서 그대로 읽어 오는 재생 상태다. */
export type StateObservation = {
  paused: boolean
  reversed: boolean
  active: boolean
  time: number
}

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type StateReadoutDescriptor = {
  duration: number
  startAt: number
}

/** 앞뒤 양쪽으로 움직일 여유가 있어야 해서 고정한 재생 시간이다. */
const tweenDuration = 3

/** Tween이 실제로 움직이는 값의 범위 — 그대로 백분율 위치로 쓰인다. */
const trackEnd = 100

/** 어느 방향으로 풀어도 움직임이 보이도록 playhead를 가운데에 놓는 시각이다. */
const startAt = 1.5

/** 표가 흔들리지 않도록 표시용으로만 자른다. */
function round(value: number) {
  return Math.round(value * 100) / 100
}

/** 화면에 보여줄 재생 상태를 Tween에서 직접 읽어 온다 — 추측이 아니라 관찰이 되게 한다. */
function snapshot(tween: gsap.core.Tween): StateObservation {
  return {
    paused: tween.paused(),
    reversed: tween.reversed(),
    active: tween.isActive(),
    time: round(tween.time()),
  }
}

/** 버튼이 고른 호출을 실제로 실행하고 그 호출이 돌려준 값을 그대로 넘긴다. */
function invoke(tween: gsap.core.Tween, command: StateReadoutCommand): unknown {
  // 괄호를 비운 세 호출 — 지금 값을 물어보기만 한다
  if (command === 'readPaused') return tween.paused()
  if (command === 'readReversed') return tween.reversed()
  if (command === 'readActive') return tween.isActive()
  // 괄호에 값을 넣은 세 호출 — 상태를 바꾸고 Tween 자신을 돌려준다
  if (command === 'setPausedTrue') return tween.paused(true)
  if (command === 'setPausedFalse') return tween.paused(false)
  if (command === 'toggleReversed') return tween.reversed(!tween.reversed())

  // 실험을 반복할 수 있도록 playhead를 가운데로 되돌린다
  return tween.pause(startAt)
}

/** 읽기·쓰기 구분 예제의 paused Tween, 반환값 관찰, 상태 관찰, 명령 action을 제공한다. */
export function useStateReadoutAnimation() {
  // 이 예제 밖의 요소를 건드리지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 버튼들이 계속 같은 instance를 조작해야 반환값 비교가 성립해서 Tween을 보관한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // GSAP이 제자리에서 바꿀 값 — DOM이 아니라 평범한 객체라 모션 감소 설정에서도 같은 Tween을 그대로 쓴다
  const trackRef = useRef({ value: 0 })
  // Tween이 방금 쓴 값 — 표시자의 가로 위치이자 진행 상황의 숫자다
  const [position, setPosition] = useState(0)
  // 방금 부른 호출이 돌려준 것 — 이 예제가 답하려는 질문의 정답 자리다
  const [result, setResult] = useState<CallResult>({ kind: 'none', text: '아직 아무것도 부르지 않았습니다' })
  // 두 스위치와 isActive()를 매 프레임 읽어 둔 관찰값이다
  const [observation, setObservation] = useState<StateObservation>({
    paused: true,
    reversed: false,
    active: false,
    time: startAt,
  })
  // 마지막으로 누른 버튼이 부른 호출 — TSX가 이것으로 코드와 안내 문장을 만든다
  const [lastCommand, setLastCommand] = useState<StateReadoutCommand | null>(null)
  // 운영체제 모션 감소 설정에서는 움직이는 표시자 대신 숫자만 보여준다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor: StateReadoutDescriptor = { duration: tweenDuration, startAt }

  // GSAP이 방금 쓴 값과 재생 상태를 함께 읽어 화면 표시값을 갱신한다
  function report() {
    const tween = tweenRef.current
    // runtime 준비 전 호출은 화면을 바꾸지 않는다
    if (!tween) return

    setPosition(trackRef.current.value)
    setObservation(snapshot(tween))
  }

  useGSAP(
    () => {
      // 이전 실행이 남긴 값을 지워 항상 같은 지점에서 출발시킨다
      trackRef.current.value = 0
      // 자동 재생 없이 버튼으로만 움직이는 Tween 하나 — ease를 none으로 둬 양쪽 방향의 속도가 같아 보이게 한다
      const tween = gsap.to(trackRef.current, {
        value: trackEnd,
        duration: descriptor.duration,
        ease: 'none',
        paused: true,
        onUpdate: report,
        onComplete: report,
        onReverseComplete: report,
      })
      // 어느 방향으로 풀어도 움직임이 보이도록 playhead를 가운데에 놓고 멈춰 둔다
      tween.pause(descriptor.startAt)
      // 버튼 handler가 같은 Tween을 계속 조작하도록 보관한다
      tweenRef.current = tween
      // 아직 아무 명령도 부르지 않은 시작 상태를 화면에 반영한다
      report()
      // context 정리 뒤 handler가 없어진 Tween을 조작하지 않게 참조를 비운다
      return () => {
        tweenRef.current = null
      }
    },
    // Tween은 한 번만 만들고 이후에는 버튼 명령으로만 상태를 바꾼다
    { scope },
  )

  // 호출을 실행하고, 돌려받은 것이 Tween 자신인지 Boolean인지를 실제 비교로 판정한다
  function run(command: StateReadoutCommand) {
    const tween = tweenRef.current
    if (!tween) return

    const returned = invoke(tween, command)

    // 같은 객체인지 === 로 직접 확인해야 "self를 돌려준다"는 공식 문장이 관찰이 된다
    setResult(
      returned === tween
        ? { kind: 'tween', text: 'Tween 자신 (=== 로 비교해도 같은 객체)' }
        : { kind: 'boolean', text: String(returned) },
    )
    setLastCommand(command)
    report()
  }

  // TSX가 버튼·반환값 패널·코드 패널을 같은 runtime 값에서 그리도록 필요한 값만 전달한다
  return { scope, position, result, observation, lastCommand, descriptor, reducedMotion, run }
}
