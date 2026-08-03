/** CSS 값 표현 mode와 실제 CSSPlugin vars를 하나의 descriptor에서 만든다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 하나의 target에서 바꿔 볼 CSS 값 표현 방식을 제한한다. */
export type CssValueMode = 'complex' | 'units' | 'variable'

/** 초기 CSS와 목표 vars를 표시 코드와 실제 Tween이 함께 사용한다. */
export type CssValueDescriptor = {
  mode: CssValueMode
  baseline: gsap.TweenVars
  vars: gsap.TweenVars
}

// 선택한 질문에 필요한 CSS 값만 runtime descriptor로 정규화한다.
function createDescriptor(mode: CssValueMode): CssValueDescriptor {
  if (mode === 'units') {
    return { mode, baseline: { width: '50%' }, vars: { width: '200px' } }
  }

  if (mode === 'variable') {
    return { mode, baseline: { '--css-demo-hue': 20 }, vars: { '--css-demo-hue': 190 } }
  }

  return {
    mode,
    baseline: { boxShadow: '0 0 0 0 rgb(200 241 105 / 0%)', borderRadius: '12% 12%' },
    vars: { boxShadow: '0 0 28px 12px rgb(200 241 105 / 70%)', borderRadius: '50% 18%' },
  }
}

/** CSS 값 예제의 control과 normalized Tween config를 제공한다. */
export function useCssValueParsingAnimation() {
  // useGSAP이 선택자와 cleanup을 이 예제 안으로 한정한다.
  const scope = useRef<HTMLDivElement>(null)
  // 실제 target과 표시 코드가 같은 선택자 이름을 사용한다.
  const targetClassName = 'css-value-example__target'
  // complex string·unit conversion·CSS variable 중 현재 질문을 고른다.
  const [mode, setMode] = useState<CssValueMode>('complex')
  // mount나 control 변경이 아니라 사용자의 실행 의도만 Tween을 시작시킨다.
  const [runKey, setRunKey] = useState(0)
  // dependency 변경과 새 replay를 구분하도록 마지막 실행 key를 기억한다.
  const executedRunKey = useRef(0)
  // 운영체제 설정에 따라 이동 시간을 제거한다.
  const reducedMotion = useReducedMotion()
  // runtime과 serializer가 공유할 시작값·목표값 묶음이다.
  const descriptor = createDescriptor(mode)
  // reduced-motion을 포함한 최종 vars가 실제 호출과 code panel의 단일 원본이다.
  const animationConfig = { ...descriptor.vars, duration: reducedMotion ? 0 : 1, ease: 'power2.out' }

  useGSAP(
    () => {
      // mode가 바뀌면 한 target을 해당 질문의 유효한 시작 CSS로 되돌린다.
      gsap.set(`.${targetClassName}`, { clearProps: 'all' })
      // 각 mode의 시작 단위와 문자열을 Tween 전에 먼저 적용한다.
      gsap.set(`.${targetClassName}`, descriptor.baseline)
      // mount와 dependency 변경에서는 autoplay하지 않고 새 replay key만 소비한다.
      if (runKey === executedRunKey.current) return
      // 같은 replay key의 후속 dependency 재실행이 Tween을 다시 시작하지 않게 기록한다.
      executedRunKey.current = runKey
      // 같은 descriptor에서 만든 vars로 CSS 값 하나의 변화를 실행한다.
      gsap.to(`.${targetClassName}`, animationConfig)
    },
    // mode·motion·replay가 바뀌면 이전 inline 값을 되돌리고 현재 descriptor로 다시 만든다.
    { scope, dependencies: [mode, reducedMotion, runKey], revertOnUpdate: true },
  )

  // control 변경은 시작 상태만 바꾸고 사용자가 다시 실행할 때까지 기다린다.
  function selectMode(nextMode: CssValueMode) {
    executedRunKey.current = 0
    setMode(nextMode)
    setRunKey(0)
  }

  // 소비하는 TSX에 control·실행 config·관찰 상태만 전달한다.
  return {
    scope,
    targetClassName,
    mode,
    setMode: selectMode,
    descriptor,
    animationConfig,
    reducedMotion,
    hasRun: runKey > 0,
    replay: () => setRunKey((key) => key + 1),
  }
}
