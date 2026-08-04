/** ticker에 listener를 직접 붙였다 떼면서 매 tick 넘어오는 세 값을 관찰하게 한다. */
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 계속 받을지 한 tick만 받을지 고르는 값 — 공식 add()의 once 인자와 그대로 대응한다. */
export type ListenMode = 'continuous' | 'once'

/** listener가 실제로 받은 인자와 직접 센 tick 수를 화면에 숫자로 드러낸다. */
export type TickerObservation = {
  time: number
  deltaTime: number
  frame: number
  deltaRatio60: number
  tickCount: number
}

/** 아직 한 번도 받지 않았음을 0으로 표시하는 초기 관찰값이다. */
const emptyObservation: TickerObservation = { time: 0, deltaTime: 0, frame: 0, deltaRatio60: 0, tickCount: 0 }

/** 숫자가 흔들리지 않도록 표시용으로만 자른다. */
function round(value: number) {
  return Math.round(value * 1000) / 1000
}

/** ticker listener 예제의 controls, 등록·해제 action, 관찰값을 제공한다. */
export function useTickerListenerRuntime() {
  // add()가 실제로 queue에 넣은 함수 — 제거할 때도 반드시 이 참조를 써야 한다
  const listenerRef = useRef<gsap.Callback | null>(null)
  // 표시를 건너뛴 tick까지 포함해 진짜 몇 번 불렸는지 세는 값이다
  const tickCountRef = useRef(0)
  // 마지막으로 화면을 갱신한 ticker 시각 — 표시 간격을 재는 기준이다
  const lastShownRef = useRef(0)
  // add()에 넘길 once 인자를 결정한다
  const [mode, setMode] = useState<ListenMode>('once')
  // 지금 listener가 붙어 있는지를 버튼 라벨과 상태 문구에 쓴다
  const [listening, setListening] = useState(false)
  // listener가 받은 time·deltaTime·frame과 직접 센 tick 수를 한 번에 보여준다
  const [observation, setObservation] = useState<TickerObservation>(emptyObservation)
  // 등록·해제·자동 해제 상태를 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 listener를 붙이지 않았습니다. 먼저 한 tick만 받아 보세요.')
  // 운영체제 모션 감소 설정에서는 숫자가 바뀌는 빈도를 낮춘다
  const reducedMotion = useReducedMotion()
  // 매 tick 화면을 다시 그리면 숫자가 과하게 흔들려서 이 간격으로만 갱신한다
  const displayIntervalSeconds = reducedMotion ? 0.5 : 0.1

  // 붙어 있는 listener를 떼고 화면 상태도 함께 정리한다
  function stop() {
    // 붙인 적이 없으면 아무것도 하지 않는다
    if (!listenerRef.current) return

    gsap.ticker.remove(listenerRef.current)
    listenerRef.current = null
    setListening(false)
    setStatus('listener를 뗐습니다. ticker는 계속 돌지만 이 함수는 더 이상 불리지 않습니다.')
  }

  // 고른 mode 그대로 ticker에 listener를 등록한다
  function start() {
    // 중복 등록을 막는다 — 같은 함수를 두 번 붙일 이유가 없다
    if (listenerRef.current) return

    // 이 값이 그대로 add()의 두 번째 인자가 된다
    const once = mode === 'once'
    tickCountRef.current = 0
    lastShownRef.current = 0

    // ticker가 매 tick 넘겨주는 세 인자를 그대로 받아 읽는다
    const readTick: gsap.TickerCallback = (time, deltaTime, frame) => {
      tickCountRef.current += 1

      // 계속 받는 mode에서는 정해진 간격이 지났을 때만 화면 숫자를 바꾼다
      if (!once && time - lastShownRef.current < displayIntervalSeconds) return

      lastShownRef.current = time
      setObservation({
        time: round(time),
        deltaTime: round(deltaTime),
        frame,
        // 같은 tick 안에서 읽어야 방금 받은 deltaTime과 같은 근거를 갖는다
        deltaRatio60: round(gsap.ticker.deltaRatio()),
        tickCount: tickCountRef.current,
      })

      // once로 등록한 listener는 GSAP이 스스로 떼어 내므로 화면 상태만 맞춰 준다
      if (once) {
        listenerRef.current = null
        setListening(false)
        setStatus('한 tick을 받고 GSAP이 listener를 자동으로 제거했습니다.')
      }
    }

    // once면 add()가 돌려주는 wrapper가 실제 등록된 함수라 반환값을 그대로 보관한다
    listenerRef.current = gsap.ticker.add(readTick, once)
    setListening(true)
    setStatus(
      once
        ? '한 tick만 받도록 등록했습니다. 다음 frame에 한 번 불리고 자동으로 사라집니다.'
        : '계속 받도록 등록했습니다. frame 번호가 올라가는 것을 보고, 다 봤으면 반드시 떼어 내세요.',
    )
  }

  // mode를 바꾸기 전에 붙어 있던 listener를 먼저 떼어 두 mode가 섞이지 않게 한다
  function chooseMode(next: ListenMode) {
    stop()
    setMode(next)
    setObservation(emptyObservation)
  }

  useEffect(() => {
    // 페이지를 떠날 때 ticker에 남은 listener를 반드시 떼어 낸다
    return () => {
      if (listenerRef.current) gsap.ticker.remove(listenerRef.current)
      listenerRef.current = null
    }
  }, [])

  // TSX가 controls·관찰 패널·코드 패널을 같은 runtime 값에서 그리도록 필요한 값만 전달한다
  return { mode, chooseMode, listening, observation, status, reducedMotion, displayIntervalSeconds, start, stop }
}
