import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — keyframes를 포함한 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function PercentageKeyframesExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 퍼센트 keyframes는 전체 duration 안에서 각 상태가 위치할 지점을 직접 지정한다.
      gsap.to('.box', {
        keyframes: {
          '0%': { x: 0, y: 0, rotation: 0 },
          '50%': { x: 220, y: 0, rotation: 0, ease: 'power2.out' },
          '75%': { x: 220, y: 42, rotation: 90 },
          '100%': { x: 0, y: 0, rotation: 0 },
          easeEach: 'power1.inOut', // 각 keyframe 사이의 easing
        },
        duration: 1.8, // 퍼센트 지점들이 나뉘는 전체 시간
        ease: 'none', // 전체 블록에는 추가 easing을 적용하지 않는다
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* CSS keyframes처럼 0%, 50%, 100% 지점을 지정한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">keyframes: {'{'} "0%" ... {'}'}</span>
        <div className="tween-lanes__track">
          <div className="box" />
        </div>
      </div>
    </div>
  )
}
