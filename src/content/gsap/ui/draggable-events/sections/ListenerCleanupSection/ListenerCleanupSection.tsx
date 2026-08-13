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
        <p>공식 usage는 <code>press</code> listener의 <code>this</code>를 Draggable target으로 설명합니다. 현재 설치된 GSAP 3.15.0에서는 callback의 <code>this</code>가 Draggable instance이고 event payload의 <code>target</code>이 DOM target입니다.</p>
        <p>
          이 차이 때문에 lab listener는 <code>this</code>에 의존하지 않고 event
          name과 instance state만 log합니다. cleanup은 같은 callback reference로
          모든 listener를 제거한 뒤 <code>instance.kill()</code>합니다.
        </p>
      </div>
      <div className="draggable-events-page__warning">
        <h3>공식 설명과 설치본의 차이</h3>
        <p>
          공식 문서와 설치된 버전의 callback context가 다르므로 이 예제는{' '}
          <code>this</code>에 의존하지 않습니다. DOM target이 필요하면 callback에
          전달된 event의 <code>target</code>을 확인하세요.
        </p>
      </div>
    </section>
  )
}
