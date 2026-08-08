/** edge auto-scroll 속도와 Draggable z-index 관찰을 같은 drag layer 범위에 둔다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function AutoScrollLayerSection() {
  return <section id="auto-scroll-layer" className="draggable-bounds-axis-page__section" aria-labelledby="auto-scroll-layer-title"><SectionHeading number="04" id="auto-scroll-layer" title="edge scroll과 z-index는 drag 레이어의 일입니다" description="autoScroll은 bounds를 넓히지 않습니다. scrollable container edge 가까이에서 container를 움직이고, zIndex는 현재 drag layer 값을 읽습니다." /><div className="draggable-bounds-axis-page__prose"><p><code>autoScroll</code>에 0이 아닌 수를 주면 scrollable container edge 40px 안에서 동작합니다. <code>1</code>은 normal speed, <code>2</code>는 double speed이며 edge에 가까울수록 더 빠릅니다. 기본값은 <code>0</code>입니다.</p><p><code>zIndex</code>는 현재 Draggable z-index입니다. zIndexBoost를 어떻게 생성 때 설정할지는 P03 소유이므로 이 페이지는 읽기만 합니다.</p></div></section>
}
