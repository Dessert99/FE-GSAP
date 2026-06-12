import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — timeline과 등록된 effect를 사용한다
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅
import { registerFadeSlideEffect } from './registerFadeSlideEffect' // 이 레슨에서 재사용할 custom effect 등록 함수

export function TimelineEffectExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      registerFadeSlideEffect() // timeline에서 쓰기 전 effect를 등록한다

      // extendTimeline:true로 등록했기 때문에 timeline 메서드처럼 effect를 호출할 수 있다.
      const tl = gsap.timeline()

      tl.fadeSlideIn('.effect-title', {
        y: 18, // 제목은 짧은 거리에서 등장시킨다
        duration: 0.35, // 제목은 빠르게 보여준다
      }).fadeSlideIn(
        '.effect-step',
        {
          y: 24, // 단계 항목은 조금 더 아래에서 올라온다
          stagger: 0.1, // 단계 항목 사이에 간격을 둔다
        },
        '-=0.1', // 제목 진입 끝과 살짝 겹치게 배치한다
      )
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="effect-sequence">
      {/* timeline의 첫 effect 대상 */}
      <strong className="effect-title">Checkout flow</strong>
      {/* timeline의 두 번째 effect 대상들 */}
      <span className="effect-step">cart</span>
      <span className="effect-step">shipping</span>
      <span className="effect-step">payment</span>
    </div>
  )
}
