/** delta 좌표가 pointer 이동량이 아니라 target의 직전 값 대비 변화임을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** translation과 rotation에서 deltaX의 기준이 달라지는 첫 section이다. */
export function CoordinateMentalModelSection() {
  return (
    <section
      id="coordinate-frames"
      className="draggable-coordinates-page__section"
      aria-labelledby="coordinate-frames-title"
    >
      <SectionHeading
        number="01"
        id="coordinate-frames"
        title="변화량은 target의 지난 frame과 비교한다"
        description="deltaX와 deltaY는 화면 전체의 절대 pointer 좌표가 아니라 마지막 drag event 이후 target의 x·y 관련 변화입니다."
      />
      <div className="draggable-coordinates-page__prose">
        <p>
          <code>deltaX</code>와 <code>deltaY</code>는 drag 중 매번 새로 읽는
          변화량입니다. 보통 <code>type: 'x,y'</code>에서는 transform
          translation의 변화이지만, <code>rotation</code> mode의{' '}
          <code>deltaX</code>는 회전 변화가 됩니다.
        </p>
        <p>
          따라서 pointer가 페이지에서 얼마나 움직였는지와 target이 무엇을
          바꿨는지를 같은 숫자로 취급하면 안 됩니다. lab의 두 readout을 나란히
          보는 이유가 이 분리입니다.
        </p>
      </div>
    </section>
  )
}
