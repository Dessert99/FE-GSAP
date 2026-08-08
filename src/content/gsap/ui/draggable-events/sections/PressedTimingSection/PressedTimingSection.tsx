/** isPressed가 press와 release 사이의 현재 상태임을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** event 이름과 Boolean state를 구분하는 두 번째 section이다. */
export function PressedTimingSection() {
  return (
    <section
      id="pressed-timing"
      className="draggable-events-page__section"
      aria-labelledby="pressed-timing-title"
    >
      <SectionHeading
        number="02"
        id="pressed-timing"
        title="isPressed는 누르는 동안만 읽는다"
        description="isPressed는 Boolean이며 Draggable이 pressed 상태일 때 true입니다. drag가 시작됐는지를 뜻하는 별도 event와 혼동하지 마세요."
      />
      <div className="draggable-events-page__prose">
        <p>
          <code>press</code>는 event 이름이고, <code>isPressed</code>는 지금
          상태를 읽는 property입니다. 사용자가 target을 누르면 true가 되고
          release 뒤 false로 돌아오는지를 physical drag에서 확인할 수 있습니다.
        </p>
        <p>
          lab의 simulation button은 정확한 pointer drag 없이 listener 흐름을
          접근 가능하게 확인합니다. 이 버튼은 registered listener만
          dispatch하므로 physical <code>isPressed</code> state를 꾸며서 true로
          만들지 않습니다.
        </p>
      </div>
    </section>
  )
}
