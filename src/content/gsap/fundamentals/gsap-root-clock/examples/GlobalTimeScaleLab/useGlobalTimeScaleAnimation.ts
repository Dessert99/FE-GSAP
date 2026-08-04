/** globalTimeline의 timeScale로 전체 속도를 바꾸고, 끝나면 반드시 1로 되돌리는 과정을 숫자로 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 학습자가 고를 수 있는 전역 배속 — 공식 예제가 든 0.5와 2를 포함한다. */
export type GlobalSpeed = 0.25 | 0.5 | 1 | 2

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type GlobalTimeScaleDescriptor = {
  selector: string
  requestedTimeScale: GlobalSpeed
  appliedTimeScale: number
  duration: number
  effectiveDuration: number
  travelX: number
}

/** 전역 값이 실제로 얼마이고 원래대로 돌아왔는지까지 화면에 숫자로 드러내는 관찰값이다. */
export type GlobalTimeScaleObservation = {
  globalTimeScale: number
  tweenOwnTimeScale: number
  tweenSeconds: number
  wallSeconds: number
  restored: boolean
}

/** gsap 선택자이자 상자의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.global-timescale-lab__target'

/** 전역 상태를 건드리는 예제라 언제든 반드시 되돌아가야 하는 기준값이다. */
const neutralTimeScale = 1

/** 배속의 효과만 보이도록 tween 자신의 duration은 어떤 선택에서도 바꾸지 않는다. */
const baseDuration = 1.2

/** 상자가 무대 안에서만 움직이도록 고정한 이동 거리다. */
const travelX = 200

/** radio 값과 모션 설정을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(requested: GlobalSpeed, reducedMotion: boolean): GlobalTimeScaleDescriptor {
  // 모션 감소 설정에서는 이동 자체를 없애므로 전역 배속을 건드릴 이유도 없다
  const appliedTimeScale = reducedMotion ? neutralTimeScale : requested

  return {
    selector: targetSelector,
    requestedTimeScale: requested,
    appliedTimeScale,
    duration: baseDuration,
    effectiveDuration: reducedMotion ? 0 : baseDuration,
    travelX,
  }
}

/** 표가 흔들리지 않도록 표시용으로만 자른다. */
function round(value: number) {
  return Math.round(value * 100) / 100
}

/** 전역 배속 예제의 controls, paused Tween, 관찰값, 실행·복원 action을 제공한다. */
export function useGlobalTimeScaleAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 준비된 paused Tween을 실행 버튼에서만 재생하도록 보관한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // tween 시간과 실제 벽시계 시간을 나란히 비교하기 위한 시작 시각이다
  const startedAtRef = useRef(0)
  // 전역에 적용할 배속 — 이 값 하나가 앱 안의 모든 animation에 걸린다
  const [requested, setRequested] = useState<GlobalSpeed>(0.5)
  // 전역 값·tween 자신의 값·두 시계를 한 번에 보여주는 관찰값이다
  const [observation, setObservation] = useState<GlobalTimeScaleObservation>({
    globalTimeScale: neutralTimeScale,
    tweenOwnTimeScale: neutralTimeScale,
    tweenSeconds: 0,
    wallSeconds: 0,
    restored: true,
  })
  // 준비·실행·복원 상태를 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 실행하지 않았습니다. 배속을 고르고 실행을 눌러 보세요.')
  // 운영체제 모션 감소 설정에서는 이동 없이 최종 상태만 보여준다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(requested, reducedMotion), [requested, reducedMotion])

  // 표시값이 추측이 아닌 관찰이 되도록 전역 값과 tween 값을 매번 GSAP에서 다시 읽는다
  function report() {
    const tween = tweenRef.current
    if (!tween) return

    const globalTimeScale = gsap.globalTimeline.timeScale()
    setObservation({
      globalTimeScale,
      tweenOwnTimeScale: tween.timeScale(),
      tweenSeconds: round(tween.time()),
      wallSeconds: round((performance.now() - startedAtRef.current) / 1000),
      restored: globalTimeScale === neutralTimeScale,
    })
  }

  useGSAP(
    () => {
      // 관찰과 실행이 같은 element를 가리키도록 선택자를 한 번만 풀어 둔다
      const target = gsap.utils.toArray<HTMLElement>(descriptor.selector)[0]
      // 이전 실행이 남긴 위치를 지워 항상 같은 지점에서 출발시킨다
      gsap.set(target, { x: 0 })
      // 전역 배속의 효과만 보이도록 tween 자신은 등속으로 두고 duration도 바꾸지 않는다
      const tween = gsap.to(target, {
        x: descriptor.travelX,
        duration: descriptor.effectiveDuration,
        ease: 'none',
        paused: true,
        // 진행 중에도 전역 값과 두 시계를 계속 다시 읽어 표시가 실행을 따라가게 한다
        onUpdate: report,
        onComplete() {
          // 전역 상태를 바꾼 예제이므로 끝나는 즉시 원래 값으로 되돌린다
          gsap.globalTimeline.timeScale(neutralTimeScale)
          report()
          setStatus('끝났습니다. globalTimeline.timeScale()을 1로 되돌렸습니다.')
        },
      })
      // 실행 handler가 같은 Tween을 처음부터 재생하도록 보관한다
      tweenRef.current = tween
      // 아직 움직이지 않았지만 현재 전역 값은 지금 바로 읽어 화면에 띄운다
      startedAtRef.current = performance.now()
      report()
      setStatus('현재 값으로 paused Tween을 준비했습니다. 실행 버튼을 눌러 확인하세요.')
      // 배속을 바꾸거나 페이지를 떠날 때 전역 값을 반드시 원래대로 돌려놓는다
      return () => {
        gsap.globalTimeline.timeScale(neutralTimeScale)
        tweenRef.current = null
      }
    },
    // 배속·모션 설정 중 하나만 바뀌어도 이전 Tween을 되돌리고 전역 값을 복원한 뒤 다시 준비한다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // 전역 배속을 걸고 준비된 Tween을 수동으로 재생한다
  function run() {
    const tween = tweenRef.current
    // runtime 준비 전 click은 화면을 바꾸지 않는다
    if (!tween) return

    // 이 한 줄이 이 예제뿐 아니라 앱 안의 모든 animation을 함께 느리게 만든다
    gsap.globalTimeline.timeScale(descriptor.appliedTimeScale)
    startedAtRef.current = performance.now()
    tween.restart()
    setStatus(
      reducedMotion
        ? '모션 감소 설정이라 전역 배속을 바꾸지 않고 최종 위치만 보여줍니다.'
        : `globalTimeline.timeScale(${descriptor.appliedTimeScale})을 걸고 ${descriptor.duration}초짜리 Tween을 재생했습니다.`,
    )
    report()
  }

  // 실행 중이라도 전역 값을 즉시 1로 되돌려 다른 예제와 앱 전체를 정상 속도로 복구한다
  function restore() {
    gsap.globalTimeline.timeScale(neutralTimeScale)
    report()
    setStatus('globalTimeline.timeScale()을 1로 되돌렸습니다. 남은 Tween은 정상 속도로 이어집니다.')
  }

  // TSX가 controls·관찰 패널·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return { scope, requested, setRequested, descriptor, observation, status, reducedMotion, run, restore }
}
