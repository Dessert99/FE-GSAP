import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — MotionPathPlugin이 확장한 tween 속성을 실행한다
import { MotionPathPlugin } from 'gsap/MotionPathPlugin' // SVG path를 따라 이동시키는 공식 플러그인
import { MotionPathHelper } from 'gsap/MotionPathHelper' // 브라우저에서 motion path를 확인·편집하는 보조 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

gsap.registerPlugin(MotionPathPlugin, MotionPathHelper) // motionPath tween과 helper를 함께 등록한다

export function PathFollowerExample() {
  // 이 예제의 루트 DOM을 가리킨다. useGSAP의 scope로 넘겨 정리 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // motionPath가 따라갈 SVG path다.
  const path = useRef<SVGPathElement>(null)
  // path 위를 이동할 대상 요소다.
  const dot = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!path.current || !dot.current) return

      gsap.to(dot.current, {
        motionPath: {
          path: path.current, // 이동 기준이 되는 SVG path
          align: path.current, // DOM 요소의 좌표계를 path 좌표계에 맞춘다
          alignOrigin: [0.5, 0.5], // 요소 중앙이 path 위에 오도록 정렬한다
          autoRotate: true, // path 진행 방향에 맞춰 요소를 회전시킨다
        },
        duration: 3,
        ease: 'none',
        repeat: -1,
      })

      const helper = MotionPathHelper.create(dot.current, {
        path: path.current, // helper가 표시하고 편집할 path를 지정한다
        pathColor: '#38bdf8',
        pathWidth: 2,
        selected: true,
      })

      // helper는 편집용 DOM을 추가하므로 컴포넌트 cleanup에서 제거한다.
      return () => {
        helper.kill()
      }
    },
    { scope: container }, // 이 예제에서 만든 tween과 helper를 container context에 묶는다
  )

  return (
    <div ref={container} className="motion-demo">
      <svg className="motion-svg" viewBox="0 0 320 180" aria-hidden="true">
        {/* 화면에 보이는 기준 경로. 같은 요소가 motionPath.path에도 사용된다 */}
        <path ref={path} className="svg-line svg-line--muted" d="M30 130 C80 30 148 30 164 92 S238 158 292 48" />
      </svg>
      {/* MotionPathPlugin이 transform으로 움직이는 일반 DOM 요소 */}
      <div ref={dot} className="motion-dot">
        arrow
      </div>
    </div>
  )
}
