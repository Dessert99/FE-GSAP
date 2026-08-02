/** 값 표현 방식 예제의 mode 분기와 실제 Tween 설정을 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 학습 UI와 실행 분기가 공유할 값 표현 방식이다. */
export type ValueMode = 'absolute' | 'relativeAdd' | 'relativeSubtract' | 'function' | 'randomRange' | 'randomArray' | 'utilsRandom'

/** 값 표현 mode의 의미를 실행과 코드 직렬화가 공유하는 설명자다. */
export type ValueDescriptor =
  | { mode: 'absolute', value: number }
  | { mode: 'relativeAdd', amount: number }
  | { mode: 'relativeSubtract', amount: number }
  | { mode: 'function', base: number, step: number }
  | { mode: 'randomRange', minimum: number, maximum: number, increment: number }
  | { mode: 'randomArray', values: number[] }
  | { mode: 'utilsRandom', minimum: number, maximum: number, increment: number }

type RuntimeX = number | string | ((index: number, target: HTMLElement, targets: HTMLElement[]) => number)

function createRuntimeX(descriptor: ValueDescriptor): RuntimeX {
  switch (descriptor.mode) {
    case 'absolute': return descriptor.value
    case 'relativeAdd': return `+=${descriptor.amount}`
    case 'relativeSubtract': return `-=${descriptor.amount}`
    case 'function': return (index, target, targets) => descriptor.base + Math.max(index, targets.indexOf(target)) * descriptor.step
    case 'randomRange': return `random(${descriptor.minimum}, ${descriptor.maximum}, ${descriptor.increment})`
    case 'randomArray': return `random([${descriptor.values.join(', ')}])`
    case 'utilsRandom': return () => gsap.utils.random(descriptor.minimum, descriptor.maximum, descriptor.increment)
  }
}

/** 값 표현 방식 예제 UI가 조절할 값과 정규화된 실행 설정을 제공한다. */
export function useValueModesAnimation() {
  const scope = useRef<HTMLDivElement>(null)
  const targetClassName = 'value-modes-example__bar'
  const [mode, setMode] = useState<ValueMode>('function')
  const [amount, setAmount] = useState(150)
  const [duration, setDuration] = useState(0.8)
  const [runKey, setRunKey] = useState(0)
  const reducedMotion = useReducedMotion()
  const animationDuration = reducedMotion ? 0 : duration
  const maximum = amount + 60
  const valueDescriptors: Record<ValueMode, ValueDescriptor> = {
    absolute: { mode: 'absolute', value: amount },
    relativeAdd: { mode: 'relativeAdd', amount },
    relativeSubtract: { mode: 'relativeSubtract', amount: Math.round(amount / 2) },
    function: { mode: 'function', base: amount, step: 30 },
    randomRange: { mode: 'randomRange', minimum: Math.max(0, amount - 60), maximum, increment: 10 },
    randomArray: { mode: 'randomArray', values: [60, amount, maximum, 240] },
    utilsRandom: { mode: 'utilsRandom', minimum: 60, maximum, increment: 10 },
  }
  const valueDescriptor = valueDescriptors[mode]
  const animationConfig = { x: createRuntimeX(valueDescriptor), duration: animationDuration, ease: 'power2.out' }

  useGSAP(
    () => {
      // 모션 감소 환경에서도 값 계산 결과는 남기되 이동 시간은 없앤다.
      const targets = gsap.utils.toArray<HTMLElement>(`.${targetClassName}`)
      gsap.set(targets, { x: 120 })
      gsap.to(targets, animationConfig)
    },
    { scope, dependencies: [mode, amount, duration, reducedMotion, runKey], revertOnUpdate: true },
  )

  return {
    scope,
    targetClassName,
    mode,
    setMode,
    amount,
    setAmount,
    duration,
    setDuration,
    valueDescriptor,
    animationConfig,
    reducedMotion,
    replay: () => setRunKey((key) => key + 1),
  }
}
