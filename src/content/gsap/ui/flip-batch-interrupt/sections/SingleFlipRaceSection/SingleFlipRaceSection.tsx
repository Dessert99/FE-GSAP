/** 이전 Flip과 새 layout mutation이 같은 target transform을 경쟁하는 출발점을 설명한다. */
export function SingleFlipRaceSection() {
  return (
    <section>
      <h2>01 · single flip race</h2>
      <p>
        새 layout 전에 이전 Flip이 남으면 같은 target transform을 경쟁합니다.
      </p>
    </section>
  )
}
