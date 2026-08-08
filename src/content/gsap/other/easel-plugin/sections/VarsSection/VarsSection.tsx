/** easel vars의 filter property·cache·numeric range를 설명한다. */
export function VarsSection() {
  return (
    <section id="easel-vars">
      <h2>03 · filter 값은 easel object로 의도를 표시합니다</h2>
      <p>
        <code>tint</code>, <code>tintAmount</code>, <code>exposure</code>,{' '}
        <code>brightness</code>는 ColorFilter에, <code>saturation</code>,{' '}
        <code>hue</code>, <code>contrast</code>, <code>colorize</code>,{' '}
        <code>colorizeAmount</code>는 ColorMatrixFilter에 연결됩니다.{' '}
        <code>easel: {'{ ... }'}</code>로 감싸고 ColorFilter에는 먼저{' '}
        <code>cache()</code>가 필요합니다.
      </p>
      <p>
        exposure와 brightness는 0~2이며 1은 normal, 0은 black underexposed, 2는
        white overexposed입니다. individual <code>colorFilter</code> property도
        easel object 안에서 tween할 수 있습니다.
      </p>
    </section>
  )
}
