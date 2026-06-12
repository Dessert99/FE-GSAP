import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function StepsNoneEaseExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // none은 가속·감속이 없는 선형 움직임이다. 일정 속도가 필요할 때 쓴다.
      gsap.to('.box--none', { x: 220, duration: 1.2, ease: 'none' })

      // steps(6)는 전체 변화를 6단계로 끊어 진행한다. 프레임 단위 전환처럼 보인다.
      gsap.to('.box--steps', { x: 220, duration: 1.2, ease: 'steps(6)' })

      // power2.out과 비교하면 none/steps가 얼마나 기계적인지 읽기 쉽다.
      gsap.to('.box--smooth', { x: 220, duration: 1.2, ease: 'power2.out' })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* none: 일정한 속도 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">none</span>
        <div className="tween-lanes__track">
          <div className="box box--none" />
        </div>
      </div>
      {/* steps: 계단식 진행 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">steps(6)</span>
        <div className="tween-lanes__track">
          <div className="box box--steps" />
        </div>
      </div>
      {/* smooth: 일반 감속과 비교 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">power2.out</span>
        <div className="tween-lanes__track">
          <div className="box box--smooth" />
        </div>
      </div>
    </div>
  )
}
