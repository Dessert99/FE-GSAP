/** EaselPlugin이 맡는 display object filter/frame 범위를 설명한다. */
export function TargetSection() {
  return (
    <section id="display-object-target">
      <h2>02 · target은 canvas 안 display object입니다</h2>
      <p>
        EaselPlugin은 ColorFilter와 ColorMatrixFilter 관련 특수 property, 그리고
        MovieClip의 <code>frame</code>을 처리합니다. target이 DOM element인지
        확인하는 대신 CreateJS object와 Stage 관계를 먼저 확인합니다.
      </p>
    </section>
  )
}
