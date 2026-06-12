import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function BasicSetExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 두 박스를 같은 목표(x:180)로 보내되 방식만 다르게 해서, 차이가 "방식"뿐임을 보여준다.
      gsap.set('.box--set', { x: 180 }) // set: 애니메이션 없이 "즉시" 도착 (가는 과정이 없음)
      gsap.to('.box--to', { x: 180, duration: 1 }) // to: 1초에 걸쳐 트랙 위를 미끄러져 도착 (비교용)
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="set-compare">
      {/* set 레인: 다시 재생해도 매번 즉시 도착하므로 이동 과정이 보이지 않는다 = set의 특성 */}
      <div className="set-compare__row">
        <span className="set-compare__label">set</span>
        <div className="set-compare__track">
          <div className="box box--set" />
        </div>
      </div>
      {/* to 레인: 같은 지점까지 1초간 이동하므로 set과의 차이가 한눈에 보인다 */}
      <div className="set-compare__row">
        <span className="set-compare__label">to</span>
        <div className="set-compare__track">
          <div className="box box--to" />
        </div>
      </div>
    </div>
  )
}
