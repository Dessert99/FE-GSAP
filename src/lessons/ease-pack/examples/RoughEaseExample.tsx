import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { RoughEase } from 'gsap/EasePack' // 불규칙한 진행 곡선을 만드는 EasePack ease
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function RoughEaseExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // power2.out은 비교 기준이다. 같은 거리와 duration을 매끈하게 이동한다.
      gsap.to('.box--smooth', { x: 220, duration: 1.2, ease: 'power2.out' })

      // RoughEase.config는 진행률을 여러 점으로 나눠 흔든다. randomize:false는 학습용으로 결과를 고정한다.
      gsap.to('.box--rough', {
        x: 220,
        duration: 1.2,
        ease: RoughEase.config({
          points: 16, // 곡선을 나누는 점 개수. 많을수록 더 촘촘하게 흔들린다.
          strength: 1.2, // 기준 곡선에서 벗어나는 강도
          randomize: false, // 재생할 때마다 같은 흔들림을 보여주기 위한 학습용 설정
          clamp: true, // 진행 값이 0~1 범위를 벗어나지 않게 제한
        }),
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 일반 ease: 부드러운 기준 움직임 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">power2.out</span>
        <div className="tween-lanes__track">
          <div className="box box--smooth" />
        </div>
      </div>
      {/* RoughEase: 진행 중 속도가 불규칙하게 흔들린다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">RoughEase.config()</span>
        <div className="tween-lanes__track">
          <div className="box box--rough" />
        </div>
      </div>
    </div>
  )
}
