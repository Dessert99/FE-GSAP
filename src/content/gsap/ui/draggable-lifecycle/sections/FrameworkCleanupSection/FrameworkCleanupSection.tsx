/** React unmount가 Draggable instance를 kill해야 하는 이유를 lifecycle cleanup으로 고정한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** component boundary에서 listener와 lookup을 남기지 않는 cleanup을 보여 준다. */
export function FrameworkCleanupSection() {
  return <section id="framework-cleanup" className="draggable-lifecycle-page__section" aria-labelledby="framework-cleanup-title"><SectionHeading number="05" id="framework-cleanup" title="framework unmount에서 instance를 정리한다" description="component가 사라질 때 kill()을 호출해 target listener와 instance lookup이 다음 mount까지 남지 않게 합니다." /><div className="draggable-lifecycle-page__prose"><p>lab runtime은 <code>useGSAP</code> cleanup에서 instance를 <code>kill()</code>하고 ref를 비웁니다. recreate도 같은 cleanup 경로를 먼저 거치므로 stale control이 이전 instance를 다시 조작하지 않습니다.</p><p>여기서는 instance state method까지만 다룹니다. gesture event 관찰과 inertia·collision 결과는 이어지는 학습 페이지에서 각각 확인합니다.</p></div><pre className="draggable-lifecycle-page__code"><code>{`useGSAP(() => {
  const [draggable] = Draggable.create(target)

  return () => draggable.kill()
}, { scope })`}</code></pre><div className="draggable-lifecycle-page__note"><h3>accessibility와 motion</h3><p>native button control은 keyboard로 같은 lifecycle method를 실행합니다. lab은 autonomous animation을 만들지 않으며, state 변경은 한 번의 status message로만 알려 연속 drag를 과도하게 읽지 않습니다.</p></div></section>
}
