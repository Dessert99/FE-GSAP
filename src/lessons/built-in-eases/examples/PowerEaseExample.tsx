import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function PowerEaseExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // power1.out은 가장 약한 감속이다. 기본적인 작은 UI 이동에 무난하다.
      gsap.to('.box--power-1', { x: 220, duration: 1.2, ease: 'power1.out' })

      // power2.out은 도착 감속이 조금 더 뚜렷하다. 일반적인 카드·패널 이동에 자주 쓴다.
      gsap.to('.box--power-2', { x: 220, duration: 1.2, ease: 'power2.out' })

      // power3.out은 초반 속도와 도착 감속 대비가 더 크다. 강조 전환에 어울린다.
      gsap.to('.box--power-3', { x: 220, duration: 1.2, ease: 'power3.out' })

      // power4.out은 가장 강한 power 감속이다. 큰 화면 전환에서 힘을 크게 줄 때 쓴다.
      gsap.to('.box--power-4', { x: 220, duration: 1.2, ease: 'power4.out' })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* power1: 가장 약한 감속 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">power1.out</span>
        <div className="tween-lanes__track">
          <div className="box box--power-1" />
        </div>
      </div>
      {/* power2: 일반 UI에 자주 쓰는 중간 감속 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">power2.out</span>
        <div className="tween-lanes__track">
          <div className="box box--power-2" />
        </div>
      </div>
      {/* power3: 더 강한 도착 감속 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">power3.out</span>
        <div className="tween-lanes__track">
          <div className="box box--power-3" />
        </div>
      </div>
      {/* power4: 가장 강한 power 감속 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">power4.out</span>
        <div className="tween-lanes__track">
          <div className="box box--power-4" />
        </div>
      </div>
    </div>
  )
}
