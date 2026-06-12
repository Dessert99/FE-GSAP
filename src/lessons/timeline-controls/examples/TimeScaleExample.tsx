import { useRef } from 'react' // DOM 요소와 timeline 인스턴스를 보관하는 React 훅
import gsap from 'gsap' // GSAP 코어 — timeline과 tween을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function TimeScaleExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // 버튼에서 제어할 timeline 인스턴스를 저장한다.
  const timeline = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      // repeat/yoyo를 넣어 속도 차이를 버튼으로 반복 관찰할 수 있게 한다.
      timeline.current = gsap
        .timeline({ repeat: -1, yoyo: true, defaults: { duration: 0.7, ease: 'power2.inOut' } })
        .to('.box--speed-a', { x: 220 })
        .to('.box--speed-b', { x: 220, backgroundColor: '#e11d48' }, '<0.15')
    },
    { scope: container }, // 셀렉터를 container 안으로 한정하고 언마운트 때 timeline을 정리한다
  )

  return (
    <div ref={container}>
      <div className="tween-lanes">
        {/* 반복 재생되는 첫 번째 tween */}
        <div className="tween-lanes__row">
          <span className="tween-lanes__label">timeScale target A</span>
          <div className="tween-lanes__track">
            <div className="box box--speed-a" />
          </div>
        </div>
        {/* 첫 번째 tween보다 살짝 늦게 겹쳐 시작한다 */}
        <div className="tween-lanes__row">
          <span className="tween-lanes__label">timeScale target B</span>
          <div className="tween-lanes__track">
            <div className="box box--speed-b" />
          </div>
        </div>
      </div>
      <div className="demo-actions">
        <button className="demo-button" onClick={() => timeline.current?.timeScale(0.5)}>
          0.5x
        </button>
        <button className="demo-button" onClick={() => timeline.current?.timeScale(1)}>
          1x
        </button>
        <button className="demo-button" onClick={() => timeline.current?.timeScale(2)}>
          2x
        </button>
      </div>
    </div>
  )
}
