/** 시작·현재·종료 target 값을 gesture 시점별로 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { CoordinateLab } from '../../examples/CoordinateLab/CoordinateLab'

/** press→drag→release snapshot이 같은 property라도 다른 의미를 갖는 section이다. */
export function PhaseSnapshotSection() {
  return (
    <section
      id="phase-snapshots"
      className="draggable-coordinates-page__section"
      aria-labelledby="phase-snapshots-title"
    >
      <SectionHeading
        number="02"
        id="phase-snapshots"
        title="press, drag, release마다 다른 snapshot을 읽는다"
        description="startX·startY는 press 때, x·y는 현재 target 값에서, endX·endY·endRotation은 release 직후에 읽습니다."
      />
      <div className="draggable-coordinates-page__prose">
        <p>
          <code>startX</code>와 <code>startY</code>는 drag가 시작될 때 target이
          있던 값입니다. drag하는 동안에는 <code>x</code>와 <code>y</code>가
          현재 target 값을 나타냅니다.
        </p>
        <p>
          release 뒤 <code>endX</code>, <code>endY</code>, 그리고 rotation
          mode의 <code>endRotation</code>이 즉시 채워집니다. inertia가 있다면
          tween이 끝나기 전에도 landing을 예측할 수 있지만, 이 페이지 lab은
          inertia를 만들지 않습니다.
        </p>
      </div>
      <CoordinateLab />
    </section>
  )
}
