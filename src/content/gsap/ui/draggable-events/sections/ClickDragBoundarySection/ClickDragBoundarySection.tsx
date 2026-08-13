/** click intent와 just-finished drag를 recent-drag threshold로 나누는 마지막 section이다. */
import { toHref } from '../../../../../../app/routes'
import { GestureEventLab } from '../../examples/GestureEventLab/GestureEventLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** official click guard example을 한 target lab과 prerequisites에 연결한다. */
export function ClickDragBoundarySection() {
  return (
    <section
      id="click-drag-boundary"
      className="draggable-events-page__section"
      aria-labelledby="click-drag-boundary-title"
    >
      <SectionHeading
        number="05"
        id="click-drag-boundary"
        title="click과 drag의 의도를 시간으로 구분한다"
        description="drag 가능한 container 안의 click action은 release와 별개입니다. recent-drag threshold가 지나기 전에는 action을 건너뛸 수 있습니다."
      />
      <div className="draggable-events-page__prose">
        <p>
          공식 예제는 draggable 안 child click을 다룰 때{' '}
          <code>dragClickables: true</code>와{' '}
          <code>timeSinceDrag() &gt; 0.2</code>을 함께 보여 줍니다. threshold
          안이면 click action을 건너뛰어 drag 뒤의 의도치 않은 action을
          막습니다.
        </p>
        <p>
          listener registration과 instance 생성은{' '}
          <a href={toHref('/fundamentals/draggable-create')}>
            Draggable create
          </a>
          , press·release의 target/pointer 시점은{' '}
          <a href={toHref('/fundamentals/draggable-coordinates')}>
            Draggable coordinates
          </a>
          에서 먼저 확인합니다. bounds·axis, lifecycle command,
          collision·momentum은 각각의 후속 학습 페이지에서 다룹니다.
        </p>
      </div>
      <GestureEventLab />
    </section>
  )
}
