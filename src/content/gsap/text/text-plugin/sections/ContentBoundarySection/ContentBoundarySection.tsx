/** HTML node recognition과 class-span mutation을 cleanup 경계로 연결한다. */
export function ContentBoundarySection() {
  return (
    <section id="content-boundary" aria-labelledby="text-plugin-boundary-title">
      <h2 id="text-plugin-boundary-title">
        04 · text target은 animation이 소유하는 content입니다
      </h2>
      <p>
        rendered docs는 simple <code>&lt;br&gt;</code> nodes를 honor한다고
        설명합니다. source는 HTML target의
        <code>innerHTML</code> 또는 SVG text를 intermediate content로 쓰고,
        class option은 span markup을 만듭니다. 그래서 lab은 plugin이 바꿔도 되는
        one content target만 사용하고 cleanup에서 original HTML을 복원합니다.
      </p>
      <p>
        <code>preserveSpaces</code>와 <code>padSpace</code>는 HTML spacing을
        보존하는 option입니다. intermediate target은 <code>aria-hidden</code>
        으로 두고 final phrase sibling을 제공해 per-frame update를 읽지 않게
        합니다.
      </p>
    </section>
  )
}
