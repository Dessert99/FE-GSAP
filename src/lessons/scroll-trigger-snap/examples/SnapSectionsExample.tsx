import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — ScrollTrigger 플러그인을 등록하기 위해 사용한다
import { ScrollTrigger } from 'gsap/ScrollTrigger' // 스크롤 정지 지점을 보정하는 공식 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

gsap.registerPlugin(ScrollTrigger) // ScrollTrigger 플러그인을 GSAP에 등록한다

export function SnapSectionsExample() {
  // snap이 적용될 예제 내부 scroller다.
  const container = useRef<HTMLDivElement>(null)
  // 전체 snap 구간의 시작과 끝을 계산할 content 래퍼다.
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!container.current || !track.current) return

      ScrollTrigger.create({
        trigger: track.current, // 전체 섹션 묶음을 snap progress 계산 기준으로 삼는다
        scroller: container.current, // window 대신 예제 내부 스크롤 박스를 사용한다
        start: 'top top', // 첫 섹션이 scroller top에 닿을 때 progress 0이 된다
        end: 'bottom bottom', // 마지막 섹션 끝이 scroller bottom에 닿을 때 progress 1이 된다
        snap: {
          snapTo: 1 / 2, // 세 섹션의 경계에 맞춰 0, 0.5, 1 progress로 보정한다
          duration: 0.2, // 스냅 보정이 너무 길게 느껴지지 않게 짧게 둔다
          ease: 'power1.inOut', // 멈춘 뒤 보정 움직임을 부드럽게 만든다
        },
      })

      ScrollTrigger.refresh() // 내부 scroller의 snap 구간을 즉시 계산한다
    },
    { scope: container }, // selector와 ScrollTrigger cleanup 범위를 예제 내부로 제한한다
  )

  return (
    <div ref={container} className="scroll-demo">
      {/* 이 래퍼의 전체 높이가 snap progress의 0~1 범위가 된다 */}
      <div ref={track}>
        <section className="scroll-snap-section">section 1</section>
        <section className="scroll-snap-section">section 2</section>
        <section className="scroll-snap-section">section 3</section>
      </div>
    </div>
  )
}
