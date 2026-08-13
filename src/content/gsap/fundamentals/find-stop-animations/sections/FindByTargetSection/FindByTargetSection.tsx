/** target 기준 조회와 활성 여부 조회의 질문이 서로 다르다는 것을 표·공식 예제·실행 예제로 구분한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { TweenRegistryLab } from '../../examples/TweenRegistryLab/TweenRegistryLab'

// 공식 getTweensOf 페이지의 예제 원문 — 개수 주석까지 그대로 옮겼다
const tweensOfCall = `gsap.to(obj1, { x: 100 });
gsap.to(obj2, { x: 100 });
gsap.to([obj1, obj2], { opacity: 0 });
var a1 = gsap.getTweensOf(obj1); //finds 2 tweens
var a2 = gsap.getTweensOf([obj1, obj2]); //finds 3 tweens`

// 공식 isTweening 페이지의 예제 원문 — 조건문 가드 형태다
const isTweeningCall = `if (!gsap.isTweening("#id")) {
  // do stuff
}`

// 세 조회가 각각 어떤 질문을 하고 무엇을 돌려주는지 한 표에서 대조한다
const queryRows = [
  {
    api: 'gsap.getById(id)',
    question: '이 id에 연결된 animation이 아직 있나요?',
    returns: 'Tween 또는 Timeline · 없으면 undefined',
    blind: '완료된 animation, id를 붙이지 않은 animation',
  },
  {
    api: 'gsap.getTweensOf(target)',
    question: '이 target을 건드리는 tween이 몇 개 있나요?',
    returns: 'Array',
    blind: '이미 garbage collection으로 넘어간 tween',
  },
  {
    api: 'gsap.isTweening(target)',
    question: '이 target이 지금 실제로 움직이는 중인가요?',
    returns: 'Boolean',
    blind: 'paused · completed · 아직 시작 전인 tween은 전부 false',
  },
]

export function FindByTargetSection() {
  return (
    <section id="find-by-target" className="find-stop-page__section" aria-labelledby="find-by-target-title">
      <SectionHeading
        number="03"
        id="find-by-target"
        title="id가 없으면 target으로 찾는다"
        description="id를 미리 붙이지 않았어도 target으로 조회할 수 있습니다. 다만 '등록돼 있느냐'와 '지금 animate 중이냐'는 다른 질문입니다."
      />

      <div className="find-stop-page__split">
        <div className="find-stop-page__prose">
          <p>
            <code>gsap.getTweensOf()</code>는 공식 문서의 표현으로{' '}
            <strong>"특정 target(또는 target 그룹)의 tween을 모두 담은 array"</strong>를 돌려줍니다. id가 아니라{' '}
            <strong>대상</strong>이 단서입니다.
          </p>
          <p>
            대상은 element나 object를 그대로 넘겨도 되고, <code>gsap.getTweensOf(&quot;.myClass&quot;)</code>처럼{' '}
            <strong>selector text</strong>를 넘겨도 됩니다. 공식 문서가 두 방식을 모두 적어 두었습니다.
          </p>
          <p>
            오른쪽 공식 예제를 세어 보세요. <code>obj1</code>을 건드리는 tween은 <strong>2개</strong>(자기 것 하나 + 둘을 함께 움직이는
            것 하나), <code>[obj1, obj2]</code>로 물으면 <strong>3개</strong>입니다. <strong>target 하나가 여러 Tween에 동시에
            잡혀 있을 수 있다</strong>는 뜻입니다.
          </p>
        </div>
        <pre className="find-stop-page__code">
          <code>{tweensOfCall}</code>
        </pre>
      </div>

      <div className="find-stop-page__warning">
        <h3>여기에도 같은 시간 제한이 있습니다</h3>
        <p>
          공식 문서는 <strong>"아직 garbage collection으로 넘어가지 않은 tween"</strong>만 담긴다고 밝히고, 그 시점은{' '}
          <strong>보통 tween이 완료될 때</strong>라고 덧붙입니다. 따라서 tween이 완료되고 시간이 지난 뒤에는 GSAP이 이미 garbage
          collection 대상으로 넘겨 조회되지 않을 수 있습니다.
        </p>
        <p>
          이것을 단점으로 적어 두지 않았다는 점이 중요합니다. 공식 문서의 문장은{' '}
          <strong>"GSAP이 garbage collection을 대신 처리해 주기 때문에 tween을 하나씩 수동으로 폐기하지 않아도 된다"</strong>입니다.
          조회에 걸리지 않는 것은 이미 정리가 끝났다는 신호입니다.
        </p>
      </div>

      <div className="find-stop-page__subheading">
        <h3>&quot;있다&quot;와 &quot;움직인다&quot;는 다른 질문입니다</h3>
        <p>
          <code>gsap.isTweening()</code>은 공식 표현으로 <strong>"특정 object가 지금 실제로 animate 중인지"</strong>만 Boolean으로
          알려 줍니다. target에는 <strong>selector text나 object/element</strong>를 줄 수 있습니다.
        </p>
      </div>

      <div className="find-stop-page__split">
        <div className="find-stop-page__prose">
          <p>
            핵심은 공식 문서의 이 한 문장입니다. <strong>"tween이 paused이거나 completed이거나 아직 시작하지 않았으면 active로 치지
            않는다."</strong>
          </p>
          <p>
            즉 <code>isTweening</code>이 <code>false</code>라고 해서 <strong>Tween이 없다는 뜻이 아닙니다.</strong> 잠시 멈춰 있거나
            <code>delay</code>를 기다리는 중일 수도 있습니다.
          </p>
          <p>
            공식 예제는 이 값을 <strong>조건문의 가드</strong>로 씁니다. "지금 움직이는 중이 아니면 그때만 뭔가 한다"는 형태입니다.
          </p>
        </div>
        <pre className="find-stop-page__code">
          <code>{isTweeningCall}</code>
        </pre>
      </div>

      <div className="find-stop-page__table-wrap">
        <table className="find-stop-page__scope-table">
          <caption>세 조회는 서로 다른 질문을 합니다 — 답이 다른 것은 당연합니다</caption>
          <thead>
            <tr>
              <th scope="col">조회</th>
              <th scope="col">묻는 것</th>
              <th scope="col">돌려주는 값</th>
              <th scope="col">이 조회로는 못 찾는 것</th>
            </tr>
          </thead>
          <tbody>
            {queryRows.map((row) => (
              <tr key={row.api}>
                <th scope="row">
                  <code>{row.api}</code>
                </th>
                <td>{row.question}</td>
                <td>{row.returns}</td>
                <td>{row.blind}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="find-stop-page__note">
        <h3>인자 명세는 두 페이지 모두에 없습니다</h3>
        <p>
          <code>gsap.getTweensOf()</code>와 <code>gsap.isTweening()</code> 공식 페이지에는 <strong>Parameters 절이 없습니다.</strong>{' '}
          인자의 개수와 타입은 <strong>공식 페이지에 명시 없음</strong>으로 둡니다. 확인할 수 있는 것은 예제와 본문이 밝힌 target의
          형태뿐입니다.
        </p>
      </div>

      <div className="find-stop-page__note find-stop-page__note--probe">
        <h3>공식 문서에 없는 동작 하나 — 일시정지한 Tween은 어떻게 잡힐까요?</h3>
        <p>
          공식 문서는 세 조회의 관계를 함께 설명하지 않습니다. GSAP 3.15.0을 직접 실행해 확인한 결과,{' '}
          <code>pause()</code>한 Tween은 <code>getById()</code>와 <code>getTweensOf()</code>에는{' '}
          <strong>그대로 잡히지만</strong> <code>isTweening()</code>만 <code>false</code>가 됩니다.
        </p>
        <p className="find-stop-page__provenance">
          측정 방법 · <code>{"gsap.to(o, { v: 100, duration: 1, ease: 'none', id: 'paused-one' })"}</code>를 만들어{' '}
          <code>progress(0.5)</code> 뒤 <code>pause()</code>하고 세 조회를 한 번에 실행했습니다. 결과는{' '}
          <code>getById 일치 true · getTweensOf 1개 · isTweening false</code>였고, 이어서 <code>play()</code>하니{' '}
          <code>isTweening</code>만 <code>true</code>로 바뀌었습니다.
        </p>
      </div>

      <TweenRegistryLab />
    </section>
  )
}
