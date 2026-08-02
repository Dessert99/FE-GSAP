/** repeatRefresh 예제의 실행 단계와 목적지 관찰 상태를 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 단계별 학습 문구와 실행 설정을 같은 선택값으로 연결한다. */
export type RepeatRefreshStep = 'initial' | 'repeat' | 'refresh' | 'use'

const stepSettings = {
  initial: { repeat: 0, repeatRefresh: false },
  repeat: { repeat: 3, repeatRefresh: false },
  refresh: { repeat: 3, repeatRefresh: true },
  use: { repeat: 3, repeatRefresh: true },
} as const

/** repeatRefresh 예제 UI가 선택한 단계의 실행 설정과 관찰값을 제공한다. */
export function useRepeatRefreshAnimation() {
  const scope = useRef<HTMLDivElement>(null)
  const targetClassName = 'repeat-refresh-example__target'
  const [selectedStep, setSelectedStep] = useState<RepeatRefreshStep>('initial')
  const [cycle, setCycle] = useState(1)
  const [destinations, setDestinations] = useState<number[]>([])
  const [runKey, setRunKey] = useState(0)
  const reducedMotion = useReducedMotion()
  const selectedSettings = stepSettings[selectedStep]
  const animationConfig = {
    duration: reducedMotion ? 0 : 0.7,
    repeat: reducedMotion ? 0 : selectedSettings.repeat,
    repeatDelay: reducedMotion ? 0 : 0.25,
    repeatRefresh: selectedSettings.repeatRefresh,
    ease: 'power2.out',
  }

  useGSAP(
    () => {
      let evaluationCount = 0

      setCycle(1)
      setDestinations([])
      gsap.set(`.${targetClassName}`, { x: 0 })
      gsap.to(`.${targetClassName}`, {
        x: () => {
          const nextDestination = gsap.utils.random(40, 230, 10)
          evaluationCount += 1
          // 첫 계산은 이전 실행 기록을 버리고, 이후 재계산만 현재 실행 기록에 덧붙인다.
          setDestinations((current) => evaluationCount === 1 ? [nextDestination] : [...current, nextDestination])
          return nextDestination
        },
        ...animationConfig,
        onRepeat: () => setCycle((current) => current + 1),
      })
    },
    { scope, dependencies: [selectedStep, reducedMotion, runKey], revertOnUpdate: true },
  )

  function selectStep(nextStep: RepeatRefreshStep) {
    setSelectedStep(nextStep)
    setRunKey((key) => key + 1)
  }

  return {
    scope,
    targetClassName,
    selectedStep,
    selectStep,
    cycle,
    destinations,
    animationConfig,
    reducedMotion,
    replay: () => setRunKey((key) => key + 1),
  }
}
