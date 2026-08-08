/** path length의 accepted input과 unit boundary를 설명한다. */
export function LengthSection() {
  return (
    <section>
      <h2>01 · 길이는 geometry 단위입니다</h2>
      <p>
        <code>getLength(path)</code>는 path Element, selector/path-data string,
        RawPath를 받고 Number 길이를 반환합니다. SVG viewBox와 CSS pixel을 같은
        값이라고 가정하지 말고, 결과는 해당 geometry 좌표 단위로 읽습니다.
      </p>
    </section>
  )
}
