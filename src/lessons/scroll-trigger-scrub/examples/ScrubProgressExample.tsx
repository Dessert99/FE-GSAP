import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 스크롤 진행률에 연결할 tween을 만든다
import { ScrollTrigger } from 'gsap/ScrollTrigger' // 스크롤 위치로 tween progress를 제어하는 공식 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

gsap.registerPlugin(ScrollTrigger) // ScrollTrigger 플러그인을 GSAP에 등록한다

export function ScrubProgressExample() {
  // 예제 안에서만 스크롤을 만들 scroller 요소다.
  const container = useRef<HTMLDivElement>(null)
  // x 이동 tween의 대상 카드다.
  const card = useRef<HTMLDivElement>(null)
  // ScrollTrigger progress를 그대로 보여주는 막대다.
  const progress = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (!container.current || !card.current || !progress.current) return

      gsap.to(card.current, {
        x: 120, // start~end 구간 안에서 오른쪽으로 이동한다
        rotation: 8, // scrub이 tween 전체 progress를 제어한다는 점을 같이 보여준다
        ease: 'none', // scrub에서는 스크롤 위치와 선형으로 맞추는 경우가 가장 읽기 쉽다
        scrollTrigger: {
          trigger: card.current, // 카드가 start/end 계산 기준이다
          scroller: container.current, // window 대신 예제 내부 스크롤 박스를 쓴다
          start: 'top 80%', // 카드 top이 scroller 80% 지점에 닿으면 progress 0이 된다
          end: 'bottom 25%', // 카드 bottom이 scroller 25% 지점에 닿으면 progress 1이 된다
          scrub: true, // 스크롤 위치와 tween 진행률을 즉시 연결한다
          onUpdate: (self) => {
            gsap.set(progress.current, { scaleX: self.progress })
          }, // 현재 progress를 막대 길이로 표시한다
        },
      })

      ScrollTrigger.refresh() // 내부 scroller의 start/end 좌표를 즉시 다시 계산한다
    },
    { scope: container }, // selector와 ScrollTrigger cleanup 범위를 예제 내부로 제한한다
  )

  return (
    <div ref={container} className="scroll-demo">
      {/* sticky 막대로 scrub progress를 계속 볼 수 있게 한다 */}
      <div className="scroll-progress">
        <span ref={progress} className="scroll-progress__bar" />
      </div>
      {/* trigger 이전의 스크롤 여백 */}
      <div className="scroll-spacer">scroll progress</div>
      {/* scrub이 제어할 tween 대상 */}
      <div ref={card} className="scroll-card">
        scrub
      </div>
      {/* end 지점까지 스크롤할 수 있게 하는 여백 */}
      <div className="scroll-spacer" />
    </div>
  )
}
