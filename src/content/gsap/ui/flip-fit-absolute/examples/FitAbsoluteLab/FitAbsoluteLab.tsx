/** source/destination box와 flow outline을 descriptor-driven Flip call로 관찰하게 만든다. */
import { flipFitAbsoluteProperties } from '../../flip-fit-absolute.properties'
import { useFitAbsoluteAnimation } from './useFitAbsoluteAnimation'
import './FitAbsoluteLab.css'
export function FitAbsoluteLab() {
  const {
    scope,
    sourceRef,
    destinationRef,
    descriptor,
    snapshot,
    setMode,
    setScale,
    setAbsolute,
    run,
    makeAbsolute,
    restore,
  } = useFitAbsoluteAnimation()
  const code =
    descriptor.mode === 'calculate'
      ? `Flip.fit(source, destination, { scale: ${descriptor.scale}, getVars: true })`
      : `Flip.fit(source, destination, { scale: ${descriptor.scale}, absolute: ${descriptor.absolute}, duration: ${descriptor.duration} })`
  return (
    <section
      className="fit-absolute-lab"
      aria-labelledby="fit-absolute-lab-title"
    >
      <h3 id="fit-absolute-lab-title">한 box를 다른 box의 area에 맞출까요?</h3>
      <p>
        calculate은 값만 읽고, apply는 즉시 style을 바꾸고, animate는 Tween을
        반환합니다. absolute는 source를 document flow에서 빼므로 restore를
        제공합니다.
      </p>
      <div ref={scope} className="fit-absolute-lab__stage">
        <div className="fit-absolute-lab__flow">
          <div
            ref={sourceRef}
            className="fit-absolute-lab__source"
            tabIndex={0}
          >
            source
          </div>
          <div className="fit-absolute-lab__follower">flow follower</div>
        </div>
        <div ref={destinationRef} className="fit-absolute-lab__destination">
          destination
        </div>
      </div>
      <div className="fit-absolute-lab__controls">
        <label>
          <span>mode</span>
          <select
            value={descriptor.mode}
            onChange={(e) => setMode(e.target.value as typeof descriptor.mode)}
          >
            <option value="calculate">calculate vars</option>
            <option value="apply">apply now</option>
            <option value="animate">animate</option>
          </select>
        </label>
        <label>
          <input
            type="checkbox"
            checked={descriptor.scale}
            onChange={(e) => setScale(e.target.checked)}
          />
          scale
        </label>
        <label>
          <input
            type="checkbox"
            checked={descriptor.absolute}
            onChange={(e) => setAbsolute(e.target.checked)}
          />
          fit absolute
        </label>
        <button type="button" onClick={run}>
          run fit
        </button>
        <button type="button" onClick={makeAbsolute}>
          makeAbsolute()
        </button>
        <button type="button" onClick={restore}>
          restore flow/styles
        </button>
      </div>
      <dl>
        <div>
          <dt>return</dt>
          <dd>{snapshot.returnKind}</dd>
        </div>
        <div>
          <dt>affected</dt>
          <dd>{snapshot.absoluteAffected}</dd>
        </div>
        <div>
          <dt>flow removed</dt>
          <dd>{String(snapshot.flowRemoved)}</dd>
        </div>
      </dl>
      <pre>
        <code>{code}</code>
      </pre>
      <div className="fit-absolute-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            source가 destination의 viewport area에 맞고, absolute면 follower가
            source 자리를 채웁니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>calculate은 DOM을 바꾸지 않고 vars object를 반환합니다.</p>
        </article>
        <article>
          <h4>왜 restore가 필요한가요?</h4>
          <p>
            absolute conversion은 inline style과 normal flow를 바꾸므로
            component cleanup에서 원래 값을 되돌립니다.
          </p>
        </article>
      </div>
      <table>
        <thead>
          <tr>
            <th>surface</th>
            <th>type</th>
            <th>return</th>
            <th>use</th>
          </tr>
        </thead>
        <tbody>
          {flipFitAbsoluteProperties.map((p) => (
            <tr key={p.name}>
              <th>
                <code>{p.name}</code>
              </th>
              <td>{p.type}</td>
              <td>{p.returnValue}</td>
              <td>{p.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
