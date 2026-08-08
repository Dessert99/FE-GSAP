/** plugin registration 뒤 simple form과 advanced form의 경계를 보여 준다. */
export function SetupSection() {
  return (
    <section id="setup" aria-labelledby="text-plugin-setup-title">
      <h2 id="text-plugin-setup-title">
        01 · string form과 object form을 먼저 나눕니다
      </h2>
      <p>
        <code>TextPlugin</code>을 register한 뒤{' '}
        <code>text: 'final phrase'</code>처럼 string을 넘기면 가장 단순한
        replacement tween이 됩니다. <code>delimiter</code>·class·padding처럼
        special option을 쓸 때는 outer tween vars가 아니라{' '}
        <code>text: {'{ value, ... }'}</code> object 안에 둡니다.
      </p>
      <pre>
        <code>{`gsap.registerPlugin(TextPlugin)

gsap.to(target, { duration: 1, text: 'FINAL TEXT' })

gsap.to(target, {
  duration: 1,
  text: { value: 'FINAL TEXT', delimiter: ' ' },
})`}</code>
      </pre>
    </section>
  )
}
