/** repeatRefresh 예제의 실행 단계와 목적지 관찰 상태를 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 단계별 학습 문구와 실행 설정을 같은 선택값으로 연결한다. */
export type RepeatRefreshStep = 'initial' | 'repeat' | 'refresh' | 'use'

// 각 학습 단계가 실행할 repeat와 repeatRefresh 조합을 고정한다.
const stepSettings = {
  initial: { repeat: 0, repeatRefresh: false },
  repeat: { repeat: 3, repeatRefresh: false },
  refresh: { repeat: 3, repeatRefresh: true },
  use: { repeat: 3, repeatRefresh: true },
} as const

/** repeatRefresh 예제 UI가 선택한 단계의 실행 설정과 관찰값을 제공한다. */
export function useRepeatRefreshAnimation() {
  // 이 예제의 GSAP 선택자와 정리 범위를 감싸는 DOM을 가리킨다.
  const scope = useRef<HTMLDivElement>(null)
  // 실행 코드와 미리보기가 같은 대상을 사용하도록 선택자를 공유한다.
  const targetClassName = 'repeat-refresh-example__target'
  // 첫 계산부터 활용까지 현재 설명·실행 단계를 제어한다.
  const [selectedStep, setSelectedStep] = useState<RepeatRefreshStep>('initial')
  // onRepeat가 알린 현재 전체 회차를 화면에 표시한다.
  const [cycle, setCycle] = useState(1)
  // 함수 기반 x가 실제로 평가될 때마다 뽑힌 목적지를 기록한다.
  const [destinations, setDestinations] = useState<number[]>([])
  // 같은 단계의 Tween을 처음부터 다시 만들 재생 횟수를 센다.
  const [runKey, setRunKey] = useState(0)
  // 사용자 환경에서 반복 움직임을 제거해야 하는지 확인한다.
  const reducedMotion = useReducedMotion()
  // 현재 학습 단계에 대응하는 반복 설정을 선택한다.
  const selectedSettings = stepSettings[selectedStep]
  // 함수 기반 x의 범위와 간격을 실행과 표시 코드가 함께 사용한다.
  const randomRange = { min: 40, max: 230, increment: 10 }
  // 실제 Tween과 표시 코드가 함께 사용할 실행 설정을 만든다.
  const animationConfig = {
    duration: reducedMotion ? 0 : 0.7,
    repeat: reducedMotion ? 0 : selectedSettings.repeat,
    repeatDelay: reducedMotion ? 0 : 0.25,
    repeatRefresh: selectedSettings.repeatRefresh,
    ease: 'power2.out',
  }

  useGSAP(
    () => {
      // 현재 Tween 안에서 함수 기반 x가 평가된 횟수를 센다.
      let evaluationCount = 0

      // 새 Tween의 회차 표시를 최초 실행으로 되돌린다.
      setCycle(1)
      // 이전 Tween의 목적지 평가 기록을 비운다.
      setDestinations([])
      // 이전 Tween이 남긴 transform을 지워 같은 시작점에서 비교한다.
      gsap.set(`.${targetClassName}`, { x: 0 })
      // 함수 기반 x와 현재 repeatRefresh 설정을 한 Tween으로 실행한다.
      gsap.to(`.${targetClassName}`, {
        // 새 전체 정방향 회차에서 평가될 때 목적지를 뽑고 기록한다.
        x: () => {
          // 공유 descriptor의 범위와 간격으로 다음 목적지를 선택한다.
          const nextDestination = gsap.utils.random(randomRange.min, randomRange.max, randomRange.increment)
          evaluationCount += 1
          // 첫 계산은 이전 실행 기록을 버리고, 이후 재계산만 현재 실행 기록에 덧붙인다.
          setDestinations((current) => evaluationCount === 1 ? [nextDestination] : [...current, nextDestination])
          return nextDestination
        },
        ...animationConfig,
        onRepeat: () => setCycle((current) => current + 1),
      })
    },
    // 단계·모션 설정·재생 횟수가 바뀌면 이전 Tween을 되돌리고 다시 만든다.
    { scope, dependencies: [selectedStep, reducedMotion, runKey], revertOnUpdate: true },
  )

  // 학습 단계를 바꾸고 해당 설정의 Tween을 새 실행으로 시작한다.
  function selectStep(nextStep: RepeatRefreshStep) {
    setSelectedStep(nextStep)
    setRunKey((key) => key + 1)
  }

  // UI가 실제 설정과 같은 회차·평가 기록을 표시하도록 필요한 상태만 전달한다.
  return {
    scope,
    targetClassName,
    selectedStep,
    selectStep,
    cycle,
    destinations,
    randomRange,
    animationConfig,
    reducedMotion,
    replay: () => setRunKey((key) => key + 1),
  }
}
