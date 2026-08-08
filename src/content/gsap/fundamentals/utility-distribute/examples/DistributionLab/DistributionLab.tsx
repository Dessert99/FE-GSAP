/** 한 줄과 grid의 distribute() 숫자를 조작·관찰·코드로 동시에 보여 준다. */
import type { CSSProperties } from 'react'
import type { DistributionAxis, DistributionEase, DistributionFrom, DistributionLayout, DistributionSpacing } from './useDistributeRuntime'
import { useDistributeRuntime } from './useDistributeRuntime'
import './DistributionLab.css'

// 한 줄에서 규칙을 익힌 뒤 2차원 grid로 펼칠 배치 선택지다
const layoutOptions: { value: DistributionLayout; label: string }[] = [
  { value: 'row', label: '1D row · 9개' },
  { value: 'grid', label: '2D grid · 3×4' },
]
// 총량과 target 간격 중 어떤 값을 control할지 고른다
const spacingOptions: { value: DistributionSpacing; label: string }[] = [
  { value: 'amount', label: 'amount · 전체 총량' },
  { value: 'each', label: 'each · 거리 단위당 간격' },
]
// 결정적으로 비교할 수 있는 공식 from 문자열을 제공한다
const fromOptions: DistributionFrom[] = ['start', 'center', 'end', 'edges']
// 2차원 거리와 x·y 한 축을 비교할 선택지다
const axisOptions: { value: DistributionAxis; label: string }[] = [
  { value: 'both', label: 'x + y 거리' },
  { value: 'x', label: 'x축만' },
  { value: 'y', label: 'y축만' },
]
// 선형 거리와 ease로 휜 거리를 비교할 선택지다
const easeOptions: DistributionEase[] = ['none', 'power1.inOut']

export function DistributionLab() {
  // runtime이 소유한 controls와 단일 snapshot을 화면에 그대로 연결한다
  const { layout, setLayout, spacing, setSpacing, distance, setDistance, from, setFrom, axis, setAxis, ease, setEase, snapshot } = useDistributeRuntime()
  // cell 열 수는 실행 descriptor가 정한 좌표계와 같은 값을 쓴다
  const gridStyle = { '--distribution-columns': snapshot.descriptor.columns } as CSSProperties

  return (
    <section className="distribution-lab" aria-labelledby="distribution-lab-title">
      <h3 id="distribution-lab-title">같은 설정을 row에서 grid로 펼쳐 보기</h3>
      <p className="distribution-lab__goal">먼저 한 줄에서 시작점과 간격을 읽고, 2D grid로 바꿔 x·y 거리가 숫자를 어떻게 바꾸는지 확인하세요.</p>

      <div className="distribution-lab__layout">
        <fieldset className="distribution-lab__controls">
          <legend>배분 설정</legend>
          <div className="distribution-lab__button-group" aria-label="배치">
            {layoutOptions.map((option) => <button key={option.value} type="button" aria-pressed={layout === option.value} onClick={() => setLayout(option.value)}>{option.label}</button>)}
          </div>

          <label htmlFor="distribution-spacing">간격 기준</label>
          <select id="distribution-spacing" value={spacing} onChange={(event) => setSpacing(event.target.value as DistributionSpacing)}>
            {spacingOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>

          <label htmlFor="distribution-distance">{spacing}</label>
          <output htmlFor="distribution-distance">{distance}</output>
          <input id="distribution-distance" type="range" min="10" max="200" step="10" value={distance} onChange={(event) => setDistance(Number(event.target.value))} />

          <label htmlFor="distribution-from">from</label>
          <select id="distribution-from" value={from} onChange={(event) => setFrom(event.target.value as DistributionFrom)}>
            {fromOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>

          <label htmlFor="distribution-ease">ease</label>
          <select id="distribution-ease" value={ease} onChange={(event) => setEase(event.target.value as DistributionEase)}>
            {easeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>

          <label htmlFor="distribution-axis">axis</label>
          <select id="distribution-axis" value={axis} disabled={layout === 'row'} onChange={(event) => setAxis(event.target.value as DistributionAxis)}>
            {axisOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          {layout === 'row' && <small>flat 배열에는 axis를 보내지 않습니다.</small>}
        </fieldset>

        <div>
          <div className="distribution-lab__readout">
            <span>최솟값 <strong>{snapshot.minimum}</strong></span>
            <span>최댓값 <strong>{snapshot.maximum}</strong></span>
            <span>호출 <strong>{snapshot.cells.length}회</strong></span>
          </div>
          <ol className={`distribution-lab__cells distribution-lab__cells--${layout}`} style={gridStyle} aria-label={`${layout} 배분 결과`}>
            {snapshot.cells.map((cell) => (
              <li key={cell.id} style={{ '--distribution-heat': `${Math.round(5 + cell.heat * 25)}%` } as CSSProperties}>
                <span>index {cell.index}</span>
                <output aria-label={`index ${cell.index} 반환값`}>{cell.value}</output>
                {layout === 'grid' && <small>r{cell.row} · c{cell.column}</small>}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <pre className="distribution-lab__code"><code>{snapshot.code}</code></pre>
      <div className="distribution-lab__panels">
        <article><h4>무엇이 달라졌나요?</h4><p><code>from</code>에서 가까운 셀과 먼 셀의 숫자·색이 함께 바뀝니다. grid에서는 같은 index 순서라도 행과 열의 거리를 계산합니다.</p></article>
        <article><h4>무엇을 봐야 하나요?</h4><p><code>amount</code>는 가장 가까운 값부터 가장 먼 값까지의 전체 폭입니다. <code>each</code>는 거리 단계마다 더할 크기입니다.</p></article>
        <article><h4>왜 코드와 숫자가 맞나요?</h4><p>controls가 만든 descriptor 하나로 반환 함수를 만들고, 그 snapshot이 각 셀 숫자와 직렬화 코드까지 함께 제공합니다.</p></article>
        <article><h4>언제 쓰나요?</h4><p>DOM을 움직이지 않고도 index별 지연·크기·불투명도 후보를 계산할 수 있습니다. 이 페이지는 계산까지만 소유합니다.</p></article>
      </div>
      <p className="distribution-lab__source">실행 코드 위치 · <code>examples/DistributionLab/useDistributeRuntime.ts</code></p>
    </section>
  )
}
