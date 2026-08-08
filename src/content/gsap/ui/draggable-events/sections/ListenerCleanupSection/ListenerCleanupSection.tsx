/** listener callback context 차이와 동일 callback removal boundary를 분명히 적는다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** official rendered 설명과 installed dispatcher의 차이를 숨기지 않는 section이다. */
export function ListenerCleanupSection() {
  return (
    <section
      id="listener-cleanup"
      className="draggable-events-page__section"
      aria-labelledby="listener-cleanup-title"
    >
      <SectionHeading
        number="04"
        id="listener-cleanup"
        title="등록한 listener는 같은 callback으로 정리한다"
        description="component cleanup에서는 addEventListener에 넘긴 type과 callback reference를 그대로 removeEventListener에 넘긴 뒤 instance를 kill합니다."
      />
      <div className="draggable-events-page__prose">
        <p>
          공식 usage는 <code>press</code> listener에서 <code>this</code>{' '}
          target을 GSAP으로 꾸미는 모습을 보여 줍니다. 하지만 현재 installed
          dispatcher source는 listener를 Draggable instance에 bind하고 event
          payload의 <code>target</code>에 DOM target을 담습니다.
        </p>
        <p>
          이 차이 때문에 lab listener는 <code>this</code>에 의존하지 않고 event
          name과 instance state만 log합니다. cleanup은 같은 callback reference로
          모든 listener를 제거한 뒤 <code>instance.kill()</code>합니다.
        </p>
      </div>
      <div className="draggable-events-page__warning">
        <h3>공식 설명과 설치본의 차이</h3>
        <p>
          rendered docs의 listener <code>this</code> target 설명은 official
          coverage로 보존했습니다. installed GSAP 3.15 dispatcher 관찰은
          implementation evidence일 뿐 공식 claim을 바꾸지 않으며, event
          payload의 target 사용을 더 안전한 경계로 남깁니다.
        </p>
      </div>
    </section>
  )
}
