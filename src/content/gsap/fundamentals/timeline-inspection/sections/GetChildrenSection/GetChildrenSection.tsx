/** getChildren의 네 인자와 공식 예제의 실제 결과 차이를 interactive tree에 연결한다. */
import { ChildQueryLab } from '../../examples/ChildQueryLab/ChildQueryLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function GetChildrenSection() {
  return (
    <section id="get-children" className="inspect-page__section" aria-labelledby="get-children-title">
      <SectionHeading number="02" id="get-children" title="네 개의 인자로 목록을 좁힌다" description="nested는 탐색 깊이, tweens와 timelines는 결과 종류, ignoreBeforeTime은 직계 child의 시작 시각을 거르는 조건이다." />
      <pre className="inspect-page__signature"><code>getChildren(nested:Boolean, tweens:Boolean, timelines:Boolean, ignoreBeforeTime:Number) : Array</code></pre>
      <div className="inspect-page__table-wrap"><table className="inspect-page__table"><caption>공식 예제 주석과 GSAP 3.15.0 실행 대조</caption><thead><tr><th>호출</th><th>공식 주석</th><th>실행</th></tr></thead><tbody>
        <tr><th><code>getChildren(false, true, true)</code></th><td>3개</td><td><strong>4개</strong> · 직계 Tween 3 + Timeline 1</td></tr>
        <tr><th><code>getChildren(true, true, true, 0.5)</code></th><td>5개</td><td>5개</td></tr>
        <tr><th><code>getChildren(true, true, false)</code></th><td>5개</td><td>5개 · 중첩 Tween 포함</td></tr>
      </tbody></table></div>
      <div className="inspect-page__warning"><strong>공식 첫 주석은 계산이 틀립니다.</strong><p>공식 코드에는 master 직계 Tween이 세 개이고 nested Timeline도 하나라 첫 결과는 3이 아니라 4입니다. 페이지에서는 원문과 실행값을 둘 다 보존합니다.</p></div>
      <ChildQueryLab />
      <div className="inspect-page__probe-grid">
        <article><h3><code>ignoreBeforeTime</code> 범위</h3><p>공식 기본 표기는 <code>-Infinity</code>지만 내부 기본값은 <code>-1e8</code>이었습니다. 또 이 필터는 직계 child에만 적용되고 손자까지 전달되지 않습니다.</p></article>
        <article><h3><code>timelines: false</code>의 뜻</h3><p>Timeline 객체를 결과에서 뺄 뿐 재귀 탐색을 멈추지 않습니다. <code>nested: true</code>면 그 안의 Tween은 남습니다.</p></article>
      </div>
    </section>
  )
}
