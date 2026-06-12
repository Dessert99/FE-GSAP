import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — timeline과 tween을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function NestedTimelineExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 작은 섹션 타임라인을 함수로 분리하면 master timeline에 조립할 수 있다.
      const intro = () => {
        const tl = gsap.timeline({ defaults: { duration: 0.45, ease: 'power2.out' } })
        return tl.to('.box--intro-a', { x: 170 }).to('.box--intro-b', { x: 170 }, '<0.1')
      }

      // 다른 섹션도 독립적인 timeline으로 만든다.
      const outro = () => {
        const tl = gsap.timeline({ defaults: { duration: 0.45, ease: 'power2.inOut' } })
        return tl.to('.box--outro-a', { x: 220, backgroundColor: '#e11d48' }).to(
          '.box--outro-b',
          { x: 220, backgroundColor: '#22c55e' },
          '<0.1',
        )
      }

      // master timeline은 작은 timeline들을 add()로 이어 붙인다.
      gsap.timeline().add(intro()).add(outro(), '+=0.25')
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* intro 섹션의 첫 tween */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">intro A</span>
        <div className="tween-lanes__track">
          <div className="box box--intro-a" />
        </div>
      </div>
      {/* intro 섹션의 겹쳐 시작하는 tween */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">intro B</span>
        <div className="tween-lanes__track">
          <div className="box box--intro-b" />
        </div>
      </div>
      {/* outro 섹션의 첫 tween */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">outro A</span>
        <div className="tween-lanes__track">
          <div className="box box--outro-a" />
        </div>
      </div>
      {/* outro 섹션의 겹쳐 시작하는 tween */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">outro B</span>
        <div className="tween-lanes__track">
          <div className="box box--outro-b" />
        </div>
      </div>
    </div>
  )
}
