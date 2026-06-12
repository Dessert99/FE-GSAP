import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — matchMedia를 제공한다
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 cleanup을 등록하는 훅

export function ResponsiveMatchMediaExample() {
  // 이 예제의 루트 DOM을 가리킨다. matchMedia 안의 셀렉터 범위로 사용한다.
  const container = useRef<HTMLDivElement>(null)
  // 현재 조건을 화면에 표시할 DOM이다.
  const readout = useRef<HTMLSpanElement>(null)

  useGSAP(
    (context) => {
      // matchMedia 인스턴스는 여러 미디어쿼리별 GSAP context를 관리한다.
      const mm = gsap.matchMedia()

      mm.add(
        {
          isWide: '(min-width: 700px)', // 넓은 화면 기준
          isNarrow: '(max-width: 699px)', // 좁은 화면 기준
          reduceMotion: '(prefers-reduced-motion: reduce)', // 접근성 설정 기준
        },
        (mediaContext) => {
          const { isWide, reduceMotion } = mediaContext.conditions ?? {} // 현재 매칭된 조건들
          const x = reduceMotion ? 0 : isWide ? 220 : 110 // 조건에 따라 이동 거리를 정한다

          if (readout.current) {
            readout.current.textContent = reduceMotion ? 'reduced motion' : isWide ? 'wide' : 'narrow'
          }

          // 이 tween은 현재 매칭된 미디어쿼리 context에 기록되고, 조건이 바뀌면 되돌려진다.
          gsap.to('.match-media-card', {
            x, // 화면 조건에 맞춘 이동 거리
            rotation: reduceMotion ? 0 : isWide ? 8 : 0, // 넓은 화면에서만 작은 회전을 더한다
            duration: reduceMotion ? 0 : 0.7, // reduced motion이면 즉시 적용한다
            ease: 'power2.out', // 일반 조건에서 부드럽게 도착하게 한다
          })
        },
        container.current ?? undefined, // matchMedia 내부 셀렉터를 이 예제 루트로 제한한다
      )

      // matchMedia는 전역 리스너를 가지므로 컴포넌트 cleanup에서 직접 되돌린다.
      context.add(() => {
        mm.revert()
      })
    },
    { scope: container }, // useGSAP 자체 셀렉터도 container 안으로 한정
  )

  return (
    <div ref={container}>
      <div className="tween-lanes">
        {/* 화면 폭과 reduced motion 설정에 따라 이동 거리가 달라진다 */}
        <div className="tween-lanes__row">
          <span className="tween-lanes__label">media query branch</span>
          <div className="tween-lanes__track">
            <div className="box match-media-card" />
          </div>
        </div>
      </div>
      <div className="callback-readout">
        <span>condition</span>
        <strong ref={readout}>checking...</strong>
      </div>
    </div>
  )
}
