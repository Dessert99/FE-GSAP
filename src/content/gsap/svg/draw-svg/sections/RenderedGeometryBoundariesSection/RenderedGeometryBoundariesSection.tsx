/** hidden/zero geometry와 browser-specific stroke rendering caveat을 페이지 경계로 고정한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** measurement가 source markup만이 아니라 browser rendered geometry에 의존함을 설명한다. */
export function RenderedGeometryBoundariesSection() {
  return (
    <section
      id="rendered-geometry-boundaries"
      className="draw-svg-page__section"
      aria-labelledby="rendered-geometry-boundaries-title"
    >
      <SectionHeading
        number="05"
        id="rendered-geometry-boundaries"
        title="rendered geometry와 browser caveat을 확인한다"
        description="length/position은 CSS stroke dash와 rendered SVG geometry를 읽습니다. hidden 또는 zero-size geometry를 실제 length라고 가정하면 안 됩니다."
      />
      <div className="draw-svg-page__prose">
        <p>
          설치된 GSAP 3.15.0은 보이지 않는 element의 <code>getBBox()</code>가 실패할
          수 있음을 경고하고, 일부 지원 shape는 attribute로 길이를 계산한 뒤
          길이가 없으면 0을 반환합니다. 따라서 hidden SVG의 측정 성공을 보장하지 않습니다.
        </p>
        <p>
          Firefox path length bug는 100%가 조금 짧게 보이게 할 수 있고, iOS
          Safari의 rect stroke bug는 path/polyline conversion으로 피할 수
          있습니다. <code>&lt;use&gt;</code> contents는 tween해도 browser가 표시
          변경을 허용하지 않습니다.
        </p>
      </div>
      <div className="draw-svg-page__warning">
        <h3>이 페이지의 범위</h3>
        <p>
          이 페이지는 하나의 stroke reveal과 measurement만 다룹니다. path
          morphing, motion path, SVG transform/coordinate conversion은 이후 SVG
          학습 페이지에서 이어서 다룹니다.
        </p>
      </div>
    </section>
  )
}
