/** DOM·RawPath·serialized path data를 정적으로 대조하는 converter UI다. */
import { useGeometryConverter } from './useGeometryConverter'

export function GeometryConverter() {
  // runtime의 실제 DOM·RawPath·string 반환값을 converter UI에 연결한다
  const { scope, hostRef, descriptor, snapshot, convert, restoreOriginal } =
    useGeometryConverter()
  // 표시 코드는 convert가 반환한 path d를 다음 두 utility에 넘기는 실제 순서를 직렬화한다
  const code = `const paths = MorphSVGPlugin.convertToPath(${descriptor.sourceTag}, ${descriptor.swap})\nconst convertedD = paths[0].getAttribute('d')\nconst raw = MorphSVGPlugin.stringToRawPath(convertedD)\nconst d = MorphSVGPlugin.rawPathToString(raw)`
  return (
    <section
      className="geometry-converter"
      aria-labelledby="geometry-converter-title"
    >
      <h2 id="geometry-converter-title">rect를 path와 RawPath로 읽습니다</h2>
      <p>
        P18의 morph는 전제 지식이고, 이 예제는 tween 없이 변환 결과만 읽습니다.
      </p>
      <div ref={scope} className="geometry-converter__preview">
        <svg viewBox="0 0 100 100" role="img" aria-label="conversion source">
          <g ref={hostRef} />
        </svg>
      </div>
      <div className="geometry-converter__controls">
        <button type="button" onClick={convert}>
          convert and serialize
        </button>
        <button type="button" onClick={restoreOriginal}>
          restore original rect
        </button>
      </div>
      <p aria-live="polite">{snapshot.status}</p>
      <dl>
        <div>
          <dt>converted d</dt>
          <dd>
            <code>{snapshot.convertedD || '아직 없음'}</code>
          </dd>
        </div>
        <div>
          <dt>serialized d</dt>
          <dd>
            <code>{snapshot.serialized || '아직 없음'}</code>
          </dd>
        </div>
      </dl>
      <table>
        <caption>RawPath numeric segments</caption>
        <thead>
          <tr>
            <th>segment</th>
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
                convert and serialize를 눌러 RawPath를 읽으세요.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <pre>
        <code>{code}</code>
      </pre>
      <p>
        문서가 malformed path string의 오류 동작을 정하지 않으므로 입력 검증
        결과를 이 페이지가 단정하지 않습니다. Motion은 none입니다.
      </p>
    </section>
  )
}
