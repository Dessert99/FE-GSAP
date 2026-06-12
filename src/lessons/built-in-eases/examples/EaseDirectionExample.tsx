import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function EaseDirectionExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // .in은 시작 쪽이 느리고 끝으로 갈수록 빨라진다.
      gsap.to('.box--in', { x: 220, duration: 1.2, ease: 'power2.in' })

      // .out은 시작이 빠르고 끝에서 부드럽게 감속한다.
      gsap.to('.box--out', { x: 220, duration: 1.2, ease: 'power2.out' })

      // .inOut은 시작과 끝 양쪽이 느리고 중간 구간이 빠르다.
      gsap.to('.box--in-out', { x: 220, duration: 1.2, ease: 'power2.inOut' })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* in: 출발에 힘이 걸린다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">power2.in</span>
        <div className="tween-lanes__track">
          <div className="box box--in" />
        </div>
      </div>
      {/* out: 도착에 힘이 걸린다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">power2.out</span>
        <div className="tween-lanes__track">
          <div className="box box--out" />
        </div>
      </div>
      {/* inOut: 출발과 도착 양쪽에 힘이 걸린다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">power2.inOut</span>
        <div className="tween-lanes__track">
          <div className="box box--in-out" />
        </div>
      </div>
    </div>
  )
}
