/** release마다 생성되는 tween reference의 읽기 시점과 polling 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function TweenInspectorSection() {
  return (
    <section
      id="tween-inspector"
      className="draggable-collision-momentum-page__section"
      aria-labelledby="tween-inspector-title"
    >
      <SectionHeading
        number="04"
        id="tween-inspector"
        title="tween은 release마다 새로 읽습니다"
        description="tween은 inertia true에서 mouse 또는 touch release 직후 생성되는 read-only Tween instance입니다. 오래 저장한 하나의 “momentum state”가 아니라 매 release의 reference를 읽습니다."
      />
      <div className="draggable-collision-momentum-page__prose">
        <p>
          공식 문서가 허용하는 관찰은 <code>duration</code> 확인, <code>pause()</code>/
          <code>resume()</code>, <code>timeScale</code> 변경입니다. 또한 throw될 때마다 새 tween이
          만들어지므로 <code>onDragEnd</code> 안의 <code>this.tween</code>을 읽는 것이 release 시점
          reference를 잡는 방법입니다.
        </p>
        <p>
          property는 event stream이 아닙니다. lab은 per-frame live region polling을 하지 않고
          drag·release·throw complete callback에서 snapshot을 다시 읽습니다. 화면의 “생성됨”은 현재
          snapshot의 reference가 있다는 뜻이며, P07의 gesture event API 전체를 다시 가르치지
          않습니다.
        </p>
      </div>
      <aside className="draggable-collision-momentum-page__note">
        <strong>type boundary:</strong> installed raw source는 새 press에서{' '}
        <code>self.tween = null</code>을 보이지만 installed d.ts는 non-null <code>Tween</code>으로
        선언합니다. lab은 이를 official claim으로 바꾸지 않고 optional runtime snapshot으로만
        안전하게 읽습니다.
      </aside>
    </section>
  )
}
