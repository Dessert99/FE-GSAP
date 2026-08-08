/** plugin의 cleanup과 physics/collision 비목표를 명확히 분리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function CleanupBoundarySection() {
  return (
    <section id="cleanup-boundaries">
      <SectionHeading
        number="05"
        title="추적과 실행 중 tween을 같이 정리합니다"
        question="unmount에서는 x를 untrack하고 puck tween을 kill합니다."
      />
      <p>
        Inertia는 충돌을 계산하는 physics engine이 아닙니다. number value를
        velocity로 tween하는 plugin이며, reduced motion에서는 tween 대신 nearest
        notch로 즉시 snap합니다.
      </p>
    </section>
  )
}
