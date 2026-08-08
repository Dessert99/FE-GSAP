/** remove와 clear를 container를 보존하는 두 단계의 구조 편집으로 비교한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 두 메서드의 공식 signature·인자·반환을 한눈에 비교한다
const methodRows = [
  ['remove(value)', '[Tween | Timeline | Callback | Label]', '—', 'self'],
  ['clear(labels)', 'Boolean', 'true', 'self'],
] as const

export function RemoveClearSection() {
  return (
    <section id="remove-clear" className="tl-cleanup-page__section" aria-labelledby="remove-clear-title">
      <SectionHeading number="02" id="remove-clear" title="하나를 떼거나 container만 비운다" description="remove는 고른 항목만 떼고 clear는 내용 전체를 비웁니다. 둘 다 Timeline instance 자체와 target의 현재 화면을 남깁니다." />
      <div className="tl-cleanup-page__split">
        <article className="tl-cleanup-page__prose">
          <h3><code>remove()</code> — 한 항목 또는 배열</h3>
          <p>Tween, 중첩 Timeline, callback, label을 하나씩 또는 배열로 넘깁니다. 공식 예제처럼 <code>tl.remove(myTween)</code>으로 하나만 떼거나 <code>tl.remove([myTween, mySubTimeline, 'myLabel'])</code>로 섞어 지울 수 있습니다.</p>
          <p>반환값은 <code>self</code>입니다. remove는 child를 kill하거나 target을 되돌린다고 말하지 않습니다. 실행 probe에서도 분리된 child의 현재 progress와 target 값은 그대로였습니다.</p>
        </article>
        <article className="tl-cleanup-page__prose">
          <h3><code>clear()</code> — 내용 전체</h3>
          <p>모든 child Tween·Timeline·callback을 비웁니다. <code>labels</code>는 Boolean이고 기본값 <code>true</code>라서 <code>clear()</code>는 label도 지우며, <code>clear(false)</code>만 label map을 남깁니다.</p>
          <p>Timeline의 <code>onComplete</code>·<code>onUpdate</code>·<code>onStart</code> 같은 <strong>event callback은 child callback과 달리 남습니다.</strong> 없애려면 <code>eventCallback('onComplete', null)</code>을 따로 호출합니다.</p>
        </article>
      </div>
      <div className="tl-cleanup-page__table-wrap tl-cleanup-page__table-wrap--spaced">
        <table className="tl-cleanup-page__table"><caption>공식 인자와 반환 계약</caption><thead><tr><th scope="col">signature</th><th scope="col">인자 타입</th><th scope="col">기본값</th><th scope="col">반환</th></tr></thead><tbody>{methodRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell} scope="row"><code>{cell}</code></th> : <td key={cell}><code>{cell}</code></td>)}</tr>)}</tbody></table>
      </div>
      <p className="tl-cleanup-page__warning"><strong>비운다는 말은 화면 복원이 아닙니다.</strong> 중간 progress에서 remove나 clear를 실행하면 GSAP이 이미 element에 쓴 transform·opacity inline style은 그대로 남습니다. 원래 CSS로 돌려야 한다면 뒤의 <code>revert()</code>가 답입니다.</p>
    </section>
  )
}
