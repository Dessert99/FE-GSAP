/** target lookup과 property membership을 다른 질문으로 분리한다. */
export function LookupMembershipSection() {
  return (
    <section id="lookup-membership">
      <p>02 · lookup and membership</p>
      <h2>tracker 존재와 property tracking은 같은 질문이 아닙니다</h2>
      <div className="velocity-tracker-read-page__grid">
        <article className="velocity-tracker-read-page__card">
          <h3>target → tracker</h3>
          <p>
            <code>VelocityTracker.getByTarget(target)</code>으로 associated tracker를 찾습니다. 공식
            문서는 없으면
            <code>null</code>을 설명하므로, missing boundary에서는 먼저 이 result를 확인합니다.
          </p>
        </article>
        <article className="velocity-tracker-read-page__card">
          <h3>property → Boolean</h3>
          <p>
            <code>isTracking</code>과 <code>isTrackingProp</code>은 tracking 여부를 Boolean으로
            답합니다. installed 3.15 runtime은 static call에 selected property를 전달하고 instance
            property query를 함께 확인합니다.
          </p>
        </article>
      </div>
    </section>
  )
}
