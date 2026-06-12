import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — matchMedia 조건별 tween을 만든다
import { ScrollTrigger } from 'gsap/ScrollTrigger' // 조건별 tween을 스크롤에 연결하는 공식 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

gsap.registerPlugin(ScrollTrigger) // ScrollTrigger 플러그인을 GSAP에 등록한다

export function ResponsiveTriggerExample() {
  // 예제 내부 scroller다.
  const container = useRef<HTMLDivElement>(null)
  // 조건별 tween 대상 카드다.
  const card = useRef<HTMLDivElement>(null)
  // 현재 적용된 media 조건을 화면에 표시한다.
  const label = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!container.current || !card.current || !label.current) return

      const mm = gsap.matchMedia() // media query별 GSAP 작업을 등록하고 자동 revert한다

      mm.add('(min-width: 720px)', () => {
        if (!container.current || !card.current || !label.current) return

        label.current.textContent = 'wide: x movement'

        gsap.to(card.current, {
          x: 120, // 넓은 화면에서는 가로 여유를 활용한다
          ease: 'none',
          scrollTrigger: {
            trigger: card.current,
            scroller: container.current,
            start: 'top 80%',
            end: 'bottom 35%',
            scrub: true,
          },
        })
      })

      mm.add('(max-width: 719px)', () => {
        if (!container.current || !card.current || !label.current) return

        label.current.textContent = 'narrow: y movement'

        gsap.to(card.current, {
          y: -42, // 좁은 화면에서는 가로 이동 대신 세로 강조를 쓴다
          ease: 'none',
          scrollTrigger: {
            trigger: card.current,
            scroller: container.current,
            start: 'top 80%',
            end: 'bottom 35%',
            scrub: true,
          },
        })
      })

      ScrollTrigger.refresh() // 현재 media 조건에서 만든 trigger 좌표를 계산한다

      return () => mm.revert() // media 조건으로 생성된 tween과 ScrollTrigger를 정리한다
    },
    { scope: container }, // selector와 ScrollTrigger cleanup 범위를 예제 내부로 제한한다
  )

  return (
    <div>
      <div ref={container} className="scroll-demo">
        {/* 현재 media 조건을 sticky처럼 상단에서 확인한다 */}
        <div className="scroll-to-nav">
          <span ref={label} className="scroll-readout">
            checking media
          </span>
        </div>
        {/* trigger 이전의 스크롤 여백 */}
        <div className="scroll-spacer">resize viewport</div>
        {/* media 조건별로 다른 방향으로 움직이는 카드 */}
        <div ref={card} className="scroll-responsive-card">
          responsive
        </div>
        {/* end 지점까지 스크롤할 수 있게 하는 여백 */}
        <div className="scroll-spacer" />
      </div>
    </div>
  )
}
