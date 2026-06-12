import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — timeline과 tween을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function BasicTimelineExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // timeline은 여러 tween을 순서대로 담는 컨테이너다.
      const tl = gsap.timeline()

      // 첫 tween이 끝난 뒤 다음 tween이 이어서 실행된다. 각 tween에 delay를 계산할 필요가 없다.
      tl.to('.box--first', { x: 220, duration: 0.5 })
        .to('.box--second', { x: 220, duration: 0.5 })
        .to('.box--third', { x: 220, duration: 0.5 })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 첫 번째 tween: 타임라인의 첫 구간 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">first</span>
        <div className="tween-lanes__track">
          <div className="box box--first" />
        </div>
      </div>
      {/* 두 번째 tween: 첫 구간이 끝난 뒤 실행된다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">second</span>
        <div className="tween-lanes__track">
          <div className="box box--second" />
        </div>
      </div>
      {/* 세 번째 tween: 두 번째 구간 뒤에 이어진다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">third</span>
        <div className="tween-lanes__track">
          <div className="box box--third" />
        </div>
      </div>
    </div>
  )
}
