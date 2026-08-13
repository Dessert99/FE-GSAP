/** pixel과 percentage threshold가 같은 overlap을 다르게 판정하는 이유를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function ThresholdFormsSection() {
  return (
    <section
      id="threshold-forms"
      className="draggable-collision-momentum-page__section"
      aria-labelledby="threshold-forms-title"
    >
      <SectionHeading
        number="02"
        id="threshold-forms"
        title="threshold는 pixel 또는 percentage입니다"
        description="겹쳤는가와 충분히 겹쳤는가는 다른 질문입니다. threshold를 명시하면 drop acceptance 기준을 같은 hitTest query에 넣을 수 있습니다."
      />
      <div className="draggable-collision-momentum-page__prose">
        <p>
          threshold의 기본값은 <code>0</code>이며 어떤 overlap이든 true를 검사합니다. Number는
          positive hitTest에 필요한 pixel overlap 수를, <code>&quot;50%&quot;</code> 같은 String은
          두 element 중 하나의 overlapping surface-area percentage를 뜻합니다.
        </p>
        <p>
          lab의 <code>20</code>과 <code>&quot;50%&quot;</code>를 번갈아 고른 뒤 같은 puck 위치를
          다시 검사해 보세요. pixel 기준은 작은 target의 edge touch와 큰 target의 surface 비율을
          같은 수치로 취급하지 않으므로, drop rule을 설계할 때 무엇을 보장할지 먼저 정해야 합니다.
        </p>
      </div>
      <aside className="draggable-collision-momentum-page__note">
        <strong>공식 설명의 경계:</strong> 공식 문서는 “minimum pixels”와 “percentage”를
        설명하지만 경계값의 비교 연산자는 명시하지 않습니다. 설치된 GSAP 3.15.0에서는 10px
        overlap에 threshold <code>10</code>은 false, <code>9</code>는 true였습니다. 이 결과를 다른
        버전의 공식 계약으로 일반화하지 않습니다.
      </aside>
    </section>
  )
}
