import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function TransformOriginExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 기본 중심점 회전: 요소 가운데를 축으로 돈다.
      gsap.to('.box--center-origin', { rotation: 45, duration: 1 })

      // transformOrigin은 회전과 스케일의 기준점을 바꾼다. 왼쪽 위 모서리를 축으로 회전한다.
      gsap.to('.box--corner-origin', {
        rotation: 45,
        transformOrigin: 'left top',
        duration: 1,
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* center center: 기본 중심축 회전 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">transformOrigin: 'center center'</span>
        <div className="tween-lanes__track">
          <div className="box box--center-origin" />
        </div>
      </div>
      {/* left top: 왼쪽 위 모서리를 축으로 회전 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">transformOrigin: 'left top'</span>
        <div className="tween-lanes__track">
          <div className="box box--corner-origin" />
        </div>
      </div>
    </div>
  )
}
