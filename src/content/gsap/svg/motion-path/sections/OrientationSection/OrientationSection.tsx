/** orientation과 point-array 옵션의 적용 범위를 구분한다. */
export function OrientationSection() {
  return (
    <section>
      <h2>03 · 방향과 array option</h2>
      <p>
        <code>autoRotate: true</code>는 경로 tangent 방향을 따릅니다. number는
        degree offset이며 중심 회전에는 transformOrigin 50% 50% 또는
        alignOrigin을 함께 씁니다. <code>useRadians</code>는 rotation output만
        radians로 바꿉니다.
      </p>
      <p>
        <code>curviness</code>, <code>fromCurrent</code>, <code>relative</code>,{' '}
        <code>resolution</code>은 point array일 때의 option입니다. 다른 property
        object array도 가능하지만 이 페이지 lab은 좌표 이동 하나에 집중합니다.
      </p>
    </section>
  )
}
