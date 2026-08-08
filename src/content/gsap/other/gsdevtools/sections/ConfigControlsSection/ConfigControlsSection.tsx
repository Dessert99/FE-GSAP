/** inspector config가 control 범위와 초기 표시를 나누는 방식을 설명한다. */
export function ConfigControlsSection() {
  return (
    <section id="config-controls">
      <p>03 · config controls</p>
      <h2>무엇을, 어디에서, 어떤 초기 상태로 볼지 정합니다</h2>
      <div className="gsdevtools-page__grid">
        <article className="gsdevtools-page__card">
          <h3>선택과 범위</h3>
          <p>
            <code>animation</code>, <code>container</code>, <code>globalSync</code>,{' '}
            <code>hideGlobalTimeline</code>으로 inspected animation과 UI 범위를 정합니다.
          </p>
        </article>
        <article className="gsdevtools-page__card">
          <h3>시간과 표시</h3>
          <p>
            <code>inTime</code>/<code>outTime</code>, <code>paused</code>, <code>timeScale</code>,{' '}
            <code>loop</code>, <code>minimal</code>, <code>visibility</code>가 초기 inspector
            state를 정합니다.
          </p>
        </article>
        <article className="gsdevtools-page__card">
          <h3>keyboard 경계</h3>
          <p>
            <code>keyboard</code> 기본값은 true지만 shortcut listener는 하나의 instance만 가질 수
            있습니다. 이 lab은 native button과 충돌하지 않게 false로 둡니다.
          </p>
        </article>
        <article className="gsdevtools-page__card">
          <h3>작은 화면</h3>
          <p>
            <code>minimal: true</code>는 scrubber, play/pause, timeScale만 보이며 600px 미만에서는
            GSDevTools가 minimal mode로 자동 전환합니다.
          </p>
        </article>
      </div>
    </section>
  )
}
