/** 같은 descriptor로 icon, winding diagram, code와 관찰 snapshot을 표시한다. */
import { useIconMorphAnimation } from './useIconMorphAnimation'

export function IconMorphLab() {
  // runtime hook의 실제 descriptor와 완료 snapshot을 화면에 연결한다
  const { scope, pathRef, descriptor, snapshot, setType, morph, restore } =
    useIconMorphAnimation()
  // 코드 패널은 실행 descriptor를 MorphSVG 문법으로만 직렬화한다
  const code = `gsap.to(path, { duration: ${descriptor.duration}, morphSVG: { shape: starPath, map: '${descriptor.map}', shapeIndex: '${descriptor.shapeIndex}', type: '${descriptor.type}', origin: '${descriptor.origin}' } })`
  return (
    <section className="icon-morph-lab" aria-labelledby="icon-morph-title">
      <h2 id="icon-morph-title">한 icon에서 point 순서를 읽어 봅니다</h2>
      <p>
        diamond와 star는 closed path입니다. <code>shapeIndex: 'auto'</code>가
        point 시작점을 맞추고 type이 winding 보간 방식을 고릅니다.
      </p>
      <div ref={scope} className="icon-morph-lab__stage">
        <svg
          viewBox="0 0 100 100"
          role="img"
          aria-label={`${snapshot.current} icon`}
        >
          <path ref={pathRef} d="M50 8 L90 50 L50 92 L10 50 Z" />
        </svg>
        <ol aria-label="point mapping">
          <li>1 → 1</li>
          <li>2 → 2</li>
          <li>3 → 3</li>
          <li>4 → 4</li>
        </ol>
      </div>
      <div className="icon-morph-lab__controls">
        <label>
          interpolation{' '}
          <select
            value={descriptor.type}
            onChange={(event) =>
              setType(event.target.value as typeof descriptor.type)
            }
          >
            <option value="linear">linear</option>
            <option value="rotational">rotational</option>
          </select>
        </label>
        <button type="button" onClick={morph}>
          morph to star
        </button>
        <button type="button" onClick={restore}>
          restore original d
        </button>
      </div>
      <p aria-live="polite">
        {snapshot.note} restored: {String(snapshot.originalRestored)}
      </p>
      <pre>
        <code>{code}</code>
      </pre>
      <div className="icon-morph-lab__panels">
        <p>
          <strong>호환성</strong> path/polygon/polyline만 직접 morph합니다.
          primitive conversion은 P19의 소유입니다.
        </p>
        <p>
          <strong>defaults/hooks</strong>{' '}
          defaultRender/defaultType/defaultUpdateTarget은 전역값입니다. 이 lab은
          변경하지 않아 restore 대상도 만들지 않습니다.
        </p>
        <p>
          <strong>target replacement</strong> convertToPath은 DOM element를
          path로 교체할 수 있으므로 stale ref를 피해야 합니다.
        </p>
      </div>
    </section>
  )
}
