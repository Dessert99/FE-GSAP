/** external layout change 뒤 update()와 applyBounds()의 재동기화 흐름을 lab으로 연결한다. */
import { BoundsAxisLab } from '../../examples/BoundsAxisLab/BoundsAxisLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function ResyncSection() {
  return <section id="resync" className="draggable-bounds-axis-page__section" aria-labelledby="resync-title"><SectionHeading number="05" id="resync" title="외부 layout 변화 뒤 update()로 다시 동기화합니다" description="target 또는 tray의 layout이 외부에서 바뀌면 instance가 들고 있던 geometry를 다시 읽어야 합니다." /><div className="draggable-bounds-axis-page__prose"><p>공식 <code>update()</code> 설명은 target의 current position을 Draggable의 x/y property에 반영한다고 말합니다. lab에서 tray inset을 바꾼 뒤 <code>update(true)</code>를 누르면 bounds를 다시 적용해 inspector가 새 legal range를 읽습니다.</p><p><code>applyBounds()</code> 공식 signature는 반환값을 약속하지 않으므로 chaining에 기대지 않습니다. 현재 위치를 다시 읽고 새 bounds까지 적용하려면 <code>update(true)</code>를 명시적으로 호출합니다.</p></div><BoundsAxisLab /><p className="draggable-bounds-axis-page__related">먼저 <a href="/fundamentals/plugins">plugin 등록</a>과 <a href="/fundamentals/draggable-create">Draggable instance 생성</a>을 확인하세요. 좌표, lifecycle, event, collision·momentum은 이어지는 각 학습 페이지에서 다룹니다.</p></section>
}
