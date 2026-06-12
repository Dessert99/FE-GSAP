import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — keyframes를 포함한 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function SimpleArrayKeyframesExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 속성별 배열 값은 전체 duration 안에 균등하게 분배된다.
      gsap.to('.box', {
        keyframes: {
          x: [0, 220, 220, 0, 0], // 가로 위치 단계
          y: [0, 0, 42, 42, 0], // 세로 위치 단계
          rotation: [0, 0, 90, 180, 0], // 같은 단계에 맞춘 회전값
          easeEach: 'power1.inOut', // 각 값 사이의 easing
        },
        duration: 2,
        ease: 'none', // 전체 keyframes 블록에는 추가 easing을 적용하지 않는다
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 속성별 값 배열이 같은 duration 안에 균등 분배된다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">x/y/rotation arrays</span>
        <div className="tween-lanes__track">
          <div className="box" />
        </div>
      </div>
    </div>
  )
}
