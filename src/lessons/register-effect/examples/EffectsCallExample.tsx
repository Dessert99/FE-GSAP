import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 등록된 effect를 호출한다
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅
import { registerFadeSlideEffect } from './registerFadeSlideEffect' // 이 레슨에서 재사용할 custom effect 등록 함수

const items = ['nav', 'card', 'cta'] // 같은 effect를 적용할 반복 UI 예시

export function EffectsCallExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      registerFadeSlideEffect() // 실무에서는 앱 초기화 지점에서 한 번 등록하는 역할

      // 등록된 effect는 gsap.effects 객체에서 이름으로 호출한다.
      gsap.effects.fadeSlideIn('.effect-item', {
        y: 30, // 이 호출에서만 기본 y 오프셋을 덮어쓴다
        stagger: 0.12, // 이 호출에서만 기본 stagger를 덮어쓴다
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="utils-card-row">
      {items.map((item) => (
        // effect가 같은 진입 애니메이션을 적용할 대상이다
        <div key={item} className="utils-card effect-item">
          <span className="utils-card__dot" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}
