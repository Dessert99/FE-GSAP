/** static·instance timeSinceDrag의 seconds 계약을 click guard로 재구성한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** 최근 drag를 단발 click 결정으로 바꾸는 세 번째 section이다. */
export function RecentDragDecisionSection() {
  return (
    <section
      id="recent-drag-decision"
      className="draggable-events-page__section"
      aria-labelledby="recent-drag-decision-title"
    >
      <SectionHeading
        number="03"
        id="recent-drag-decision"
        title="recent drag 시간으로 click 결정을 늦춘다"
        description="Draggable.timeSinceDrag()는 마지막 drag가 끝난 뒤 elapsed seconds를 반환합니다. 값이 계속 발표되는 clock이 아니라 click 순간의 판단 재료입니다."
      />
      <div className="draggable-events-page__prose">
        <p>
          공식 static method <code>Draggable.timeSinceDrag()</code>와 instance
          method <code>draggable.timeSinceDrag()</code>는 모두 마지막 drag가
          끝난 뒤 경과한 시간을 seconds Number로 읽습니다.
        </p>
        <p>
          공식 예제의 <code>0.2</code> seconds는 universal default가 아니라 예시
          threshold입니다. product의 click guard는 사용자가 정하되, 비교는 click
          action이 필요한 순간 한 번만 하면 됩니다.
        </p>
      </div>
    </section>
  )
}
