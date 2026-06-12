import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 플러그인 등록과 트윈 생성을 담당한다
import { CustomEase } from 'gsap/CustomEase' // CustomWiggle이 내부적으로 기반으로 삼는 플러그인
import { CustomWiggle } from 'gsap/CustomWiggle' // 흔들림 ease를 생성하는 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

// CustomWiggle은 CustomEase를 확장하므로 둘 다 등록한다.
gsap.registerPlugin(CustomEase, CustomWiggle)

// 기본 easeOut 타입은 처음에 크게 흔들리고 끝으로 갈수록 잦아든다.
CustomWiggle.create('lessonWiggleOut', { wiggles: 6, type: 'easeOut' })

// anticipate 타입은 반대 방향 예비 움직임이 들어가서 더 강한 반응처럼 보인다.
CustomWiggle.create('lessonWiggleAnticipate', { wiggles: 6, type: 'anticipate' })

export function CustomWiggleExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 일반 rotation은 목표 각도까지 한 방향으로만 회전한다.
      gsap.to('.box--plain-rotate', { rotation: 30, duration: 1.3, ease: 'power2.out' })

      // wiggle ease는 rotation 목표값을 향해 갔다가 반대 방향으로도 흔들리며 끝난다.
      gsap.to('.box--wiggle-out', { rotation: 30, duration: 1.3, ease: 'lessonWiggleOut' })

      // anticipate 타입은 시작 전에 반대 방향 움직임이 들어가 더 튀는 피드백을 만든다.
      gsap.to('.box--wiggle-anticipate', {
        rotation: 30,
        duration: 1.3,
        ease: 'lessonWiggleAnticipate',
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 일반 회전: 한 방향으로 부드럽게 간다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">power2.out rotation</span>
        <div className="tween-lanes__track">
          <div className="box box--plain-rotate" />
        </div>
      </div>
      {/* easeOut wiggle: 끝으로 갈수록 흔들림이 줄어든다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">CustomWiggle easeOut</span>
        <div className="tween-lanes__track">
          <div className="box box--wiggle-out" />
        </div>
      </div>
      {/* anticipate wiggle: 반대 방향 예비 움직임이 먼저 들어간다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">CustomWiggle anticipate</span>
        <div className="tween-lanes__track">
          <div className="box box--wiggle-anticipate" />
        </div>
      </div>
    </div>
  )
}
