import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function RotationShortcutExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // rotation 숫자는 degree로 해석된다. 90은 rotate(90deg)와 같은 의미다.
      gsap.to('.box--quarter', { rotation: 90, duration: 1 })

      // 360도 회전은 로딩 아이콘이나 완료 피드백처럼 한 바퀴 도는 모션에 쓰인다.
      gsap.to('.box--full', { rotation: 360, duration: 1 })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 90도: 방향 전환이 눈에 보이는 짧은 회전 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">rotation: 90</span>
        <div className="tween-lanes__track">
          <div className="box box--quarter" />
        </div>
      </div>
      {/* 360도: 원래 각도로 돌아오는 한 바퀴 회전 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">rotation: 360</span>
        <div className="tween-lanes__track">
          <div className="box box--full" />
        </div>
      </div>
    </div>
  )
}
