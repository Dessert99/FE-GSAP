/** SplitText create의 target, vars, instance array mental model을 설명한다. */
/** create가 문장과 config를 instance-owned wrapper로 바꾸는 과정을 설명한다. */
export function CreateModelSection() {
  return (
    <section aria-labelledby="split-create-model-title">
      <h2 id="split-create-model-title">
        문장 → wrapper DOM → instance arrays
      </h2>
      <p>
        <code>SplitText.create(target, vars)</code>는 target을 나누고 standalone
        instance를 반환합니다. <code>type</code>에는 필요한 <code>chars</code>,{' '}
        <code>words</code>, <code>lines</code>만 쉼표로 고릅니다.
      </p>
      <p>
        instance의 <code>chars</code>, <code>words</code>, <code>lines</code>,{' '}
        <code>masks</code>는 React가 추측해 만든 count가 아니라 SplitText가 방금
        생성한 element array입니다. 아래 inspector가 그 결과를 직접 읽습니다.
      </p>
    </section>
  )
}
