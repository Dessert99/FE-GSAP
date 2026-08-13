/** extendTimeline effect의 position·parent context·chaining을 paused parent descriptor로 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** Timeline effect를 즉시 시작하거나 현재 끝에서 0.25초 뒤에 삽입하는 선택지다. */
export type TimelineEffectPosition = 0 | '+=0.25'

/** Timeline extension callback이 defaults merge 뒤 실제로 받는 config다. */
type TimelineEffectConfig = { duration: number; ease: string }

/** child Tween에서 callback의 세 입력과 parent context를 관찰한다. */
type TimelineEffectData = { kind: 'effect'; targetCount: number; effectiveDuration: number; timeline?: gsap.core.Timeline }

/** GSAP이 동적으로 추가한 page-prefixed Timeline method의 호출 타입이다. */
type TimelineWithReusableEffect = gsap.core.Timeline & { reusableEffectsReveal: (targets: gsap.TweenTarget, vars?: Partial<TimelineEffectConfig>, position?: TimelineEffectPosition) => gsap.core.Timeline }

/** controls·parent Timeline·표시 코드가 공유하는 sequence descriptor다. */
export type TimelineEffectDescriptor = {
  position: TimelineEffectPosition
  effectConfig: { duration: number; ease: string }
  followUp: { scale: number; duration: number; repeat: number; yoyo: boolean }
}

/** Timeline prototype과 충돌하지 않을 name과 effect 기본값을 고정한다. */
export const timelineEffectRegistration = {
  name: 'reusableEffectsReveal',
  defaults: { duration: 0.8, ease: 'power2.out' },
  extendTimeline: true,
} as const

/** 정규화 targets와 parent Timeline context를 반환 Tween의 data에 남긴다. */
function createRevealEffect(targets: object[], config: TimelineEffectConfig, timeline?: gsap.core.Timeline) {
  // callback의 세 번째 인자가 실제 parent인지 코드 밖에서도 확인할 관찰값이다.
  const data: TimelineEffectData = { kind: 'effect', targetCount: targets.length, effectiveDuration: config.duration, timeline }
  // parent가 position에 삽입할 수 있는 실제 Tween을 반환한다.
  return gsap.fromTo(targets, { autoAlpha: 0, x: -48 }, { autoAlpha: 1, x: 0, duration: config.duration, ease: config.ease, immediateRender: false, data })
}

// extendTimeline을 켠 page-prefixed effect를 한 번 등록해 모든 Timeline에 동명 method를 추가한다.
gsap.registerEffect({ ...timelineEffectRegistration, effect: createRevealEffect })

/** position과 모션 설정을 effect·후속 Tween이 공유할 sequence descriptor로 만든다. */
function createTimelineEffectDescriptor(position: TimelineEffectPosition, reducedMotion: boolean): TimelineEffectDescriptor {
  // 모션 감소 환경에서는 effect와 후속 Tween을 모두 0초로 만든다.
  const effectDuration = reducedMotion ? 0 : timelineEffectRegistration.defaults.duration
  // 모션 감소 환경에서는 yoyo 반복도 제거해 최종 상태를 한 번만 적용한다.
  const followUp = { scale: 1.08, duration: reducedMotion ? 0 : 0.35, repeat: reducedMotion ? 0 : 1, yoyo: !reducedMotion }

  return { position, effectConfig: { duration: effectDuration, ease: timelineEffectRegistration.defaults.ease }, followUp }
}

