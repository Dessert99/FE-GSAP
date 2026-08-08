/** 한 input이 다섯 utility를 지나는 실제 계산 lab을 학습 흐름 안에 놓는다. */
import { RangeInterpolationLab } from '../../examples/RangeInterpolationLab/RangeInterpolationLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function CalculationLabSection() {
  return (
    <section id="calculation-lab" className="range-page__section" aria-labelledby="calculation-lab-title">
      <SectionHeading
        number="03"
        id="calculation-lab"
        title="한 입력이 바뀌는 전 과정을 계산하기"
        description="조작할 값은 원본 입력·호출 방식·결과 형태입니다. 각 단계의 상대 위치와 실제 반환값이 함께 바뀌는지 봅니다."
      />
      <RangeInterpolationLab />
    </section>
  )
}
