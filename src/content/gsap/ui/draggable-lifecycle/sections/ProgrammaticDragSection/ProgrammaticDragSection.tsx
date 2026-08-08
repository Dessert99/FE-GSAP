/** original pointer event가 있는 경우에만 programmatic drag를 시작·종료하게 만든다. */
import { LifecycleLab } from '../../examples/LifecycleLab/LifecycleLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** event precondition과 start/end가 enable/disable과 다른 책임임을 보여 준다. */
export function ProgrammaticDragSection() {
  return <section id="programmatic-drag" className="draggable-lifecycle-page__section" aria-labelledby="programmatic-drag-title"><SectionHeading number="03" id="programmatic-drag" title="실제 pointer event로 startDrag()와 endDrag()를 호출한다" description="두 method는 void를 반환하며, 좌표와 target을 읽을 original mouse·touch·pointer event가 있어야 합니다." /><div className="draggable-lifecycle-page__prose"><p><code>enable()</code>은 다음 user interaction을 허용할 뿐입니다. 지금 drag를 시작하려면 <code>startDrag(event, align)</code>에 실제 event를 전달합니다. <code>align: true</code>면 target을 pointer 위치로 맞춥니다.</p><p><code>endDrag(event)</code>는 진행 중인 drag를 programmatically 끝내지만 instance를 disable하지는 않습니다. 이벤트 callback, gesture sequence의 상세은 이 페이지가 아닌 P07 소유입니다.</p></div><LifecycleLab /><div className="draggable-lifecycle-page__warning"><h3>synthetic event를 만들지 않습니다</h3><p>공식 문서는 original event 없이는 <code>startDrag()</code>와 <code>endDrag()</code>를 호출할 수 없다고 명시합니다. installed runtime에는 직전 pointerEvent fallback이 있으나 type은 event를 필수로 하므로, lab은 browser가 실제로 capture한 event가 없으면 호출을 보류합니다.</p></div></section>
}
