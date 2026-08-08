/** checkPrefix가 브라우저 환경을 읽는 utility라는 점과 fallback 계약을 분리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { PrefixCheck } from '../../examples/PrefixCheck/PrefixCheck'

export function PrefixSection() {
  return (
    <section className="pipeline-units-page__section" id="prefix" aria-labelledby="prefix-title">
      <SectionHeading
        number="03"
        id="prefix"
        title="브라우저가 아는 property 이름을 확인한다"
        description="checkPrefix는 숫자를 변환하지 않습니다. 현재 브라우저의 style 지원표를 읽어 원래 이름, prefix가 붙은 이름, 또는 미지원 신호를 돌려줍니다."
      />

      <div className="pipeline-units-page__concept-grid">
        <article><h3>지원하면 String</h3><p><code>filter</code>를 주면 환경에 따라 <code>filter</code>, <code>WebkitFilter</code>, <code>MozFilter</code> 같은 실제 property 이름을 돌려줄 수 있습니다.</p></article>
        <article><h3>미지원이면 fallback</h3><p>반환값이 없으면 그 property를 CSSPlugin이 처리한다고 가정하지 말고 대체 표현이나 기능 생략 경로를 선택해야 합니다.</p></article>
      </div>

      <PrefixCheck />

      <aside className="pipeline-units-page__warning">
        <h3>전용 문서의 반환 설명이 서로 맞지 않습니다</h3>
        <p>heading은 <strong>Returns : String</strong>, 본문은 미지원 시 <code>undefined</code>라고 적습니다. 그러나 GSAP 3.15.0 실행은 미지원 property에 <code>null</code>을 돌려줍니다. 화면의 현재 브라우저 결과와 별개로, 호출부는 String만 단정하지 않아야 합니다.</p>
      </aside>
    </section>
  )
}
