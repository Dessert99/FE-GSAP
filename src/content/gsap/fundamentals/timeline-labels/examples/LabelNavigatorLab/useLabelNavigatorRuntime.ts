/** paused Timeline의 label getter와 seek 결과를 실제 GSAP 값으로 읽어 label 탐색 실험을 제공한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** Timeline에 고정할 label 하나 — 이름과 local time을 controls와 runtime이 함께 쓴다. */
export type LabelMarker = { name: string; time: number }

/** 마지막 control이 실제로 실행한 GSAP 호출을 코드 패널에 전달한다. */
export type LabelAction = { code: string; message: string }

/** getter에서 읽은 현재 좌표와 앞뒤 label, 실제 target 값을 한 번에 보존한다. */
export type LabelReadout = {
  time: number
  current: string | undefined
  previous: string | undefined
  next: string | undefined
  value: number
}

/** 예제의 유일한 label 지도 — runtime·select·ruler가 같은 배열을 쓴다. */
export const labelMarkers: LabelMarker[] = [
  { name: 'intro', time: 0 },
  { name: 'hold', time: 2 },
  { name: 'outro', time: 4 },
]

// 실제 tween이 값을 바꿀 전체 길이 — 마지막 label과 같은 시각으로 맞춘다
const timelineDuration = 4

// suppressEvents false일 때 통과 여부를 확인할 callback 위치다
const callbackTime = 3

// getter 숫자를 읽기 좋은 소수 세 자리로만 정리한다
function round(value: number) {
  return Math.round(value * 1000) / 1000
}

