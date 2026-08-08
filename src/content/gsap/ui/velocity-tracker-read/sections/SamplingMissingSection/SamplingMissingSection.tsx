/** source-verified sampling cadence와 missing lookup의 안전한 읽기 경계를 남긴다. */
export function SamplingMissingSection() {
  return (
    <section id="sampling-missing">
      <p>04 · sampling and missing boundary</p>
      <h2>한 번의 숫자는 최근 sample 변화의 snapshot입니다</h2>
      <p>
        installed 3.15 source는 tracker 값을 약 0.05초 간격으로 갱신하고, 움직임이 없으면 약 0.2초
        뒤 zero로 되돌리는 threshold를 둡니다. 그래서 slider를 움직인 직후와 멈춘 뒤의 snapshot은
        달라집니다.
      </p>
      <div className="velocity-tracker-read-page__warning">
        <h3>missing target에서는 먼저 lookup만 합니다</h3>
        <p>
          이 page는 <code>getByTarget(missingTarget)</code>과 Boolean membership만 표시합니다.
          tracker가 없는 target에 instance <code>get()</code>을 추측해 호출하지 않고, lookup
          result가 있을 때만 velocity를 읽습니다.
        </p>
      </div>
    </section>
  )
}
