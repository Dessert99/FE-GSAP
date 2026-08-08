/** SplitText의 aria, fonts, layout, lifecycle 경계를 분명히 남긴다. */
import { toHref } from '../../../../../../app/routes'

/** screen reader와 line measurement가 요구하는 create-time 주의점이다. */
export function AccessibleDomSection() {
  return (
    <section aria-labelledby="split-accessible-dom-title">
      <h2 id="split-accessible-dom-title">
        읽을 수 있는 문장과 측정 가능한 lines
      </h2>
      <p>
        기본 <code>aria: 'auto'</code>는 parent의 text를 aria-label로 남기고 새
        wrapper를 aria-hidden으로 처리해 글자 하나씩 읽히는 일을 줄입니다.
        link처럼 nested semantics가 중요한 text에는 별도 screen-reader-only
        전략이 필요합니다.
      </p>
      <p>
        <code>lines</code>는 font와 width에 따라 달라집니다. 이 lab은{' '}
        <code>document.fonts.ready</code> 뒤에 create하고 <code>autoSplit</code>
        을 켜 reflow를 다시 측정합니다.{' '}
        <a href={toHref('/fundamentals/scramble-text')}>P31 ScrambleText</a>는
        text content를 바꾸는 선행 비교이고, re-split·revert·disposal은 P33
        SplitText lifecycle에서 이어집니다.
      </p>
    </section>
  )
}
