/** static marker, tangent, slice highlight와 code를 동기화하는 ruler lab이다. */
import { pathRulerDescriptor, usePathRulerRuntime } from './usePathRulerRuntime'
import './PathRulerLab.css'
/** range controls로 animation 없이 progress measurement를 조작한다. */
export function PathRulerLab() {
  // runtime utility calls가 계산한 one descriptor result를 표시한다
  const { progress, start, end, setProgress, setStart, setEnd, measurement } =
    usePathRulerRuntime()
  // displayed calls는 runtime descriptor와 exact controls를 문법으로만 직렬화한다
  const code = `const rawPath = MotionPathPlugin.getRawPath('${pathRulerDescriptor.data}')\nMotionPathPlugin.cacheRawPathMeasurements(rawPath)\nconst length = MotionPathPlugin.getLength(rawPath)\nconst point = MotionPathPlugin.getPositionOnPath(rawPath, ${progress}, true)\nconst slice = MotionPathPlugin.sliceRawPath(rawPath, ${start}, ${end})`
  return (
    <section className="path-ruler-lab" aria-labelledby="path-ruler-title">
      <h2 id="path-ruler-title">raw path를 정지한 ruler로 읽기</h2>
      <p>
        세 range input은 Arrow key로 조절합니다. motion은 없고 marker, tangent,
        slice만 새 계산 결과로 바뀝니다.
      </p>
      <svg viewBox="0 0 320 180" aria-label="path ruler">
        <path
          d={pathRulerDescriptor.data}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d={measurement.sliceData}
          fill="none"
          stroke="#d67"
          strokeWidth="7"
        />
        <g
          transform={`translate(${measurement.point.x} ${measurement.point.y}) rotate(${measurement.point.angle})`}
        >
          <circle r="7" fill="#245" />
          <path d="M0 0 L26 0" stroke="#245" strokeWidth="3" />
        </g>
      </svg>
      <div className="path-ruler-lab__controls">
        <label>
          sample {progress}
          <input
            type="range"
            min="0"
            max="1"
            step=".05"
            value={progress}
            onChange={(event) => setProgress(Number(event.target.value))}
          />
        </label>
        <label>
          slice start {start}
          <input
            type="range"
            min="0"
            max="1"
            step=".05"
            value={start}
            onChange={(event) => setStart(Number(event.target.value))}
          />
        </label>
        <label>
          slice end {end}
          <input
            type="range"
            min="0"
            max="1"
            step=".05"
            value={end}
            onChange={(event) => setEnd(Number(event.target.value))}
          />
        </label>
      </div>
      <dl>
        <div>
          <dt>length</dt>
          <dd>{measurement.length.toFixed(1)} geometry units</dd>
        </div>
        <div>
          <dt>sample x / y</dt>
          <dd>
            {measurement.point.x.toFixed(1)} / {measurement.point.y.toFixed(1)}
          </dd>
        </div>
        <div>
          <dt>tangent angle</dt>
          <dd>{measurement.point.angle.toFixed(1)} deg</dd>
        </div>
      </dl>
      <pre>
        <code>{code}</code>
      </pre>
      <div className="path-ruler-lab__panels">
        <article>
          <h3>무엇이 달라졌나요?</h3>
          <p>
            marker와 tangent는 progress sample을, 굵은 선은 new RawPath slice를
            보여 줍니다.
          </p>
        </article>
        <article>
          <h3>무엇을 봐야 하나요?</h3>
          <p>angle은 true includeAngle 때문에 degree로 계산됩니다.</p>
        </article>
        <article>
          <h3>왜 motion이 없나요?</h3>
          <p>
            이 질문은 travel보다 geometry output을 정확히 읽는 데 집중합니다.
          </p>
        </article>
      </div>
    </section>
  )
}
