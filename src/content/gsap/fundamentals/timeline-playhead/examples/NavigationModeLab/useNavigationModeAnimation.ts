/** 같은 label 목적지를 time·progress setter와 tweenTo control Tween으로 이동한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 직접 이동 두 방식과 부드러운 control Tween을 구분한다. */
export type NavigationMethod = 'time' | 'progress' | 'tweenTo'
/** 목적지 label·초·비율을 실행과 표시가 함께 읽는다. */
export type Destination = { label: 'intro' | 'focus' | 'outro' | 'finish'; time: number; progress: number }
/** 마지막 실행은 요청과 모션 환경에서 실제 사용한 method를 모두 보존한다. */
export type NavigationAction = { requestedMethod: NavigationMethod; effectiveMethod: NavigationMethod; destination: Destination }

/** select option과 Timeline label이 공유하는 네 목적지다. */
export const navigationDestinations: Destination[] = [
  { label: 'intro', time: 0, progress: 0 },
  { label: 'focus', time: 1, progress: 1 / 3 },
  { label: 'outro', time: 2, progress: 2 / 3 },
  { label: 'finish', time: 3, progress: 1 },
]
// 세 chapter가 한 target에 적용할 고정 변화다
const navigationDescriptor = { duration: 1, distance: 120, rotation: 120, scale: 0.72 } as const

