/** external layout change 뒤 update()와 applyBounds()의 재동기화 흐름을 lab으로 연결한다. */
import { BoundsAxisLab } from '../../examples/BoundsAxisLab/BoundsAxisLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function ResyncSection() {
  return <section id="resync" className="draggable-bounds-axis-page__section" aria-labelledby="resync-title"><SectionHeading number="05" id="resync" title="외부 layout 변화 뒤 update()로 다시 동기화합니다" description="target 또는 tray의 layout이 외부에서 바뀌면 instance가 들고 있던 geometry를 다시 읽어야 합니다." /><div className="draggable-bounds-axis-page__prose"><p>공식 <code>update()</code> 설명은 target의 current position을 Draggable의 x/y property에 반영한다고 말합니다. lab에서 tray inset을 바꾼 뒤 <code>update(true)</code>를 누르면 bounds를 다시 적용해 inspector가 새 legal range를 읽습니다.</p><p>installed source는 <code>applyBounds(newBounds)</code>가 <code>update(true, sticky)</code>로 위임하고 둘 다 instance를 return하지만, <code>applyBounds()</code> 공식 signature는 return을 표시하지 않고 d.ts는 void입니다. 이 source/type 차이는 구현 내부 경계로만 기록합니다.</p></div><BoundsAxisLab /><p className="draggable-bounds-axis-page__related">선행 링크: <a href="/fundamentals/plugins">P01 Plugins</a> · <a href="/fundamentals/draggable-create">P03 Draggable create</a>. P04 좌표, P06 lifecycle, P07 events, P08 collision/momentum은 다음 소유자의 text-only 경계입니다.</p></section>
}
