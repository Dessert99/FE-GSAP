/** 마지막 값 인자 유무가 즉시 결과와 재사용 함수 모드를 가르는 과정을 실제 호출로 보여준다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { ValueOrFunctionLab } from '../../examples/ValueOrFunctionLab/ValueOrFunctionLab'

export function TwoModesSection() {
  return (
    <section className="utils-page__section" id="two-modes" aria-labelledby="two-modes-title">
      <SectionHeading
        number="02"
        id="two-modes"
        title="값을 바로 받기와 함수를 받아 두기"
        description="여러 utility는 마지막 값 인자를 주면 지금 계산하고, 빼면 나중에 값을 받을 재사용 함수를 돌려줍니다."
      />

      <div className="utils-page__mode-grid">
        <article>
          <strong>직접 값 모드</strong>
          <code>clamp(0, 100, 120) → 100</code>
          <p>지금 필요한 값까지 모두 넘겨 계산을 바로 끝냅니다.</p>
        </article>
        <article>
          <strong>재사용 함수 모드</strong>
          <code>clamp(0, 100) → function</code>
          <p>범위를 기억한 함수를 받아 나중에 여러 값에 적용합니다.</p>
        </article>
      </div>

      <ValueOrFunctionLab />

      <aside className="utils-page__note utils-page__note--probe">
        <h3>설치본 실행으로 확인한 경계</h3>
        <p>
          공식 두 허브는 “많은 utility”라고만 말합니다. GSAP 3.15.0에서 인자를 모두 생략해 실행하면 17개 중 11개가 함수를,
          <code> getUnit</code>·<code>random</code>·<code>splitColor</code>·<code>toArray</code>는 값을 돌려주고,
          <code> checkPrefix</code>와 <code>shuffle</code>은 인자가 없어 <code>TypeError</code>를 냅니다. 이것은 모든 utility가 같은 overload를
          가진다는 뜻이 아니라는 실행 근거입니다.
        </p>
      </aside>
    </section>
  )
}
