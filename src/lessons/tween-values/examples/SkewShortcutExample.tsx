import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function SkewShortcutExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // skewX는 x축 방향으로 요소를 기울인다. 숫자는 degree로 해석된다.
      gsap.to('.box--skew-x', { skewX: 20, duration: 1 })

      // skewY는 y축 방향으로 요소를 기울인다. 축을 분리하면 형태 변화 방향을 명확히 조절할 수 있다.
      gsap.to('.box--skew-y', { skewY: 20, duration: 1 })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* skewX: 위아래 변이 서로 밀리듯 기울어진다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">skewX: 20</span>
        <div className="tween-lanes__track">
          <div className="box box--skew-x" />
        </div>
      </div>
      {/* skewY: 좌우 변이 서로 밀리듯 기울어진다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">skewY: 20</span>
        <div className="tween-lanes__track">
          <div className="box box--skew-y" />
        </div>
      </div>
    </div>
  )
}
