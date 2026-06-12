import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — scroller의 scrollTop을 tween한다
import { ScrollToPlugin } from 'gsap/ScrollToPlugin' // scrollTo 속성을 tween에 추가하는 공식 플러그인

gsap.registerPlugin(ScrollToPlugin) // ScrollToPlugin을 GSAP에 등록한다

export function ScrollToTargetExample() {
  // GSAP이 직접 스크롤시킬 내부 scroller다.
  const container = useRef<HTMLDivElement>(null)
  // 버튼을 누르면 이동할 목표 요소다.
  const target = useRef<HTMLDivElement>(null)

  const moveToTarget = () => {
    if (!container.current || !target.current) return

    gsap.to(container.current, {
      scrollTo: {
        y: target.current, // 목표 DOM 요소의 위치로 내부 scroller를 이동한다
        offsetY: 48, // sticky nav 아래에 목표가 보이도록 도착점을 위로 보정한다
        autoKill: true, // 사용자가 직접 스크롤하면 tween을 자연스럽게 중단한다
      },
      duration: 0.7, // 이동 과정을 확인할 수 있는 짧은 시간
      ease: 'power2.out', // 도착 지점에서 부드럽게 감속한다
    })
  }

  const moveToTop = () => {
    if (!container.current) return

    gsap.to(container.current, {
      scrollTo: 0, // 숫자를 넘기면 해당 scrollTop 위치로 이동한다
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  return (
    <div ref={container} className="scroll-demo">
      {/* sticky nav가 있는 상황에서 offsetY가 왜 필요한지 보여준다 */}
      <div className="scroll-to-nav">
        <button className="demo-button" type="button" onClick={moveToTarget}>
          target
        </button>
        <button className="demo-button" type="button" onClick={moveToTop}>
          top
        </button>
      </div>
      {/* 목표 이전의 스크롤 여백 */}
      <div className="scroll-spacer">click target</div>
      {/* scrollTo.y가 찾아갈 목표 요소 */}
      <div ref={target} className="scroll-to-target">
        target section
      </div>
      {/* 목표 이후에도 스크롤 이동을 확인할 수 있게 하는 여백 */}
      <div className="scroll-spacer" />
    </div>
  )
}
