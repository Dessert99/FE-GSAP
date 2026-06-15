import { useRef, useState } from 'react' // ref는 DOM 캡처에, state는 레이아웃 변경에 사용한다
import { flushSync } from 'react-dom' // Flip이 상태 변경 직후의 DOM을 즉시 읽게 만든다
import gsap from 'gsap' // GSAP 코어 — Flip 플러그인을 등록한다
import { Flip } from 'gsap/Flip' // 레이아웃 변경 전후를 보간하는 공식 플러그인
import { useGSAP } from '@gsap/react' // 이벤트 핸들러 애니메이션을 GSAP context에 묶는 훅

gsap.registerPlugin(Flip) // Flip.getState()와 Flip.from()을 쓰기 전에 등록한다

export function LayoutChangeExample() {
  // 이 예제의 루트 DOM을 가리킨다. contextSafe의 scope로 사용한다.
  const container = useRef<HTMLDivElement>(null)
  // 위치와 크기를 캡처할 카드 요소다.
  const card = useRef<HTMLDivElement>(null)
  // React가 어떤 슬롯에 카드를 렌더링할지 결정하는 상태다.
  const [expanded, setExpanded] = useState(false)

  // 버튼 클릭처럼 useGSAP 콜백 밖에서 만드는 Flip 애니메이션도 cleanup 대상에 포함한다.
  const { contextSafe } = useGSAP({ scope: container })

  const toggleLayout = contextSafe(() => {
    if (!card.current) return

    const state = Flip.getState(card.current) // 레이아웃을 바꾸기 전 위치와 크기를 저장한다

    flushSync(() => {
      setExpanded((current) => !current) // React 상태로 카드를 다른 슬롯에 렌더링한다
    })

    Flip.from(state, {
      duration: 0.6, // 레이아웃 이동 과정을 눈으로 확인할 수 있는 시간
      ease: 'power2.inOut', // 시작과 끝이 모두 부드러운 카드 이동
      absolute: true, // 이동 중 주변 레이아웃이 흔들리지 않도록 임시 absolute 처리한다
      scale: true, // 슬롯에 따라 달라지는 카드 크기도 transform으로 보간한다
    })
  })

  return (
    <div ref={container} className="flip-demo">
      <div className="flip-grid">
        <div className="flip-slot flip-slot--compact">
          {!expanded && (
            <div ref={card} className="flip-card">
              card
            </div>
          )}
        </div>
        <div className="flip-slot flip-slot--wide">
          {expanded && (
            <div ref={card} className="flip-card flip-card--wide">
              card
            </div>
          )}
        </div>
      </div>
      <div className="demo-actions">
        <button className="demo-button" type="button" onClick={toggleLayout}>
          toggle layout
        </button>
      </div>
    </div>
  )
}
