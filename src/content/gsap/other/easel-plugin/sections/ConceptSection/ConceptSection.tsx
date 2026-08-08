/** DOM/CSS target과 CreateJS display object target의 차이를 설명한다. */
export function ConceptSection() {
  return (
    <section id="dom-canvas-boundary">
      <h2>01 · DOM과 canvas는 그리는 책임이 다릅니다</h2>
      <p>
        CSS target은 browser가 DOM을 paint하지만 EaselPlugin target은 CreateJS
        display object입니다. <code>x</code>, <code>y</code> 같은 일반 numeric
        property는 GSAP만으로 tween할 수 있고, filter/effect 전용 값에
        EaselPlugin이 필요합니다.
      </p>
    </section>
  )
}
