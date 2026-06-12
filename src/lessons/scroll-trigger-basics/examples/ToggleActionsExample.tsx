import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — ScrollTrigger가 제어할 tween을 만든다
import { ScrollTrigger } from 'gsap/ScrollTrigger' // 스크롤 위치로 애니메이션을 제어하는 공식 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

gsap.registerPlugin(ScrollTrigger) // ScrollTrigger 플러그인을 GSAP에 등록한다

export function ToggleActionsExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('.scroll-card--toggle', {
        x: 120, // trigger 범위에 들어오면 오른쪽으로 이동한다
        backgroundColor: '#22c55e', // 상태 변화를 눈으로 확인하기 쉽게 색을 바꾼다
        duration: 0.5, // toggleActions가 제어할 tween 시간
        ease: 'power2.out', // enter/reverse 모두 부드럽게 보이게 한다
        scrollTrigger: {
          trigger: '.scroll-card--toggle', // 이 요소가 enter/leave 기준점이다
          scroller: '.scroll-demo', // window 대신 예제 안의 스크롤 박스를 사용한다
          start: 'top 70%', // enter가 발생하는 시작 지점
          end: 'bottom 35%', // leave가 발생하는 끝 지점
          toggleActions: 'play reverse play reverse', // enter/leave/enterBack/leaveBack 순서의 제어 동작
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
      {/* toggleActions가 제어할 tween 대상 */}
      <div className="scroll-card scroll-card--toggle">play / reverse</div>
      {/* 트리거 이후에도 leave 지점을 지나갈 수 있게 하는 하단 여백 콘텐츠 */}
      <div className="scroll-spacer" />
    </div>
  )
}
