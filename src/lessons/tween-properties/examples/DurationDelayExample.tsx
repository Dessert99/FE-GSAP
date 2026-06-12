import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function DurationDelayExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // duration은 애니메이션 길이다. 같은 거리라도 duration이 짧으면 더 빠르게 도착한다.
      gsap.to('.box--fast', { x: 220, duration: 0.4 })
      gsap.to('.box--slow', { x: 220, duration: 1.4 })
      // delay는 트윈 시작 전 대기 시간이다. 실무에서는 순차 진입이나 타이밍 보정에 자주 쓴다.
      gsap.to('.box--delayed', { x: 220, duration: 0.8, delay: 0.6 })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 짧은 duration: 같은 거리를 빠르게 이동한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">duration: 0.4</span>
        <div className="tween-lanes__track">
          <div className="box box--fast" />
        </div>
      </div>
      {/* 긴 duration: 같은 거리를 천천히 이동한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">duration: 1.4</span>
        <div className="tween-lanes__track">
          <div className="box box--slow" />
        </div>
      </div>
      {/* delay: 잠깐 대기한 뒤 애니메이션이 시작된다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">delay: 0.6</span>
        <div className="tween-lanes__track">
          <div className="box box--delayed" />
        </div>
      </div>
    </div>
  )
}
