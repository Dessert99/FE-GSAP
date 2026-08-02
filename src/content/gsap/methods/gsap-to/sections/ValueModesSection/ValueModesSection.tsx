/** 함수·랜덤·상대값 공식 섹션을 하나의 비교 예제로 묶는다. */
import { ValueModesExample } from '../../examples/ValueModesExample/ValueModesExample'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function ValueModesSection() {
  return (
    <section id="value-modes" className="gsap-method-page__section" aria-labelledby="value-modes-title">
      <SectionHeading number="05–07" id="value-modes-title" title="Function · Random · Relative values" description="CSS 목표값 자리에 고정 숫자 외에 어떤 값을 쓸 수 있는지 공식 문서의 세 섹션을 한 비교 예제로 확인합니다." />
      <ValueModesExample />
    </section>
  )
}
