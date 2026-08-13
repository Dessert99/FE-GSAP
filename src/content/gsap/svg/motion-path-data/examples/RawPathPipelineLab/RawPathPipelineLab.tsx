/** selectable input이 one actual MotionPath raw-data pipeline을 설명하는 lab이다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { motionPathDataProperties } from '../../motion-path-data.properties'
import './RawPathPipelineLab.css'
import { useRawPathPipelineRuntime } from './useRawPathPipelineRuntime'

/** P22의 input representation과 RawPath round-trip을 semantic table로 보여준다. */
export function RawPathPipelineLab() {
  // runtime이 만든 descriptor와 actual utility output을 한 lab에 연결한다.
  const {
    hostRef,
    kind,
    setKind,
    curviness,
    setCurviness,
    descriptor,
    snapshot,
    runPipeline,
    restoreSvg,
  } = useRawPathPipelineRuntime()
  // descriptor branch와 같은 call order만 code 문법으로 표시한다.
  const code = getPipelineCode(descriptor)

  return (
    <section id="raw-path-pipeline">
      <InteractiveExample
        title="one input to RawPath pipeline"
        description="입력 representation을 고르고 실행하세요. 표는 실제 utility 반환값을 숫자 segment와 d string으로만 보여주며 tween은 만들지 않습니다."
        sourcePath="src/content/gsap/svg/motion-path-data/examples/RawPathPipelineLab/useRawPathPipelineRuntime.ts"
        controls={
          <div className="interactive-example__control-list">
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                input kind
              </span>
              <select
                value={kind}
                onChange={(event) => setKind(event.target.value as typeof kind)}
              >
                <option value="points">alternating points</option>
                <option value="array">object point array</option>
                <option value="svg">SVG rect</option>
                <option value="string">SVG d string</option>
                <option value="raw">RawPath</option>
              </select>
            </label>
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                curviness: {curviness}
              </span>
              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={curviness}
                onChange={(event) => setCurviness(Number(event.target.value))}
                disabled={kind !== 'points' && kind !== 'array'}
              />
            </label>
            <button type="button" onClick={runPipeline}>
              run utility pipeline
            </button>
            <button type="button" onClick={restoreSvg}>
              restore SVG rect
            </button>
          </div>
        }
        preview={
          <div className="raw-path-pipeline-lab">
            <svg
              viewBox="0 0 200 140"
              aria-label="imperative SVG conversion host"
            >
              <g ref={hostRef} />
            </svg>
            <p role="status">{snapshot.status}</p>
            <dl className="raw-path-pipeline-lab__stages">
              <div>
                <dt>selected input</dt>
                <dd>{descriptor.label}</dd>
              </div>
              <div>
                <dt>converted SVG d</dt>
                <dd>
                  <code>{snapshot.convertedD || 'SVG mode에서만 표시'}</code>
                </dd>
              </div>
              <div>
                <dt>serialized d</dt>
                <dd>
                  <code>{snapshot.serialized || '실행 대기'}</code>
                </dd>
              </div>
              <div>
                <dt>string → RawPath segments</dt>
                <dd>{snapshot.roundTripSegments || '실행 대기'}</dd>
              </div>
            </dl>
            <table>
              <caption>RawPath numeric segments</caption>
              <thead>
                <tr>
                  <th>segment / M command</th>
                  <th>alternating x, y cubic coordinates</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.raw.length ? (
                  snapshot.raw.map((segment, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{segment.join(', ')}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2}>
                      pipeline 실행 뒤 numeric RawPath를 확인하세요.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }
        code={code}
        propertyDetails={motionPathDataProperties}
        changes={[
          'points와 array mode에서 curviness 0/1/2가 cubic control point 계산을 바꿉니다.',
          'SVG mode는 imperative host 내부 rect만 path로 swap하고 restore가 fresh rect를 만듭니다.',
          '모든 mode는 RawPath를 d string으로 serialize한 뒤 다시 RawPath로 parse합니다.',
        ]}
        watchFor={[
          'RawPath 각 row가 하나의 M command segment인지 확인합니다.',
          'string mode에서 stringToRawPath와 getRawPath가 모두 actual call인지 봅니다.',
          'SVG restore 뒤 host가 React element replacement 없이 rect로 돌아오는지 봅니다.',
        ]}
        explanation={
          <p>
            RawPath는 segment마다 alternating x/y cubic coordinates를 가진
            numeric array입니다.
            <code>resolution</code>은 motion tween의 측정 option이며 이
            여섯 conversion utility의 input이 아니므로 pipeline control로 추측해
            추가하지 않습니다.
          </p>
        }
        onReplay={runPipeline}
        replayLabel="run pipeline"
      />
    </section>
  )
}

// descriptor가 고른 runtime branch를 재조립하지 않고 its literal input만 code로 드러낸다.
function getPipelineCode(
  descriptor: ReturnType<typeof useRawPathPipelineRuntime>['descriptor'],
) {
  if (descriptor.kind === 'points') {
    return `gsap.registerPlugin(MotionPathPlugin)
const segment = MotionPathPlugin.pointsToSegment(${JSON.stringify(descriptor.points)}, ${descriptor.curviness})
const raw = [segment]
const serialized = MotionPathPlugin.rawPathToString(raw)
const roundTrip = MotionPathPlugin.stringToRawPath(serialized)`
  }
  if (descriptor.kind === 'array') {
    return `gsap.registerPlugin(MotionPathPlugin)
const raw = MotionPathPlugin.arrayToRawPath(${JSON.stringify(descriptor.values)}, { type: '${descriptor.type}', curviness: ${descriptor.curviness} })
const serialized = MotionPathPlugin.rawPathToString(raw)
const roundTrip = MotionPathPlugin.stringToRawPath(serialized)`
  }
  if (descriptor.kind === 'svg') {
    return `gsap.registerPlugin(MotionPathPlugin)
const host = document.querySelector('.raw-path-pipeline-lab g')
if (!host) throw new Error('SVG conversion host를 찾지 못했습니다.')
host.replaceChildren()
const source = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
Object.entries({ x: '32', y: '28', width: '136', height: '76', rx: '14', fill: 'none', stroke: 'currentColor', 'stroke-width': '4' })
  .forEach(([name, value]) => source.setAttribute(name, value))
host.appendChild(source)
const paths = MotionPathPlugin.convertToPath(source, ${descriptor.swap})
const path = paths[0]
if (!path) throw new Error('converted path를 만들지 못했습니다.')
const convertedD = path.getAttribute('d') || ''
const raw = MotionPathPlugin.getRawPath(path)
const serialized = MotionPathPlugin.rawPathToString(raw)
const roundTrip = MotionPathPlugin.stringToRawPath(serialized)

function cleanup() {
  host.replaceChildren()
}`
  }
  if (descriptor.kind === 'string') {
    return `gsap.registerPlugin(MotionPathPlugin)
const parsed = MotionPathPlugin.stringToRawPath('${descriptor.pathData}')
const raw = MotionPathPlugin.getRawPath('${descriptor.pathData}')
const serialized = MotionPathPlugin.rawPathToString(raw)
const roundTrip = MotionPathPlugin.stringToRawPath(serialized)`
  }
  return `gsap.registerPlugin(MotionPathPlugin)
const sourceD = MotionPathPlugin.rawPathToString(${JSON.stringify(descriptor.raw)})
const raw = MotionPathPlugin.stringToRawPath(sourceD)
const serialized = MotionPathPlugin.rawPathToString(raw)
const roundTrip = MotionPathPlugin.stringToRawPath(serialized)`
}
