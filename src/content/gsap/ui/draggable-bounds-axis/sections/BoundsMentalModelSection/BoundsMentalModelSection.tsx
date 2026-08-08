/** bounds 입력 형태와 재계산이 position legal range를 만드는 이유를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function BoundsMentalModelSection() {
  return <section id="bounds-mental-model" className="draggable-bounds-axis-page__section" aria-labelledby="bounds-mental-model-title"><SectionHeading number="01" id="bounds-mental-model" title="bounds는 legal position 범위를 다시 잽니다" description="bounds는 보이는 테두리 자체가 아니라 Draggable이 target을 둘 수 있는 min/max 범위의 입력입니다." /><div className="draggable-bounds-axis-page__prose"><p><code>applyBounds(bounds)</code>는 새 범위를 적용합니다. element 또는 selector는 container를 재고, rectangle은 부모 좌표계의 <code>top/left/width/height</code>를 쓰며, 값 객체는 <code>minX/maxX/minY/maxY</code> 또는 rotation 범위를 직접 줍니다.</p><p>그래서 container의 크기나 target의 layout이 바뀌면 예전 계산값은 현재 공간을 설명하지 못합니다. 마지막 섹션에서 <code>update()</code>로 다시 읽는 이유입니다.</p></div></section>
}
