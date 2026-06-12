import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — ScrollTrigger가 제어할 tween을 만든다
import { ScrollTrigger } from 'gsap/ScrollTrigger' // 스크롤 위치로 애니메이션을 제어하는 공식 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

gsap.registerPlugin(ScrollTrigger) // ScrollTrigger 플러그인을 GSAP에 등록한다

export function StartEndRangeExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // ScrollTrigger의 trigger 대상이다. start/end 계산의 기준 요소로 사용한다.
  const card = useRef<HTMLDivElement>(null)
  // 현재 ScrollTrigger active 상태를 학습 화면에 표시한다.
  const readout = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (!card.current || !container.current) return

      gsap.to(card.current, {
        x: 110, // active 범위에 들어오면 오른쪽으로 이동해 상태 변화를 보여준다
        backgroundColor: '#22c55e', // active 상태를 색으로도 구분한다
        duration: 0.45, // enter/leave 전환을 확인할 수 있는 짧은 시간
        ease: 'power2.out', // 이동이 끝날 때 자연스럽게 감속한다
        scrollTrigger: {
          trigger: card.current, // start/end가 계산될 기준 요소
          scroller: container.current, // window 대신 이 예제 안의 스크롤 박스를 사용한다
          start: 'top 80%', // 카드 top이 scroller 높이의 80% 지점에 닿으면 enter가 발생한다
          end: 'bottom 35%', // 카드 bottom이 scroller 높이의 35% 지점에 닿으면 leave가 발생한다
          toggleActions: 'play reverse play reverse', // active 범위를 벗어나면 tween을 되감아 범위를 읽기 쉽게 한다
          onToggle: (self) => {
            if (!readout.current) return

            readout.current.textContent = self.isActive ? 'active' : 'outside'
          }, // start~end 사이인지 화면에 표시한다
        },
      })

      ScrollTrigger.refresh() // 예제 안 scroller 기준 위치를 즉시 다시 계산한다
    },
    { scope: container }, // 셀렉터와 ScrollTrigger를 container 안으로 한정하고 정리한다
  )

  return (
    <div>
      <div ref={container} className="scroll-demo">
        {/* start 지점까지 스크롤할 수 있게 하는 상단 여백 콘텐츠 */}
        <div className="scroll-spacer">scroll down</div>
        {/* 이 카드의 top/bottom이 start/end 계산 기준이 된다 */}
        <div ref={card} className="scroll-card scroll-card--range">
          start → end
        </div>
        {/* end 지점을 지나 leave 상태까지 확인할 수 있게 하는 하단 여백 콘텐츠 */}
        <div className="scroll-spacer" />
      </div>
      <div className="scroll-readout">
        <span>range</span>
        <strong ref={readout}>outside</strong>
      </div>
    </div>
  )
}
