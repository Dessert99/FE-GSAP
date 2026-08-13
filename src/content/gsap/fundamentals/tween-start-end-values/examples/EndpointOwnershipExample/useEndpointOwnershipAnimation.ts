/** 네 생성 method의 current·start·end descriptor와 실제 Tween 호출을 함께 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 예제에서 비교할 네 생성 method만 허용한다. */
export type EndpointMethod = 'to' | 'from' | 'fromTo' | 'set'

// 모든 method가 실행 전에 공유하는 현재 DOM 상태를 나타낸다.
type InitialVars = { x: number }

// preview 레이블과 네 method descriptor가 공유하는 비교 좌표다.
export const endpointPositions = { start: -32, current: 24, end: 140 } as const

/** runtime 실행과 코드 serializer가 함께 읽는 method별 설정이다. */
export type EndpointDescriptor =
  | { method: 'to'; initialVars: InitialVars; vars: { x: number; duration: number; ease: string }; ownership: { start: string; end: string } }
  | { method: 'from'; initialVars: InitialVars; vars: { x: number; duration: number; ease: string }; ownership: { start: string; end: string } }
  | { method: 'fromTo'; initialVars: InitialVars; fromVars: { x: number }; toVars: { x: number; duration: number; ease: string }; ownership: { start: string; end: string } }
  | { method: 'set'; initialVars: InitialVars; vars: { x: number }; ownership: { start: string; end: string } }

// 선택한 method와 모션 설정을 실제 GSAP 호출 형태로 정규화한다.
function createEndpointDescriptor(method: EndpointMethod, reducedMotion: boolean): EndpointDescriptor {
  // 모든 비교가 같은 현재 위치에서 시작하게 한다.
  const initialVars = { x: endpointPositions.current }
  // 모션 감소 환경에서는 같은 목표 상태를 즉시 적용한다.
  const duration = reducedMotion ? 0 : 1.15

  if (method === 'to') return { method, initialVars, vars: { x: endpointPositions.end, duration, ease: 'power2.out' }, ownership: { start: `현재 x ${endpointPositions.current}`, end: `vars x ${endpointPositions.end}` } }
  if (method === 'from') return { method, initialVars, vars: { x: endpointPositions.start, duration, ease: 'power2.out' }, ownership: { start: `vars x ${endpointPositions.start}`, end: `현재 x ${endpointPositions.current}` } }
  if (method === 'fromTo') return { method, initialVars, fromVars: { x: endpointPositions.start }, toVars: { x: endpointPositions.end, duration, ease: 'power2.out' }, ownership: { start: `fromVars x ${endpointPositions.start}`, end: `toVars x ${endpointPositions.end}` } }
  return { method, initialVars, vars: { x: endpointPositions.end }, ownership: { start: '보간 없음', end: `vars x ${endpointPositions.end} 즉시 적용` } }
}

/** method 선택과 동일 descriptor로 실제 Tween을 다시 만든다. */
export function useEndpointOwnershipAnimation() {
  // useGSAP이 예제 밖의 같은 class를 건드리지 않게 범위를 제한한다.
  const scope = useRef<HTMLDivElement>(null)
  // 표시 코드와 실제 GSAP 호출이 공유할 selector다.
  const targetSelector = '.box'
  // 공통 selector와 preview 전용 스타일을 target의 class에 함께 연결한다.
  const targetClassName = 'box endpoint-ownership-example__target'
  // 네 생성 method 중 현재 비교할 항목을 보존한다.
  const [method, setMethod] = useState<EndpointMethod>('to')
  // 같은 설정을 다시 출발점부터 실행하기 위한 key다.
  const [runKey, setRunKey] = useState(0)
  // control 변경과 실제 replay action을 구분하도록 마지막 실행 key를 기억한다.
  const executedRunKey = useRef(0)
  // OS의 모션 감소 설정을 실행 duration에 반영한다.
  const reducedMotion = useReducedMotion()
  // 실행과 표시 코드가 함께 읽을 단일 descriptor를 만든다.
  const descriptor = useMemo(() => createEndpointDescriptor(method, reducedMotion), [method, reducedMotion])

  useGSAP(
    () => {
      // 선택한 method가 항상 같은 현재 x를 읽도록 먼저 기준 상태를 만든다.
      gsap.set(targetSelector, descriptor.initialVars)
      // mount와 control 변경에서는 기준 상태만 준비하고 새 replay action에서만 Tween을 만든다.
      if (runKey === executedRunKey.current) return
      // 이번 replay key를 소비해 같은 key의 dependency 재실행을 자동 재생으로 만들지 않는다.
      executedRunKey.current = runKey

      if (descriptor.method === 'to') {
        // 현재 x를 시작값으로 읽고 vars의 목표 x까지 이동한다.
        gsap.to(targetSelector, descriptor.vars)
      } else if (descriptor.method === 'from') {
        // vars의 x를 즉시 시작값으로 놓고 미리 만든 현재 x로 돌아온다.
        gsap.from(targetSelector, descriptor.vars)
      } else if (descriptor.method === 'fromTo') {
        // 현재 x를 무시하고 fromVars와 toVars에 적은 두 끝을 그대로 사용한다.
        gsap.fromTo(targetSelector, descriptor.fromVars, descriptor.toVars)
      } else {
        // 중간값 없이 vars의 x를 같은 frame에 즉시 적용한다.
        gsap.set(targetSelector, descriptor.vars)
      }
    },
    // method·모션 설정·replay가 바뀌면 이전 inline transform을 되돌리고 다시 비교한다.
    { scope, dependencies: [descriptor, runKey], revertOnUpdate: true },
  )

  // UI가 runtime descriptor와 replay action을 그대로 소비한다.
  return {
    scope,
    targetSelector,
    targetClassName,
    method,
    setMethod,
    descriptor,
    reducedMotion,
    replay: () => setRunKey((key) => key + 1),
  }
}
