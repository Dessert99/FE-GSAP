/** progress를 page-native position으로 읽고 visual transform과 구분한다. */
export function NativeRenderedBoundarySection() {
  return (
    <section
      id="native-rendered-boundary"
      aria-labelledby="scroll-smoother-effects-boundary-title"
    >
      <h2 id="scroll-smoother-effects-boundary-title">
        02 · progress는 page의 native scroll 위치이고 effect는 rendered
        위치입니다
      </h2>
      <p>
        <code>progress</code>는 page 전체에서 top이 0, halfway가 0.5, bottom이
        1인 readonly number입니다. smoothing 중에는 그 값도 animate되고
        <code>onStop</code>이 발생할 때 끝납니다.
      </p>
      <p>
        반면 <code>speed</code>와 <code>lag</code> effect는 target의 visual
        transform을 ScrollTrigger로 관리합니다. 따라서 screen에서 card가 native
        marker와 다르게 보인다고 해서 page progress가 별도의 scroll position을
        갖는 것은 아닙니다.
      </p>
    </section>
  )
}
