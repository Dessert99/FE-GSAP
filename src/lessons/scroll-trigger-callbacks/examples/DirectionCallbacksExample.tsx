import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 콜백에서 시각 상태를 바꿀 때 사용한다
import { ScrollTrigger } from 'gsap/ScrollTrigger' // 스크롤 경계 콜백을 제공하는 공식 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

gsap.registerPlugin(ScrollTrigger) // ScrollTrigger 플러그인을 GSAP에 등록한다

export function DirectionCallbacksExample() {
  // 예제 안의 독립 scroller다.
  const container = useRef<HTMLDivElement>(null)
  // 콜백이 감시할 trigger 카드다.
  const card = useRef<HTMLDivElement>(null)
  // 마지막으로 호출된 콜백 이름을 표시한다.
  const eventName = useRef<HTMLElement>(null)
  // 현재 active 상태를 표시한다.
  const activeState = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!container.current || !card.current || !eventName.current || !activeState.current) return

      const show = (name: string, isActive: boolean) => {
        if (!eventName.current || !activeState.current || !card.current) return

        eventName.current.textContent = name
        activeState.current.textContent = isActive ? 'active' : 'outside'
        gsap.to(card.current, {
          backgroundColor: isActive ? '#22c55e' : '#38bdf8',
          duration: 0.2,
        })
      } // 콜백 결과를 화면 텍스트와 카드 색으로 함께 보여준다

      ScrollTrigger.create({
        trigger: card.current, // 이 카드의 start/end 경계를 감시한다
        scroller: container.current, // window 대신 예제 내부 스크롤 박스를 사용한다
        start: 'top 75%', // 아래로 내려와 active가 시작되는 경계
        end: 'bottom 35%', // 아래로 내려가 active가 끝나는 경계
        onEnter: () => show('onEnter', true), // 아래 방향으로 start를 통과할 때 실행된다
        onLeave: () => show('onLeave', false), // 아래 방향으로 end를 통과할 때 실행된다
        onEnterBack: () => show('onEnterBack', true), // 위 방향으로 end를 되돌아올 때 실행된다
        onLeaveBack: () => show('onLeaveBack', false), // 위 방향으로 start를 되돌아나갈 때 실행된다
      })

      ScrollTrigger.refresh() // 내부 scroller 기준 start/end를 즉시 다시 계산한다
    },
    { scope: container }, // selector와 ScrollTrigger cleanup 범위를 예제 내부로 제한한다
  )

  return (
    <div>
      <div ref={container} className="scroll-demo">
        {/* start 지점까지 내려갈 수 있게 하는 여백 */}
        <div className="scroll-spacer">watch callback</div>
        {/* 콜백 경계를 통과할 trigger 대상 */}
        <div ref={card} className="scroll-card">
          callbacks
        </div>
        {/* end 지점을 지나갈 수 있게 하는 여백 */}
        <div className="scroll-spacer" />
      </div>
      <div className="scroll-log">
        <span>
          event: <strong ref={eventName}>none</strong>
        </span>
        <span>
          state: <strong ref={activeState}>outside</strong>
        </span>
      </div>
    </div>
  )
}