/** Timeline extension의 select·paused sequence·context 관찰값·replay action을 제공한다. */
export function useTimelineEffectAnimation() {
  // useGSAP이 이 예제 밖의 같은 class를 선택하지 않도록 범위를 제한한다.
  const scope = useRef<HTMLDivElement>(null)
  // effect와 후속 Tween을 담은 parent를 버튼에서만 실행하도록 보관한다.
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  // 실제 selector와 preview className이 공유하는 target 이름이다.
  const targetClassName = 'timeline-effect-example__target'
  // effect child가 parent에 들어갈 절대·상대 position을 선택한다.
  const [position, setPosition] = useState<TimelineEffectPosition>(0)
  // callback context·parent 반환·실제 sequence 길이를 글로 보여준다.
  const [observation, setObservation] = useState({ receivedTimeline: false, returnedParent: false, parentDuration: 0, targetCount: 0 })
  // 준비·실행·정적 대체 상태를 screen reader에도 전달한다.
  const [status, setStatus] = useState('Timeline effect가 등록됐고 아직 실행하지 않았습니다.')
  // 운영체제 모션 감소 설정을 두 animation의 duration과 반복에 반영한다.
  const reducedMotion = useReducedMotion()
  // select·extension call·serializer가 공유할 단일 descriptor다.
  const descriptor = useMemo(() => createTimelineEffectDescriptor(position, reducedMotion), [position, reducedMotion])

  useGSAP(
    () => {
      // position을 바꿀 때 target을 최종 표시 상태로 되돌려 autoplay 없이 준비한다.
      gsap.set(`.${targetClassName}`, { autoAlpha: 1, x: 0, scale: 1 })
      // effect와 후속 Tween을 담되 자동 재생하지 않는 parent Timeline을 만든다.
      const parent = gsap.timeline({ paused: true })
      // parent 실행 시작점에서 target을 reveal 전 상태로 즉시 배치한다.
      parent.set(`.${targetClassName}`, { autoAlpha: 0, x: -48, scale: 1 }, 0)
      // 동적으로 확장된 method signature를 runtime에서 명시적으로 사용한다.
      const effectTimeline = parent as TimelineWithReusableEffect
      // 선택한 position에 effect 반환 Tween을 parent.add로 삽입하고 parent를 돌려받는다.
      const returnedTimeline = effectTimeline.reusableEffectsReveal(`.${targetClassName}`, descriptor.effectConfig, descriptor.position)
      // callback이 반환한 effect Tween을 parent children에서 data marker로 찾는다.
      const effectTween = parent.getChildren(false, true, false).find((child) => (child.data as TimelineEffectData | undefined)?.kind === 'effect')
      // extension이 돌려준 parent에 후속 강조 Tween을 chaining한다.
      returnedTimeline.to(`.${targetClassName}`, descriptor.followUp)
      // replay handler가 완성된 parent sequence를 처음부터 실행하도록 보관한다.
      timelineRef.current = parent
      // child data는 callback의 target array와 third Timeline 입력을 그대로 나타낸다.
      const data = effectTween?.data as TimelineEffectData | undefined
      // method 반환과 callback context를 숫자·boolean으로 표시한다.
      setObservation({ receivedTimeline: data?.timeline === parent, returnedParent: returnedTimeline === parent, parentDuration: parent.duration(), targetCount: data?.targetCount ?? 0 })
      // 새 position으로 sequence가 준비됐지만 아직 움직이지 않았음을 알린다.
      setStatus('현재 position으로 paused parent Timeline을 준비했습니다. 실행 버튼을 눌러 확인하세요.')
      // context 정리 뒤 handler가 이전 Timeline을 다시 실행하지 않게 참조를 비운다.
      return () => { timelineRef.current = null }
    },
    // position이나 motion이 바뀌면 이전 sequence를 되돌리고 같은 descriptor로 다시 준비한다.
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // parent Timeline을 수동 실행하고 reduced-motion에서는 즉시 최종 상태를 보여준다.
  function run() {
    // 아직 extension sequence가 생성되지 않았으면 실행 action을 건너뛴다.
    const timeline = timelineRef.current
    // runtime 준비 전 click은 현재 화면을 바꾸지 않는다.
    if (!timeline) return

    if (reducedMotion) {
      // 0초 sequence를 끝 상태로 고정해 이동과 반복 없이 결과만 보여준다.
      timeline.restart().progress(1).pause()
      // 정적 실행에서도 선택 position과 parent 반환을 글로 알린다.
      setStatus(`정적 완료 · position ${descriptor.position} · parent 반환 ${observation.returnedParent}`)
      return
    }

    // effect와 후속 Tween이 든 같은 parent Timeline을 처음부터 재생한다.
    timeline.restart()
    // 실행 중인 position과 전체 parent 길이를 글로도 알린다.
    setStatus(`position ${descriptor.position}에서 시작하는 ${observation.parentDuration.toFixed(2)}초 parent sequence를 실행 중입니다.`)
  }

  // TSX가 controls·관찰값·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다.
  return { scope, targetClassName, position, setPosition, descriptor, observation, status, reducedMotion, run }
}
