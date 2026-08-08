/** 기준이 있는 방향 읽기와 degree 기반 rotation을 함께 분리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** getDirection의 from과 rotation mode의 값을 연결하는 section이다. */
export function DirectionRotationSection() {
  return (
    <section
      id="direction-rotation"
      className="draggable-coordinates-page__section"
      aria-labelledby="direction-rotation-title"
    >
      <SectionHeading
        number="04"
        id="direction-rotation"
        title="방향 기준과 rotation mode를 분리한다"
        description="getDirection()은 start·velocity·element 기준을 고르고, rotation은 target의 degree 값을 읽습니다."
      />
      <div className="draggable-coordinates-page__prose">
        <p>
          <code>getDirection()</code>의 기본 <code>'start'</code>는 drag
          시작점에서 방향을 판단합니다. <code>'velocity'</code>는
          InertiaPlugin이 있을 때 순간 방향을 읽고, element를 넘기면 두 중심의
          방향을 읽습니다.
        </p>
        <p>
          rotation mode에서는 target의 <code>x</code>가 degree 회전과
          연결됩니다. 설치본 runtime은 이 mode에서 <code>clockwise</code> 또는{' '}
          <code>counter-clockwise</code>도 반환하지만, 설치된 TypeScript{' '}
          <code>Direction</code> union은 cartesian 여덟 방향만 선언합니다. lab
          snapshot은 문자열로 안전하게 표시합니다.
        </p>
      </div>
    </section>
  )
}
