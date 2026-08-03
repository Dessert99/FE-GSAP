/** 한 대상에 네 생성 method를 적용해 값 소유권 차이를 실행으로 확인한다. */
import { EndpointOwnershipExample } from '../../examples/EndpointOwnershipExample/EndpointOwnershipExample'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** 현재값·시작값·끝값이 실제 호출과 화면 코드에 같은 방식으로 연결되는지 보여준다. */
export function MethodComparisonSection() {
  return (
    <section id="method-comparison" className="tween-values-page__section" aria-labelledby="method-comparison-title">
      <SectionHeading
        number="02"
        id="method-comparison"
        title="같은 대상을 네 방식으로 실행하기"
        description="method를 바꾸기 전에 현재값과 명시한 값을 확인하고, 실행 뒤 어느 값이 출발점과 도착점이 되는지 관찰합니다."
      />
      <EndpointOwnershipExample />
    </section>
  )
}
