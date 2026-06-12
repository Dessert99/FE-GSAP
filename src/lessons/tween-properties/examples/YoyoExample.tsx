import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function YoyoExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('.box--false', {
        x: 220, // 반복마다 이동할 도착 위치
        duration: 0.55, // 한 방향으로 이동하는 데 걸리는 시간
        repeat: 3, // yoyo 차이를 보기 위한 최소 보조 옵션
        yoyo: false, // 기본 동작: 끝까지 간 뒤 시작점으로 돌아가 다시 같은 방향으로 실행한다
      })
      gsap.to('.box--true', {
        x: 220, // 앞뒤로 오갈 도착 위치
        duration: 0.55, // 한 방향으로 이동하는 데 걸리는 시간
        repeat: 3, // yoyo는 반복 방향을 뒤집는 옵션이라 반복 횟수가 있어야 차이가 보인다
        yoyo: true, // 반복마다 시작점과 끝점을 번갈아 오가게 한다
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* yoyo false: 매 반복마다 같은 방향으로 다시 재생된다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">yoyo: false</span>
        <div className="tween-lanes__track">
          <div className="box box--false" />
        </div>
      </div>
      {/* yoyo true: 반복 방향이 뒤집혀 왕복한다. repeat는 차이를 보여주기 위한 보조 옵션이다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">yoyo: true</span>
        <div className="tween-lanes__track">
          <div className="box box--true" />
        </div>
      </div>
    </div>
  )
}
