import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — ScrollTrigger가 제어할 tween을 만든다
import { ScrollTrigger } from 'gsap/ScrollTrigger' // 스크롤 위치로 애니메이션을 제어하는 공식 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

gsap.registerPlugin(ScrollTrigger) // ScrollTrigger 플러그인을 GSAP에 등록한다

export function BasicTriggerExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.scroll-card--basic', {
        y: 36, // 트리거가 들어오면 아래에서 올라오게 한다
        opacity: 0, // 스크롤 진입 전에는 숨겨진 상태로 시작한다
        duration: 0.6, // 진입 움직임을 확인할 수 있는 시간
        ease: 'power2.out', // 카드가 부드럽게 멈추게 한다
        scrollTrigger: {
          trigger: '.scroll-card--basic', // 이 요소가 스크롤 기준점이다
          scroller: '.scroll-demo', // window 대신 예제 안의 스크롤 박스를 사용한다
          start: 'top 75%', // 카드 top이 scroller 높이의 75% 지점에 닿으면 실행한다
        },
      })

      ScrollTrigger.refresh() // 예제 안 scroller 기준 위치를 즉시 다시 계산한다
    },
    { scope: container }, // 셀렉터와 ScrollTrigger를 container 안으로 한정하고 정리한다
  )

  return (
    <div ref={container} className="scroll-demo">
      {/* 스크롤을 만들기 위한 상단 여백 콘텐츠 */}
      <div className="scroll-spacer">scroll down</div>
      {/* trigger 대상: 이 카드가 start 지점에 닿으면 tween이 실행된다 */}
      <div className="scroll-card scroll-card--basic">Basic trigger</div>
      {/* 트리거 이후에도 스크롤할 수 있게 하는 하단 여백 콘텐츠 */}
      <div className="scroll-spacer" />
    </div>
  )
}
