import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { SlowMo } from 'gsap/EasePack' // 중간 구간을 길게 보여주는 EasePack ease
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function SlowMoExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // none은 일정 속도 기준이다. SlowMo와 중간 구간 체류 시간을 비교한다.
      gsap.to('.box--linear', { x: 220, duration: 1.4, ease: 'none' })

      // 첫 번째 값은 선형처럼 천천히 유지되는 중간 구간 비율이다.
      gsap.to('.box--slow-long', {
        x: 220,
        duration: 1.4,
        ease: SlowMo.config(0.7, 0.7, false), // 중간 70% 구간을 길게 보여준다
      })

      // 중간 구간 비율을 줄이면 시작·끝의 가속 변화가 더 크게 느껴진다.
      gsap.to('.box--slow-short', {
        x: 220,
        duration: 1.4,
        ease: SlowMo.config(0.35, 0.8, false), // 중간 구간을 짧게 잡아 대비를 키운다
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 일정 속도 기준 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">none</span>
        <div className="tween-lanes__track">
          <div className="box box--linear" />
        </div>
      </div>
      {/* 중간 구간을 길게 보여주는 SlowMo */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">SlowMo.config(0.7, 0.7)</span>
        <div className="tween-lanes__track">
          <div className="box box--slow-long" />
        </div>
      </div>
      {/* 시작·끝 대비가 더 큰 SlowMo */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">SlowMo.config(0.35, 0.8)</span>
        <div className="tween-lanes__track">
          <div className="box box--slow-short" />
        </div>
      </div>
    </div>
  )
}
