/** slice 결과와 closed/wrap boundary를 설명한다. */
export function SliceSection() {
  return (
    <section>
      <h2>03 · interval은 새 RawPath입니다</h2>
      <p>
        <code>sliceRawPath(rawPath, start, end)</code>는 선택 interval의 새
        RawPath를 반환합니다. 이 lab은 open curve를 쓰며 closed path의 wrap은
        progress가 끝을 지나 처음으로 이어지는 별도 geometry boundary입니다.
      </p>
    </section>
  )
}
