import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function XyShortcutExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // x는 translateX 단축속성이다. left 값을 바꾸지 않아 레이아웃 재계산 부담이 적다.
      gsap.to('.box--x', { x: 180, duration: 1 })

      // y는 translateY 단축속성이다. 아래 방향 이동처럼 축 하나만 분리해 다룰 수 있다.
      gsap.to('.box--y', { y: 52, duration: 1 })

      // x와 y를 함께 쓰면 transform: translate(...)를 숫자 속성으로 나눠 제어할 수 있다.
      gsap.to('.box--xy', { x: 180, y: 52, duration: 1 })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* x: 가로축만 이동한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">x: 180</span>
        <div className="tween-lanes__track">
          <div className="box box--x" />
        </div>
      </div>
      {/* y: 세로축만 이동한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">y: 52</span>
        <div className="tween-lanes__track">
          <div className="box box--y" />
        </div>
      </div>
      {/* x + y: 두 축을 동시에 움직인다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">x: 180, y: 52</span>
        <div className="tween-lanes__track">
          <div className="box box--xy" />
        </div>
      </div>
    </div>
  )
}
