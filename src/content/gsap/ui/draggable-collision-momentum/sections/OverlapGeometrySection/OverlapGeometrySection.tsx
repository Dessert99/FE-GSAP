/** hitTest가 비교하는 대상 forms와 rectangle mental model을 먼저 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { CollisionMomentumLab } from '../../examples/CollisionMomentumLab/CollisionMomentumLab'

export function OverlapGeometrySection() {
  return (
    <section
      id="overlap-geometry"
      className="draggable-collision-momentum-page__section"
      aria-labelledby="overlap-geometry-title"
    >
      <SectionHeading
        number="01"
        id="overlap-geometry"
        title="충돌은 먼저 두 사각형의 겹침입니다"
        description="collision이라는 말보다 먼저 두 대상의 현재 rectangle이 닿는지 묻습니다. hitTest()는 animation 명령이 아니라 바로 true/false를 돌려주는 query입니다."
      />
      <div className="draggable-collision-momentum-page__prose">
        <p>
          <code>draggable.hitTest(testObject, threshold)</code>의 test object는 element,{' '}
          <code>pageX</code>/<code>pageY</code>가 있는 mouse·touch event, selector text, 또는{' '}
          <code>top/left/right/bottom</code> rectangle object가 될 수 있습니다. static{' '}
          <code>Draggable.hitTest(puck, dropZone, threshold)</code>는 두 대상을 직접 넘길 때 쓰는
          같은 판정입니다.
        </p>
        <p>
          <code>hitTest(window)</code>는 element가 viewport 안에 보이는지를 묻는 용도입니다. 이
          lab은 puck과 drop zone 두 element를 비교해, threshold가 결과를 어떻게 바꾸는지 한 화면에서
          보입니다.
        </p>
      </div>
      <CollisionMomentumLab />
    </section>
  )
}
