/** development-only debug UI의 loading, incompatibility, disposal 경계를 고정한다. */
export function ProductionBoundarySection() {
  return (
    <section id="production-boundary">
      <p>04 · production boundary and disposal</p>
      <h2>debug UI는 production feature가 아닙니다</h2>
      <div className="gsdevtools-page__warning">
        <h3>ScrollTrigger-driven animation에는 연결하지 않습니다</h3>
        <p>
          scrollbar와 GSDevTools scrubber가 같은 animation을 동시에 control할 수 없으므로 공식
          문서는 ScrollTrigger-driven animation과 함께 동작하지 않는다고 경고합니다.
        </p>
      </div>
      <div className="gsdevtools-page__grid">
        <article className="gsdevtools-page__card">
          <h3>conditional loading</h3>
          <p>
            development branch에서만 plugin을 dynamic import하고 register/create합니다. production
            bundle에는 inspector UI를 기본으로 넣지 않습니다.
          </p>
        </article>
        <article className="gsdevtools-page__card">
          <h3>disposal</h3>
          <p>
            instance reference를 보관해 <code>kill()</code>하고 inspected timeline도 kill합니다.
            infinite repeat가 Global Timeline에 있으면 inspector duration은 1000 seconds로
            cap됩니다.
          </p>
        </article>
      </div>
    </section>
  )
}
