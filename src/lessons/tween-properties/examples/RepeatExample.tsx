import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function RepeatExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('.box--once', {
        x: 220, // 반복마다 이동할 도착 위치
        duration: 0.45, // 한 번 이동하는 데 걸리는 시간
        repeat: 1, // 최초 1회 실행 뒤 1번 더 반복한다
      })
      gsap.to('.box--many', {
        x: 220, // 같은 거리로 이동해 반복 횟수 차이만 비교한다
        duration: 0.45, // 한 번 이동하는 데 걸리는 시간
        repeat: 3, // 최초 1회 실행 뒤 3번 더 반복한다
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* repeat 1: 한 번 더 반복한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">repeat: 1</span>
        <div className="tween-lanes__track">
          <div className="box box--once" />
        </div>
      </div>
      {/* repeat 3: 반복 횟수가 늘어난다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">repeat: 3</span>
        <div className="tween-lanes__track">
          <div className="box box--many" />
        </div>
      </div>
    </div>
  )
}
