import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function RepeatDelayExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('.box--none', {
        x: 220, // 반복마다 이동할 도착 위치
        duration: 0.45, // 한 번 이동하는 데 걸리는 시간
        repeat: 2, // repeatDelay는 반복 사이의 대기라 반복 횟수가 있어야 차이가 보인다
        repeatDelay: 0, // 반복이 바로 이어진다
      })
      gsap.to('.box--wait', {
        x: 220, // 같은 거리로 이동해 반복 대기 시간만 비교한다
        duration: 0.45, // 한 번 이동하는 데 걸리는 시간
        repeat: 2, // repeatDelay를 보여주기 위한 최소 보조 옵션
        repeatDelay: 0.6, // 각 반복이 다시 시작되기 전 대기 시간
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* repeatDelay 0: 반복이 바로 이어진다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">repeatDelay: 0</span>
        <div className="tween-lanes__track">
          <div className="box box--none" />
        </div>
      </div>
      {/* repeatDelay 0.6: 반복 사이에 쉼이 생긴다. repeat는 차이를 보여주기 위한 보조 옵션이다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">repeatDelay: 0.6</span>
        <div className="tween-lanes__track">
          <div className="box box--wait" />
        </div>
      </div>
    </div>
  )
}
