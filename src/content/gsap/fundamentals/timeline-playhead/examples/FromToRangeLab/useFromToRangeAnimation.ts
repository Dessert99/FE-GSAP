/** tweenFromTo의 두 label과 immediateRender 전달 형태를 실행 직후 snapshot으로 관찰한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 공식 default와 명시적 true/false를 서로 다른 호출 형태로 보존한다. */
export type ImmediateRenderMode = 'omitted' | 'true' | 'false'
/** range select와 Timeline label이 같은 이름·초를 사용한다. */
export type RangePoint = { label: 'intro' | 'focus' | 'outro' | 'finish'; time: number }
/** 마지막 실행의 두 label과 실제 호출 형태를 code와 status가 함께 읽는다. */
export type RangeAction = { from: RangePoint; to: RangePoint; immediateRenderMode: ImmediateRenderMode; reducedMotion: boolean }

/** from/to controls가 선택할 수 있는 고정 chapter 위치다. */
export const rangePoints: RangePoint[] = [{ label: 'intro', time: 0 }, { label: 'focus', time: 1 }, { label: 'outro', time: 2 }, { label: 'finish', time: 3 }]
// 실행 Timeline과 serializer가 공유하는 한 chapter 설정이다
const rangeDescriptor = { duration: 1, distance: 120 } as const

