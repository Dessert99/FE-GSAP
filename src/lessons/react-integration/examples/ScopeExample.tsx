import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function ScopeExample() {
  // 이 예제의 루트 DOM을 가리킨다. scope가 있으면 같은 .box 이름도 이 div 안에서만 찾는다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // scope가 있기 때문에 현재 예제 안의 .box 두 개만 선택된다. 다른 레슨의 .box에는 영향을 주지 않는다.
      gsap.to('.box', {
        x: 180, // scope 안에 있는 두 박스를 같은 거리만큼 이동
        duration: 0.8,
        stagger: 0.15, // 같은 selector 안의 여러 대상에 약간의 시간차를 준다
      })
    },
    { scope: container }, // 셀렉터 검색 범위와 cleanup 범위를 컴포넌트 루트로 묶는다
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 첫 번째 대상: 같은 .box 클래스지만 scope 안에서만 선택된다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">scoped .box 1</span>
        <div className="tween-lanes__track">
          <div className="box" />
        </div>
      </div>
      {/* 두 번째 대상: stagger로 첫 번째보다 늦게 출발한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">scoped .box 2</span>
        <div className="tween-lanes__track">
          <div className="box" />
        </div>
      </div>
    </div>
  )
}
