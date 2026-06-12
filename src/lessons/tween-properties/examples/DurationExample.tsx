import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function DurationExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // duration은 애니메이션 길이다. 같은 거리라도 값이 작으면 빠르고, 크면 느리다.
      gsap.to('.box--short', { x: 220, duration: 0.4 })
      gsap.to('.box--long', { x: 220, duration: 1.4 })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 짧은 duration: 같은 거리를 빠르게 이동한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">duration: 0.4</span>
        <div className="tween-lanes__track">
          <div className="box box--short" />
        </div>
      </div>
      {/* 긴 duration: 같은 거리를 천천히 이동한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">duration: 1.4</span>
        <div className="tween-lanes__track">
          <div className="box box--long" />
        </div>
      </div>
    </div>
  )
}
