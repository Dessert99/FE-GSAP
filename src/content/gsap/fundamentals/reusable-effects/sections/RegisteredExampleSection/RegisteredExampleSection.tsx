/** direct effect 호출의 default merge와 반환 Tween을 실습으로 연결한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { RegisteredEffectExample } from '../../examples/RegisteredEffectExample/RegisteredEffectExample'

/** module-scope 등록과 수동 replay가 같은 descriptor를 쓰는 예제를 배치한다. */
export function RegisteredExampleSection() {
  return (
    <section className="reusable-effects-page__section" aria-labelledby="registered-example">
      <SectionHeading number="04" id="registered-example" title="default와 override를 직접 비교하기" description="duration을 생략하거나 명시한 뒤, callback에 도착한 effective config와 direct 호출이 돌려준 Tween을 확인합니다." />
      <RegisteredEffectExample />
    </section>
  )
}
