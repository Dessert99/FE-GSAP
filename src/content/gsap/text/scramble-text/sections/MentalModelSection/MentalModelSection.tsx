/** scramble 동안의 임시 문자와 final text를 시간 축으로 분리한다. */
/** 문자·길이·delimiter·방향이 reveal unit을 어떻게 바꾸는지 설명한다. */
export function MentalModelSection() {
  return (
    <section id="mental-model" aria-labelledby="scramble-model-title">
      <h2 id="scramble-model-title">
        02 · scramble은 final text를 숨기는 전환입니다
      </h2>
      <p>
        임시 문자는 일정 간격으로 바뀌지만 final text가 바뀌는 것은 아닙니다.
        기본 방향은 left-to-right이고,
        <code>rightToLeft</code>은 reveal 순서만 뒤집습니다.{' '}
        <code>delimiter</code>가 빈 문자열이면 문자 단위, 공백이면 단어 단위로
        나눕니다.
      </p>
      <p>
        original과 replacement 길이가 다르면 <code>tweenLength</code> 기본값은
        길이도 점차 바꿉니다.
        <code>false</code>는 그 길이를 즉시 바꾸므로, 단지 scramble speed를
        바꾸는 옵션이 아닙니다.
      </p>
    </section>
  )
}
