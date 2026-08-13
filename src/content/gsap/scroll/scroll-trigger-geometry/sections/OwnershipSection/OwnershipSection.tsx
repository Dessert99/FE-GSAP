/** instance fields와 viewport utility가 서로 다른 element coordinate system을 쓰는 경계를 설명한다. */
export function OwnershipSection() {
  return (
    <section id='ownership' aria-labelledby='ownership-title'>
      <h2 id='ownership-title'>
        02 · trigger, pin, scroller는 element를 기준으로 하고 viewport utility는 별도
        좌표계입니다
      </h2>
      <p>
        <code>trigger</code>는 start/end를 계산할 element이고, <code>pin</code>
        은 pin을 요청했을 때의 pinned element입니다. <code>scroller</code>는
        Element 또는 window이며 <code>scroll()</code>은 그 element의 scroll
        position을 읽거나 설정합니다.
      </p>
      <p>
        <code>ScrollTrigger.isInViewport()</code>와{' '}
        <code>positionInViewport()</code>는 browser viewport 기준 utility입니다.
        local scroller의 <code>maxScroll()</code>과 같은 숫자로 취급하지
        않습니다. <code>animation</code>은 associated Tween/Timeline이 없으면
        undefined이고 <code>labelToScroll()</code>은 associated timeline label의
        target scroll position을 줍니다.
      </p>
    </section>
  )
}
