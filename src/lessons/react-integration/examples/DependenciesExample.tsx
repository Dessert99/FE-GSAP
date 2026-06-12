import { useRef, useState } from 'react' // ref와 상태를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React 상태 변화에 맞춰 GSAP을 다시 실행하는 훅

export function DependenciesExample() {
  // 버튼을 누를 때마다 이 값이 바뀌고, 아래 useGSAP이 다시 실행된다.
  const [step, setStep] = useState(0)
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // step이 바뀔 때마다 새 목표 위치로 트윈을 만든다.
      gsap.to('.box', {
        x: step * 70, // React 상태를 GSAP 목표값으로 사용
        duration: 0.45,
        ease: 'power2.out',
      })
    },
    {
      scope: container, // 셀렉터 검색 범위를 현재 컴포넌트로 제한
      dependencies: [step], // step이 바뀔 때 useGSAP 콜백을 다시 실행
      revertOnUpdate: true, // 다시 실행하기 전에 이전 GSAP 적용 상태를 되돌린다
    },
  )

  return (
    <div ref={container}>
      {/* 상태 변경에 따라 같은 박스의 목표 위치가 바뀐다 */}
      <div className="tween-lanes">
        <div className="tween-lanes__row">
          <span className="tween-lanes__label">step: {step}</span>
          <div className="tween-lanes__track">
            <div className="box" />
          </div>
        </div>
      </div>
      <div className="demo-actions">
        <button className="demo-button" onClick={() => setStep((value) => (value + 1) % 4)}>
          다음 위치
        </button>
      </div>
    </div>
  )
}
