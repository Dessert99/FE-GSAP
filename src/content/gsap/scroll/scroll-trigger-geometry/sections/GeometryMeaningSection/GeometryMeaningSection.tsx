/** refresh가 config string을 numeric geometry와 current state로 바꾸는 순서를 설명한다. */
export function GeometryMeaningSection() {
  return (
    <section id='geometry-meaning' aria-labelledby='geometry-meaning-title'>
      <h2 id='geometry-meaning-title'>
        01 · geometry는 config 문자가 아니라 refresh 뒤의 instance 값입니다
      </h2>
      <p>
        <code>start</code>와 <code>end</code>는 항상 numeric pixel scroll
        position이며 refresh 때 계산됩니다. <code>progress</code>는 둘 사이를
        0–1로 normalize하고, <code>isActive</code>는 현재 scroll이 그 범위 안에
        있을 때만 true입니다.
      </p>
      <p>
        <code>direction</code>은 moment-by-moment forward 1 또는 backward
        -1입니다. 연속 readout은 보조기술에 보내지 않고, 사용자가 요청해 고정한
        snapshot에서만 state를 보입니다.
      </p>
    </section>
  )
}
