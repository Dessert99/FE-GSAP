/** 어떤 값이 실제 path geometry가 되는지 설명한다. */
export function PathInputSection() {
  return (
    <section>
      <h2>01 · path input과 progress</h2>
      <p>
        <code>path</code>에는 selector, SVG Element, path-data string, 또는
        point array를 줄 수 있습니다. point array는 기본 curve를 만들고{' '}
        <code>type: 'cubic'</code>이면 anchor와 control point 순서로 읽습니다.
      </p>
      <p>
        <code>start</code>와 <code>end</code>는 경로 progress입니다. 0은 시작,
        1은 끝이며 negative 값, backward interval, 1을 넘는 wrap도 가능합니다.
      </p>
    </section>
  )
}
