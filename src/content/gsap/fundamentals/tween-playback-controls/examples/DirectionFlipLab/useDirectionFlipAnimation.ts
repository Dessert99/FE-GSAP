/** 하나의 paused Tween에 reverse()를 인자별로 불러 되감기 시작 지점과 방향 스위치를 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 버튼 하나하나가 실제로 부르는 Tween 호출을 구분한다. */
export type DirectionFlipCommand = 'placeAt' | 'reverse' | 'reverseFromEnd' | 'reverseNegative' | 'play'

/** 명령 직후와 매 프레임마다 Tween에서 그대로 읽어 오는 재생 상태다. */
export type DirectionObservation = {
  paused: boolean
  reversed: boolean
  active: boolean
  time: number
  progress: number
}

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type DirectionFlipDescriptor = {
  duration: number
  placeAt: number
  negativeFrom: number
}

/** 되감기 시작 지점의 차이가 눈에 보이려면 충분히 길어야 해서 고정한 재생 시간이다. */
const tweenDuration = 3

/** Tween이 실제로 움직이는 값의 범위 — 그대로 백분율 위치로 쓰인다. */
const trackEnd = 100

/** 공식 문서가 "끝에서 1초 전"이라고 설명한 음수 인자를 그대로 시험하는 값이다. */
const negativeFrom = -1

/** 표가 흔들리지 않도록 표시용으로만 자른다. */
function round(value: number) {
  return Math.round(value * 100) / 100
}

/** 화면에 보여줄 재생 상태를 Tween에서 직접 읽어 온다 — 추측이 아니라 관찰이 되게 한다. */
function snapshot(tween: gsap.core.Tween): DirectionObservation {
  return {
    paused: tween.paused(),
    reversed: tween.reversed(),
    active: tween.isActive(),
    time: round(tween.time()),
    progress: round(tween.progress()),
  }
}

/** 방향 뒤집기 예제의 controls, paused Tween, 관찰값, 명령 action을 제공한다. */
export function useDirectionFlipAnimation() {
  // 이 예제 밖의 요소를 건드리지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 버튼들이 계속 같은 instance를 조작해야 의미가 있어서 Tween을 보관한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // GSAP이 제자리에서 바꿀 값 — DOM이 아니라 평범한 객체라 모션 감소 설정에서도 같은 Tween을 그대로 쓴다
  const trackRef = useRef({ value: 0 })
  // 되감기 전에 playhead를 놓아 둘 시각 — 시작 지점이 결과를 어떻게 바꾸는지 비교하게 한다
  const [placeAt, setPlaceAt] = useState(1.5)
  // Tween이 방금 쓴 값 — 표시자의 가로 위치이자 진행 상황의 숫자다
  const [position, setPosition] = useState(0)
  // 두 스위치와 isActive()를 매 프레임 읽어 둔 관찰값이다
  const [observation, setObservation] = useState<DirectionObservation>({
    paused: true,
    reversed: false,
    active: false,
    time: 0,
    progress: 0,
  })
  // 마지막으로 누른 버튼이 부른 호출 — TSX가 이것으로 코드와 안내 문장을 만든다
  const [lastCommand, setLastCommand] = useState<DirectionFlipCommand | null>(null)
  // 운영체제 모션 감소 설정에서는 움직이는 표시자 대신 숫자만 보여준다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor: DirectionFlipDescriptor = { duration: tweenDuration, placeAt, negativeFrom }

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
      // 자동 재생 없이 버튼으로만 움직이는 Tween 하나 — ease를 none으로 둬 되감기 속도가 앞으로 갈 때와 같아 보이게 한다
      const tween = gsap.to(trackRef.current, {
        value: trackEnd,
        duration: descriptor.duration,
        ease: 'none',
        paused: true,
        onUpdate: report,
        onComplete: report,
        onReverseComplete: report,
      })
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

  // 버튼 하나가 Tween 메서드 하나를 그대로 부른다 — 이 예제의 학습 대상이 그 호출 자체다
  function run(command: DirectionFlipCommand) {
    const tween = tweenRef.current
    if (!tween) return

    // 되감기 실험 전에 playhead를 원하는 자리에 놓아 두는 준비 동작이다
    if (command === 'placeAt') tween.pause(descriptor.placeAt)
    // 인자 없는 되감기는 지금 자리에서 시작한다
    if (command === 'reverse') tween.reverse()
    // 공식 문서가 "맨 끝에서 시작"이라고 밝힌 인자다
    if (command === 'reverseFromEnd') tween.reverse(0)
    // 공식 문서가 "끝에서 1초 전"이라고 설명한 음수 인자를 그대로 시험한다
    if (command === 'reverseNegative') tween.reverse(descriptor.negativeFrom)
    // 방향을 다시 앞으로 되돌리는 유일한 명령이다
    if (command === 'play') tween.play()

    setLastCommand(command)
    report()
  }

  // TSX가 controls·관찰 패널·코드 패널을 같은 runtime 값에서 그리도록 필요한 값만 전달한다
  return { scope, placeAt, setPlaceAt, position, observation, lastCommand, descriptor, reducedMotion, run }
}
