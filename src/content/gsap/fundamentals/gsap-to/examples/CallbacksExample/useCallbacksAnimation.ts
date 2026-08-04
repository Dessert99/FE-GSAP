/** 콜백 예제의 Tween 생명주기와 화면 관찰 상태를 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// 화면에 남길 최근 callback 이벤트 수를 제한해 관찰 순서를 읽기 쉽게 한다.
const MAX_LOGS = 7

/** 로그에 남길 callback과 Params 값을 실행·표시가 공유한다. */
export type LoggedCallbackDescriptor = {
  name: 'onStart' | 'onRepeat' | 'onComplete' | 'onReverseComplete' | 'onInterrupt'
  paramsValue: string
}

/** 콜백 예제가 실행할 설정과 제어·관찰 상태를 제공한다. */
export function useCallbacksAnimation() {
  // target 선택과 useGSAP 정리를 이 예제 DOM 안으로 제한한다.
  const scope = useRef<HTMLDivElement>(null)
  // 버튼과 progress 동기화가 같은 Tween 인스턴스를 제어하게 보관한다.
  const tween = useRef<gsap.core.Tween | null>(null)
  // onUpdate가 현재 Tween progress를 직접 표시할 output을 가리킨다.
  const meter = useRef<HTMLOutputElement>(null)
  // 실행 선택자와 미리보기 className이 같은 target을 가리키게 한다.
  const targetClassName = 'callbacks-example__target'
  // callback이 실제 호출된 순서를 화면에 누적한다.
  const [logs, setLogs] = useState<string[]>([])
  // 같은 설정도 새 Tween으로 다시 실행할 수 있도록 재생 횟수를 센다.
  const [runKey, setRunKey] = useState(0)
  // 모션 감소 환경에서는 긴 반복 없이 callback 결과를 즉시 보여준다.
  const reducedMotion = useReducedMotion()
  // callbackScope의 this가 전달됐는지 로그에서 확인할 이름이다.
  const callbackScopeLabel = 'demo tween'
  // onUpdateParams가 진행률 표시 함수에 전달할 식별값이다.
  const updateParamsValue = 'progress'
  // 실행 callback과 Params 및 표시 코드가 공유할 이벤트 목록이다.
  const loggedCallbacks: LoggedCallbackDescriptor[] = [
    { name: 'onStart', paramsValue: 'onStart' },
    { name: 'onRepeat', paramsValue: 'onRepeat' },
    { name: 'onComplete', paramsValue: 'onComplete' },
    { name: 'onReverseComplete', paramsValue: 'onReverseComplete' },
    { name: 'onInterrupt', paramsValue: 'onInterrupt' },
  ]
  // callback 수명주기를 관찰할 이동·반복 설정을 모션 환경에 맞춰 만든다.
  const animationConfig = {
    x: 210,
    duration: reducedMotion ? 0 : 1.1,
    repeat: reducedMotion ? 0 : 1,
    repeatDelay: reducedMotion ? 0 : 0.25,
    yoyo: true,
  }

  // 새 callback 메시지를 최근 일곱 개까지만 관찰 상태에 보관한다.
  function addLog(message: string) {
    setLogs((current) => [...current, message].slice(-MAX_LOGS))
  }

  // 저장한 Tween의 현재 progress를 접근 가능한 output 값과 맞춘다.
  function syncProgress(progressLabel: string) {
    if (meter.current && tween.current) {
      meter.current.value = `${Math.round(tween.current.progress() * 100)}%`
      meter.current.setAttribute('aria-label', `${progressLabel} 진행률`)
    }
  }

  useGSAP(
    () => {
      // 모든 일반 callback의 this로 사용할 공유 객체를 만든다.
      const callbackScope = { label: callbackScopeLabel }
      // descriptor를 실제 callback 함수와 같은 이름의 Params 속성으로 변환한다.
      const loggedCallbackVars = Object.fromEntries(loggedCallbacks.flatMap(({ name, paramsValue }) => [
        [name, function (this: typeof callbackScope, eventName: string) { addLog(`${this.label} · ${eventName}`) }],
        [`${name}Params`, [paramsValue]],
      ]))
      // 새 Tween의 callback 순서만 보이도록 이전 로그를 비운다.
      setLogs([])
      // 새 Tween이 시작되기 전에 progress 표시를 0%로 되돌린다.
      if (meter.current) meter.current.value = '0%'
      // 이전 실행이 남긴 x를 지워 callback 수명주기를 같은 위치에서 시작한다.
      gsap.set(`.${targetClassName}`, { x: 0 })
      // callbackScope·Params·onUpdate가 포함된 Tween을 만들고 이후 버튼 제어용으로 보관한다.
      tween.current = gsap.to(`.${targetClassName}`, {
        ...animationConfig,
        callbackScope,
        onUpdate: syncProgress,
        onUpdateParams: [updateParamsValue],
        ...loggedCallbackVars,
      })
      // duration 0인 모션 감소 환경에서도 생성 직후 progress를 즉시 반영한다.
      syncProgress(updateParamsValue)
    },
    // 모션 설정이나 재생 횟수가 바뀌면 이전 Tween을 되돌리고 callback 수명주기를 다시 만든다.
    { scope, dependencies: [reducedMotion, runKey], revertOnUpdate: true },
  )

  // 저장한 Tween을 처음부터 재생하고 progress 표시도 즉시 맞춘다.
  function restart() {
    tween.current?.restart()
    syncProgress(updateParamsValue)
  }

  // 저장한 Tween의 재생 방향을 뒤집고 progress 표시도 즉시 맞춘다.
  function reverse() {
    tween.current?.reverse()
    syncProgress(updateParamsValue)
  }

  // 완료 전 Tween을 중단해 onInterrupt를 발생시키고 progress를 마지막 상태로 맞춘다.
  function kill() {
    tween.current?.kill()
    syncProgress(updateParamsValue)
  }

  // 예제 UI가 controls·preview·serializer에 사용할 동일한 실행 상태를 돌려준다.
  return {
    scope,
    targetClassName,
    meter,
    logs,
    reducedMotion,
    animationConfig,
    callbackScopeLabel,
    updateParamsValue,
    loggedCallbacks,
    restart,
    reverse,
    kill,
    replay: () => setRunKey((key) => key + 1),
  }
}
