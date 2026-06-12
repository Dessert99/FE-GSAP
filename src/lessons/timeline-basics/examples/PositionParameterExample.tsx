import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — timeline과 tween을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function PositionParameterExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // defaults는 이 timeline에 추가되는 자식 tween의 기본 duration/ease가 된다.
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } })

      // 위치값을 생략하면 타임라인 끝에 순서대로 붙는다.
      tl.to('.box--normal', { x: 220 })
        // '<'는 직전에 추가한 tween의 시작 지점에 맞춰 동시에 시작한다.
        .to('.box--same-start', { x: 220, backgroundColor: '#e11d48' }, '<')
        // '+=0.25'는 현재 타임라인 끝에서 0.25초 뒤에 넣어 간격을 만든다.
        .to('.box--after-gap', { x: 220, backgroundColor: '#22c55e' }, '+=0.25')
        // '-=0.45'는 현재 끝보다 0.45초 앞에 넣어 이전 구간과 겹친다.
        .to('.box--overlap', { x: 220, backgroundColor: '#f59e0b' }, '-=0.45')
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 기준 tween: 생략한 position은 타임라인 끝에 붙는다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">default position</span>
        <div className="tween-lanes__track">
          <div className="box box--normal" />
        </div>
      </div>
      {/* '<': 직전 tween과 같은 시점에 시작 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">'&lt;'</span>
        <div className="tween-lanes__track">
          <div className="box box--same-start" />
        </div>
      </div>
      {/* '+=0.25': 끝 지점 뒤로 간격 추가 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">'+=0.25'</span>
        <div className="tween-lanes__track">
          <div className="box box--after-gap" />
        </div>
      </div>
      {/* '-=0.45': 직전 끝과 겹치게 배치 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">'-=0.45'</span>
        <div className="tween-lanes__track">
          <div className="box box--overlap" />
        </div>
      </div>
    </div>
  )
}