/** label select·앞뒤 이동·suppressEvents와 실제 getter 결과를 제공한다. */
export function useLabelNavigatorRuntime() {
  // 예제 DOM과 GSAP context 정리 범위를 이 root에 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // control handler가 같은 Timeline instance를 조작하도록 보관한다
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  // CSS가 아닌 plain object의 실제 tween 값을 getter readout에 연결한다
  const targetRef = useRef({ value: 0 })
  // select에서 seek할 label 이름을 보관한다
  const [selectedLabel, setSelectedLabel] = useState('outro')
  // seek 이동 중 callback을 억제할지 실제 두 번째 인자로 쓴다
  const [suppressEvents, setSuppressEvents] = useState(true)
  // 중간 callback이 실제 통과한 횟수를 이산 상태로 센다
  const [callbackCount, setCallbackCount] = useState(0)
  // getter에서 마지막으로 읽은 화면 좌표를 보관한다
  const [readout, setReadout] = useState<LabelReadout>({ time: 0, current: 'intro', previous: undefined, next: 'hold', value: 0 })
  // 마지막 control의 실제 호출과 결과 설명을 코드 패널·status에 함께 쓴다
  const [action, setAction] = useState<LabelAction>({ code: '// Timeline이 0초의 intro label에서 시작합니다.', message: 'intro label에서 시작합니다.' })
  // ruler의 짧은 CSS transition을 제거할지 판단한다
  const reducedMotion = useReducedMotion()

  // 현재 Timeline getter와 실제 target 값을 같은 순간에 읽어 화면 snapshot을 만든다
  const updateReadout = () => {
    // control과 같은 Timeline instance에서 getter를 읽는다
    const timeline = timelineRef.current
    if (!timeline) return
    setReadout({
      time: round(timeline.time()),
      current: timeline.currentLabel(),
      previous: timeline.previousLabel(),
      next: timeline.nextLabel(),
      value: round(targetRef.current.value),
    })
  }

  useGSAP(
    () => {
      // label 위치만 관찰하도록 Timeline은 생성 즉시 멈춘다
      const timeline = gsap.timeline({ paused: true })
      // 0→100 plain object tween이 seek 직후 실제 render 값도 보여 준다
      timeline.to(targetRef.current, { value: 100, duration: timelineDuration, ease: 'none' }, 0)
      // 단일 label 배열을 실제 Timeline의 local time 지도에 차례로 붙인다
      labelMarkers.forEach((marker) => timeline.addLabel(marker.name, marker.time))
      // suppressEvents false로 3초 지점을 통과했을 때만 이 callback이 실행된다
      timeline.call(() => setCallbackCount((count) => count + 1), undefined, callbackTime)
      // control handler가 방금 만든 instance 하나만 조작하게 연결한다
      timelineRef.current = timeline
      // 초기 intro 위치를 실제 getter 값으로 다시 읽는다
      updateReadout()
      // unmount 뒤 handler가 죽은 Timeline을 가리키지 않도록 ref와 instance를 함께 정리한다
      return () => {
        timelineRef.current = null
        timeline.kill()
      }
    },
    // 이 예제의 fixture는 한 번 만들고 scope가 사라질 때 GSAP context와 함께 정리한다
    { scope },
  )

  // 선택한 label로 즉시 이동하고 suppressEvents 선택을 실제 seek 두 번째 인자에 전달한다
  const seekSelected = () => {
    // 생성된 paused Timeline이 있을 때만 control 요청을 실행한다
    const timeline = timelineRef.current
    if (!timeline) return
    timeline.seek(selectedLabel, suppressEvents)
    updateReadout()
    setAction({ code: `timeline.seek('${selectedLabel}', ${suppressEvents})`, message: `${selectedLabel} label로 이동했습니다.` })
  }

  // nextLabel() getter가 돌려준 이름으로만 이동해 시간 순 탐색을 그대로 따른다
  const seekNext = () => {
    // 생성된 paused Timeline이 있을 때만 다음 label을 묻는다
    const timeline = timelineRef.current
    if (!timeline) return
    // 현재 local time보다 뒤에 있는 첫 label 이름을 GSAP에서 직접 읽는다
    const next = timeline.nextLabel()
    if (!next) {
      setAction({ code: 'timeline.nextLabel()', message: '뒤에 label이 없어 undefined입니다.' })
      return
    }
    timeline.seek(next, suppressEvents)
    updateReadout()
    setAction({ code: `const next = timeline.nextLabel() // '${next}'\ntimeline.seek(next, ${suppressEvents})`, message: `${next} label로 이동했습니다.` })
  }

  // previousLabel() getter가 돌려준 이름으로만 이동해 현재 label과 같은 시각은 건너뛴다
  const seekPrevious = () => {
    // 생성된 paused Timeline이 있을 때만 이전 label을 묻는다
    const timeline = timelineRef.current
    if (!timeline) return
    // 현재 local time보다 앞에 있는 첫 label 이름을 GSAP에서 직접 읽는다
    const previous = timeline.previousLabel()
    if (!previous) {
      setAction({ code: 'timeline.previousLabel()', message: '앞에 label이 없어 undefined입니다.' })
      return
    }
    timeline.seek(previous, suppressEvents)
    updateReadout()
    setAction({ code: `const previous = timeline.previousLabel() // '${previous}'\ntimeline.seek(previous, ${suppressEvents})`, message: `${previous} label로 이동했습니다.` })
  }

  // playhead와 callback 관찰을 초기 intro 상태로 되돌린다
  const reset = () => {
    // 같은 Timeline을 intro로 되돌려 fixture를 새로 만들지 않는다
    const timeline = timelineRef.current
    if (!timeline) return
    timeline.seek('intro', true)
    setCallbackCount(0)
    updateReadout()
    setAction({ code: `timeline.seek('intro', true)`, message: 'intro label로 초기화했습니다.' })
  }

  // TSX가 controls·ruler·getter·code를 같은 runtime 상태에서 그리도록 필요한 값만 전달한다
  return { scope, selectedLabel, setSelectedLabel, suppressEvents, setSuppressEvents, callbackCount, readout, action, reducedMotion, seekSelected, seekNext, seekPrevious, reset, timelineDuration, callbackTime }
}
