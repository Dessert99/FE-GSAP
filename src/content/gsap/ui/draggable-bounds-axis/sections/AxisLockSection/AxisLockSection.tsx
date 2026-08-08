/** lockAxis 요청과 lockedAxis 결과가 반대 축을 의미한다는 점을 구분한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function AxisLockSection() {
  return <section id="axis-lock" className="draggable-bounds-axis-page__section" aria-labelledby="axis-lock-title"><SectionHeading number="03" id="axis-lock" title="요청한 lockAxis와 결정된 lockedAxis를 나눕니다" description="lockAxis는 방향을 고정해 달라는 Boolean 요청이고, lockedAxis는 이번 gesture에서 실제로 막힌 축입니다." /><div className="draggable-bounds-axis-page__prose"><p><code>lockAxis: true</code>면 처음 2px를 넘긴 방향 중 더 큰 쪽으로만 움직여 diagonal movement를 막습니다. 이것은 <code>"x,y"</code>, <code>"top,left"</code>, <code>"scroll"</code> type에서만 의미가 있습니다.</p><p>처음 수평으로 끌면 수직이 막히므로 <code>lockedAxis</code>는 <code>"y"</code>입니다. press 순간에는 아직 방향을 몰라 설정되지 않습니다. 공식은 String을 문서화하지만 installed top-level type에는 이 property가 빠져 있어 lab은 optional local read로만 표시합니다.</p></div></section>
}
