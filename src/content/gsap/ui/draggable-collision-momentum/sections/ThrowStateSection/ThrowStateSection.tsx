/** isThrowing이 일반 drag 여부가 아닌 inertia tween 상태임을 분리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function ThrowStateSection() {
  return (
    <section
      id="throw-state"
      className="draggable-collision-momentum-page__section"
      aria-labelledby="throw-state-title"
    >
      <SectionHeading
        number="03"
        id="throw-state"
        title="isThrowing은 inertia tween 상태입니다"
        description="drag 중이라는 사실과 release 뒤 계속 움직이는 사실은 다릅니다. isThrowing은 후자, 즉 InertiaPlugin tween이 target을 animate하는 동안만 읽는 Boolean입니다."
      />
      <div className="draggable-collision-momentum-page__prose">
        <p>
          <code>isThrowing</code>은 target이 inertia tween으로 현재 animate될 때 <code>true</code>
          입니다. 따라서 pointer를 누르고 이동하는 일반 drag state나 충돌 result 자체를 대신하지
          않습니다. 이 lab은 <code>inertia</code> control을 Draggable vars에 넣고, release
          callback에서 instance field를 읽습니다.
        </p>
        <p>
          InertiaPlugin은 이 throw branch의 dependency입니다. velocity·resistance·landing
          규칙은 Inertia 학습 페이지에서 이어서 다룹니다. 모션 감소 설정에서는
          lab이 <code>inertia: false</code>로 runtime을 만들어 현재 위치에 즉시 정착시킵니다.
        </p>
      </div>
    </section>
  )
}
