/** from 계열의 생성 직후 상태와 delay 뒤 상태를 실제 phase snapshot으로 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** immediateRender를 비교할 from 계열 method만 허용한다. */
export type ImmediateMethod = 'from' | 'fromTo'

/** 실행 config와 표시 코드가 공유할 immediateRender descriptor다. */
export type ImmediateRenderDescriptor =
  | { method: 'from'; currentX: number; fromVars: { x: number }; timing: { duration: number; delay: number; immediateRender: boolean }; createdX: number; finalX: number; reducedMotion: boolean }
  | { method: 'fromTo'; currentX: number; fromVars: { x: number }; toVars: { x: number }; timing: { duration: number; delay: number; immediateRender: boolean }; createdX: number; finalX: number; reducedMotion: boolean }

// 생성 직후·시작·완료에서 관찰한 target x를 보존한다.
type PhaseSnapshots = {
  createdX: number | null
  startedX: number | null
  finalX: number | null
  phase: 'ready' | 'created' | 'started' | 'finished'
}

// 선택값을 실제 호출과 snapshot 설명이 공유할 설정으로 정규화한다.
function createImmediateRenderDescriptor(method: ImmediateMethod, immediateRender: boolean, reducedMotion: boolean): ImmediateRenderDescriptor {
  // 두 method 모두 생성 전에 읽을 현재 x다.
  const currentX = 30
  // from 계열이 생성 직후 적용할 명시적 시작 x다.
  const fromVars = { x: -30 }
  // 모션 감소 환경은 0초·0초 delay로 호출하고 정적 snapshot을 따로 남긴다.
  const timing = { duration: reducedMotion ? 0 : 1.05, delay: reducedMotion ? 0 : 0.9, immediateRender }
  // immediateRender가 꺼지면 생성 직후에는 현재 x가 유지된다.
  const createdX = immediateRender ? fromVars.x : currentX

  if (method === 'from') return { method, currentX, fromVars, timing, createdX, finalX: currentX, reducedMotion }
  return { method, currentX, fromVars, toVars: { x: 138 }, timing, createdX, finalX: 138, reducedMotion }
}

// GSAP이 실제 target에 기록한 x를 snapshot용 숫자로 읽는다.
function readTargetX(target: HTMLElement) {
  return Math.round(Number(gsap.getProperty(target, 'x')))
}

/** method와 immediateRender를 바꿀 때 생성·시작·완료 phase를 다시 관찰한다. */
export function useImmediateRenderAnimation() {
  // useGSAP selector와 cleanup을 이 예제 DOM 안으로 제한한다.
  const scope = useRef<HTMLDivElement>(null)
  // runtime 호출과 preview가 공유할 target class다.
  const targetClassName = 'immediate-render-example__target'
  // 현재 비교할 from 계열 method를 보존한다.
  const [method, setMethod] = useState<ImmediateMethod>('from')
  // 생성 즉시 시작값을 적용할지 제어한다.
  const [immediateRender, setImmediateRender] = useState(true)
  // 같은 설정의 phase를 처음부터 다시 관찰하게 한다.
  const [runKey, setRunKey] = useState(0)
  // control 변경과 실제 replay action을 구분하도록 마지막 실행 key를 기억한다.
  const executedRunKey = useRef(0)
  // target에서 실제 관찰한 세 phase 값을 화면에 전달한다.
  const [snapshots, setSnapshots] = useState<PhaseSnapshots>({ createdX: null, startedX: null, finalX: null, phase: 'ready' })
  // OS 모션 감소 설정을 duration과 정적 snapshot 방식에 반영한다.
  const reducedMotion = useReducedMotion()
  // 실행과 표시가 함께 소비할 단일 descriptor를 만든다.
  const descriptor = useMemo(() => createImmediateRenderDescriptor(method, immediateRender, reducedMotion), [method, immediateRender, reducedMotion])

  useGSAP(
    () => {
      // selector 결과를 phase별 getProperty 관찰에 사용할 실제 element로 좁힌다.
      const target = scope.current?.querySelector<HTMLElement>(`.${targetClassName}`)
      if (!target) return

      // 매 비교 전 현재 상태를 같은 x로 초기화한다.
      gsap.set(target, { x: descriptor.currentX })
      // 이전 실행의 phase 안내를 새 생성 시점으로 되돌린다.
      setSnapshots({ createdX: null, startedX: null, finalX: null, phase: 'ready' })
      // mount와 control 변경에서는 현재 상태만 준비하고 새 replay action에서만 Tween을 만든다.
      if (runKey === executedRunKey.current) return
      // 이번 replay key를 소비해 같은 key의 dependency 재실행을 자동 재생으로 만들지 않는다.
      executedRunKey.current = runKey

      // Tween 시작 frame에서 실제 시작 x를 읽어 delay 전 상태와 비교한다.
      const observeStart = () => setSnapshots((current) => ({ ...current, startedX: readTargetX(target), phase: 'started' }))
      // Tween 완료 frame에서 실제 끝 x를 읽어 method의 도착값을 확인한다.
      const observeComplete = () => setSnapshots((current) => ({ ...current, finalX: readTargetX(target), phase: 'finished' }))
      // 두 method가 공유하는 시간·render·관찰 설정이다.
      const timingVars = { ...descriptor.timing, ease: 'none', onStart: observeStart, onComplete: observeComplete }

      if (descriptor.method === 'from') {
        // 명시한 fromVars를 시작으로 쓰고 초기화한 현재 x를 끝으로 보존한다.
        gsap.from(target, { ...descriptor.fromVars, ...timingVars })
      } else {
        // 현재 x와 무관하게 명시한 fromVars와 toVars 사이를 재생한다.
        gsap.fromTo(target, descriptor.fromVars, { ...descriptor.toVars, ...timingVars })
      }

      if (descriptor.reducedMotion) {
        // 생성 직후 상태를 이동 없이 한 frame에 적용해 첫 snapshot을 남긴다.
        gsap.set(target, { x: descriptor.createdX })
        // 모션 없이 시작·끝 차이를 읽도록 최종 상태도 같은 frame에 적용한다.
        gsap.set(target, { x: descriptor.finalX })
        setSnapshots({ createdX: descriptor.createdX, startedX: descriptor.createdX, finalX: descriptor.finalX, phase: 'finished' })
      } else {
        // normal motion에서는 GSAP이 생성 즉시 실제로 적용한 x를 읽는다.
        setSnapshots((current) => ({ ...current, createdX: readTargetX(target), phase: 'created' }))
      }
    },
    // method·immediateRender·motion·replay 변경마다 이전 Tween과 inline transform을 되돌린다.
    { scope, dependencies: [descriptor, runKey], revertOnUpdate: true },
  )

  // UI가 runtime descriptor와 실제 phase snapshot만 소비하게 한다.
  return {
    scope,
    targetClassName,
    method,
    setMethod,
    immediateRender,
    setImmediateRender,
    descriptor,
    snapshots,
    reducedMotion,
    replay: () => setRunKey((key) => key + 1),
  }
}
