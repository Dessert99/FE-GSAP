/** source와 destination의 coordinate owner가 다를 수 있음을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
export function CoordinateOwnershipSection() {
  return (
    <section
      id="coordinate-ownership"
      className="flip-fit-absolute-page__section"
    >
      <SectionHeading
        number="01"
        id="coordinate-ownership"
        title="box가 누구의 coordinate에 놓이는지 본다"
        description="Flip.fit은 source element를 destination element 또는 recorded state가 차지하던 viewport area에 맞춥니다."
      />
      <p>
        한 box의 DOM parent가 달라도 browser는 각각의 layout·transform
        context에서 위치를 계산합니다. fit은 source를 새 destination area에
        보이도록 조정하는 도구입니다.
      </p>
    </section>
  )
}
