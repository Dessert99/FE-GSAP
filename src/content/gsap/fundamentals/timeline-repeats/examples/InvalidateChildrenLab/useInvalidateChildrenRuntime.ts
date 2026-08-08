/** 부모 invalidate 전후에 두 child function value의 실행 횟수와 timing getter를 직접 읽는다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

/** 두 버튼이 실행할 Timeline 호출 차이다. */
export type InvalidateAction = 'restart' | 'invalidate'
/** 실행 한 번 뒤 실제 child 값과 function counter를 기록한다. */
export type InvalidateRow = { index: number; action: InvalidateAction; counter: number; firstX: number; secondX: number; duration: number; startTime: number; delay: number }

// 첫 child의 실행 선택자와 JSX className을 공유한다
const firstSelector = '.invalidate-children-lab__box--a'
// 두 번째 child의 실행 선택자와 JSX className을 공유한다
const secondSelector = '.invalidate-children-lab__box--b'

/** Timeline invalidate lab의 paused instance·실행 기록·두 action을 제공한다. */
export function useInvalidateChildrenRuntime() {
  // 두 target 선택을 이 lab DOM 안으로 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 같은 Timeline instance를 반복해서 render하기 위해 보관한다
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  // child function value가 다시 해석된 횟수를 직접 센다
  const counterRef = useRef(0)
  // 버튼 실행마다 GSAP에서 읽은 snapshot을 누적한다
  const [rows, setRows] = useState<InvalidateRow[]>([])
  // 이산 버튼 결과를 screen reader에 전달한다
  const [status, setStatus] = useState('아직 render하지 않았습니다.')
  // reset 때 Timeline과 counter를 새로 만드는 신호다
  const [resetKey, setResetKey] = useState(0)

  useGSAP(
    () => {
      // 새 fixture가 function 호출을 0부터 다시 세게 한다
      counterRef.current = 0
      // 이전 fixture가 남긴 A 값을 0으로 되돌린다
      gsap.set(firstSelector, { x: 0 })
      // 이전 fixture가 남긴 B 값도 같은 0으로 되돌린다
      gsap.set(secondSelector, { x: 0 })
      // child 전파만 관찰하도록 paused 부모 Timeline을 만든다
      const timeline = gsap.timeline({ paused: true, delay: 0.25, defaults: { duration: 1, ease: 'none' } })
      // 첫 child는 function을 다시 해석할 때마다 다음 60 단위를 받는다
      timeline.to(firstSelector, { x: () => { counterRef.current += 1; return counterRef.current * 60 } })
      // 두 번째 child도 같은 counter를 써 부모 invalidate 전파 여부를 드러낸다
      timeline.to(secondSelector, { x: () => { counterRef.current += 1; return counterRef.current * 60 } })
      timelineRef.current = timeline
      setRows([])
      setStatus('아직 render하지 않았습니다.')
      // context 정리 뒤 handler가 이전 Timeline을 다시 쓰지 않게 참조를 비운다
      return () => { timelineRef.current = null }
    },
    // reset 신호가 바뀔 때만 같은 fixture를 새로 만든다
    { scope, dependencies: [resetKey], revertOnUpdate: true },
  )

  // restart와 부모 invalidate 뒤 restart의 한 가지 차이를 실제 instance에 적용한다
  function run(action: InvalidateAction) {
    // useGSAP이 만든 같은 부모 Timeline을 계속 사용한다
    const timeline = timelineRef.current
    if (!timeline) return
    // invalidate action만 모든 child의 initialization data를 지운다
    if (action === 'invalidate') timeline.invalidate()
    // Timeline을 실제로 restart한 뒤 즉시 멈춰 자동 재생 없이 시작 render만 수행한다
    timeline.restart().pause()
    // 끝 render에서 실제로 기록된 child 목적지 값을 적용한다
    timeline.progress(1, true)
    // 두 target과 부모 timing getter를 GSAP에서 직접 읽어 한 행으로 남긴다
    const row: InvalidateRow = { index: rows.length + 1, action, counter: counterRef.current, firstX: Math.round(Number(gsap.getProperty(firstSelector, 'x'))), secondX: Math.round(Number(gsap.getProperty(secondSelector, 'x'))), duration: timeline.duration(), startTime: timeline.startTime(), delay: timeline.delay() }
    setRows((previous) => [...previous, row])
    setStatus(action === 'invalidate' ? `부모 invalidate 뒤 counter가 ${row.counter}이 됐습니다.` : `restart만 한 뒤 counter는 ${row.counter}입니다.`)
  }

  // Timeline·counter·기록을 모두 초기 fixture로 다시 만든다
  function reset() { setResetKey((previous) => previous + 1) }

  // TSX가 버튼·표·코드를 같은 runtime 기록으로 그리게 한다
  return { scope, rows, status, run, reset, firstSelector, secondSelector }
}
