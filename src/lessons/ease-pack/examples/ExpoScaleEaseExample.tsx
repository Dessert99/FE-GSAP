import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { ExpoScaleEase } from 'gsap/EasePack' // 큰 scale 변화에 맞춘 EasePack ease
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function ExpoScaleEaseExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 일반 power ease로 작은 scale에서 큰 scale까지 키우는 기준 예제다.
      gsap.fromTo(
        '.box--power-scale',
        { scale: 0.25 },
        { scale: 2, duration: 1.2, ease: 'power2.out' },
      )

      // ExpoScaleEase.config는 시작 scale과 끝 scale을 함께 넘겨 배수 변화에 맞는 곡선을 만든다.
      gsap.fromTo(
        '.box--expo-scale',
        { scale: 0.25 },
        {
          scale: 2,
          duration: 1.2,
          ease: ExpoScaleEase.config(0.25, 2, 'power2.out'), // scale 범위를 기준으로 보정된 ease
        },
      )
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 일반 ease: scale 값 자체를 power2.out으로 보간한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">power2.out scale</span>
        <div className="tween-lanes__track">
          <div className="box box--power-scale" />
        </div>
      </div>
      {/* ExpoScaleEase: 시작·끝 scale 범위를 기준으로 보정한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">ExpoScaleEase.config(0.25, 2)</span>
        <div className="tween-lanes__track">
          <div className="box box--expo-scale" />
        </div>
      </div>
    </div>
  )
}
