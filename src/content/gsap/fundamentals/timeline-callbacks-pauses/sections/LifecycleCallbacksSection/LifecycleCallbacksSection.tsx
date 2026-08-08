/** eventCallback의 getter·setter·삭제·덮어쓰기 계약을 Timeline 생애 이벤트로 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function LifecycleCallbacksSection() {
  return (
    <section id="lifecycle-callbacks" className="schedule-page__section" aria-labelledby="lifecycle-callbacks-title">
      <SectionHeading number="06" id="lifecycle-callbacks" title="Timeline 전체의 생애 콜백 바꾸기" description="시간축 중간의 call과 달리 eventCallback은 Timeline 자체의 시작·갱신·반복·완료 같은 생애 사건을 읽고 바꿉니다." />

      <pre className="schedule-page__signature"><code>eventCallback( type:String, callback:Function, params:Array ) : [Function | self]</code></pre>
      <div className="schedule-page__table-wrap"><table className="schedule-page__table"><caption>eventCallback() 호출 형태</caption><thead><tr><th scope="col">호출</th><th scope="col">역할</th><th scope="col">반환</th></tr></thead><tbody>
        <tr><th scope="row"><code>eventCallback(type)</code></th><td>현재 callback 읽기</td><td>Function 또는 미등록 값</td></tr>
        <tr><th scope="row"><code>eventCallback(type, fn, params)</code></th><td>callback 설정</td><td>self</td></tr>
        <tr><th scope="row"><code>eventCallback(type, null)</code></th><td>callback 삭제</td><td>self</td></tr>
      </tbody></table></div>

      <div className="schedule-page__prose">
        <p><code>type</code>은 대소문자를 구분하며 공식 본문은 <code>onComplete</code>, <code>onUpdate</code>, <code>onStart</code>, <code>onReverseComplete</code>, <code>onInterrupt</code>, <code>onRepeat</code>를 나열합니다. callback과 params의 기본값은 <code>null</code>입니다.</p>
        <p>생성자 vars에 처음부터 적는 것과 기능상 같습니다. 차이는 instance를 만든 뒤에도 callback을 설정·조회·삭제할 수 있다는 점입니다. event type마다 자리는 하나뿐이라 새 callback은 이전 것을 덮어쓰고 값은 vars 객체에도 채워집니다.</p>
      </div>

      <pre className="schedule-page__code"><code>{`const tween = gsap.to(object, {
  duration: 1,
  x: 100,
  onComplete: myFunction,
  onCompleteParams: ['param1', 'param2'],
})

tween.eventCallback('onComplete', myFunction, ['param1', 'param2'])

timeline.eventCallback('onComplete', completeHandler)
  .eventCallback('onUpdate', updateHandler, ['param1'])
  .play(1)

timeline.eventCallback('onUpdate', null)`}</code></pre>

      <div className="schedule-page__note schedule-page__note--probe"><h3>미등록 getter는 undefined</h3><p>등록하지 않은 type, 대소문자가 틀린 type, null로 지운 type의 getter는 모두 <code>undefined</code>였습니다. setter는 Timeline 자신을 돌려줬고 vars에 둔 callback도 getter로 읽혔습니다.</p></div>
    </section>
  )
}
