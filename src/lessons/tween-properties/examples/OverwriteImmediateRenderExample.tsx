import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function OverwriteImmediateRenderExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 첫 트윈이 아직 x를 움직이는 중일 때 두 번째 트윈이 같은 x를 다시 제어한다.
      gsap.to('.box--overwrite', { x: 220, duration: 2 })
      gsap.to('.box--overwrite', {
        x: 80, // 뒤늦게 들어온 목표 위치
        backgroundColor: '#e11d48', // x와 함께 바뀌는 비교용 색상
        duration: 0.7,
        delay: 0.6,
        overwrite: 'auto', // 같은 속성을 제어하는 기존 트윈만 정리해서 충돌을 막는다
      })

      // from()/fromTo()는 시작값을 즉시 적용할 수 있다. false로 두면 delay 동안 현재 상태를 유지한다.
      gsap.fromTo(
        '.box--immediate',
        { x: -120, opacity: 0 }, // 트윈이 시작될 때 적용할 시작 상태
        { x: 0, opacity: 1, duration: 0.8, delay: 0.6, immediateRender: false },
      )
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* overwrite: 같은 대상·같은 속성을 잡는 트윈끼리 충돌하지 않게 한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">overwrite: 'auto'</span>
        <div className="tween-lanes__track">
          <div className="box box--overwrite" />
        </div>
      </div>
      {/* immediateRender: 지연된 fromTo의 시작값 적용 시점을 조절한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">immediateRender: false</span>
        <div className="tween-lanes__track">
          <div className="box box--immediate" />
        </div>
      </div>
    </div>
  )
}
