import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — MorphSVGPlugin이 확장한 tween 속성을 실행한다
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin' // SVG path 형태를 다른 path로 보간하는 공식 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

gsap.registerPlugin(MorphSVGPlugin) // morphSVG 속성을 쓰기 전에 플러그인을 등록한다

const circlePath =
  'M130 20 C190 20 230 60 230 100 C230 140 190 180 130 180 C70 180 30 140 30 100 C30 60 70 20 130 20 Z'

const badgePath =
  'M130 16 L160 70 L222 74 L176 116 L190 176 L130 146 L70 176 L84 116 L38 74 L100 70 Z'

export function ShapeMorphExample() {
  // 이 예제의 루트 DOM을 가리킨다. useGSAP의 scope로 넘겨 정리 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // morphSVG가 실제로 d 속성을 바꿀 path다.
  const shape = useRef<SVGPathElement>(null)

  useGSAP(
    () => {
      if (!shape.current) return

      gsap.to(shape.current, {
        morphSVG: {
          shape: badgePath, // 현재 path가 변할 목표 path 데이터
          shapeIndex: 'auto', // 두 path의 포인트 대응을 플러그인이 자동으로 맞춘다
        },
        duration: 1.2,
        ease: 'power2.inOut',
        repeat: -1, // 형태 전환을 계속 비교할 수 있게 반복한다
        yoyo: true, // 원래 circlePath로 되돌아오는 방향도 보여준다
        repeatDelay: 0.25,
      })
    },
    { scope: container }, // 이 예제에서 만든 tween을 container context에 묶는다
  )

  return (
    <div ref={container} className="svg-demo">
      <svg className="svg-stage" viewBox="0 0 260 200" role="img" aria-label="morph svg shape">
        {/* 시작 형태. MorphSVGPlugin이 d 속성을 목표 path로 보간한다 */}
        <path ref={shape} className="svg-fill-shape" d={circlePath} />
      </svg>
    </div>
  )
}
