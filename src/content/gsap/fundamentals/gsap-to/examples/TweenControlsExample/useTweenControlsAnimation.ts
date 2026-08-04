/** Tween 제어 예제의 실행 상태와 반환된 인스턴스 조작을 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** Tween 제어 예제가 표시하고 실행할 설정과 조작 메서드를 제공한다. */
export function useTweenControlsAnimation() {
  // 이 예제의 GSAP 선택자와 정리 범위를 감싸는 DOM을 가리킨다.
  const scope = useRef<HTMLDivElement>(null)
  // gsap.to()가 반환한 Tween을 버튼 이벤트에서도 계속 제어한다.
  const tween = useRef<gsap.core.Tween | null>(null)
  // Tween의 현재 진행률을 접근 가능한 output에 기록한다.
  const meter = useRef<HTMLOutputElement>(null)
  // 실행 코드와 미리보기가 같은 Tween 대상을 사용하게 한다.
  const targetClassName = 'tween-controls-example__target'
  // Tween playhead가 시작부터 끝까지 이동할 시간을 제어한다.
  const [duration, setDuration] = useState(2)
  // 같은 설정으로 Tween 인스턴스를 다시 만들 재생 횟수를 센다.
  const [runKey, setRunKey] = useState(0)
  // 사용자 환경에서 움직임을 즉시 완료해야 하는지 확인한다.
  const reducedMotion = useReducedMotion()
  // 실제 Tween과 표시 코드가 함께 사용할 실행 설정을 만든다.
  const animationConfig = {
    x: 220,
    rotation: 360,
    duration: reducedMotion ? 0 : duration,
    paused: true,
    id: 'controls-demo',
    data: { lesson: 'Tween controls' },
    ease: 'power1.inOut',
  }

  // Tween playhead의 0~1 progress를 사람이 읽는 백분율로 동기화한다.
  function syncProgress() {
    if (meter.current && tween.current) meter.current.value = `${Math.round(tween.current.progress() * 100)}%`
  }

  useGSAP(
    () => {
      // 새 Tween을 만들기 전에 표시 진행률을 시작점으로 되돌린다.
      if (meter.current) meter.current.value = '0%'
      // 이전 Tween이 남긴 transform을 지워 제어 결과를 같은 시작점에서 비교한다.
      gsap.set(`.${targetClassName}`, { x: 0, rotation: 0 })
      // 반환된 Tween을 ref에 저장해 이후 버튼이 같은 인스턴스를 제어하게 한다.
      tween.current = gsap.to(`.${targetClassName}`, { ...animationConfig, onUpdate: syncProgress })
      // 생성 직후 paused 상태의 현재 progress를 output에 반영한다.
      syncProgress()
    },
    // duration·모션 설정·재생 횟수가 바뀌면 기존 Tween을 되돌리고 다시 만든다.
    { scope, dependencies: [duration, reducedMotion, runKey], revertOnUpdate: true },
  )

  // 저장한 Tween의 현재 playhead부터 정방향 재생을 시작한다.
  function play() {
    tween.current?.play()
    syncProgress()
  }

  // 저장한 Tween의 현재 playhead를 그대로 멈춘다.
  function pause() {
    tween.current?.pause()
    syncProgress()
  }

  // 저장한 Tween의 현재 playhead부터 역방향 재생을 시작한다.
  function reverse() {
    tween.current?.reverse()
    syncProgress()
  }

  // 저장한 Tween의 playhead를 0초로 돌리고 정방향 재생한다.
  function restart() {
    tween.current?.restart()
    syncProgress()
  }

  // 초 단위 playhead를 전체 duration의 절반 위치로 옮긴다.
  function seekToHalfDuration() {
    tween.current?.seek(animationConfig.duration / 2)
    syncProgress()
  }

  // 0~1 비율 playhead를 절반 위치로 옮긴 뒤 멈춘다.
  function showHalfProgress() {
    tween.current?.progress(0.5).pause()
    syncProgress()
  }

  // UI가 같은 Tween의 상태와 제어 메서드를 사용하도록 필요한 값만 전달한다.
  return {
    scope,
    targetClassName,
    meter,
    duration,
    setDuration,
    reducedMotion,
    animationConfig,
    play,
    pause,
    reverse,
    restart,
    seekToHalfDuration,
    showHalfProgress,
    replay: () => setRunKey((key) => key + 1),
  }
}
