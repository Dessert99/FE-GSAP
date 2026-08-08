/** selected property velocity가 sample 순간의 Number임을 설명한다. */
export function ReadSnapshotSection() {
  return (
    <section id="read-snapshot">
      <p>03 · read snapshot</p>
      <h2>velocity는 선택한 property의 현재 Number입니다</h2>
      <p>
        <code>tracker.get(property)</code>은 current velocity를 Number로 return합니다. 이 lab의{' '}
        <code>x</code>는 pixel 값이므로 px/s로, <code>rotation</code>은 degree 값이므로 deg/s로
        읽습니다. 같은 target이라도 property를 바꾸면 질문과 unit이 함께 바뀝니다.
      </p>
      <pre>
        <code>{`const tracker = VelocityTracker.getByTarget(target)
if (tracker?.isTracking(property)) {
  const velocity = tracker.get(property)
}`}</code>
      </pre>
    </section>
  )
}
