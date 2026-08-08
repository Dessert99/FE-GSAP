/** autoSplit의 font·resize ordering과 revert/kill disposal 경계를 설명한다. */
/** responsive lines를 다시 나눌 때 animation과 listener를 정리하는 순서를 가르친다. */
export function ResizeBoundarySection() {
  return (
    <section id="resize-font-boundary">
      <h2>02 · line autoSplit은 너비와 font가 안정된 뒤 다시 계산합니다</h2>
      <ol>
        <li>
          <strong>첫 split</strong> — original <code>innerHTML</code>와 original
          aria attributes를 저장한 뒤 temporary wrappers를 만듭니다.
        </li>
        <li>
          <strong>font/resize 대기</strong> — <code>lines</code>와{' '}
          <code>autoSplit: true</code>를 함께 쓸 때 SplitText는 font loading
          완료와 element width 변경을 re-split 신호로 사용합니다.
        </li>
        <li>
          <strong>re-split 전</strong> — old char/word/line wrapper를 target으로
          한 owned animation을 먼저 멈춥니다. 그런 뒤 <code>split()</code>이
          필요하면
          <code>revert()</code>를 거쳐 새 layout을 나눕니다.
        </li>
        <li>
          <strong>dispose</strong> — <code>kill()</code>은 internal resize
          observer와 font listener만 정리합니다. original DOM과 접근성 속성까지
          되돌리려면 <code>revert()</code>를 쓰며, 이것은 <code>kill()</code>도
          호출합니다.
        </li>
      </ol>
      <p>
        selection 또는 focus가 wrapper node에 남아 있다면 re-split 전에 그 UX를
        별도로 설계해야 합니다. 이 lab은 plain text target의 original DOM과 auto
        aria state만 소유하며, external element나 animation을 kill하지 않습니다.
      </p>
    </section>
  )
}
