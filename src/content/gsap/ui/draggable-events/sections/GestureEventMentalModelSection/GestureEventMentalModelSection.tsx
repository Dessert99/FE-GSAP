/** Draggable event 이름이 gesture의 어떤 순간을 뜻하는지 먼저 정의한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** listener와 callback의 가장 작은 mental model을 제공하는 첫 section이다. */
export function GestureEventMentalModelSection() {
  return (
    <section
      id="gesture-event-mental-model"
      className="draggable-events-page__section"
      aria-labelledby="gesture-event-mental-model-title"
    >
      <SectionHeading
        number="01"
        id="gesture-event-mental-model"
        title="event는 gesture의 한 순간을 알린다"
        description="listener는 polling loop가 아니라 press, drag, release 같은 이름 붙은 순간에 한 번 호출되는 함수입니다."
      />
      <div className="draggable-events-page__prose">
        <p>
          <code>addEventListener(type, callback)</code>는 특정 event type이
          발생할 때 callback을 등록합니다. 공식 목록은 <code>press</code>,{' '}
          <code>click</code>, <code>dragstart</code>, <code>drag</code>,{' '}
          <code>dragend</code>, <code>release</code>, <code>throwcomplete</code>
          , <code>throwupdate</code>입니다.
        </p>
        <p>
          event는 “지금 target의 좌표가 얼마인가”가 아니라 gesture에서 무슨
          전환이 일어났는지 알려 줍니다. 그래서 drag 중 연속 수치를
          polling하기보다, 필요한 순간 하나에 listener를 연결할 수 있습니다.
        </p>
      </div>
    </section>
  )
}
