/** removeLabel() 공식 설명·예제 주석과 실제 self 반환의 충돌을 되돌리지 않고 나란히 보존한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function RemoveLabelSection() {
  return (
    <section id="remove-label" className="labels-page__section" aria-labelledby="remove-label-title">
      <SectionHeading number="06" id="remove-label" title="이름 지우기" description="removeLabel()은 label 이름을 지도에서 제거합니다. 이 공식 페이지는 반환값 설명이 서로 충돌하므로 문장·예제·Returns와 실제 실행을 분리해 읽어야 합니다." />
      <pre className="labels-page__signature"><code>{'removeLabel( label:String ) : self'}</code></pre>
      <div className="labels-page__table-wrap"><table className="labels-page__table"><caption>공식 페이지 안의 세 주장</caption><thead><tr><th scope="col">위치</th><th scope="col">공식 내용</th></tr></thead><tbody>
        <tr><th scope="row">설명 문장</th><td>label을 제거하고 <strong>그 label의 시각을 돌려준다</strong>고 적습니다.</td></tr>
        <tr><th scope="row">Returns 절</th><td><code>self</code>, chaining을 쉽게 하기 위한 것이라고 적습니다.</td></tr>
        <tr><th scope="row">예제 주석</th><td><code>tl.removeLabel('myLabel')</code>이 <strong>1.0 같은 label time을 반환</strong>한다고 적습니다.</td></tr>
      </tbody></table></div>
      <div className="labels-page__warning"><h3>GSAP 3.15.0의 실제 반환은 self입니다</h3><p><code>removeLabel('myLabel') === timeline</code>이 true였습니다. label time이 아니라 Returns 절과 signature의 self가 맞고, 공식 설명 문장과 예제 주석이 틀립니다. 공식과 다르게 적힌 이 결과는 실행으로 확인한 의도된 보존 사항이므로 label time 반환으로 되돌리지 않습니다.</p></div>
      <div className="labels-page__note"><p>인자는 제거할 label 이름 String입니다. Details는 <code>remove()</code>로도 같은 일을 할 수 있다고 안내합니다.</p></div>
      <div className="labels-page__note labels-page__note--probe"><p>없는 label을 지워도 오류 없이 self를 돌려주고 labels 객체는 그대로였습니다.</p><p className="labels-page__provenance">GSAP 3.15.0에서 존재하는 이름과 없는 이름 각각에 대해 반환 object identity와 labels 전후를 읽었습니다.</p></div>
    </section>
  )
}
