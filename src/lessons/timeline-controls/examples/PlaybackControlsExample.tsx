import { useRef } from 'react' // DOM 요소와 timeline 인스턴스를 보관하는 React 훅
import gsap from 'gsap' // GSAP 코어 — timeline과 tween을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function PlaybackControlsExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // 버튼에서 제어할 timeline 인스턴스를 저장한다.
  const timeline = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      // paused:true로 만들어 버튼이 전체 재생 흐름을 제어하게 한다.
      timeline.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.45, ease: 'power2.out' } })
        .to('.box--one', { x: 220 })
        .to('.box--two', { x: 220, backgroundColor: '#e11d48' }, '-=0.2')
        .to('.box--three', { x: 220, backgroundColor: '#22c55e' }, '-=0.2')

      // 예제는 처음 마운트될 때 한 번 보여주고, 이후 버튼으로 다시 조작한다.
      timeline.current.play()
    },
    { scope: container }, // 셀렉터를 container 안으로 한정하고 언마운트 때 timeline을 정리한다
  )

  return (
    <div ref={container}>
      <div className="tween-lanes">
        {/* 타임라인의 첫 번째 트윈 */}
        <div className="tween-lanes__row">
          <span className="tween-lanes__label">one</span>
          <div className="tween-lanes__track">
            <div className="box box--one" />
          </div>
        </div>
        {/* 타임라인의 두 번째 트윈 */}
        <div className="tween-lanes__row">
          <span className="tween-lanes__label">two</span>
          <div className="tween-lanes__track">
            <div className="box box--two" />
          </div>
        </div>
        {/* 타임라인의 세 번째 트윈 */}
        <div className="tween-lanes__row">
          <span className="tween-lanes__label">three</span>
          <div className="tween-lanes__track">
            <div className="box box--three" />
          </div>
        </div>
      </div>
      <div className="demo-actions">
        <button className="demo-button" onClick={() => timeline.current?.play()}>
          play
        </button>
        <button className="demo-button" onClick={() => timeline.current?.pause()}>
          pause
        </button>
        <button className="demo-button" onClick={() => timeline.current?.reverse()}>
          reverse
        </button>
        <button className="demo-button" onClick={() => timeline.current?.restart()}>
          restart
        </button>
      </div>
    </div>
  )
}
