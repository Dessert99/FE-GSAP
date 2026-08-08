/** 재생만으로 놓치는 장면을 inspector의 시간 control로 연결한다. */
export function DebuggingProblemSection() {
  return (
    <section id="debugging-problem">
      <p>01 · debugging problem</p>
      <h2>한 번에 지나가는 장면은 시간을 직접 잡아야 합니다</h2>
      <p>
        <strong>playhead</strong>는 animation 안에서 현재 시간 위치입니다. GSDevTools는 이
        playhead를 scrub하고, 느리게 재생하고, in/out point로 구간을 잘라 보는 development UI입니다.
      </p>
      <div className="gsdevtools-page__grid">
        <article className="gsdevtools-page__card">
          <h3>기본 선택</h3>
          <p>config 없이 만들면 Global Timeline의 모든 animation을 control합니다.</p>
        </article>
        <article className="gsdevtools-page__card">
          <h3>권장 선택</h3>
          <p>
            검사할 timeline을 animation으로 직접 넘기면 global synchronization을 합칠 필요가
            줄어듭니다.
          </p>
        </article>
      </div>
    </section>
  )
}
