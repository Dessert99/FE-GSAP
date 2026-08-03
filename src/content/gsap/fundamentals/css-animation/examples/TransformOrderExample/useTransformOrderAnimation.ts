/** transform property 선언 순서와 GSAP의 고정 적용 순서를 같은 descriptor로 비교한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** code panel에서 바꿀 object key의 선언 순서를 두 경우로 제한한다. */
export type TransformDeclarationOrder = 'translate-first' | 'rotation-first'

/** 실제 object insertion order와 값이 serializer까지 그대로 전달되게 한다. */
export type TransformDescriptor = {
  order: TransformDeclarationOrder
  entries: ReadonlyArray<readonly [string, number]>
}

// 선택한 순서대로 object entries를 만들되 같은 transform 값은 유지한다.
function createDescriptor(order: TransformDeclarationOrder): TransformDescriptor {
  // property 값은 유지하고 object에 들어가는 순서만 바꾼다.
  const entries = order === 'translate-first'
    ? [['x', 120], ['scale', 0.8], ['rotation', 45]] as const
    : [['rotation', 45], ['scale', 0.8], ['x', 120]] as const

  return { order, entries }
}

/** transform order 예제의 선언 순서와 최종 Tween config를 제공한다. */
export function useTransformOrderAnimation() {
  // 이 예제의 selector 조회와 cleanup 범위를 한정한다.
  const scope = useRef<HTMLDivElement>(null)
  // 실제 target과 표시 코드가 같은 class를 사용한다.
  const targetClassName = 'transform-order-example__target'
  // object literal에서 먼저 보일 property만 바꾼다.
  const [order, setOrder] = useState<TransformDeclarationOrder>('translate-first')
  // 사용자의 버튼 조작만 Tween을 시작하게 한다.
  const [runKey, setRunKey] = useState(0)
  // dependency 변경과 새 replay를 구분하도록 마지막 실행 key를 기억한다.
  const executedRunKey = useRef(0)
  // 모션 감소 설정에서는 같은 transform을 즉시 적용한다.
  const reducedMotion = useReducedMotion()
  // runtime과 code panel이 함께 읽는 선언 순서다.
  const descriptor = createDescriptor(order)
  // object insertion order를 보존한 채 실제 GSAP vars를 만든다.
  const transformVars = Object.fromEntries(descriptor.entries)
  // 실제 Tween과 serializer가 공유하는 최종 config다.
  const animationConfig = { ...transformVars, duration: reducedMotion ? 0 : 1, ease: 'power2.out' }

  useGSAP(
    () => {
      // 순서를 다시 비교할 때마다 같은 transform 상태에서 출발시킨다.
      gsap.set(`.${targetClassName}`, { x: 0, scale: 1, rotation: 0 })
      // mount와 dependency 변경에서는 autoplay하지 않고 새 replay key만 소비한다.
      if (runKey === executedRunKey.current) return
      // 같은 replay key의 후속 dependency 재실행이 Tween을 다시 시작하지 않게 기록한다.
      executedRunKey.current = runKey
      // 선언 순서가 달라도 GSAP이 같은 고정 순서로 transform을 합성한다.
      gsap.to(`.${targetClassName}`, animationConfig)
    },
    // 선언 순서·motion·replay가 바뀌면 이전 Tween을 되돌리고 다시 구성한다.
    { scope, dependencies: [order, reducedMotion, runKey], revertOnUpdate: true },
  )

  // 선언 순서 변경은 target만 reset하고 다음 실행 버튼을 기다린다.
  function selectOrder(nextOrder: TransformDeclarationOrder) {
    executedRunKey.current = 0
    setOrder(nextOrder)
    setRunKey(0)
  }

  // TSX가 실제 선언 순서와 control만 소비하도록 반환한다.
  return {
    scope,
    targetClassName,
    order,
    setOrder: selectOrder,
    descriptor,
    animationConfig,
    reducedMotion,
    hasRun: runKey > 0,
    replay: () => setRunKey((key) => key + 1),
  }
}
