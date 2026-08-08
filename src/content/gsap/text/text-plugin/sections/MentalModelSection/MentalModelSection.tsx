/** delimiter, rtl, speed, diff가 replacement unit을 어떻게 바꾸는지 설명한다. */
export function MentalModelSection() {
  return (
    <section id="mental-model" aria-labelledby="text-plugin-model-title">
      <h2 id="text-plugin-model-title">
        02 · text는 token을 교체하다 final content가 됩니다
      </h2>
      <p>
        default delimiter는 빈 문자열이라 character 하나씩 바뀌고, space
        delimiter는 word token 단위로 바뀝니다. tween이 끝나면 element content
        전체가 replacement가 되며 rewind 또는 restart는 해당 text를 다시
        되돌립니다.
      </p>
      <p>
        <code>rtl</code>은 token introduction order를 뒤집고,{' '}
        <code>type: 'diff'</code>는 start/end에서 같은 position을 건너뜁니다.{' '}
        <code>speed</code>를 사용하면 duration은{' '}
        <code>0.05 / speed * text_changes</code>로 계산되므로 ordinary
        duration과 같은 역할로 가르치지 않습니다.
      </p>
    </section>
  )
}
