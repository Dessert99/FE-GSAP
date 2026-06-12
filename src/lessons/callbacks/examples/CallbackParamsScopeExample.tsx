import { useRef } from 'react' // DOM 요소와 메시지 노드를 가리키는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

type CallbackScope = {
  label: string
  write: (message: string) => void
}

export function CallbackParamsScopeExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // onComplete 콜백 결과를 표시할 대상이다.
  const messageText = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      // callbackScope는 콜백 내부 this로 사용할 객체다.
      const scope: CallbackScope = {
        label: 'card-enter',
        write: (message) => {
          if (messageText.current) messageText.current.textContent = message
        },
      }

      gsap.to('.box', {
        x: 220,
        duration: 0.9,
        ease: 'power2.out',
        callbackScope: scope, // 아래 function 콜백의 this가 이 객체를 가리킨다
        onComplete(this: CallbackScope, state: string, nextStep: string) {
          // onCompleteParams 배열의 값이 콜백 인자로 순서대로 들어온다.
          this.write(`${this.label}: ${state}, next=${nextStep}`)
        },
        onCompleteParams: ['done', 'enable button'], // 콜백에 전달할 값
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container}>
      {/* 완료 콜백이 실행될 tween 대상 */}
      <div className="tween-lanes">
        <div className="tween-lanes__row">
          <span className="tween-lanes__label">callbackScope + params</span>
          <div className="tween-lanes__track">
            <div className="box" />
          </div>
        </div>
      </div>
      <div className="callback-readout">
        <span>
          message: <strong ref={messageText}>waiting</strong>
        </span>
      </div>
    </div>
  )
}
