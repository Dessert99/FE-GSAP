import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function MotionFamilyEaseExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // sine.inOut은 가장 부드러운 왕복형 곡선이다. 미세한 UI 이동에 쓰기 좋다.
      gsap.to('.box--sine', { x: 220, duration: 1.2, ease: 'sine.inOut' })

      // circ.inOut은 원형 곡선처럼 중간 속도 변화가 더 뚜렷하다.
      gsap.to('.box--circ', { x: 220, duration: 1.2, ease: 'circ.inOut' })

      // expo.inOut은 시작과 끝이 매우 강하게 눌린다. 큰 거리 이동에서 차이가 잘 보인다.
      gsap.to('.box--expo', { x: 220, duration: 1.2, ease: 'expo.inOut' })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* sine: 부드럽고 자연스러운 변화 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">sine.inOut</span>
        <div className="tween-lanes__track">
          <div className="box box--sine" />
        </div>
      </div>
      {/* circ: 둥근 감속이 더 강한 변화 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">circ.inOut</span>
        <div className="tween-lanes__track">
          <div className="box box--circ" />
        </div>
      </div>
      {/* expo: 극적인 가속·감속 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">expo.inOut</span>
        <div className="tween-lanes__track">
          <div className="box box--expo" />
        </div>
      </div>
    </div>
  )
}
