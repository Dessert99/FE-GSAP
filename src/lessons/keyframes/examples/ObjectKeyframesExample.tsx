import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — keyframes를 포함한 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function ObjectKeyframesExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // keyframes 배열의 각 객체는 순서대로 실행되는 to() vars처럼 동작한다.
      gsap.to('.box', {
        keyframes: [
          { x: 180, duration: 0.45, ease: 'sine.out' }, // 오른쪽으로 이동
          { y: 42, duration: 0.35, ease: 'power1.inOut' }, // 아래로 이동
          { x: 0, duration: 0.45, delay: -0.1 }, // 이전 단계 끝과 0.1초 겹쳐 왼쪽으로 이동
          { y: 0, duration: 0.35 }, // 원래 세로 위치로 복귀
        ],
        ease: 'none', // 전체 keyframes 블록에는 추가 easing을 적용하지 않는다
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 배열 keyframes가 여러 단계 이동을 하나의 tween 안에서 처리한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">keyframes: []</span>
        <div className="tween-lanes__track">
          <div className="box" />
        </div>
      </div>
    </div>
  )
}
