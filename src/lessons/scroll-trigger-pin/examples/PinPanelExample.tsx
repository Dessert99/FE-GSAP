import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — pin 중인 요소에 작은 상태 변화를 준다
import { ScrollTrigger } from 'gsap/ScrollTrigger' // 스크롤 구간에서 요소를 고정하는 공식 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

gsap.registerPlugin(ScrollTrigger) // ScrollTrigger 플러그인을 GSAP에 등록한다

export function PinPanelExample() {
  // 예제 안의 독립 scroller다.
  const container = useRef<HTMLDivElement>(null)
  // pin으로 고정할 패널이다.
  const panel = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!container.current || !panel.current) return

      gsap.to(panel.current, {
        scale: 0.94, // 고정된 동안 스크롤 진행이 연결되어 있음을 보여준다
        ease: 'none', // scrub 구간에서는 위치와 진행률을 직관적으로 맞춘다
        scrollTrigger: {
          trigger: panel.current, // pin 구간 계산의 기준 요소
          scroller: container.current, // window 대신 예제 내부 스크롤 박스를 사용한다
          start: 'top 24px', // 패널 top이 scroller 상단에서 24px 떨어진 지점에 닿으면 고정한다
          end: '+=220', // 시작 지점부터 220px 동안 pin 상태를 유지한다
          scrub: true, // scale 변화를 스크롤 진행률에 맞춘다
          pin: true, // trigger 요소 자체를 start~end 구간 동안 고정한다
        },
      })

      ScrollTrigger.refresh() // pin spacing이 반영된 좌표를 다시 계산한다
    },
    { scope: container }, // selector와 ScrollTrigger cleanup 범위를 예제 내부로 제한한다
  )

  return (
    <div ref={container} className="scroll-demo">
      {/* pin 전까지 스크롤할 수 있게 하는 상단 섹션 */}
      <div className="scroll-panel scroll-panel--dark">before pin</div>
      {/* start~end 구간 동안 고정될 요소 */}
      <div ref={panel} className="scroll-pin">
        pinned panel
      </div>
      {/* pin 이후의 흐름을 확인하는 하단 섹션 */}
      <div className="scroll-panel scroll-panel--accent">after pin</div>
      <div className="scroll-panel scroll-panel--dark">continue</div>
    </div>
  )
}
