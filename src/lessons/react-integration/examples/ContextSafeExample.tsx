import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP context와 contextSafe를 제공하는 훅

export function ContextSafeExample() {
  // 이 예제의 루트 DOM을 가리킨다. 이벤트 핸들러 안의 셀렉터도 이 범위로 제한한다.
  const container = useRef<HTMLDivElement>(null)

  // contextSafe는 useGSAP 콜백 밖에서 나중에 실행되는 GSAP 코드를 같은 context에 연결한다.
  const { contextSafe } = useGSAP({ scope: container })

  // 버튼 클릭은 useGSAP 콜백 이후에 실행된다. contextSafe로 감싸야 언마운트 시 함께 정리된다.
  const rotate = contextSafe(() => {
    gsap.to('.box', {
      rotation: '+=90', // 현재 회전값에서 90도씩 누적 회전
      duration: 0.35,
      ease: 'power2.out',
    })
  })

  return (
    <div ref={container}>
      {/* 클릭할 때마다 contextSafe로 감싼 핸들러가 새 트윈을 만든다 */}
      <div className="box" />
      <div className="demo-actions">
        <button className="demo-button" onClick={rotate}>
          90도 회전
        </button>
      </div>
    </div>
  )
}
