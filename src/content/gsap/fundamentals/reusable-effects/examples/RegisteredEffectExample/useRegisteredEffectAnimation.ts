/** module-scope effect 등록과 direct paused Tween 실행을 하나의 descriptor로 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** direct 예제에서 default duration과 호출 override를 구분한다. */
export type EffectDurationMode = 'default' | 'override'

/** effect callback이 defaults merge 뒤 실제로 받는 config다. */
type RegisteredEffectConfig = { duration: number; ease: string; paused: boolean }

/** 반환 Tween의 data에서 정규화 결과와 effective config를 읽는다. */
type RegisteredEffectData = { targetCount: number; effectiveDuration: number }

/** controls·runtime·표시 코드가 공유하는 direct 호출 descriptor다. */
export type RegisteredEffectDescriptor = {
  callConfig: { duration?: number; ease: string; paused: true }
  effectiveDuration: number
}

/** 페이지 전체 registry에서 충돌하지 않을 name과 공식 duration 기본값을 고정한다. */
export const registeredEffectRegistration = {
  name: 'reusableEffectsFadeIn',
  plugins: '',
  defaults: { duration: 2 },
  extendTimeline: false,
} as const

/** 정규화 targets와 merged config를 새 paused Tween으로 바꾼다. */
function createFadeInEffect(targets: object[], config: RegisteredEffectConfig) {
  // direct 반환 Tween에서 callback이 받은 array와 duration을 관찰할 data다.
  const data: RegisteredEffectData = { targetCount: targets.length, effectiveDuration: config.duration }
  // 실행 전에는 현재 상태를 유지하고 replay 순간에만 fade와 y 이동을 시작한다.
  return gsap.fromTo(targets, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: config.duration, ease: config.ease, paused: config.paused, immediateRender: false, data })
}

// page-prefixed name으로 recipe를 한 번 등록해 direct 호출과 표시 코드가 같은 registry를 가리키게 한다.
gsap.registerEffect({ ...registeredEffectRegistration, effect: createFadeInEffect })

/** radio 선택을 실제 호출 config와 defaults 적용 결과로 정규화한다. */
function createRegisteredEffectDescriptor(mode: EffectDurationMode): RegisteredEffectDescriptor {
  // default mode는 duration을 생략하고 override mode만 호출값을 명시한다.
  const duration = mode === 'override' ? 0.8 : undefined
  // callback이 최종적으로 받는 duration을 코드 패널과 관찰값에서 공유한다.
  const effectiveDuration = duration ?? registeredEffectRegistration.defaults.duration
  // effect callback이 autoplay하지 않도록 모든 direct 호출을 paused로 만든다.
  const callConfig = { ...(duration === undefined ? {} : { duration }), ease: 'power2.out', paused: true as const }

  return { callConfig, effectiveDuration }
}

/** direct effect의 radio·paused Tween·정규화 관찰값·replay action을 제공한다. */
export function useRegisteredEffectAnimation() {
  // useGSAP이 이 예제 밖의 같은 class를 선택하지 않도록 범위를 제한한다.
  const scope = useRef<HTMLDivElement>(null)
  // gsap.effects direct 호출이 반환한 Tween을 버튼에서만 실행하도록 보관한다.
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // 실제 selector와 preview className이 공유하는 target 이름이다.
  const targetClassName = 'registered-effect-example__target'
  // registration defaults를 쓸지 호출 config로 duration을 덮을지 결정한다.
  const [mode, setMode] = useState<EffectDurationMode>('default')
  // callback에 도착한 정규화 target 수와 effective duration을 글로 보여준다.
  const [observation, setObservation] = useState({ targetCount: 0, effectiveDuration: 0, returnedTween: false })
  // 준비·실행·정적 대체 상태를 screen reader에도 전달한다.
  const [status, setStatus] = useState('effect가 등록됐고 아직 실행하지 않았습니다.')
  // 운영체제 모션 감소 설정에서는 재생 헤드를 즉시 끝으로 옮겨 이동을 건너뛴다.
  const reducedMotion = useReducedMotion()
  // radio·runtime call·serializer가 공유할 단일 descriptor다.
  const descriptor = useMemo(() => createRegisteredEffectDescriptor(mode), [mode])

  useGSAP(
    () => {
      // 옵션을 바꿀 때 target을 최종 표시 상태로 되돌려 autoplay 없이 준비한다.
      gsap.set(`.${targetClassName}`, { autoAlpha: 1, y: 0 })
      // GSAP의 defaults merge가 표시 descriptor를 바꾸지 않도록 같은 config의 runtime 복사본을 넘긴다.
      const tween = gsap.effects[registeredEffectRegistration.name](`.${targetClassName}`, { ...descriptor.callConfig }) as gsap.core.Tween
      // replay handler가 같은 direct 반환 Tween을 처음부터 실행하도록 보관한다.
      tweenRef.current = tween
      // callback이 Tween data에 남긴 실제 normalized targets와 merged defaults를 읽는다.
      const data = tween.data as RegisteredEffectData
      // direct 반환과 callback 입력을 색상에 의존하지 않는 숫자·boolean으로 표시한다.
      setObservation({ targetCount: data.targetCount, effectiveDuration: data.effectiveDuration, returnedTween: tween instanceof gsap.core.Tween })
      // 새 radio 값으로 runtime이 준비됐지만 아직 움직이지 않았음을 알린다.
      setStatus('현재 config로 paused effect Tween을 준비했습니다. 실행 버튼을 눌러 확인하세요.')
      // context 정리 뒤 handler가 이전 Tween을 다시 실행하지 않게 참조를 비운다.
      return () => { tweenRef.current = null }
    },
    // mode나 motion 설정이 바뀌면 실행 중인 Tween을 되돌리고 paused 상태로 다시 준비한다.
    { scope, dependencies: [descriptor, reducedMotion], revertOnUpdate: true },
  )

  // direct 호출이 반환한 Tween을 수동으로 실행하고 reduced-motion에서는 즉시 끝 상태를 보여준다.
  function run() {
    // 아직 effect callback이 반환되지 않았으면 실행 action을 건너뛴다.
    const tween = tweenRef.current
    // runtime 준비 전 click은 현재 화면을 바꾸지 않는다.
    if (!tween) return

    if (reducedMotion) {
      // Tween 재생 헤드를 끝 상태로 고정해 이동 없이 결과만 보여준다.
      tween.restart().progress(1).pause()
      // 정적 실행의 effective duration과 target 수를 글로 알린다.
      setStatus(`정적 완료 · ${observation.targetCount}개 target · effective duration ${observation.effectiveDuration}초`)
      return
    }

    // 같은 paused Tween을 시작 상태부터 재생해 default와 override 시간을 비교한다.
    tween.restart()
    // 실행 중인 effective duration을 글로도 알린다.
    setStatus(`${observation.effectiveDuration}초 effect를 실행 중입니다.`)
  }

  // TSX가 controls·관찰값·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다.
  return { scope, targetClassName, mode, setMode, descriptor, observation, status, reducedMotion, run }
}
