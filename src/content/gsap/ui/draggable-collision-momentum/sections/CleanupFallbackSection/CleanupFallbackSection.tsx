/** DOM rectangle limitation, plugin registration, cleanup과 prerequisite 경계를 마무리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function CleanupFallbackSection() {
  return (
    <section
      id="cleanup-fallback"
      className="draggable-collision-momentum-page__section"
      aria-labelledby="cleanup-fallback-title"
    >
      <SectionHeading
        number="05"
        id="cleanup-fallback"
        title="관찰은 정리와 fallback을 포함합니다"
        description="collision result를 믿기 전에 geometry의 한계를 확인하고, component cleanup에서는 Draggable과 generated tween 모두를 끝냅니다."
      />
      <div className="draggable-collision-momentum-page__prose">
        <p>
          DOM <code>hitTest()</code>는 browser의 <code>getBoundingClientRect()</code> bounding box를
          사용합니다. 그래서 rotate된 element, 원형처럼 보이는 shape, 빈 영역이 있는 SVG에
          pixel-perfect collision을 기대하면 안 됩니다. 그런 요구에는 별도 geometry model이
          필요합니다.
        </p>
        <p>
          runtime은 <code>Draggable</code>과 <code>InertiaPlugin</code>을 명시적으로 register하고
          cleanup에서 generated throw tween을 kill한 뒤 instance도 kill합니다. 실제 release throw가
          필요 없는 reduced-motion fallback은 inertia를 끄고 puck을 현재 위치에 그대로 정착시킵니다.
        </p>
      </div>
      <p className="draggable-collision-momentum-page__related">
        <a href="/fundamentals/draggable-create">P03 instance 생성</a>,{' '}
        <a href="/fundamentals/draggable-coordinates">P04 좌표 timing</a>,{' '}
        <a href="/fundamentals/draggable-bounds-axis">P05 bounds</a>를 선행으로 링크합니다.
        lifecycle·gesture event API와 Inertia의 velocity 설정은 이 페이지에서 text-only 경계로
        남깁니다.
      </p>
    </section>
  )
}
