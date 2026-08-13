/** 하나의 SVG path range를 조절하고 실제 plugin measurement로 확인하게 만든다. */
import { drawSvgProperties } from '../../draw-svg.properties'
import { useStrokeRangeAnimation } from './useStrokeRangeAnimation'
import './StrokeRangeLab.css'

/** range descriptor가 drawSVG vars·ruler·measurement·code를 같은 값으로 유지하는 lab이다. */
export function StrokeRangeLab() {
  // runtime의 실제 descriptor와 geometry snapshot을 control과 panel이 함께 소비한다
  const {
    scope,
    pathRef,
    descriptor,
    measurement,
    setRangeStart,
    setRangeEnd,
    setLive,
    refreshMeasurement,
    reducedMotion,
  } = useStrokeRangeAnimation()
  // runtime과 같은 target·measurement·tween cleanup을 실행 가능한 code panel로 만든다
  const code = `const path = document.querySelector('#draw-svg-path')
if (!path) throw new Error('DrawSVG path를 찾지 못했습니다.')
gsap.registerPlugin(DrawSVGPlugin)
const refreshMeasurement = () => {
  const length = DrawSVGPlugin.getLength(path)
  const position = DrawSVGPlugin.getPosition(path)
  console.log({ length, position })
}
const tween = gsap.to(path, {
  drawSVG: '${descriptor.value}',
  duration: ${reducedMotion ? 0 : 0.7},
  ease: 'power1.out',
  overwrite: true,
  onComplete: refreshMeasurement,
})
refreshMeasurement()

function cleanup() {
  tween.revert()
}`
  // percentage ruler가 descriptor의 same start/end를 보여 준다
  const rulerStyle = {
    left: `${descriptor.start}%`,
    width: `${descriptor.end - descriptor.start}%`,
  }

  return (
    <section
      className="stroke-range-lab"
      aria-labelledby="stroke-range-lab-title"
    >
      <h3 id="stroke-range-lab-title">
        한 stroke에서 보이는 range를 정해 볼까요?
      </h3>
      <p className="stroke-range-lab__goal">
        start와 end slider를 바꾼 뒤 path와 ruler를 함께 보세요. “measure now”는
        plugin이 현재 rendered stroke에서 읽은 길이와 interval을 보여 줍니다.
      </p>
      <div ref={scope} className="stroke-range-lab__body">
        <div className="stroke-range-lab__stage">
          <svg
            viewBox="0 0 420 130"
            role="img"
            aria-label="선택한 DrawSVG range를 가진 하나의 곡선 stroke"
          >
            <path
              d="M20 95 C100 20 180 125 260 50 S360 25 400 82"
              className="stroke-range-lab__guide"
            />
            <path
              ref={pathRef}
              id="draw-svg-path"
              d="M20 95 C100 20 180 125 260 50 S360 25 400 82"
              className="stroke-range-lab__path"
            />
          </svg>
          <div
            className="stroke-range-lab__ruler"
            aria-label={`visible range ${descriptor.start}% to ${descriptor.end}%`}
          >
            <span style={rulerStyle} />
          </div>
          <p>
            ruler의 색 구간과 <code>drawSVG: '{descriptor.value}'</code>가 같은
            descriptor입니다.
          </p>
        </div>
        <div className="stroke-range-lab__controls">
          <label htmlFor="draw-start">
            <span>start · {descriptor.start}%</span>
            <input
              id="draw-start"
              type="range"
              min="0"
              max="100"
              value={descriptor.start}
              onChange={(event) => setRangeStart(Number(event.target.value))}
            />
          </label>
          <label htmlFor="draw-end">
            <span>end · {descriptor.end}%</span>
            <input
              id="draw-end"
              type="range"
              min="0"
              max="100"
              value={descriptor.end}
              onChange={(event) => setRangeEnd(Number(event.target.value))}
            />
          </label>
          <label className="stroke-range-lab__check" htmlFor="draw-live">
            <input
              id="draw-live"
              type="checkbox"
              checked={descriptor.live}
              onChange={(event) => setLive(event.target.checked)}
            />
            length changes during tween → <code>live</code>
          </label>
          <button type="button" onClick={refreshMeasurement}>
            measure now
          </button>
          <p>
            {reducedMotion
              ? 'reduced motion에서는 선택한 reveal state를 duration 0으로 즉시 적용합니다.'
              : 'range 변경은 0.7초 동안 새 selected state로 이동합니다.'}
          </p>
        </div>
      </div>
      <dl className="stroke-range-lab__measurement">
        <div>
          <dt>getLength()</dt>
          <dd>{measurement.length.toFixed(2)}</dd>
        </div>
        <div>
          <dt>getPosition()[0]</dt>
          <dd>{measurement.position[0]?.toFixed(2) ?? '0.00'}</dd>
        </div>
        <div>
          <dt>getPosition()[1]</dt>
          <dd>{measurement.position[1]?.toFixed(2) ?? '0.00'}</dd>
        </div>
        <div>
          <dt>end percentage</dt>
          <dd>
            {Number.isFinite(measurement.endPercent)
              ? `${measurement.endPercent}%`
              : '측정 불가'}
          </dd>
        </div>
      </dl>
      <pre className="stroke-range-lab__code">
        <code>{code}</code>
      </pre>
      <div className="stroke-range-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            두 slider는 path가 따라가는 시간 범위가 아니라 stroke 전체 중 화면에
            남길 start/end 위치를 바꿉니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            ruler, plugin var, getPosition()의 두 숫자가 같은 visible interval을
            서로 다른 표현으로 보여 줍니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            DrawSVG는 dasharray와 dashoffset을 써서 stroke의 나머지를 가립니다.
            fill은 이 plugin으로 변하지 않습니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            icon outline을 그리거나, 고정 길이 dash를 path를 따라 이동시키거나,
            responsive SVG 길이 변화에 live를 붙일 때 사용합니다.
          </p>
        </article>
      </div>
      <div className="stroke-range-lab__table-wrap">
        <table>
          <caption>이 lab이 실제로 사용하는 DrawSVG surface</caption>
          <thead>
            <tr>
              <th scope="col">name</th>
              <th scope="col">type</th>
              <th scope="col">value</th>
              <th scope="col">이 페이지에서</th>
            </tr>
          </thead>
          <tbody>
            {drawSvgProperties.map((property) => (
              <tr key={property.name}>
                <th scope="row">
                  <code>{property.name}</code>
                </th>
                <td>{property.type}</td>
                <td>
                  <code>{property.values}</code>
                </td>
                <td>{property.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="stroke-range-lab__source">
        실행 코드 위치 ·{' '}
        <code>examples/StrokeRangeLab/useStrokeRangeAnimation.ts</code>
      </p>
    </section>
  )
}
