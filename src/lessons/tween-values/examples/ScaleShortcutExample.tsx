import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function ScaleShortcutExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // scale은 x/y축을 같은 비율로 키우거나 줄인다. 0.6은 원래 크기의 60%다.
      gsap.to('.box--small', { scale: 0.6, duration: 1 })

      // 1보다 큰 scale은 hover 강조나 선택 상태 피드백처럼 요소를 시각적으로 키울 때 쓴다.
      gsap.to('.box--large', { scale: 1.4, duration: 1 })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 축소: 레이아웃 공간은 유지한 채 시각적 크기만 줄인다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">scale: 0.6</span>
        <div className="tween-lanes__track">
          <div className="box box--small" />
        </div>
      </div>
      {/* 확대: transform으로만 커져 주변 레이아웃을 밀지 않는다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">scale: 1.4</span>
        <div className="tween-lanes__track">
          <div className="box box--large" />
        </div>
      </div>
    </div>
  )
}
