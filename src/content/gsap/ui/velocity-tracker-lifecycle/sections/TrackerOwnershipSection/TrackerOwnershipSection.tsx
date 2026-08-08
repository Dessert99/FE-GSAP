/** tracker 하나가 stable target 하나를 책임진다는 출발점을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
/** constructor 대신 static track으로 ownership을 시작하게 한다. */
export function TrackerOwnershipSection() {
  return (
    <section>
      <SectionHeading number="01" title="tracker ownership" />
      <p>
        VelocityTracker는 대상 값과 시간의 변화를 대신 기록합니다. target
        하나에는 tracker 하나만 연결해야 하므로 constructor를 직접 늘리기보다
        static <code>track()</code>으로 시작합니다.
      </p>
      <p>
        숫자 property와 getter/setter 기반 property는 추적할 수 있지만,
        <code>autoAlpha</code>처럼 plugin이 만든 값은 실제 property가 아니므로
        <code>alpha</code>처럼 실제 값을 골라야 합니다. 정확한 velocity는 최소
        100ms와 core ticker 2 tick 뒤에 읽습니다.
      </p>
    </section>
  )
}
