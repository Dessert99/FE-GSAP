import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function OvershootEaseExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // back.out은 목표값을 살짝 지나친 뒤 돌아온다. 괄호 값은 overshoot 강도다.
      gsap.to('.box--back', { x: 220, duration: 1.3, ease: 'back.out(1.7)' })

      // elastic.out은 탄성처럼 여러 번 흔들리며 도착한다. 괄호 값은 진폭과 주기다.
      gsap.to('.box--elastic', { x: 220, duration: 1.3, ease: 'elastic.out(1, 0.3)' })

      // bounce.out은 바닥에 닿아 튀는 것처럼 단계적으로 감속한다.
      gsap.to('.box--bounce', { x: 220, duration: 1.3, ease: 'bounce.out' })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* back: 목표를 넘겼다가 돌아온다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">back.out(1.7)</span>
        <div className="tween-lanes__track">
          <div className="box box--back" />
        </div>
      </div>
      {/* elastic: 탄성처럼 흔들린다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">elastic.out(1, 0.3)</span>
        <div className="tween-lanes__track">
          <div className="box box--elastic" />
        </div>
      </div>
      {/* bounce: 튕기듯 멈춘다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">bounce.out</span>
        <div className="tween-lanes__track">
          <div className="box box--bounce" />
        </div>
      </div>
    </div>
  )
}
