/** end의 numeric/array/function 의미와 linkedProps 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function BoundsEndSection() {
  return (
    <section id="bounds-end">
      <SectionHeading
        number="04"
        title="min/max는 멈춤점, end는 snap 규칙입니다"
        question="number line의 notch가 natural end와 가장 가까운 곳을 선택합니다."
      />
      <p>
        이 lab은 x 하나의 numeric array end만 씁니다. Number exact end, Function
        end와 x,y를 묶는 linkedProps는 공식 config surface로 보존하되 다축
        snapping은 이 페이지의 실습 범위가 아닙니다.
      </p>
    </section>
  )
}
