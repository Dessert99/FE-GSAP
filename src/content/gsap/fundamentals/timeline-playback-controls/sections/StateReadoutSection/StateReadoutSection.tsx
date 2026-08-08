/** paused·reversed의 getter/setter와 isActive의 읽기 전용 반환 계약을 비교한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 인자 유무가 반환값을 바꾸는 세 signature를 한눈에 비교한다
const signatures = `paused( value:Boolean ) : [Boolean | self]
reversed( value:Boolean ) : [Boolean | self]
isActive( ) : Boolean`

// getter·setter·읽기 전용 메서드의 반환값과 chaining 가능 여부를 설명한다
const callForms = [
  { call: 'tl.paused()', role: 'getter', returns: 'Boolean', chain: '불가' },
  { call: 'tl.paused(true)', role: 'setter', returns: 'self', chain: '가능' },
  { call: 'tl.reversed()', role: 'getter', returns: 'Boolean', chain: '불가' },
  { call: 'tl.reversed(true)', role: 'setter', returns: 'self', chain: '가능' },
  { call: 'tl.isActive()', role: '읽기 전용 계산', returns: 'Boolean', chain: '불가' },
]

// 공식 getter·setter·toggle 예제를 Timeline 변수명으로 보존한다
const officialCalls = `const paused = tl.paused();
tl.paused(true);
tl.paused(!tl.paused());
tl.paused(true).delay(2).timeScale(0.5);

const reversed = tl.reversed();
tl.reversed(true);
tl.reversed(!tl.reversed());`

export function StateReadoutSection() {
  return (
    <section id="state-readout" className="timeline-playback-page__section" aria-labelledby="state-readout-title">
      <SectionHeading number="04" id="state-readout" title="상태를 읽고 쓰되 active는 계산하기" description="paused()와 reversed()는 인자를 빼면 질문, 넣으면 설정입니다. isActive()는 현재 조건에서 계산한 Boolean만 돌려줍니다." />
      <pre className="timeline-playback-page__signature"><code>{signatures}</code></pre>

      <div className="timeline-playback-page__prose">
        <p><code>paused</code>와 <code>reversed</code>의 value는 Boolean이고 공식 표기 기본값은 <code>false</code>입니다. 인자를 생략하면 현재 값을 읽어 Boolean을 받고, 값을 넘기면 설정한 뒤 Timeline 자신을 받아 chaining할 수 있습니다.</p>
        <p>공식 문서는 멈추거나 재개하는 명령에는 <code>pause()</code>/<code>resume()</code>, 현재 상태 확인과 토글에는 <code>paused()</code>를 쓰라고 권합니다.</p>
      </div>

      <div className="timeline-playback-page__table-wrap">
        <table className="timeline-playback-page__table">
          <caption>괄호 안 값이 반환 형태를 바꾼다</caption>
          <thead><tr><th scope="col">호출</th><th scope="col">역할</th><th scope="col">반환</th><th scope="col">chaining</th></tr></thead>
          <tbody>{callForms.map((form) => <tr key={form.call}><th scope="row"><code>{form.call}</code></th><td>{form.role}</td><td><code>{form.returns}</code></td><td>{form.chain}</td></tr>)}</tbody>
        </table>
      </div>

      <pre className="timeline-playback-page__code"><code>{officialCalls}</code></pre>

      <div className="timeline-playback-page__note">
        <h3>토글은 안에서 읽고 밖에서 씁니다</h3>
        <p><code>tl.paused(!tl.paused())</code>를 안쪽부터 읽으면 getter로 현재 값을 받고, <code>!</code>로 뒤집은 뒤 바깥 setter에 넣습니다. <code>reversed</code>도 같은 형태입니다.</p>
      </div>

      <div className="timeline-playback-page__note timeline-playback-page__probe">
        <h3>isActive에는 setter 얼굴이 없습니다</h3>
        <p><strong>측정 방법</strong> — <code>isActive(true)</code>를 호출하자 인자를 무시하고 그 시점 Boolean만 반환했습니다. 반면 <code>paused(true)</code>, <code>reversed(true)</code>와 pause·play·resume·restart·reverse는 모두 호출한 Timeline과 같은 객체를 반환했습니다.</p>
        <p className="timeline-playback-page__provenance">공식 Timeline 데모 설명은 active 동안 방향 전환 클릭을 막는 예를 들지만 문장에서는 대상을 “tween”과 “box”라고 부릅니다. 이 공식 표현도 catalog에 그대로 보존했습니다.</p>
      </div>
    </section>
  )
}
