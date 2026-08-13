/** local container의 ScrollToPlugin tween과 전역 config 복원을 소유한다. */
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 실제 tween·code·snapshot이 함께 읽는 하나의 목적지 descriptor다. */
export const scrollDescriptor = {
  target: 'max',
  offsetY: 12,
  duration: 0.6,
  autoKill: true,
  autoKillThreshold: 7,
} as const

// 바꾼 GSAP 전역 키의 존재 여부까지 보존해 원래 없던 autoKill을 남기지 않는다
type ScrollConfigSnapshot = {
  autoKill: unknown
  autoKillThreshold: unknown
  hadAutoKill: boolean
  hadAutoKillThreshold: boolean
}

/** local element scroll만 실행하고 tween과 global config를 cleanup에서 되돌린다. */
export function useLocalScrollRuntime() {
  // local container만 ScrollToPlugin target으로 보존한다
  const containerRef = useRef<HTMLDivElement>(null)
  // 새 명령 전 현재 tween을 죽이고 cleanup에서도 같은 instance를 정리한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // global config를 바꾸기 전의 값을 한 번만 snapshot한다
  const configRef = useRef<ScrollConfigSnapshot | null>(null)
  // 실행 결과는 discrete status와 code panel이 공유한다
  const [status, setStatus] = useState('아직 이동하지 않았습니다.')
  // OS 설정은 부드러운 tween 대신 즉시 local scroll을 선택한다
  const reducedMotion = useReducedMotion()

  // 현재 descriptor로 local destination을 실행한다
  function scroll() {
    // DOM mount 전에는 local target이 없으므로 실행하지 않는다
    const container = containerRef.current
    if (!container) return
    // 같은 scrollTop을 동시에 쓰는 이전 tween을 먼저 정리한다
    tweenRef.current?.kill()
    tweenRef.current = null
    // reduced motion은 plugin 전역 설정을 건드리지 않고 같은 목적지를 즉시 적용한다
    if (reducedMotion) {
      container.scrollTop =
        container.scrollHeight -
        container.clientHeight -
        scrollDescriptor.offsetY
      setStatus('reduced motion · native local scroll로 즉시 도착했습니다.')
      return
    }
    // 명시적인 plugin config 변경 전 현재 전역 값을 먼저 보존한다
    const globalConfig = gsap.config() as Record<string, unknown>
    configRef.current ??= {
      autoKill: globalConfig.autoKill,
      autoKillThreshold: globalConfig.autoKillThreshold,
      hadAutoKill: Object.hasOwn(globalConfig, 'autoKill'),
      hadAutoKillThreshold: Object.hasOwn(globalConfig, 'autoKillThreshold'),
    }
    // actual tween 전에 plugin 등록을 명시적으로 보장한다
    gsap.registerPlugin(ScrollToPlugin)
    // descriptor의 autoKill boundary를 현재 plugin config에 적용한다
    ScrollToPlugin.config({
      autoKill: scrollDescriptor.autoKill,
      autoKillThreshold: scrollDescriptor.autoKillThreshold,
    })
    // descriptor와 같은 target·offset으로 local element의 y scroll만 tween한다
    tweenRef.current = gsap.to(container, {
      duration: scrollDescriptor.duration,
      scrollTo: {
        y: scrollDescriptor.target,
        offsetY: scrollDescriptor.offsetY,
        autoKill: scrollDescriptor.autoKill,
        onAutoKill: () =>
          setStatus('사용자 scroll이 tween을 autoKill했습니다.'),
      },
      onComplete: () => setStatus('local max 목적지에 도착했습니다.'),
    })
    setStatus('local container를 max까지 tween 중입니다.')
  }

  // unmount 시 example owner가 만든 runtime state만 되돌린다
  function cleanup() {
    // component owner가 만든 tween만 kill한다
    tweenRef.current?.kill()
    tweenRef.current = null
    // 변경한 global config만 captured snapshot으로 복원한다
    const snapshot = configRef.current
    if (snapshot) {
      // plugin config가 참조하는 GSAP 전역 객체에서 원래 있던 키와 값만 복원한다
      const globalConfig = gsap.config() as Record<string, unknown>
      if (snapshot.hadAutoKill) globalConfig.autoKill = snapshot.autoKill
      else delete globalConfig.autoKill
      if (snapshot.hadAutoKillThreshold)
        globalConfig.autoKillThreshold = snapshot.autoKillThreshold
      else delete globalConfig.autoKillThreshold
    }
    configRef.current = null
  }

  return {
    containerRef,
    reducedMotion,
    status,
    scroll,
    cleanup,
    descriptor: scrollDescriptor,
  }
}