/** range control Tween과 생성 직후·현재 playhead 관찰값을 예제에 제공한다. */
export function useFromToRangeAnimation() {
  // GSAP selector와 context cleanup을 예제 DOM 안으로 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 여러 실행이 같은 Timeline을 사용하도록 instance를 보존한다
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  // 새 range 실행 전에 이전 control Tween을 중단하도록 참조를 보존한다
  const controlTweenRef = useRef<gsap.core.Tween | null>(null)
  // 실제 Timeline과 JSX가 같은 target class를 사용한다
  const targetClassName = 'from-to-range-lab__card'
  // control Tween의 시작 label을 선택한다
  const [from, setFrom] = useState<RangePoint>(rangePoints[1])
  // control Tween의 도착 label을 선택한다
  const [to, setTo] = useState<RangePoint>(rangePoints[3])
  // immediateRender를 생략할지 명시할지 정한다
  const [immediateRenderMode, setImmediateRenderMode] = useState<ImmediateRenderMode>('omitted')
  // 생성 직후 동기 위치와 이후 현재 위치를 구분해 보여 준다
  const [snapshot, setSnapshot] = useState({ creationTime: 0.5, currentTime: 0.5, paused: true })
  // 이산 live status와 code가 마지막 실행 descriptor를 공유한다
  const [lastAction, setLastAction] = useState<RangeAction | null>(null)
  // 모션 감소 환경에서는 control Tween 대신 도착 time setter를 실행한다
  const reducedMotion = useReducedMotion()
  // hook과 serializer가 같은 Timeline 설정을 읽는다
  const descriptor = rangeDescriptor

  // Timeline의 연속 현재값만 live region 밖 snapshot에 갱신한다
  function reportCurrent() {
    // context가 준비되기 전에는 관찰하지 않는다
    const timeline = timelineRef.current
    if (!timeline) return
    // 생성 직후 값은 보존하고 현재 time과 paused만 실제 getter에서 읽는다
    setSnapshot((current) => ({ ...current, currentTime: Math.round(timeline.time() * 100) / 100, paused: timeline.paused() }))
  }

  useGSAP(
    () => {
      // 이전 context가 남긴 transform을 같은 시작값으로 되돌린다
      gsap.set(`.${targetClassName}`, { x: 0, rotation: 0, scale: 1 })
      // range control Tween으로만 움직일 paused 세 chapter Timeline을 만든다
      const timeline = gsap.timeline({ paused: true, defaults: { duration: descriptor.duration, ease: 'none' }, onUpdate: reportCurrent })
      // intro label과 첫 이동 chapter를 배치한다
      timeline.addLabel('intro', 0).to(`.${targetClassName}`, { x: descriptor.distance })
      // focus label과 회전 chapter를 배치한다
      timeline.addLabel('focus').to(`.${targetClassName}`, { rotation: 120 })
      // outro label과 scale chapter를 배치한다
      timeline.addLabel('outro').to(`.${targetClassName}`, { scale: 0.72 })
      // Timeline 끝을 finish label로 선택 가능하게 한다
      timeline.addLabel('finish')
      // 공식 default와 explicit true 차이가 보이도록 playhead를 label 밖 0.5초에 둔다
      timeline.time(0.5, true)
      // handler와 report가 동일 Timeline을 보게 참조를 연결한다
      timelineRef.current = timeline
      // 생성 직후 기준 snapshot을 실제 getter에서 읽는다
      setSnapshot({ creationTime: timeline.time(), currentTime: timeline.time(), paused: timeline.paused() })
      // cleanup 뒤 오래된 control과 Timeline 참조를 비운다
      return () => { controlTweenRef.current?.kill(); controlTweenRef.current = null; timelineRef.current = null }
    },
    // Timeline 구조는 mount마다 한 번만 만든다
    { scope },
  )

  useEffect(() => {
    // 재생 중 OS 모션 설정 변경을 판단할 현재 range control Tween이다
    const controlTween = controlTweenRef.current
    // 모션 감소가 아니거나 이미 끝난 range면 마지막 실제 호출 기록을 유지한다
    if (!reducedMotion || !controlTween?.isActive() || !lastAction || lastAction.reducedMotion) return
    // 진행 중인 range Tween을 즉시 중단해 설정 변경 뒤 모션이 이어지지 않게 한다
    controlTween.kill()
    controlTweenRef.current = null
    // 같은 to label의 초 위치를 direct setter로 적용한다
    timelineRef.current?.time(lastAction.to.time)
    // 생성 직후와 현재 snapshot을 실제 fallback 도착값으로 동기화한다
    setSnapshot({ creationTime: lastAction.to.time, currentTime: lastAction.to.time, paused: true })
    // status와 코드가 tweenFromTo 대신 time fallback을 표시하게 마지막 action을 바꾼다
    setLastAction({ ...lastAction, reducedMotion: true })
  }, [reducedMotion])

  // 선택한 두 label 사이 control Tween을 만든다
  function run() {
    // context가 준비되기 전 입력은 무시한다
    const timeline = timelineRef.current
    if (!timeline) return
    // 한 playhead를 여러 control Tween이 동시에 갱신하지 않게 이전 것을 중단한다
    controlTweenRef.current?.kill()
    controlTweenRef.current = null
    // 세 mode의 생성 직후 차이를 같은 0.5초 출발 상태에서 비교한다
    timeline.time(0.5, true)
    // 모션 감소 환경에서는 같은 도착 위치를 direct setter로 제공한다
    if (reducedMotion) timeline.time(to.time)
    // 생략 mode는 공식 default를 실제 호출 형태 그대로 확인한다
    else if (immediateRenderMode === 'omitted') controlTweenRef.current = timeline.tweenFromTo(from.label, to.label)
    // true mode는 생성 순간 from label을 즉시 render한다
    else if (immediateRenderMode === 'true') controlTweenRef.current = timeline.tweenFromTo(from.label, to.label, { immediateRender: true })
    // false mode는 control Tween이 render될 때까지 기존 playhead를 유지한다
    else controlTweenRef.current = timeline.tweenFromTo(from.label, to.label, { immediateRender: false })
    // 관찰 callback은 vars 호출 형태와 분리해 code serializer가 실제 immediateRender config만 보여 주게 한다
    controlTweenRef.current?.eventCallback('onUpdate', reportCurrent).eventCallback('onComplete', reportCurrent)
    // 반환 직후 동기 time을 별도 snapshot으로 기록해 immediateRender를 관찰한다
    setSnapshot({ creationTime: timeline.time(), currentTime: timeline.time(), paused: timeline.paused() })
    // code와 status가 방금 실행한 controls 상태를 읽게 한다
    setLastAction({ from, to, immediateRenderMode, reducedMotion })
  }

  // TSX는 실행에 사용한 control·descriptor·snapshot만 소비한다
  return { scope, targetClassName, descriptor, from, setFrom, to, setTo, immediateRenderMode, setImmediateRenderMode, snapshot, lastAction, reducedMotion, run }
}
