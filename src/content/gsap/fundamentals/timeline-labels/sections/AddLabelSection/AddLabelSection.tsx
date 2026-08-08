/** addLabel()의 인자·기본 위치·self 반환과 같은 이름을 다시 붙일 때의 동작을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function AddLabelSection() {
  return (
    <section id="add-label" className="labels-page__section" aria-labelledby="add-label-title">
      <SectionHeading number="02" id="add-label" title="이름 붙이기" description="addLabel()은 중요한 local time에 문자열 이름을 붙이고 Timeline 자신을 돌려줘 체이닝을 이어 갑니다." />
      <pre className="labels-page__signature"><code>{'addLabel( label:String, position:[Number | String] ) : self'}</code></pre>
      <div className="labels-page__table-wrap"><table className="labels-page__table"><caption>공식 Parameters와 Returns</caption><thead><tr><th scope="col">인자</th><th scope="col">타입</th><th scope="col">기본값</th><th scope="col">뜻</th></tr></thead><tbody>
        <tr><th scope="row"><code>label</code></th><td>String</td><td>명시 없음</td><td>붙일 label의 이름입니다.</td></tr>
        <tr><th scope="row"><code>position</code></th><td>[Number | String]</td><td><code>"+=0"</code></td><td>Timeline 안 삽입 지점이며 기본값은 끝입니다.</td></tr>
        <tr><th scope="row">Returns</th><td colSpan={2}><code>self</code></td><td>체이닝을 쉽게 하려고 Timeline 자신을 돌려줍니다.</td></tr>
      </tbody></table></div>
      <div className="labels-page__split">
        <div className="labels-page__prose"><p>공식은 label이 <strong>중요한 위치·시각을 표시하기 쉽게</strong> 한다고 설명합니다. position을 생략하면 그 순간 Timeline 끝에 붙습니다.</p><pre className="labels-page__code"><code>{`timeline
  .addLabel('intro')
  .to('.card', { x: 100 })
  .addLabel('outro')`}</code></pre></div>
        <div className="labels-page__prose"><p>붙인 이름은 <code>seek('myLabel')</code>, <code>add(myTween, 'myLabel')</code>, <code>reverse('myLabel')</code>처럼 다른 메서드의 position으로 참조합니다.</p><p><code>timeline.add('myLabel', 2)</code>로도 label을 삽입할 수 있습니다.</p></div>
      </div>
      <div className="labels-page__note"><p>공식 Parameters 설명은 position에 아직 존재하지 않는 label 이름을 쓰면 그 기준 label도 Timeline 끝에 자동으로 추가된다고 밝힙니다. 새 label 역시 그 끝 시각에 놓이므로 오타가 오류 없이 새 이름 두 개로 남을 수 있습니다.</p></div>
      <div className="labels-page__note labels-page__note--probe"><h3>생략·self·같은 이름 덮어쓰기</h3><p>GSAP 3.15.0에서 <code>addLabel()</code>은 실제로 self를 돌려줬고, position 생략 시 당시 duration 2·3초에 붙었습니다. 같은 이름 <code>dup</code>을 1초 뒤 4초에 다시 붙이면 key는 하나이고 값만 4로 바뀌었습니다.</p><p className="labels-page__provenance">공식은 self와 기본 끝 배치를 밝히지만 같은 이름의 overwrite 동작은 밝히지 않아 object identity·labels key/value를 직접 읽었습니다.</p></div>
    </section>
  )
}
