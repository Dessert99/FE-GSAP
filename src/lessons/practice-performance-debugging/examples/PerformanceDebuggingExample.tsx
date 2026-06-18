import { useRef } from 'react' // pointer 영역, 움직이는 점, 디버그 UI를 DOM ref로 잡는다.
import gsap from 'gsap' // quickSetter, quickTo, ticker, timeline을 사용한다.
import { GSDevTools } from 'gsap/GSDevTools' // 디버깅용 timeline scrub UI를 예제 안에 넣는다.
import { useGSAP } from '@gsap/react' // ticker, 이벤트 리스너, GSDevTools cleanup을 React lifecycle에 맞춘다.

gsap.registerPlugin(GSDevTools)

export function PerformanceDebuggingExample() {
  // 이 실습 안에서만 pointer 이벤트와 디버그 timeline을 만든다.
  const container = useRef<HTMLDivElement>(null)
  // pointer 위치를 즉시 따라가는 점이다.
  const rawDot = useRef<HTMLDivElement>(null)
  // quickTo로 부드럽게 따라가는 점이다.
  const smoothDot = useRef<HTMLDivElement>(null)
  // ticker가 프레임 상태를 짧게 표시하는 요소다.
  const readout = useRef<HTMLSpanElement>(null)
  // GSDevTools가 렌더링될 영역이다.
  const tools = useRef<HTMLDivElement>(null)

  useGSAP(
    (context) => {
      if (!container.current || !rawDot.current || !smoothDot.current || !readout.current || !tools.current) return

      const area = container.current
      const readoutElement = readout.current
      const toolsElement = tools.current
      const setRawX = gsap.quickSetter(rawDot.current, 'x', 'px')
      const setRawY = gsap.quickSetter(rawDot.current, 'y', 'px')
      const smoothX = gsap.quickTo(smoothDot.current, 'x', { duration: 0.28, ease: 'power3.out' })
      const smoothY = gsap.quickTo(smoothDot.current, 'y', { duration: 0.28, ease: 'power3.out' })

      const moveToCenter = () => {
        const bounds = area.getBoundingClientRect()
        const x = bounds.width / 2
        const y = bounds.height / 2

        setRawX(x)
        setRawY(y)
        smoothX(x)
        smoothY(y)
      }

      const handlePointerMove = (event: PointerEvent) => {
        const bounds = area.getBoundingClientRect()
        const x = event.clientX - bounds.left
        const y = event.clientY - bounds.top

        // quickSetter는 즉시 값을 쓰므로 pointermove마다 새 tween을 만들지 않는다.
        // 영향: 고빈도 입력에서도 raw 점은 이벤트 위치를 가볍게 따라간다.
        setRawX(x)
        setRawY(y)

        // quickTo는 내부 tween 하나를 재사용해 목표값만 바꾼다.
        // 영향: 매 이벤트마다 gsap.to()를 새로 만드는 방식보다 overlap과 GC 부담이 작다.
        smoothX(x)
        smoothY(y)
      }

      let frames = 0
      const updateReadout = () => {
        frames += 1

        if (frames % 12 === 0) {
          readoutElement.textContent = `delta ${gsap.ticker.deltaRatio().toFixed(2)} / frame ${frames}`
        }
      }

      const timeline = gsap
        .timeline({ id: 'practice-debug-timeline', paused: true, defaults: { duration: 0.42, ease: 'power2.out' } })
        .to('.performance-debugging__step--one', { x: 120 })
        .addLabel('color')
        .to('.performance-debugging__step--two', { x: 120, backgroundColor: '#22c55e' }, '-=0.16')
        .addLabel('finish')
        .to('.performance-debugging__step--three', { x: 120, rotation: 10 }, '-=0.16')

      let tool: GSDevTools | null = null

      context.ignore(() => {
        tool = GSDevTools.create({
          id: 'practice-debug-tools',
          animation: timeline, // 이 실습용 timeline만 scrub한다.
          container: toolsElement,
          css: {
            position: 'absolute',
            top: 16,
            left: 0,
            right: 0,
            bottom: 'auto',
          },
          globalSync: false,
          minimal: true,
          paused: true,
          persist: false,
        })
      })

      moveToCenter()
      area.addEventListener('pointermove', handlePointerMove)
      gsap.ticker.add(updateReadout)

      return () => {
        area.removeEventListener('pointermove', handlePointerMove)
        gsap.ticker.remove(updateReadout)
        tool?.kill()
        tool = null
      }
    },
    { scope: container },
  )

  return (
    <section ref={container} className="performance-debugging" aria-label="Performance and debugging practice">
      <div className="performance-debugging__pointer">
        <span className="performance-debugging__hint">Move pointer here</span>
        <div ref={rawDot} className="performance-debugging__dot performance-debugging__dot--raw" />
        <div ref={smoothDot} className="performance-debugging__dot performance-debugging__dot--smooth" />
      </div>
      <div className="callback-readout">
        <span>ticker</span>
        <strong ref={readout}>waiting for frames</strong>
      </div>
      <div className="performance-debugging__lanes">
        <div className="performance-debugging__track">
          <div className="performance-debugging__step performance-debugging__step--one" />
        </div>
        <div className="performance-debugging__track">
          <div className="performance-debugging__step performance-debugging__step--two" />
        </div>
        <div className="performance-debugging__track">
          <div className="performance-debugging__step performance-debugging__step--three" />
        </div>
      </div>
      <div ref={tools} className="performance-debugging__tools" />
    </section>
  )
}
