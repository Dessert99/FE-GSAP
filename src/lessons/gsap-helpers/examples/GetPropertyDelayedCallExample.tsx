import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — getProperty와 delayedCall을 제공한다
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function GetPropertyDelayedCallExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // delayedCall에서 읽은 값을 화면에 표시할 DOM이다.
  const readout = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      // 시작 transform을 GSAP으로 지정하면 getProperty가 같은 기준으로 값을 읽을 수 있다.
      gsap.set('.box', { x: 0, opacity: 0.45 })

      // 일반 tween으로 박스를 이동시키고 투명도를 올린다.
      gsap.to('.box', {
        x: 220, // delayedCall이 나중에 읽을 transform 값
        opacity: 1, // delayedCall이 나중에 읽을 style 값
        duration: 0.8, // 읽기 전에 변화가 완료될 시간
        ease: 'power2.out', // 값 변화를 부드럽게 만든다
      })

      // delayedCall은 지정한 시간 뒤 콜백을 실행하는 예약 tween이다.
      gsap.delayedCall(0.9, () => {
        const box = container.current?.querySelector('.box') // 값을 읽을 실제 대상

        if (!box || !readout.current) return

        const x = gsap.getProperty(box, 'x') // GSAP transform x 값을 숫자로 읽는다
        const opacity = gsap.getProperty(box, 'opacity') // 현재 opacity 값을 읽는다

        // 화면 표시만 바꾸고, 애니메이션 상태 자체는 변경하지 않는다.
        readout.current.textContent = `x: ${Math.round(Number(x))}, opacity: ${Number(opacity).toFixed(1)}`
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정하고 delayedCall도 정리한다
  )

  return (
    <div ref={container}>
      <div className="tween-lanes">
        {/* getProperty가 나중에 읽을 대상 */}
        <div className="tween-lanes__row">
          <span className="tween-lanes__label">read after delayedCall</span>
          <div className="tween-lanes__track">
            <div className="box" />
          </div>
        </div>
      </div>
      <div className="callback-readout">
        <span>current</span>
        <strong ref={readout}>waiting...</strong>
      </div>
    </div>
  )
}
