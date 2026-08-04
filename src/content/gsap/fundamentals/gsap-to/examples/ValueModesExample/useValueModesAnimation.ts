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

/** GSAP의 x 속성이 받을 수 있는 고정값·특수 문자열·target별 계산 함수다. */
type RuntimeX = number | string | ((index: number, target: HTMLElement, targets: HTMLElement[]) => number)

/** 학습용 descriptor를 GSAP이 Tween 시작 시 해석할 실제 x 값으로 바꾼다. */
function createRuntimeX(descriptor: ValueDescriptor): RuntimeX {
  switch (descriptor.mode) {
    case 'absolute': return descriptor.value
    case 'relativeAdd': return '+=' + descriptor.amount
    case 'relativeSubtract': return `-=${descriptor.amount}`
    case 'function': return (index, target, targets) => descriptor.base + Math.max(index, targets.indexOf(target)) * descriptor.step
    case 'randomRange': return `random(${descriptor.minimum}, ${descriptor.maximum}, ${descriptor.increment})`
    case 'randomArray': return `random([${descriptor.values.join(', ')}])`
    case 'utilsRandom': return () => gsap.utils.random(descriptor.minimum, descriptor.maximum, descriptor.increment)
  }
}

/** 값 표현 방식 예제 UI가 조절할 값과 정규화된 실행 설정을 제공한다. */
export function useValueModesAnimation() {
  // 여러 target을 한 번에 찾고 useGSAP 정리 범위를 제한할 DOM을 잡는다.
  const scope = useRef<HTMLDivElement>(null)
  // 실행 선택자와 미리보기 className이 같은 target 묶음을 가리키게 한다.
  const targetClassName = 'value-modes-example__bar'
  // 고정값·함수·랜덤·상대값 중 실행할 x 표현 방식을 선택한다.
  const [mode, setMode] = useState<ValueMode>('function')
  // 선택한 방식이 목표값이나 상대 이동량을 만들 때 사용할 기준 숫자다.
  const [amount, setAmount] = useState(150)
  // 값 계산과 이동 시간을 분리해서 비교할 Tween 재생 시간이다.
  const [duration, setDuration] = useState(0.8)
  // 같은 값 표현도 다시 평가하도록 재생 횟수를 센다.
  const [runKey, setRunKey] = useState(0)
  // 모션 감소 환경에서는 계산된 도착값을 이동 없이 즉시 보여준다.
  const reducedMotion = useReducedMotion()
  // 사용자가 고른 시간과 모션 설정을 실제 Tween duration으로 정규화한다.
  const animationDuration = reducedMotion ? 0 : duration
  // random 범위와 배열이 공유할 상한을 기준값에서 만든다.
  const maximum = amount + 60
  // 각 mode의 입력을 실행과 코드 패널이 함께 읽을 descriptor로 만든다.
  const valueDescriptors: Record<ValueMode, ValueDescriptor> = {
    absolute: { mode: 'absolute', value: amount },
    relativeAdd: { mode: 'relativeAdd', amount },
    relativeSubtract: { mode: 'relativeSubtract', amount: Math.round(amount / 2) },
    function: { mode: 'function', base: amount, step: 30 },
    randomRange: { mode: 'randomRange', minimum: Math.max(0, amount - 60), maximum, increment: 10 },
    randomArray: { mode: 'randomArray', values: [60, amount, maximum, 240] },
    utilsRandom: { mode: 'utilsRandom', minimum: 60, maximum, increment: 10 },
  }
  // 현재 mode에 해당하는 단 하나의 값 표현 descriptor를 고른다.
  const valueDescriptor = valueDescriptors[mode]
  // 실제 x 값과 표시 코드가 같은 descriptor에서 파생되도록 Tween 설정을 만든다.
  const animationConfig = { x: createRuntimeX(valueDescriptor), duration: animationDuration, ease: 'power2.out' }

  useGSAP(
    () => {
      // 함수와 랜덤 값이 target마다 평가되도록 scope 안의 대상 배열을 만든다.
      const targets = gsap.utils.toArray<HTMLElement>(`.${targetClassName}`)
      // 상대값의 기준을 120px로 맞춰 mode별 도착점을 같은 출발점에서 비교한다.
      gsap.set(targets, { x: 120 })
      // Tween이 시작되며 현재 x를 읽고 descriptor가 만든 목표값을 target마다 평가한다.
      gsap.to(targets, animationConfig)
    },
    // mode·기준값·시간·모션 설정·재생 횟수가 바뀌면 이전 Tween을 되돌리고 값을 다시 평가한다.
    { scope, dependencies: [mode, amount, duration, reducedMotion, runKey], revertOnUpdate: true },
  )

  // 예제 UI가 controls·preview·serializer에 사용할 동일한 실행 상태를 돌려준다.
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
