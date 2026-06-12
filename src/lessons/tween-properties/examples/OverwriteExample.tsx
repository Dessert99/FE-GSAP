import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function OverwriteExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // overwrite false: 기존 트윈을 정리하지 않는다. 뒤 트윈이 끝난 뒤 앞 트윈 영향이 다시 보일 수 있다.
      gsap.to('.box--false', { x: 220, duration: 2 })
      gsap.to('.box--false', {
        x: 80, // 뒤늦게 들어온 목표 위치
        backgroundColor: '#e11d48', // 두 번째 트윈이 시작되는 시점을 눈으로 구분한다
        duration: 0.7,
        delay: 0.6,
        overwrite: false,
      })

      // overwrite auto: 같은 속성을 제어하는 기존 트윈만 정리해 충돌을 줄인다.
      gsap.to('.box--auto', { x: 220, duration: 2 })
      gsap.to('.box--auto', {
        x: 80, // 뒤늦게 들어온 목표 위치
        backgroundColor: '#e11d48', // 두 번째 트윈이 시작되는 시점을 눈으로 구분한다
        duration: 0.7,
        delay: 0.6,
        overwrite: 'auto', // 같은 속성을 제어하는 기존 트윈만 정리해서 충돌을 막는다
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* overwrite false: 두 트윈이 같은 x를 동시에 제어할 수 있다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">overwrite: false</span>
        <div className="tween-lanes__track">
          <div className="box box--false" />
        </div>
      </div>
      {/* overwrite auto: 충돌하는 기존 트윈을 정리한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">overwrite: 'auto'</span>
        <div className="tween-lanes__track">
          <div className="box box--auto" />
        </div>
      </div>
    </div>
  )
}
