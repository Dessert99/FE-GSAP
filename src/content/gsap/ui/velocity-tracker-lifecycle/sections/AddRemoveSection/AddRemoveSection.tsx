/** property membership의 좁은 변화를 whole-target cleanup과 구분한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
/** 공식 rendered label과 current implementation method명을 함께 경계로 둔다. */
export function AddRemoveSection() {
  return (
    <section>
      <SectionHeading number="03" title="add / remove" />
      <p>
        공식 문서는 <code>addProp()</code>과 <code>removeProp()</code>이라고
        부르며 property 하나를 tracking set에 더하거나 멈춘다고 설명합니다. 현재
        source와 타입 선언의 instance API는 각각{' '}
        <code>tracker.add(property, type)</code>와{' '}
        <code>tracker.remove(property)</code>입니다.
      </p>
      <p>
        아래 membership button은 이 current API를 실제로 호출합니다. 한
        property를 remove해도 다른 property는 계속 추적되므로, target 전체를
        지우는 다음 단계와 목적이 다릅니다.
      </p>
    </section>
  )
}
