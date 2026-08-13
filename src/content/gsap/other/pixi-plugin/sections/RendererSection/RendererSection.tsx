/** PixiPlugin update와 Pixi renderer, component cleanup의 소유권을 구분한다. */
/** PixiJS dependency가 없는 현재 정적 page의 실행 경계를 명시한다. */
export function RendererSection() {
  return (
    <section id="renderer-boundary">
      <h2>03 · GSAP은 값을 바꾸고 PixiJS는 그립니다</h2>
      <p>
        PixiPlugin은 display object의 property와 filters를 tween하지만
        renderer를 만들거나 직접 호출하지 않습니다. 실제 app은 자신의
        renderer/ticker lifecycle로 변경을 draw해야 합니다. 따라서 GSAP tween을
        만들었다고 canvas lifecycle까지 자동으로 소유하는 것은 아닙니다.
      </p>
      <p>
        React component라면 그 component가 만든 tween만 <code>kill()</code>하고,
        자신이 만든 Pixi application만 destroy해야 합니다. app destroy가
        canvas를 host에서 정리하도록 연결하고, 외부에서 주입된
        app·sprite·renderer는 component가 파괴하지 않습니다.
      </p>
      <p>
        이 정적 예제는 PixiJS runtime, sprite, canvas, ticker를 만들지 않습니다.
        실제 integration에서는 app과 renderer가 존재하는 환경에서 모션 정책과
        cleanup 방식을 함께 결정해야 합니다.
      </p>
    </section>
  )
}
