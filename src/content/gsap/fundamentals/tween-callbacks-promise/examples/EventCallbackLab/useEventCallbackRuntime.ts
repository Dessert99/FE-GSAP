/** 하나의 paused Tween에 콜백을 걸고 읽고 지우면서 getter 반환과 실제 호출을 함께 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

/** 조작 버튼이 eventCallback에 실제로 넘기는 인자 조합이다. */
export type CallbackAction = 'set' | 'replace' | 'clear'

/** getter가 무엇을 돌려줬고 콜백이 실제로 몇 번 불렸는지를 화면에 숫자와 문자로 드러낸다. */
export type CallbackObservation = {
  getterResult: string
  registeredLabel: string
  fireCount: number
  lastFired: string
}

/** 어느 event type을 다룰지 고정한다 — 한 화면에서 하나의 event만 다뤄야 관찰이 흐려지지 않는다. */
const eventType = 'onComplete'

/** getter가 돌려준 값을 화면에 쓸 수 있는 문자열로 바꾼다. */
function describe(value: unknown) {
  return typeof value === 'function' ? 'function' : String(value)
}

/** 콜백 교체 예제의 controls, paused Tween, 관찰값, 조작 action을 제공한다. */
export function useEventCallbackRuntime() {
  // 배열·객체 tween에는 DOM이 필요 없지만 useGSAP의 정리 계약을 그대로 쓰기 위해 scope를 둔다
  const scope = useRef<HTMLDivElement>(null)
  // 콜백을 걸고 지울 대상 Tween — 버튼이 같은 instance를 계속 조작해야 의미가 있다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // 콜백이 불린 횟수를 세는 값 — state 갱신이 아니라 실제 호출을 세야 해서 ref에 둔다
  const fireCountRef = useRef(0)
  // getter 반환·등록 라벨·호출 횟수를 한 번에 보여주는 관찰값이다
  const [observation, setObservation] = useState<CallbackObservation>({
    getterResult: 'undefined',
    registeredLabel: '없음',
    fireCount: 0,
    lastFired: '아직 없음',
  })
  // 방금 어떤 조작을 했는지 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 콜백을 걸지 않았습니다. 버튼을 눌러 보세요.')

  useGSAP(
    () => {
      // 완료 콜백을 관찰할 짧은 paused Tween — 재생 버튼이 완료까지 몰고 간다
      tweenRef.current = gsap.to({ v: 0 }, { v: 1, duration: 0.4, paused: true })
      // 새로 만들었으므로 이전 실행의 호출 횟수를 지운다
      fireCountRef.current = 0
      return () => {
        tweenRef.current = null
      }
    },
    // 한 번만 만들고 버튼 조작으로만 상태를 바꾼다
    { scope },
  )

  // getter를 지금 호출해 등록 상태를 읽어 온다 — 표시값이 추측이 아닌 관찰이 되게 한다
  function readBack(label: string, lastFired: string) {
    // 준비 전 조작은 화면을 바꾸지 않는다
    const tween = tweenRef.current
    if (!tween) return

    setObservation({
      getterResult: describe(tween.eventCallback(eventType)),
      registeredLabel: label,
      fireCount: fireCountRef.current,
      lastFired,
    })
  }

  // 세 조작을 같은 메서드의 인자 차이로만 구분해 실행한다
  function apply(action: CallbackAction) {
    const tween = tweenRef.current
    if (!tween) return

    if (action === 'clear') {
      // 두 번째 인자에 null을 넘기는 것이 공식이 밝힌 삭제 방법이다
      tween.eventCallback(eventType, null)
      setStatus('onComplete 콜백을 null로 지웠습니다. getter가 무엇을 돌려주는지 보세요.')
      readBack('없음', observation.lastFired)
      return
    }

    // 어느 콜백이 걸렸는지 화면에서 구분할 수 있도록 라벨을 다르게 준다
    const label = action === 'set' ? '첫 번째 함수' : '두 번째 함수'
    // setter는 instance 자신을 돌려주므로 그대로 이어서 호출할 수 있다
    tween.eventCallback(eventType, () => {
      fireCountRef.current += 1
      readBack(label, label)
    })
    setStatus(
      action === 'set'
        ? '첫 번째 함수를 걸었습니다. 재생을 눌러 완료시키면 호출됩니다.'
        : '같은 event에 두 번째 함수를 걸었습니다. 이전 함수는 덮어써집니다.',
    )
    readBack(label, observation.lastFired)
  }

  // 걸어 둔 콜백이 실제로 불리는지 확인하도록 Tween을 처음부터 완료까지 재생한다
  function run() {
    const tween = tweenRef.current
    if (!tween) return

    tween.restart()
    setStatus('재생했습니다. 완료되면 등록된 콜백이 한 번 불립니다.')
  }

  // TSX가 버튼·관찰 패널·코드 패널을 같은 runtime 값에서 그리도록 필요한 값만 전달한다
  return { scope, eventType, observation, status, apply, run }
}
