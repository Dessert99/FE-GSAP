import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function ImmediateRenderExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // immediateRender 기본값은 from/fromTo의 시작값을 즉시 적용할 수 있다. delay가 있어도 먼저 숨는다.
      gsap.fromTo(
        '.box--default',
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, delay: 0.8 },
      )

      // immediateRender:false는 delay 동안 현재 상태를 유지하고, 트윈 시작 시점에 from 값을 적용한다.
      gsap.fromTo(
        '.box--false',
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, delay: 0.8, immediateRender: false },
      )
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 기본 동작: delay 중에도 from 값이 먼저 적용될 수 있다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">default</span>
        <div className="tween-lanes__track">
          <div className="box box--default" />
        </div>
      </div>
      {/* false: delay 중에는 원래 상태가 보이고, 시작 시점부터 from 값에서 재생된다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">immediateRender: false</span>
        <div className="tween-lanes__track">
          <div className="box box--false" />
        </div>
      </div>
    </div>
  )
}
