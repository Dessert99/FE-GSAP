import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — timeline과 tween을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function LabelsDefaultsExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // defaults의 duration/ease는 아래 자식 tween들이 따로 값을 쓰지 않아도 상속한다.
      const tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power2.out' } })

      // addLabel은 타임라인의 특정 시점에 이름을 붙인다. 이후 position parameter에서 재사용한다.
      tl.addLabel('enter')
        .to('.box--label-first', { x: 220 }, 'enter')
        // 'enter+=0.15'는 enter 라벨에서 0.15초 뒤를 뜻한다.
        .to('.box--label-second', { x: 220, backgroundColor: '#e11d48' }, 'enter+=0.15')
        // 이 tween만 duration을 덮어써서 defaults보다 길게 실행한다.
        .to('.box--label-third', { x: 220, backgroundColor: '#22c55e', duration: 0.9 }, 'enter+=0.3')
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* label 기준점에 바로 배치 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">enter</span>
        <div className="tween-lanes__track">
          <div className="box box--label-first" />
        </div>
      </div>
      {/* label 기준점에서 0.15초 뒤 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">enter += 0.15</span>
        <div className="tween-lanes__track">
          <div className="box box--label-second" />
        </div>
      </div>
      {/* defaults를 상속하되 duration만 개별 override */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">override duration</span>
        <div className="tween-lanes__track">
          <div className="box box--label-third" />
        </div>
      </div>
    </div>
  )
}
