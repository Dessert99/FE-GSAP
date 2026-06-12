import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function DelayExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // delay는 트윈 시작 전 대기 시간이다. 0이면 즉시 시작하고, 값이 있으면 그만큼 기다린다.
      gsap.to('.box--none', { x: 220, duration: 0.8, delay: 0 })
      gsap.to('.box--wait', { x: 220, duration: 0.8, delay: 0.8 })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* delay 0: 트윈이 바로 시작된다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">delay: 0</span>
        <div className="tween-lanes__track">
          <div className="box box--none" />
        </div>
      </div>
      {/* delay 0.8: 0.8초 동안 제자리에 있다가 시작된다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">delay: 0.8</span>
        <div className="tween-lanes__track">
          <div className="box box--wait" />
        </div>
      </div>
    </div>
  )
}
