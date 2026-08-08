/** align이 좌표 공간을 맞추는 범위와 origin을 설명한다. */
export function AlignmentSection() {
  return (
    <section>
      <h2>02 · align은 좌표 공간을 맞춥니다</h2>
      <p>
        raw path 좌표는 기본적으로 follower의 x/y transform에 들어갑니다.{' '}
        <code>align</code>에 path selector 또는 Element를 주면 nested
        transform이 있어도 target 기준으로 맞춥니다. <code>align: 'self'</code>
        는 처음 jump를 막기 위해 path를 target 위치로 옮깁니다.
      </p>
      <p>
        <code>alignOrigin: [0.5, 0.5]</code>는 follower 중심을 path에 놓고 같은
        위치를 transformOrigin으로도 설정합니다. offsetX/offsetY는 마지막 미세
        조정입니다.
      </p>
    </section>
  )
}
