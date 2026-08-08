/** track/read/untrack의 최소 lifecycle과 후속 tracker API 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function TrackingLifecycleSection() {
  return (
    <section id="tracking-lifecycle">
      <SectionHeading
        number="02"
        title="track → sample → getVelocity 순서입니다"
        question="추적이 시작됐는지를 isTracking으로 읽고 그 다음 속도를 읽습니다."
      />
      <p>
        track은 x의 최근 값과 시간을 기록합니다. 공식 문서의 auto 사용은 최소
        100ms와 2 tick 뒤가 안전합니다. VelocityTracker의 instance lifecycle은
        P16, instance query API는 P17에서 자세히 다룹니다.
      </p>
    </section>
  )
}
