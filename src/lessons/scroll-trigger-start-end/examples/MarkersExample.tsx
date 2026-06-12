import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — ScrollTrigger가 제어할 tween을 만든다
import { ScrollTrigger } from 'gsap/ScrollTrigger' // 스크롤 위치로 애니메이션을 제어하는 공식 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

gsap.registerPlugin(ScrollTrigger) // ScrollTrigger 플러그인을 GSAP에 등록한다

export function MarkersExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // markers가 표시할 start/end 계산 기준 요소다.
  const card = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!card.current || !container.current) return

      gsap.from(card.current, {
        y: 32, // start 지점에 도달하면 아래에서 올라오게 한다
        opacity: 0.3, // 트리거 전 상태와 실행 후 상태를 구분한다
        duration: 0.5, // markers를 보며 실행 타이밍을 확인하기 좋은 시간
        ease: 'power2.out', // 진입 움직임이 부드럽게 멈추게 한다
        scrollTrigger: {
          trigger: card.current, // markers가 표시할 trigger 기준 요소
          scroller: container.current, // window 대신 이 예제 안의 스크롤 박스를 사용한다
          start: 'top 70%', // start marker가 이 만남 지점을 표시한다
          end: 'bottom 40%', // end marker가 active 범위의 끝을 표시한다
          markers: {
            startColor: '#22c55e', // start marker 색을 따로 지정해 기준선을 빠르게 찾게 한다
            endColor: '#ef4444', // end marker 색을 start와 구분한다
            fontSize: '11px', // 작은 예제 패널 안에서도 marker 라벨이 과하게 커지지 않게 한다
            indent: 12, // marker 라벨이 카드와 겹치지 않도록 오른쪽으로 살짝 띄운다
          }, // 개발 중 start/end 계산 지점을 화면에 표시한다
          id: 'card', // 여러 ScrollTrigger가 있을 때 marker 이름을 구분한다
          toggleActions: 'play none none reverse', // 아래로 진입하면 재생하고 위로 벗어나면 초기 상태로 되돌린다
        },
      })

      ScrollTrigger.refresh() // 예제 안 scroller 기준 위치를 즉시 다시 계산한다
    },
    { scope: container }, // 셀렉터와 ScrollTrigger를 container 안으로 한정하고 정리한다
  )

  return (
    <div ref={container} className="scroll-demo">
      {/* start marker가 보일 수 있도록 스크롤 공간을 만든다 */}
      <div className="scroll-spacer">watch markers</div>
      {/* 이 카드 주변에 start/end marker가 표시된다 */}
      <div ref={card} className="scroll-card scroll-card--markers">
        markers
      </div>
      {/* end marker를 지나갈 수 있게 하는 하단 여백 콘텐츠 */}
      <div className="scroll-spacer" />
    </div>
  )
}
