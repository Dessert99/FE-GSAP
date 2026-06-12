import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — batch로 들어온 요소들을 한 번에 애니메이션한다
import { ScrollTrigger } from 'gsap/ScrollTrigger' // 여러 trigger를 batch로 묶는 공식 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

gsap.registerPlugin(ScrollTrigger) // ScrollTrigger 플러그인을 GSAP에 등록한다

export function BatchCardsExample() {
  // 예제 내부 scroller다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!container.current) return

      const cards = gsap.utils.toArray<HTMLElement>('.scroll-batch-card') // scope 안 카드들을 배열로 모은다

      gsap.set(cards, { y: 24 }) // batch 진입 전 상태를 명확히 만든다

      ScrollTrigger.batch(cards, {
        scroller: container.current, // window 대신 예제 내부 스크롤 박스를 사용한다
        start: 'top 82%', // 카드가 화면 아래쪽에 들어오면 batch에 포함한다
        interval: 0.08, // 가까운 시간에 들어온 카드들을 같은 batch로 묶는다
        batchMax: 3, // 한 번에 처리할 카드 수를 작게 제한해 stagger 차이를 보여준다
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: true,
          })
        }, // 아래로 진입한 카드 묶음을 순차적으로 보여준다
        onLeaveBack: (batch) => {
          gsap.set(batch, { y: 24, opacity: 0, overwrite: true })
        }, // 위로 되돌아가면 다시 진입 상태를 학습할 수 있게 초기화한다
      })

      ScrollTrigger.refresh() // batch trigger들의 위치를 즉시 계산한다
    },
    { scope: container }, // selector와 ScrollTrigger cleanup 범위를 예제 내부로 제한한다
  )

  return (
    <div ref={container} className="scroll-demo">
      {/* 첫 카드가 바로 보이지 않도록 여백을 둔다 */}
      <div className="scroll-spacer">batch list</div>
      {/* 같은 클래스의 여러 카드가 ScrollTrigger.batch 대상이 된다 */}
      <div className="scroll-batch-list">
        <div className="scroll-batch-card">Card 1</div>
        <div className="scroll-batch-card">Card 2</div>
        <div className="scroll-batch-card">Card 3</div>
        <div className="scroll-batch-card">Card 4</div>
        <div className="scroll-batch-card">Card 5</div>
      </div>
    </div>
  )
}
