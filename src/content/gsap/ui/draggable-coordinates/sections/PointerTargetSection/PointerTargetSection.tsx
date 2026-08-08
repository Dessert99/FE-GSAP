/** 마지막 입력 event와 target transform이 서로 다른 좌표 frame임을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** pointer event의 정보와 target state를 혼동하지 않게 하는 section이다. */
export function PointerTargetSection() {
  return (
    <section
      id="pointer-target"
      className="draggable-coordinates-page__section"
      aria-labelledby="pointer-target-title"
    >
      <SectionHeading
        number="03"
        id="pointer-target"
        title="pointer 위치와 target 위치는 같은 좌표가 아니다"
        description="pointerEvent·pointerX·pointerY는 마지막 입력을, x·y·rotation은 draggable target의 상태를 읽습니다."
      />
      <div className="draggable-coordinates-page__prose">
        <p>
          <code>pointerEvent</code>는 마지막으로 instance에 영향을 준 event이고,{' '}
          <code>pointerX</code>와 <code>pointerY</code>는 그 event의 page 위치를
          browser 차이 없이 읽기 위한 값입니다.
        </p>
        <p>
          반면 target의 <code>x</code>와 <code>y</code>는 type에 따라 transform
          또는 inline positional style과 관계됩니다. pointer의 page 좌표를
          target의 local transform 좌표라고 가정하지 마세요.
        </p>
      </div>
    </section>
  )
}
