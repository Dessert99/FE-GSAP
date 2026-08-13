/** disable과 kill의 lookup·cleanup 차이를 새 instance creation과 연결한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** 더 이상 쓰지 않는 instance를 final dispose하고 새로 만드는 기준을 설명한다. */
export function KillRecreateSection() {
  return <section id="kill-recreate" className="draggable-lifecycle-page__section" aria-labelledby="kill-recreate-title"><SectionHeading number="04" id="kill-recreate" title="kill()은 lookup까지 버리고 recreate는 새 instance를 만든다" description="disable은 temporary pause지만 kill은 listener와 internal lookup을 제거합니다." /><div className="draggable-lifecycle-page__prose"><p><code>kill()</code>은 disable한 뒤 internal lookup에서 instance를 제거하므로 garbage collection 대상이 됩니다. 그래서 disable한 instance는 <code>Draggable.get(target)</code>으로 계속 찾을 수 있지만, kill한 instance는 찾을 수 없습니다.</p><p>이 예제는 kill한 instance를 다시 enable하지 않고, 같은 target에 <code>Draggable.create(target)[0]</code>를 호출해 새 instance를 만듭니다.</p></div><pre className="draggable-lifecycle-page__code"><code>{`draggable.kill()

const [freshDraggable] = Draggable.create(target)`}</code></pre></section>
}
