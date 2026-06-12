import { useRef } from 'react' // DOM 요소와 tween 인스턴스를 보관하는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function RepeatReverseCallbacksExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // 버튼에서 제어할 tween 인스턴스를 저장한다.
  const tween = useRef<gsap.core.Tween | null>(null)
  // 반복과 역재생 완료 이벤트를 화면에 표시할 대상이다.
  const eventText = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      // repeat/yoyo가 있어야 onRepeat의 실행 시점을 눈으로 확인하기 쉽다.
      tween.current = gsap.to('.box', {
        x: 220,
        duration: 0.8,
        repeat: 1,
        yoyo: true,
        ease: 'power2.inOut',
        onRepeat: () => {
          // onRepeat은 첫 실행이 끝난 뒤 반복 회차가 시작될 때 실행된다.
          if (eventText.current) eventText.current.textContent = 'onRepeat fired'
        },
        onReverseComplete: () => {
          // onReverseComplete는 reverse()로 시작점까지 돌아왔을 때 실행된다.
          if (eventText.current) eventText.current.textContent = 'onReverseComplete fired'
        },
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container}>
      {/* repeat/yoyo로 왕복하는 대상 */}
      <div className="tween-lanes">
        <div className="tween-lanes__row">
          <span className="tween-lanes__label">repeat + reverse callbacks</span>
          <div className="tween-lanes__track">
            <div className="box" />
          </div>
        </div>
      </div>
      <div className="callback-readout">
        <span>
          event: <strong ref={eventText}>running</strong>
        </span>
      </div>
      <div className="demo-actions">
        <button className="demo-button" onClick={() => tween.current?.restart()}>
          restart
        </button>
        <button
          className="demo-button"
          onClick={() => {
            if (eventText.current) eventText.current.textContent = 'reverse running'
            tween.current?.progress(1).reverse()
          }}
        >
          reverse from end
        </button>
      </div>
    </div>
  )
}
