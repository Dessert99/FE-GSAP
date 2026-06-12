import { useRef } from 'react' // DOM 요소와 timeline 인스턴스를 보관하는 React 훅
import gsap from 'gsap' // GSAP 코어 — timeline과 tween을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function SeekProgressExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // 버튼에서 제어할 timeline 인스턴스를 저장한다.
  const timeline = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      // paused:true로 두면 seek/progress 버튼이 현재 위치를 명확히 바꾼다.
      timeline.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.7, ease: 'power2.inOut' } })
        .to('.box--seek-a', { x: 220 })
        .to('.box--seek-b', { x: 220, backgroundColor: '#e11d48' })
        .to('.box--seek-c', { x: 220, backgroundColor: '#22c55e' })

      // 처음에는 전체 흐름을 보여준다.
      timeline.current.play()
    },
    { scope: container }, // 셀렉터를 container 안으로 한정하고 언마운트 때 timeline을 정리한다
  )

  return (
    <div ref={container}>
      <div className="tween-lanes">
        {/* 0~0.7초 구간 */}
        <div className="tween-lanes__row">
          <span className="tween-lanes__label">0s - 0.7s</span>
          <div className="tween-lanes__track">
            <div className="box box--seek-a" />
          </div>
        </div>
        {/* 0.7~1.4초 구간 */}
        <div className="tween-lanes__row">
          <span className="tween-lanes__label">0.7s - 1.4s</span>
          <div className="tween-lanes__track">
            <div className="box box--seek-b" />
          </div>
        </div>
        {/* 1.4~2.1초 구간 */}
        <div className="tween-lanes__row">
          <span className="tween-lanes__label">1.4s - 2.1s</span>
          <div className="tween-lanes__track">
            <div className="box box--seek-c" />
          </div>
        </div>
      </div>
      <div className="demo-actions">
        <button className="demo-button" onClick={() => timeline.current?.seek(0).pause()}>
          seek(0)
        </button>
        <button className="demo-button" onClick={() => timeline.current?.seek(1.05).pause()}>
          seek(1.05)
        </button>
        <button className="demo-button" onClick={() => timeline.current?.progress(0.5).pause()}>
          progress(0.5)
        </button>
        <button className="demo-button" onClick={() => timeline.current?.progress(1).pause()}>
          progress(1)
        </button>
      </div>
    </div>
  )
}
