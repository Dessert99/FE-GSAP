/** Timeline 한 줄에 call·pause·lifecycle callback·Promise를 배치해 실행 시점을 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

/** 네 이벤트의 위치를 ruler·GSAP 호출·표시 코드가 함께 쓰는 단일 descriptor다. */
export type TimelineEventDescriptor = {
  duration: number
  callAt: number
  pauseAt: number
}

/** Timeline 이벤트가 실제로 불린 순서와 그때의 시각을 한 행으로 남긴다. */
export type TimelineEventRecord = {
  id: number
  label: string
  time: number
}

/** Timeline 이벤트의 위치가 겹치지 않으면서 한 화면에서 기다릴 수 있도록 고정한 시간표다. */
const descriptor: TimelineEventDescriptor = { duration: 1.4, callAt: 0.4, pauseAt: 0.7 }

/** 실행 시각을 frame 오차보다 거친 두 자리로 잘라 학습 표를 안정시킨다. */
function round(value: number) {
  return Math.round(value * 100) / 100
}

/** event track 예제의 Timeline, 실제 event log, pause 제거 결과와 조작 action을 제공한다. */
export function useTimelineEventAnimation() {
  // 객체 Timeline에도 useGSAP의 정리 계약을 적용하고 페이지 안의 실행 경계를 표시한다
  const scope = useRef<HTMLDivElement>(null)
  // 모든 버튼이 같은 Timeline instance를 조작하도록 참조를 보관한다
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  // 이벤트 행마다 안정적인 key를 주기 위한 증가 번호다
  const eventIdRef = useRef(0)
  // Tween이 시간 구간을 만들기 위해 바꾸는 평범한 객체 값이다
  const targetRef = useRef({ value: 0 })
  // 실제 callback이 불릴 때만 추가되는 이산 event 기록이다
  const [events, setEvents] = useState<TimelineEventRecord[]>([])
  // addPause child가 현재 Timeline에 남아 있는지 control과 코드 패널에 알린다
  const [pauseEnabled, setPauseEnabled] = useState(true)
  // 공식 반환과 다른 removePause 런타임 반환을 실제 값으로 표시한다
  const [removeReturn, setRemoveReturn] = useState('아직 호출하지 않음')
  // Timeline completion Promise가 기다리는 중인지 끝났는지 보여준다
  const [promiseStatus, setPromiseStatus] = useState<'pending' | 'resolved'>('pending')
  // 이산 조작 결과만 screen reader에 전달하는 상태 문장이다
  const [status, setStatus] = useState('처음부터 멈춘 Timeline입니다. 재생을 눌러 이벤트 순서를 확인하세요.')

  // callback이 실행된 바로 그 시점의 Timeline 시간을 읽어 event log에 남긴다
  function record(label: string) {
    // callback이 속한 Timeline의 현재 시각을 직접 읽는다
    const timeline = timelineRef.current
    if (!timeline) return

    eventIdRef.current += 1
    setEvents((current) => [...current, { id: eventIdRef.current, label, time: round(timeline.time()) }])
  }

  // 현재 재생 회차가 완료될 때 resolve되는 Promise를 등록한다
  function watchCompletion(timeline: gsap.core.Timeline) {
    setPromiseStatus('pending')
    // 이 재생 회차의 완료를 Promise 상태와 안내 문장으로 연결한다
    void timeline.then(() => {
      setPromiseStatus('resolved')
      setStatus('Timeline이 끝나 completion Promise가 resolve됐습니다.')
    })
  }

  useGSAP(
    () => {
      // 다시 mount돼도 같은 값에서 출발하도록 target을 초기화한다
      targetRef.current.value = 0
      // 시간 구간 하나 위에 call과 pause를 순서대로 놓는 paused Timeline이다
      const timeline = gsap.timeline({ paused: true })
      // callback pin과 pause pin을 통과할 수 있는 1.4초짜리 child를 만든다
      timeline.to(targetRef.current, { value: 100, duration: descriptor.duration, ease: 'none' })
      // Timeline 안의 고정 시각에서 앱 함수를 부르는 call child를 넣는다
      timeline.call(() => record('call callback'), ['call'], descriptor.callAt)
      // 정확한 위치로 재생 헤드를 보정한 뒤 멈추는 pause child를 넣는다
      timeline.addPause(descriptor.pauseAt, () => {
        record('pause callback')
        setStatus('pause pin에서 정확히 멈췄습니다. 계속 재생을 누르세요.')
      })
      // Timeline 전체가 끝나는 생애 이벤트는 child 위치가 아니라 마지막에서 불린다
      timeline.eventCallback('onComplete', () => record('onComplete'))
      // 버튼 handler와 callback이 같은 Timeline을 읽도록 참조를 먼저 연결한다
      timelineRef.current = timeline
      // 같은 완료 지점을 Promise 상태로도 관찰한다
      watchCompletion(timeline)
      return () => {
        timelineRef.current = null
      }
    },
    // Timeline은 한 번만 만들고 이후에는 같은 instance의 child와 재생 상태만 조작한다
    { scope },
  )

  // 멈춘 현재 위치에서 정방향 재생을 시작하거나 이어 간다
  function play() {
    // 모든 조작이 처음 만든 동일한 Timeline instance를 사용한다
    const timeline = timelineRef.current
    if (!timeline) return

    // pause pin이나 현재 위치에서 정방향 재생을 이어 간다
    timeline.play()
    setStatus('Timeline을 정방향으로 재생하고 있습니다.')
  }

  // 처음으로 되돌아가 새 회차를 시작하고 completion Promise도 새로 관찰한다
  function restart() {
    // 기존 child 구성을 보존한 채 같은 Timeline을 처음부터 돌린다
    const timeline = timelineRef.current
    if (!timeline) return

    setEvents([])
    eventIdRef.current = 0
    // 완료된 instance의 then이 즉시 resolve되지 않도록 먼저 재생 헤드를 처음으로 돌린다
    timeline.restart()
    watchCompletion(timeline)
    setStatus('처음부터 다시 재생했습니다. pause가 남아 있으면 같은 위치에서 다시 멈춥니다.')
  }

  // pause child만 제거하고 같은 위치의 call callback이나 Timeline 자체는 보존한다
  function removePause() {
    // 실제 반환과 제거 뒤 child 구성을 같은 Timeline에서 관찰한다
    const timeline = timelineRef.current
    if (!timeline || !pauseEnabled) return

    // 공식·타입의 self와 다른 실제 undefined 반환을 화면에 그대로 남긴다
    const result = timeline.removePause(descriptor.pauseAt)
    setRemoveReturn(String(result))
    setPauseEnabled(false)
    setStatus('pause child만 제거했습니다. 다시 시작하면 중간에 멈추지 않습니다.')
  }

  // 같은 위치에 pause child를 다시 넣어 제거 전 상태를 복구한다
  function restorePause() {
    // pause를 제거했던 동일한 Timeline에 새 pause child를 넣는다
    const timeline = timelineRef.current
    if (!timeline || pauseEnabled) return

    // 제거 전과 같은 위치·callback 계약으로 pause child를 복원한다
    timeline.addPause(descriptor.pauseAt, () => {
      record('pause callback')
      setStatus('복원한 pause pin에서 정확히 멈췄습니다.')
    })
    setPauseEnabled(true)
    setRemoveReturn('아직 호출하지 않음')
    setStatus('pause child를 같은 위치에 다시 넣었습니다.')
  }

  // 재생하지 않은 시작 상태로 돌아가 event log와 Promise 관찰을 비운다
  function reset() {
    // 같은 Timeline의 child는 유지하고 재생 상태와 화면 관찰만 초기화한다
    const timeline = timelineRef.current
    if (!timeline) return

    // callback을 건너뛰며 0초로 이동한 뒤 멈춘 상태를 만든다
    timeline.pause(0)
    setEvents([])
    eventIdRef.current = 0
    setPromiseStatus('pending')
    setStatus('0초에서 멈춘 상태로 초기화했습니다.')
  }

  // TSX가 ruler·관찰 표·코드 패널을 같은 runtime 값에서 그리도록 필요한 값만 전달한다
  return { scope, descriptor, events, pauseEnabled, removeReturn, promiseStatus, status, play, restart, removePause, restorePause, reset }
}
