import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function RelativeValueExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // x: 180은 현재 위치와 무관하게 최종 x 값을 180으로 맞춘다.
      gsap.to('.box--absolute', { x: 180, duration: 1 })

      // x: '+=180'은 현재 x 값에서 180px을 더한다. 기존 transform 상태를 기준으로 움직일 때 쓴다.
      gsap.to('.box--relative-plus', { x: '+=180', duration: 1 })

      // x: '-=80'은 현재 x 값에서 80px을 뺀다. 드래그 보정이나 되돌림 모션에 자주 쓰인다.
      gsap.to('.box--relative-minus', { x: '-=80', duration: 1 })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 절대값: 최종 transform x가 180px이 된다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">x: 180</span>
        <div className="tween-lanes__track">
          <div className="box box--absolute" />
        </div>
      </div>
      {/* 더하기 상대값: 현재 위치에서 오른쪽으로 더 움직인다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">x: '+=180'</span>
        <div className="tween-lanes__track">
          <div className="box box--relative-plus" />
        </div>
      </div>
      {/* 빼기 상대값: 미리 오른쪽에 둔 상태에서 왼쪽으로 되돌린다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">x: '-=80'</span>
        <div className="tween-lanes__track">
          <div className="box box--relative-minus" style={{ transform: 'translateX(180px)' }} />
        </div>
      </div>
    </div>
  )
}
