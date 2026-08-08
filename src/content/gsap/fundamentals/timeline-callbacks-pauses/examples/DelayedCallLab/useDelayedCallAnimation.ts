/** 하나의 delayedCall을 예약하고 두 가지 방법으로 취소하며 남은 시간과 실제 호출을 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 취소 버튼이 실제로 부르는 GSAP 호출을 구분한다. */
export type CancelRoute = 'kill' | 'killTweensOf'

/** 예약이 지금 어느 단계에 있는지 — 화면 문구와 코드 패널이 이 값에서 갈린다. */
export type ScheduleStatus = 'idle' | 'waiting' | 'fired' | 'cancelled'

/** controls·GSAP 호출·serializer가 공유하는 단일 실행 descriptor다. */
export type DelayedCallDescriptor = {
  delay: number
  params: string[] | null
}

/** 예약된 Tween에서 그대로 읽어 온 관찰값이다. */
export type DelayedCallObservation = {
  remaining: number
  receivedParams: string
  tweenDuration: string
  tweenDelay: string
  targetIsTheFunction: string
  stillScheduled: string
}

/** 아직 아무것도 예약하지 않았을 때 보여줄 관찰값이다. */
const emptyObservation: DelayedCallObservation = {
  remaining: 0,
  receivedParams: '아직 없음',
  tweenDuration: '-',
  tweenDelay: '-',
  targetIsTheFunction: '-',
  stillScheduled: '-',
}

/** 화면 숫자가 흔들리지 않도록 표시용으로만 자른다. */
function round(value: number) {
  return Math.round(value * 100) / 100
}

