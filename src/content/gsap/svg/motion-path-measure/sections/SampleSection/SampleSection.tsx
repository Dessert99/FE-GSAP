/** cached RawPath의 progress sample과 tangent angle을 설명한다. */
export function SampleSection() {
  return (
    <section>
      <h2>02 · position과 tangent를 sample합니다</h2>
      <p>
        <code>getPositionOnPath(rawPath, progress, true)</code>는 x/y와 degree
        angle을 반환합니다. 먼저 <code>cacheRawPathMeasurements()</code>를 한 번
        호출해야 하며, path data가 바뀌면 다시 cache합니다.
      </p>
    </section>
  )
}
