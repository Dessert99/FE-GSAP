/** 콜백 예제의 Tween 생명주기와 화면 관찰 상태를 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

const MAX_LOGS = 7

/** 로그에 남길 callback과 Params 값을 실행·표시가 공유한다. */
export type LoggedCallbackDescriptor = {
  name: 'onStart' | 'onRepeat' | 'onComplete' | 'onReverseComplete' | 'onInterrupt'
  paramsValue: string
}

/** 콜백 예제가 실행할 설정과 제어·관찰 상태를 제공한다. */
export function useCallbacksAnimation() {
  const scope = useRef<HTMLDivElement>(null)
  const tween = useRef<gsap.core.Tween | null>(null)
  const meter = useRef<HTMLOutputElement>(null)
  const targetClassName = 'callbacks-example__target'
  const [logs, setLogs] = useState<string[]>([])
  const [runKey, setRunKey] = useState(0)
  const reducedMotion = useReducedMotion()
  const callbackScopeLabel = 'demo tween'
  const loggedCallbacks: LoggedCallbackDescriptor[] = [
    { name: 'onStart', paramsValue: 'onStart' },
    { name: 'onRepeat', paramsValue: 'onRepeat' },
    { name: 'onComplete', paramsValue: 'onComplete' },
    { name: 'onReverseComplete', paramsValue: 'onReverseComplete' },
    { name: 'onInterrupt', paramsValue: 'onInterrupt' },
  ]
  const animationConfig = {
    x: 210,
    duration: reducedMotion ? 0 : 1.1,
    repeat: reducedMotion ? 0 : 1,
    repeatDelay: reducedMotion ? 0 : 0.25,
    yoyo: true,
  }

  function addLog(message: string) {
    setLogs((current) => [...current, message].slice(-MAX_LOGS))
  }

  function syncProgress() {
    if (meter.current && tween.current) meter.current.value = `${Math.round(tween.current.progress() * 100)}%`
  }

  useGSAP(
    () => {
      // 모션 감소 환경에서는 반복을 제거하고 즉시 완료 결과만 보여준다.
      const callbackScope = { label: callbackScopeLabel }
      const loggedCallbackVars = Object.fromEntries(loggedCallbacks.flatMap(({ name, paramsValue }) => [
        [name, function (this: typeof callbackScope, eventName: string) { addLog(`${this.label} · ${eventName}`) }],
        [`${name}Params`, [paramsValue]],
      ]))
      setLogs([])
      if (meter.current) meter.current.value = '0%'
      gsap.set(`.${targetClassName}`, { x: 0 })
      tween.current = gsap.to(`.${targetClassName}`, {
        ...animationConfig,
        callbackScope,
        onUpdate: syncProgress,
        ...loggedCallbackVars,
      })
      syncProgress()
    },
    { scope, dependencies: [reducedMotion, runKey], revertOnUpdate: true },
  )

  function restart() {
    tween.current?.restart()
    syncProgress()
  }

  function reverse() {
    tween.current?.reverse()
    syncProgress()
  }

  function kill() {
    tween.current?.kill()
    syncProgress()
  }

  return {
    scope,
    targetClassName,
    meter,
    logs,
    reducedMotion,
    animationConfig,
    callbackScopeLabel,
    loggedCallbacks,
    restart,
    reverse,
    kill,
    replay: () => setRunKey((key) => key + 1),
  }
}