/** direct와 smooth navigation action, 실제 Timeline snapshot을 예제에 제공한다. */
export function useNavigationModeAnimation() {
  // GSAP selector와 cleanup을 lab DOM 안으로 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 여러 버튼이 같은 Timeline instance를 조작하도록 보존한다
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  // 새 navigation 전에 이전 control Tween을 중단하도록 참조를 보존한다
  const controlTweenRef = useRef<gsap.core.Tween | null>(null)
  // 실제 Timeline과 JSX가 같은 target class를 사용한다
  const targetClassName = 'navigation-mode-lab__card'
  // 사용자가 요청할 이동 방식을 선택한다
  const [method, setMethod] = useState<NavigationMethod>('time')
  // 사용자가 요청할 label 목적지를 선택한다
  const [destination, setDestination] = useState<Destination>(navigationDestinations[2])
  // code와 이산 status가 마지막 실제 action 하나만 읽는다
  const [lastAction, setLastAction] = useState<NavigationAction | null>(null)
  // 연속 playhead 값은 live region 밖 snapshot으로 제공한다
  const [snapshot, setSnapshot] = useState({ time: 0, progress: 0, paused: true })
  // 모션 감소 환경에서는 tweenTo 요청을 direct time setter로 바꾼다
  const reducedMotion = useReducedMotion()
  // hook과 serializer가 같은 설정을 공유한다
  const descriptor = navigationDescriptor

  // Timeline getter를 한 번에 읽어 한 snapshot으로 갱신한다
  function report() {
    // context 생성 전에는 읽을 Timeline이 없다
    const timeline = timelineRef.current
    if (!timeline) return
    // 연속 값의 표시 정밀도만 줄이고 실행값은 바꾸지 않는다
    setSnapshot({ time: Math.round(timeline.time() * 100) / 100, progress: Math.round(timeline.progress() * 100) / 100, paused: timeline.paused() })
  }

  useGSAP(
    () => {
      // 이전 context가 남긴 transform을 초기 상태로 되돌린다
      gsap.set(`.${targetClassName}`, { x: 0, rotation: 0, scale: 1 })
      // 직접 setter나 control Tween으로만 움직일 paused Timeline을 만든다
      const timeline = gsap.timeline({ paused: true, defaults: { duration: descriptor.duration, ease: 'none' }, onUpdate: report })
      // 첫 chapter 시작 label을 time 0에 붙인다
      timeline.addLabel('intro', 0)
      // 첫 chapter에서 하나의 card를 오른쪽으로 옮긴다
      timeline.to(`.${targetClassName}`, { x: descriptor.distance })
      // 두 번째 chapter 시작 label을 time 1에 붙인다
      timeline.addLabel('focus')
      // 두 번째 chapter에서 같은 card를 회전시킨다
      timeline.to(`.${targetClassName}`, { rotation: descriptor.rotation })
      // 세 번째 chapter 시작 label을 time 2에 붙인다
      timeline.addLabel('outro')
      // 세 번째 chapter에서 같은 card의 크기를 줄인다
      timeline.to(`.${targetClassName}`, { scale: descriptor.scale })
      // 완료 위치에도 label을 붙여 마지막 목적지를 문자열로 선택하게 한다
      timeline.addLabel('finish')
      // action handler와 report가 완성된 동일 Timeline을 보게 한다
      timelineRef.current = timeline
      // 생성 직후 paused 시작값을 화면에 반영한다
      report()
      // cleanup 뒤 오래된 instance를 handler가 사용하지 않게 비운다
      return () => { controlTweenRef.current?.kill(); controlTweenRef.current = null; timelineRef.current = null }
    },
    // Timeline 구조는 고정이라 mount마다 한 번만 만든다
    { scope },
  )

  useEffect(() => {
    // 재생 중 OS 모션 설정이 바뀌었는지 판단할 현재 control Tween이다
    const controlTween = controlTweenRef.current
    // 모션 감소가 아니거나 이미 끝난 이동이면 마지막 실제 호출 기록을 바꾸지 않는다
    if (!reducedMotion || !controlTween?.isActive() || !lastAction || lastAction.effectiveMethod !== 'tweenTo') return
    // 진행 중인 부드러운 이동을 즉시 멈춰 설정 변경 뒤 모션이 이어지지 않게 한다
    controlTween.kill()
    controlTweenRef.current = null
    // 같은 목적지를 direct time setter로 즉시 적용해 reduced-motion fallback을 완성한다
    timelineRef.current?.time(lastAction.destination.time)
    // status와 코드가 설정 변경 뒤 실제 time 호출을 표시하게 마지막 action도 함께 바꾼다
    setLastAction({ ...lastAction, effectiveMethod: 'time' })
    // direct fallback 뒤 Timeline getter를 즉시 다시 읽는다
    report()
  }, [reducedMotion])

  // 현재 선택한 목적지로 요청 method를 실행한다
  function navigate() {
    // context 생성 전 버튼 입력은 무시한다
    const timeline = timelineRef.current
    if (!timeline) return
    // 한 playhead를 두 control Tween이 동시에 쓰지 않게 이전 것을 먼저 중단한다
    controlTweenRef.current?.kill()
    controlTweenRef.current = null
    // 모션 감소 환경의 tweenTo 요청은 같은 목적지의 time setter로 대체한다
    const effectiveMethod: NavigationMethod = reducedMotion && method === 'tweenTo' ? 'time' : method
    // time은 descriptor의 초 숫자로 즉시 이동한다
    if (effectiveMethod === 'time') timeline.time(destination.time)
    // progress는 descriptor의 local 비율로 즉시 이동한다
    if (effectiveMethod === 'progress') timeline.progress(destination.progress)
    // tweenTo는 label까지 선형으로 움직이는 반환 Tween을 보존한다
    if (effectiveMethod === 'tweenTo') controlTweenRef.current = timeline.tweenTo(destination.label)
    // 관찰 callback은 control Tween 생성 호출과 분리해 표시 코드와 vars를 일치시킨다
    controlTweenRef.current?.eventCallback('onUpdate', report).eventCallback('onComplete', report)
    // 표시와 status가 실제 실행 method와 같은 descriptor를 읽게 한다
    setLastAction({ requestedMethod: method, effectiveMethod, destination })
    // direct setter는 같은 event turn 안에서 바뀐 값을 즉시 보고한다
    report()
  }

  // controls·preview·serializer는 runtime state만 소비한다
  return { scope, targetClassName, descriptor, method, setMethod, destination, setDestination, lastAction, snapshot, reducedMotion, navigate }
}
