import { useGSAP } from '@gsap/react'; // React에서 GSAP 실행과 cleanup을 묶어주는 훅
import gsap from 'gsap'; // GSAP 코어 — DrawSVGPlugin이 확장한 tween 속성을 실행한다
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'; // SVG stroke의 표시 구간을 제어하는 공식 플러그인
import { useRef } from 'react'; // DOM 요소를 가리키는 ref를 만드는 React 훅

gsap.registerPlugin(DrawSVGPlugin) // drawSVG 속성을 쓰기 전에 플러그인을 등록한다

export function StrokeRevealExample() {
  // 이 예제의 루트 DOM을 가리킨다. useGSAP의 scope로 넘겨 정리 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // drawSVG가 적용될 stroke path다.
  const path = useRef<SVGPathElement>(null)

  useGSAP(
    () => {
      if (!path.current) return

      gsap.fromTo(
        path.current,
        { drawSVG: '0%' }, // stroke를 보이지 않는 상태에서 시작한다
        {
          drawSVG: '100%', // 전체 stroke가 보일 때까지 구간을 넓힌다
          duration: 1.4,
          ease: 'power4.in',
        },
      )
    },
    { scope: container }, // 이 예제에서 만든 tween을 container context에 묶는다
  )

  return (
    <div ref={container} className="svg-demo">
      <svg className="svg-stage" viewBox="0 0 260 120" role="img" aria-label="draw svg path">
        {/* drawSVG는 fill이 아니라 stroke가 있는 SVG 요소에 적용한다 */}
        <path
          ref={path}
          className="svg-line"
          d="M24 78 C64 18 106 22 130 62 S204 112 236 38"
          pathLength="1"
        />
      </svg>
    </div>
  )
}
