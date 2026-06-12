import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 플러그인 등록과 트윈 생성을 담당한다
import { CustomEase } from 'gsap/CustomEase' // 직접 정의한 ease 곡선을 이름으로 등록하는 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

// CustomEase는 별도 플러그인이므로 사용 전에 등록한다.
gsap.registerPlugin(CustomEase)

// create는 보통 앱 초기화 시 한 번 실행한다. 만든 ID는 트윈의 ease 문자열로 재사용한다.
CustomEase.create('lessonCustomEase', '0.17, 0.67, 0.24, 1.18')

export function CustomEaseExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // power2.out은 비교 기준이다. 같은 거리와 duration에서 기본 감속을 보여준다.
      gsap.to('.box--power', { x: 220, duration: 1.2, ease: 'power2.out' })

      // lessonCustomEase는 위에서 만든 사용자 정의 곡선이다. 목표를 넘기는 듯한 도착감을 만든다.
      gsap.to('.box--custom', { x: 220, duration: 1.2, ease: 'lessonCustomEase' })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 기본 ease: 일반적인 도착 감속 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">power2.out</span>
        <div className="tween-lanes__track">
          <div className="box box--power" />
        </div>
      </div>
      {/* CustomEase: 직접 만든 곡선을 문자열 ID로 재사용 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">lessonCustomEase</span>
        <div className="tween-lanes__track">
          <div className="box box--custom" />
        </div>
      </div>
    </div>
  )
}
