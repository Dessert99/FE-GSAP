/** plugin registration과 string shorthand를 object config 전에 설명한다. */
/** ScrambleText tween property를 사용할 최소 준비를 보여 준다. */
export function SetupSection() {
  return (
    <section id="setup" aria-labelledby="scramble-setup-title">
      <h2 id="scramble-setup-title">01 · 먼저 plugin과 target을 준비합니다</h2>
      <p>
        <code>scrambleText</code>는 GSAP core property가 아니므로{' '}
        <code>ScrambleTextPlugin</code>을 register한 뒤 <code>gsap.to()</code>에
        전달합니다. 문자열만 전달하면 default reveal settings를 쓰고, 다음
        lab처럼 object를 전달하면 옵션을 함께 고를 수 있습니다.
      </p>
      <pre>
        <code>{`gsap.registerPlugin(ScrambleTextPlugin)

gsap.to(target, {
  duration: 1,
  scrambleText: 'THIS IS NEW TEXT',
})`}</code>
      </pre>
    </section>
  )
}
