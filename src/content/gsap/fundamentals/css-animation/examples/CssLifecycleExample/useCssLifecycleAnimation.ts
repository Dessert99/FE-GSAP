/** autoAlpha와 clearProps의 시작·완료 상태를 실제 inline/computed 값으로 관찰한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** visibility와 inline cleanup을 한 번에 하나씩 관찰하게 한다. */
export type CssLifecycleMode = 'autoAlpha' | 'clearProps'

/** method와 vars를 실제 호출·code panel이 함께 읽는 형태로 고정한다. */
export type CssLifecycleDescriptor = {
  mode: CssLifecycleMode
  method: 'to' | 'from'
  vars: gsap.TweenVars
}

// 선택한 lifecycle 질문에 필요한 method와 vars만 만든다.
function createDescriptor(mode: CssLifecycleMode, duration: number): CssLifecycleDescriptor {
  if (mode === 'clearProps') {
    return {
      mode,
      method: 'from',
      vars: { x: 60, scale: 0.65, backgroundColor: '#ff9b73', clearProps: 'transform,backgroundColor', duration },
    }
  }

  return { mode, method: 'to', vars: { autoAlpha: 0, duration } }
}

/** CSS lifecycle 예제의 config와 완료 후 style 관찰값을 제공한다. */
export function useCssLifecycleAnimation() {
  // GSAP selector와 inline style cleanup을 이 예제 안으로 제한한다.
  const scope = useRef<HTMLDivElement>(null)
  // 실제 target과 표시 코드가 같은 class를 사용한다.
  const targetClassName = 'css-lifecycle-example__target'
  // autoAlpha와 clearProps 중 현재 관찰할 lifecycle을 고른다.
  const [mode, setMode] = useState<CssLifecycleMode>('autoAlpha')
  // mount·control 변경과 명시적인 실행 요청을 구분한다.
  const [runKey, setRunKey] = useState(0)
  // dependency 변경과 새 replay를 구분하도록 마지막 실행 key를 기억한다.
  const executedRunKey = useRef(0)
  // 완료 뒤 inline/computed style 차이를 텍스트로 전달한다.
  const [result, setResult] = useState('mode를 고른 뒤 실행하세요.')
  // 모션 감소 환경에서는 같은 lifecycle을 0초로 완료한다.
  const reducedMotion = useReducedMotion()
  // 실제 method와 vars를 code panel까지 공유하는 descriptor다.
  const descriptor = createDescriptor(mode, reducedMotion ? 0 : 1)

  // 실제 target의 inline style과 computed style을 완료 시점에 함께 읽는다.
  function inspectInlineStyles() {
    // 이 예제 범위 안의 단일 target만 관찰한다.
    const target = scope.current?.querySelector<HTMLElement>(`.${targetClassName}`)
    if (!target) return
    // stylesheet까지 반영된 최종 visibility·background를 확인한다.
    const computed = window.getComputedStyle(target)

    if (mode === 'autoAlpha') {
      setResult(`완료: inline opacity ${target.style.opacity || '없음'}, visibility ${target.style.visibility || '없음'} · computed ${computed.visibility}`)
      return
    }

    setResult(`완료: inline transform ${target.style.transform || '없음'}, backgroundColor ${target.style.backgroundColor || '없음'}`)
  }

  // 실제 config는 학습 vars와 완료 관찰 callback을 한 객체로 결합한다.
  const animationConfig = { ...descriptor.vars, onComplete: inspectInlineStyles }

  useGSAP(
    () => {
      // 이전 실행의 inline style을 지워 각 mode가 stylesheet 상태에서 출발하게 한다.
      gsap.set(`.${targetClassName}`, { clearProps: 'all' })
      // autoAlpha는 보이는 상태에서 opacity와 visibility를 함께 내린다.
      if (mode === 'autoAlpha') gsap.set(`.${targetClassName}`, { autoAlpha: 1 })
      // mount와 dependency 변경에서는 autoplay하지 않고 새 replay key만 소비한다.
      if (runKey === executedRunKey.current) return
      // 같은 replay key의 후속 dependency 재실행이 Tween을 다시 시작하지 않게 기록한다.
      executedRunKey.current = runKey
      // clearProps는 from Tween이 끝날 때 transform과 background inline style을 지운다.
      if (descriptor.method === 'from') gsap.from(`.${targetClassName}`, animationConfig)
      // autoAlpha는 opacity 0 도착과 동시에 visibility를 hidden으로 바꾼다.
      if (descriptor.method === 'to') gsap.to(`.${targetClassName}`, animationConfig)
    },
    // mode·motion·replay마다 이전 inline style과 Tween을 되돌린다.
    { scope, dependencies: [mode, reducedMotion, runKey], revertOnUpdate: true },
  )

  // mode가 바뀌면 실행 대기 상태로 돌아가 control 변경만으로 재생하지 않는다.
  function selectMode(nextMode: CssLifecycleMode) {
    executedRunKey.current = 0
    setMode(nextMode)
    setRunKey(0)
    setResult('mode를 고른 뒤 실행하세요.')
  }

  // 실행 상태 문구를 먼저 알리고 replay key로 현재 config를 시작한다.
  function replay() {
    setResult('실행 중입니다.')
    setRunKey((key) => key + 1)
  }

  // TSX가 control·동기화 config·완료 결과를 소비하도록 반환한다.
  return {
    scope,
    targetClassName,
    mode,
    setMode: selectMode,
    descriptor,
    animationConfig,
    reducedMotion,
    result,
    replay,
  }
}
