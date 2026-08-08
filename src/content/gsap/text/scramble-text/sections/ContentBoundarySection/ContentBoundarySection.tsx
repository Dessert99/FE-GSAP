/** replaceable scrambled DOM과 별도 accessible final string의 책임을 경계 짓는다. */
/** class span과 HTML write를 target content ownership으로 연결한다. */
export function ContentBoundarySection() {
  return (
    <section id="content-boundary" aria-labelledby="scramble-boundary-title">
      <h2 id="scramble-boundary-title">
        04 · scramble target은 replaceable content입니다
      </h2>
      <p>
        <code>newClass</code>와 <code>oldClass</code>는 각각 new/original text를
        span으로 감싸 class를 적용합니다. installed source는 가능한 target에{' '}
        <code>innerHTML</code>을 쓰므로, 이 lab은 plugin이 바꿔도 되는
        plain-text target만 소유하고 cleanup에서 original HTML을 복원합니다.
      </p>
      <p>
        intermediate DOM은 무작위 문자라 읽기 대상이 아닙니다. 따라서 final
        phrase는 animation target 밖에서 stable text로 제공하고, live region으로
        intermediate text를 반복해서 알리지 않습니다.
      </p>
    </section>
  )
}
