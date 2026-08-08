/** from·grid·axis·ease가 위치를 숫자로 바꾸는 과정을 실제 heatmap으로 잇는다. */
import { DistributionLab } from '../../examples/DistributionLab/DistributionLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function GridGeometrySection() {
  return (
    <section id="grid-geometry" className="utility-distribute-page__section" aria-labelledby="grid-geometry-title">
      <SectionHeading number="03" id="grid-geometry" title="한 줄을 grid 거리로 펼친다" description="from은 출발점, grid는 좌표계, axis는 측정 방향, ease는 거리 비율을 값으로 바꾸는 곡선입니다." />
      <div className="utility-distribute-page__flow" aria-label="배분 계산 순서">
        <div><strong>from</strong><span>0 · index · keyword · [x, y] 비율</span></div>
        <div><strong>grid</strong><span>flat 또는 [rows, columns] · auto</span></div>
        <div><strong>axis</strong><span>전체 거리 · x · y</span></div>
        <div><strong>ease</strong><span>none 또는 Ease 곡선</span></div>
      </div>
      <p className="utility-distribute-page__note"><code>from</code> 문자열은 <code>start</code>, <code>center</code>, <code>edges</code>, <code>random</code>, <code>end</code>를 허용하고 기본값은 숫자 <code>0</code>입니다. <code>grid: 'auto'</code>는 실제 DOM 위치로 행·열을 감지하므로 이 순수 숫자 실습은 명시적 <code>[3, 4]</code>만 실행합니다.</p>
      <DistributionLab />
      <aside className="utility-distribute-page__probe">
        <h3>GSAP 3.15.0 probe · 문서 밖 실행 차이</h3>
        <p><code>from: 'random'</code> 순서는 반환 함수 하나를 만든 뒤 같은 targets에 다시 호출해도 유지됐습니다. 새 반환 함수 사이의 안정성은 보장하지 않습니다.</p>
        <p><code>grid: [2, 3]</code>, <code>amount: 10</code>, <code>from: 'start'</code>에서 axis x는 각 행이 0·5·10, axis y는 각 열이 0·10이었습니다.</p>
      </aside>
    </section>
  )
}
