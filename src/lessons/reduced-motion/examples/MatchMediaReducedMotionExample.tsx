import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — matchMedia와 tween/set을 제공한다
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

export function MatchMediaReducedMotionExample() {
  // 이 예제의 루트 DOM을 가리킨다. matchMedia selector scope로 사용한다.
  const container = useRef<HTMLDivElement>(null)
  // 현재 적용된 모션 정책을 화면에 표시한다.
  const readout = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)', // OS 접근성 설정을 읽는다
          allowMotion: '(prefers-reduced-motion: no-preference)', // 일반 모션 허용 조건
        },
        (context) => {
          const { reduceMotion } = context.conditions ?? {}

          if (readout.current) {
            readout.current.textContent = reduceMotion ? 'reduced motion' : 'full motion'
          }

          if (reduceMotion) {
            gsap.set('.reduced-card', { x: 0, rotation: 0 }) // 큰 이동·회전을 즉시 제거한다
            gsap.fromTo('.reduced-card', { opacity: 0.65 }, { opacity: 1, duration: 0.2 }) // 짧은 변화만 남긴다
            return
          }

          gsap.to('.reduced-card', {
            x: 210, // 일반 조건에서는 위치 이동으로 상태 변화를 보여준다
            rotation: 10,
            duration: 0.9,
            ease: 'power2.out',
            repeat: 1,
            yoyo: true,
          })
        },
        container.current ?? undefined, // 내부 selector를 이 예제 루트로 제한한다
      )

      // matchMedia는 미디어쿼리 리스너를 만들기 때문에 cleanup에서 되돌린다.
      return () => {
        mm.revert()
      }
    },
    { scope: container }, // useGSAP 자체 selector도 container 안으로 한정한다
  )

  return (
    <div ref={container}>
      <div className="tween-lanes">
        <div className="tween-lanes__row">
          <span className="tween-lanes__label">accessibility branch</span>
          <div className="tween-lanes__track">
            {/* matchMedia 조건에 따라 큰 motion 또는 reduced motion 대체 효과가 적용된다 */}
            <div className="box reduced-card" />
          </div>
        </div>
      </div>
      <div className="callback-readout">
        <span>mode</span>
        <strong ref={readout}>checking...</strong>
      </div>
    </div>
  )
}
