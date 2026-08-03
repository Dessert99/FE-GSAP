/** 네 생성 method가 current·start·end 중 무엇을 읽고 쓰는지 비교한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** method 이름보다 먼저 값 소유권을 기준으로 선택하게 한다. */
export function StateOwnershipSection() {
  return (
    <section id="state-ownership" className="tween-values-page__section" aria-labelledby="state-ownership-title">
      <SectionHeading
        number="01"
        id="state-ownership"
        title="누가 시작값과 끝값을 정하나요?"
        description="현재값은 Tween을 만들 때 대상에 이미 있는 값입니다. method마다 이 값을 읽는지 무시하는지가 다릅니다."
      />
      <div className="tween-values-page__matrix-wrap">
        <table className="tween-values-page__matrix">
          <thead><tr><th scope="col">method</th><th scope="col">시작값</th><th scope="col">끝값</th><th scope="col">맞는 질문</th></tr></thead>
          <tbody>
            <tr><th scope="row"><code>to()</code></th><td>현재값을 읽음</td><td><code>vars</code>에 작성</td><td>지금 상태에서 어디로 갈까?</td></tr>
            <tr><th scope="row"><code>from()</code></th><td><code>vars</code>에 작성</td><td>현재값을 읽음</td><td>이 상태에서 지금 모습으로 들어올까?</td></tr>
            <tr><th scope="row"><code>fromTo()</code></th><td><code>fromVars</code>에 작성</td><td><code>toVars</code>에 작성</td><td>현재 상태와 무관하게 양 끝을 고정할까?</td></tr>
            <tr><th scope="row"><code>set()</code></th><td>보간하지 않음</td><td><code>vars</code>를 즉시 적용</td><td>시간 없이 상태만 바꿀까?</td></tr>
          </tbody>
        </table>
      </div>
      <p className="tween-values-page__note"><strong>핵심:</strong> <code>from()</code>과 <code>fromTo()</code>는 시작값을 생성 순간에 적용하는 <code>immediateRender</code> 기본 동작까지 함께 생각해야 합니다.</p>
    </section>
  )
}
