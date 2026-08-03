/** seek의 callback suppression과 paused·reversed 상태 보존을 관찰한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

// seek 예제의 실제 Tween과 code panel이 공유하는 구성이다.
const seekDescriptor = { duration: 2, x: 130 } as const

/** seek option과 callback·state 관찰값을 예제 UI에 제공한다. */
export function useSeekEventsAnimation() {
  // useGSAP이 예제 밖 DOM을 선택하지 않도록 제한하는 scope다.
  const scope = useRef<HTMLDivElement>(null)
  // 실제 Tween과 표시 코드가 함께 쓰는 target class다.
  const targetClassName = 'seek-events-example__target'
  // button handler가 같은 paused Tween을 제어하도록 instance를 보존한다.
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // seek가 이동 구간 callback을 억제할지 결정한다.
  const [suppressEvents, setSuppressEvents] = useState(true)
  // onComplete가 실제로 호출된 횟수를 사용자 action 단위로 기록한다.
  const [callbackCount, setCallbackCount] = useState(0)
  // seek 뒤 paused·reversed 상태와 위치를 text로 전달한다.
  const [status, setStatus] = useState('0초에서 정지 중')
  useGSAP(
    () => {
      // 매 mount에서 target을 0초 상태로 고정한다.
      gsap.set(`.${targetClassName}`, { x: 0 })
      // onComplete 관찰이 가능한 paused Tween을 만들고 자동 이동은 시작하지 않는다.
      tweenRef.current = gsap.to(`.${targetClassName}`, { ...seekDescriptor, paused: true, onComplete: () => setCallbackCount((count) => count + 1) })
      // context 정리 뒤 event handler가 죽은 Tween을 참조하지 않게 비운다.
      return () => { tweenRef.current = null }
    },
    // target 선택과 Tween cleanup을 이 예제 DOM에만 제한한다.
    { scope },
  )

  // 선택한 suppressEvents로 끝까지 이동하고 playback state를 관찰한다.
  const jumpToEnd = () => {
    // 아직 생성되지 않은 Tween에는 action을 적용하지 않는다.
    const tween = tweenRef.current
    // runtime이 준비되지 않았으면 현재 상태를 유지한다.
    if (!tween) return
    // 두 선택을 언제 눌러도 같은 0초에서 비교하도록 callback 없이 먼저 초기화한다.
    tween.seek(0, true).pause()
    // 이전 비교의 callback 횟수를 이번 action에서 제외한다.
    setCallbackCount(0)
    // seek는 위치만 바꾸고 선택값에 따라 이동 구간 callback을 억제한다.
    tween.seek(seekDescriptor.duration, suppressEvents)
    // seek 뒤에도 paused·reversed가 보존됐는지 숫자와 함께 전달한다.
    setStatus(`${tween.time().toFixed(1)}초 · paused ${tween.paused()} · reversed ${tween.reversed()}`)
  }

  // callback을 발생시키지 않고 처음 위치와 관찰 상태를 되돌린다.
  const reset = () => {
    // 현재 Tween이 있으면 0초로 조용히 이동하고 정지 상태를 유지한다.
    tweenRef.current?.seek(0, true).pause()
    // 이전 action의 callback 횟수를 새 비교에서 제외한다.
    setCallbackCount(0)
    // screen reader와 화면에 초기 상태를 다시 알린다.
    setStatus('0초에서 정지 중')
  }

  // 화면은 동일 descriptor·control·관찰 action만 소비한다.
  return { scope, targetClassName, descriptor: seekDescriptor, suppressEvents, setSuppressEvents, callbackCount, status, jumpToEnd, reset }
}
