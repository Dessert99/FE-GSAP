/** local Observer만 실행하고 normalization과 proxy는 정적 설명으로 남긴다. */
import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** local Observer가 last discrete direction을 전달하는 작은 readout shape다. */
export type ObserverReadout = 'ready' | 'up' | 'down'

// ScrollTrigger.observe를 local target runtime에서 호출할 수 있게 plugin을 등록한다
gsap.registerPlugin(ScrollTrigger)

/** native keyboard scroll을 가로채지 않는 local wheel/touch Observer lifecycle을 소유한다. */
export function useLocalObserverRuntime() {
  // useGSAP context가 observer target과 cleanup을 local example에 한정한다
  const scope = useRef<HTMLDivElement>(null)
  // Observer가 global window 대신 local event surface만 감시하게 한다
  const targetRef = useRef<HTMLDivElement>(null)
  // continuous delta 대신 마지막 intentional direction만 polite readout으로 고정한다
  const [readout, setReadout] = useState<ObserverReadout>('ready')

  // target mount 후 observe call을 만들고 unmount에서 observer를 kill한다
  useGSAP(
    () => {
      // local target가 없으면 global observer fallback을 만들지 않는다
      const target = targetRef.current
      if (!target) return undefined
      // default prevention 없이 wheel/touch direction만 읽어 native keyboard/local scrolling을 보존한다
      const observer = ScrollTrigger.observe({
        target,
        type: 'wheel,touch',
        preventDefault: false,
        onUp: () => setReadout('up'),
        onDown: () => setReadout('down'),
      })
      // 이 hook이 만든 observer만 kill해 다른 Observer를 건드리지 않는다
      return () => observer.kill()
    },
    // selector와 cleanup을 이 예제의 DOM 범위에 한정한다
    { scope },
  )

  // replay control은 Observer lifetime을 바꾸지 않고 discrete output만 초기화한다
  const resetReadout = () => setReadout('ready')

  // TSX는 local scope/target, discrete Observer result와 reset action만 받는다
  return { scope, targetRef, readout, resetReadout }
}
