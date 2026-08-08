/** CreateJS dependency와 ticker cleanup을 실행하지 않는 이유까지 명시한다. */
export function BoundarySection() {
  return (
    <section id="dependency-cleanup">
      <h2>05 · dependency와 cleanup 없이는 실행하지 않습니다</h2>
      <p>
        EaselPlugin과 CreateJS, 필요한 ColorFilter/ColorMatrixFilter를 load한 뒤
        plugin을 register해야 합니다. component cleanup에서는 같은 ticker
        callback을 remove해야 합니다. 이 프로젝트에는 CreateJS가 설치되어 있지
        않아 package를 바꾸거나 fake canvas runtime을 만들지 않았습니다.
      </p>
    </section>
  )
}