/** 예약·취소 예제의 controls, delayedCall Tween, 관찰값, 조작 action을 제공한다. */
export function useDelayedCallAnimation() {
  // 이 예제 밖의 요소를 건드리지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 취소 버튼이 같은 instance를 조작해야 의미가 있어서 예약된 Tween을 보관한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // 예약 순간의 함수 identity를 보존해 재렌더 뒤 killTweensOf도 같은 target을 찾게 한다
  const callbackRef = useRef<((...received: string[]) => void) | null>(null)
  // 남은 시간을 매 frame 다시 읽기 위해 등록한 ticker 함수 — 예약이 끝나면 반드시 뗀다
  const tickRef = useRef<(() => void) | null>(null)
  // 몇 초 뒤에 부를지 — 그대로 delayedCall의 첫 인자가 된다
  const [delay, setDelay] = useState(2)
  // 함수에 parameter를 함께 넘길지 — delayedCall의 세 번째 인자를 만든다
  const [withParams, setWithParams] = useState(true)
  // 예약이 대기 중인지 불렸는지 취소됐는지 — 안내 문구와 버튼 활성 상태를 정한다
  const [status, setStatus] = useState<ScheduleStatus>('idle')
  // 어떤 방법으로 취소했는지 — 두 취소 경로의 차이를 화면에 남긴다
  const [cancelRoute, setCancelRoute] = useState<CancelRoute | null>(null)
  // 예약된 Tween에서 읽어 온 값들 — 추측이 아니라 관찰이 되게 한다
  const [observation, setObservation] = useState<DelayedCallObservation>(emptyObservation)
  // 운영체제 모션 감소 설정에서는 흐르는 막대 대신 상태 문구만 보여준다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor: DelayedCallDescriptor = { delay, params: withParams ? ['하나', '둘'] : null }

  // 매 frame 도는 ticker를 떼어 예약이 끝난 뒤에도 화면이 계속 갱신되는 것을 막는다
  function stopTicking() {
    if (!tickRef.current) return

    // 예약이 끝난 뒤 전역 ticker에서 이 예제의 갱신 함수만 제거한다
    gsap.ticker.remove(tickRef.current)
    tickRef.current = null
  }

  // 예약이 끝난 Tween에서 마지막 상태를 읽어 관찰 패널을 고정한다
  function freeze(tween: gsap.core.Tween, receivedParams: string) {
    setObservation({
      remaining: 0,
      receivedParams,
      tweenDuration: String(tween.duration()),
      tweenDelay: String(tween.delay()),
      targetIsTheFunction: String(tween.targets()[0] === tween.vars.onComplete),
      // parent가 null이면 이 Tween은 더 이상 GSAP의 예약 목록에 없다
      stillScheduled: String(tween.parent !== null),
    })
  }

  useGSAP(
    () => {
      // context가 정리될 때 예약과 ticker를 함께 걷어내 남은 호출이 튀지 않게 한다
      return () => {
        stopTicking()
        // unmount 뒤 예약 callback이 실행되지 않도록 남은 Tween을 제거한다
        tweenRef.current?.kill()
        tweenRef.current = null
        callbackRef.current = null
      }
    },
    // Tween은 버튼을 누를 때만 만들고 이 콜백은 정리 계약만 소유한다
    { scope },
  )

  // 예약된 함수가 실제로 불리는 지점 — GSAP이 부를 때 받은 인자를 그대로 화면에 남긴다
  function handleFire(...received: string[]) {
    // 실행을 마친 바로 그 delayedCall Tween에서 최종 관찰값을 읽는다
    const tween = tweenRef.current
    if (!tween) return

    stopTicking()
    setStatus('fired')
    freeze(tween, received.length > 0 ? received.join(', ') : '없음 (params를 넘기지 않음)')
    callbackRef.current = null
  }

  // 버튼 한 번이 gsap.delayedCall 한 번 — 이 예제의 학습 대상이 그 호출 자체다
  function schedule() {
    stopTicking()
    // 이전 예약이 남아 있으면 먼저 걷어내 한 번에 하나만 대기하게 한다
    tweenRef.current?.kill()

    // 이 예약과 killTweensOf가 재렌더 뒤에도 공유할 callback identity다
    const scheduledCallback = handleFire
    callbackRef.current = scheduledCallback
    // 공식 인자 순서 그대로 — 지연 시간, 부를 함수, 함수에 넘길 parameter 배열
    const tween = descriptor.params
      ? gsap.delayedCall(descriptor.delay, scheduledCallback, descriptor.params)
      : gsap.delayedCall(descriptor.delay, scheduledCallback)
    tweenRef.current = tween
    setStatus('waiting')
    setCancelRoute(null)

    // 남은 시간은 예약 시각에서 전역 playhead를 뺀 값이라 GSAP에서 직접 읽어 온다
    const tick = () => setObservation((prev) => ({ ...prev, remaining: round(Math.max(0, tween.startTime() - gsap.globalTimeline.time())) }))
    tickRef.current = tick
    // GSAP 전역 시계와 함께 남은 시간을 다시 읽도록 ticker에 연결한다
    gsap.ticker.add(tick)

    setObservation({
      remaining: descriptor.delay,
      receivedParams: '아직 없음',
      tweenDuration: String(tween.duration()),
      tweenDelay: String(tween.delay()),
      targetIsTheFunction: String(tween.targets()[0] === scheduledCallback),
      stillScheduled: String(tween.parent !== null),
    })
  }

  // 공식이 밝힌 두 취소 경로를 같은 예약에 대해 나란히 실행해 본다
  function cancel(route: CancelRoute) {
    // 취소 뒤 구조를 관찰할 예약 Tween을 읽는다
    const tween = tweenRef.current
    if (!tween || status !== 'waiting') return

    stopTicking()
    // 참조를 들고 있으면 kill(), 들고 있지 않으면 함수 자체를 target으로 지목한다
    if (route === 'kill') tween.kill()
    else if (callbackRef.current) gsap.killTweensOf(callbackRef.current)

    setStatus('cancelled')
    setCancelRoute(route)
    freeze(tween, '불리지 않음')
    callbackRef.current = null
  }

  // 다시 처음부터 관찰할 수 있도록 예약과 관찰값을 함께 비운다
  function reset() {
    stopTicking()
    // 초기화 뒤 이전 예약이 늦게 실행되지 않도록 Tween을 제거한다
    tweenRef.current?.kill()
    tweenRef.current = null
    callbackRef.current = null
    setStatus('idle')
    setCancelRoute(null)
    setObservation(emptyObservation)
  }

  // TSX가 controls·관찰 패널·코드 패널을 같은 runtime 값에서 그리도록 필요한 값만 전달한다
  return { scope, delay, setDelay, withParams, setWithParams, status, cancelRoute, observation, descriptor, reducedMotion, schedule, cancel, reset }
}
