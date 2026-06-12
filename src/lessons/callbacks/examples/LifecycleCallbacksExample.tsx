import { useRef } from 'react' // DOM 요소와 상태 표시 노드를 가리키는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function LifecycleCallbacksExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // onUpdate에서 진행률 텍스트를 직접 갱신할 대상이다.
  const progressText = useRef<HTMLSpanElement>(null)
  // onStart/onComplete에서 현재 상태를 표시할 대상이다.
  const statusText = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      // tween 인스턴스를 변수로 받아 onUpdate에서 progress() 값을 읽는다.
      const tween = gsap.to('.box', {
        x: 220,
        duration: 1.2,
        ease: 'power2.out',
        onStart: () => {
          // onStart는 playhead가 처음 0을 벗어나는 시점에 실행된다.
          if (statusText.current) statusText.current.textContent = 'started'
        },
        onUpdate: () => {
          // onUpdate는 애니메이션이 진행되는 매 tick에 실행된다.
          if (progressText.current) {
            progressText.current.textContent = `${Math.round(tween.progress() * 100)}%`
          }
        },
        onComplete: () => {
          // onComplete는 목표값까지 도착한 뒤 후속 작업을 연결할 때 쓴다.
          if (statusText.current) statusText.current.textContent = 'complete'
        },
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container}>
      {/* 콜백이 제어하는 트윈 대상 */}
      <div className="tween-lanes">
        <div className="tween-lanes__row">
          <span className="tween-lanes__label">callback lifecycle</span>
          <div className="tween-lanes__track">
            <div className="box" />
          </div>
        </div>
      </div>
      <div className="callback-readout">
        <span>
          status: <strong ref={statusText}>waiting</strong>
        </span>
        <span>
          progress: <strong ref={progressText}>0%</strong>
        </span>
      </div>
    </div>
  )
}
