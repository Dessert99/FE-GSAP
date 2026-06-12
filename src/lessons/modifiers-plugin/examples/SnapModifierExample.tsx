import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — modifiers tween 속성을 제공한다
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function SnapModifierExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // snap은 연속 값을 40 단위에 붙이는 함수다.
      const snapToGrid = gsap.utils.snap(40)

      gsap.to('.modifier-snap-box', {
        x: 220, // tween은 0부터 220까지 연속 값을 계산한다
        duration: 1.2, // 단계 보정이 보이도록 조금 길게 둔다
        ease: 'power1.inOut', // 계산값은 easing을 따르지만 출력값은 modifier에서 보정된다
        modifiers: {
          x: (value) => `${snapToGrid(parseFloat(value))}px`, // 쓰기 직전에 40px 단위로 붙인다
        },
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* modifiers가 연속 x 값을 40px 단위 출력값으로 보정한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">modifiers.x + snap(40)</span>
        <div className="tween-lanes__track modifier-grid-track">
          <div className="box modifier-snap-box" />
        </div>
      </div>
    </div>
  )
}
