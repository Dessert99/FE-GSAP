/** add()의 인자·기본값·반환값과 "인자를 생략하면 끝에 붙는다"는 기본 배치 규칙을 먼저 못 박는다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 Parameters·Returns 절을 표기 그대로 옮긴 명세 — position의 기본값 "+=0"이 다음 섹션의 출발점이다
const specification = [
  {
    id: 'child',
    name: 'child',
    type: '[Tween | Timeline | Label | Callback | Array]',
    fallback: '공식 페이지에 명시 없음',
    meaning: '넣을 대상입니다. Tween 하나, Timeline 하나, label 문자열, callback 함수, 그리고 그것들의 배열을 모두 받습니다.',
  },
  {
    id: 'position',
    name: 'position',
    type: '[Number | String | Label]',
    fallback: '"+=0"',
    meaning: '부모 시간축의 어디에 넣을지를 정합니다. 공식 표현으로는 "timeline 안의 삽입 지점을 제어한다"입니다.',
  },
]

// 네 가지 child 종류가 실제로 무엇이 되는지 — 공식은 한 줄로 묶어 적지만 결과가 서로 다르다
const childKinds = [
  {
    id: 'tween',
    kind: 'Tween',
    call: 'tl.add(myTween, 1)',
    result: 'child 하나가 늘어납니다. recent()가 이 tween을 가리킵니다.',
  },
  {
    id: 'timeline',
    kind: 'Timeline',
    call: 'tl.add(myTimeline, 1)',
    result: 'child 하나가 늘어나고, 그 Timeline의 parent가 tl로 바뀝니다(01 섹션).',
  },
  {
    id: 'callback',
    kind: 'Callback(함수)',
    call: 'tl.add(() => {}, 3)',
    result: 'duration이 0인 Tween child가 만들어져 들어갑니다. playhead가 그 시각을 한 번 통과할 때마다 호출됩니다.',
  },
  {
    id: 'label',
    kind: 'Label(문자열)',
    call: 'tl.add("myLabel", 3)',
    result: 'child가 늘어나지 않습니다. labels 맵에 이름과 시각만 기록됩니다.',
  },
  {
    id: 'array',
    kind: 'Array',
    call: 'tl.add([a, b], 2)',
    result: '배열의 모든 항목이 같은 position에 겹쳐 놓입니다. 차례로 이어 붙지 않습니다.',
  },
]

export function AddSignatureSection() {
  return (
    <section id="add-signature" className="placement-page__section" aria-labelledby="add-signature-title">
      <SectionHeading
        number="02"
        id="add-signature"
        title="add()가 받는 것과 돌려주는 것"
        description="position의 표기법은 종류가 많아서 다음 섹션 하나를 통째로 씁니다. 그 전에 add() 자체의 계약 — 무엇을 받고, 아무것도 지정하지 않으면 어디에 놓고, 무엇을 돌려주는지 — 를 먼저 확정합니다."
      />

      <div className="placement-page__prose">
        <p>
          공식 signature는 이렇습니다. 인자는 두 개이고, 반환값은 <code>self</code>입니다.
        </p>
      </div>

      <pre className="placement-page__code">
        <code>{'add( child:[Tween | Timeline | Label | Callback | Array], position:[Number | String | Label] ) : self'}</code>
      </pre>

      <div className="placement-page__table-wrap">
        <table className="placement-page__rules-table">
          <caption>공식 Parameters 절 그대로</caption>
          <thead>
            <tr>
              <th scope="col">인자</th>
              <th scope="col">타입</th>
              <th scope="col">기본값</th>
              <th scope="col">역할</th>
            </tr>
          </thead>
          <tbody>
            {specification.map((entry) => (
              <tr key={entry.id}>
                <th scope="row">
                  <code>{entry.name}</code>
                </th>
                <td>
                  <code>{entry.type}</code>
                </td>
                <td>
                  <code>{entry.fallback}</code>
                </td>
                <td>{entry.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="placement-page__note">
        <h3>반환값이 self인 이유를 공식이 밝혀 뒀습니다</h3>
        <p>
          공식 <code>Returns</code> 절은 <code>self</code>이고, 괄호에 이유가 적혀 있습니다 — <strong>"체이닝을 쉽게 하기
          위해서"</strong>. 그래서 <code>tl.add(a, 0).add(b, 1).add(c, 2)</code>처럼 이어 쓸 수 있습니다. <code>add()</code>는 넣은
          child를 돌려주지 <strong>않습니다.</strong> 방금 넣은 child가 필요하면 04 섹션의 <code>recent()</code>를 씁니다.
        </p>
      </div>

      <div className="placement-page__subheading">
        <h3>한 메서드가 네 종류를 다 받습니다</h3>
        <p>
          공식 설명문은 <strong>"tween, timeline, callback, 또는 label(또는 그것들의 배열)을 timeline에 추가한다"</strong>입니다. 종류마다
          결과가 조금씩 다릅니다.
        </p>
      </div>

      <div className="placement-page__table-wrap">
        <table className="placement-page__rules-table">
          <caption>child 자리에 넣을 수 있는 다섯 가지</caption>
          <thead>
            <tr>
              <th scope="col">종류</th>
              <th scope="col">호출 모양</th>
              <th scope="col">실제로 일어나는 일</th>
            </tr>
          </thead>
          <tbody>
            {childKinds.map((entry) => (
              <tr key={entry.id}>
                <th scope="row">{entry.kind}</th>
                <td>
                  <code>{entry.call}</code>
                </td>
                <td>{entry.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="placement-page__note placement-page__note--probe">
        <h3>위 표에서 공식이 적지 않은 세 줄</h3>
        <p>
          공식은 네 종류를 <strong>한 문장으로 묶어</strong> 적을 뿐, 종류마다 결과가 다르다는 말은 하지 않습니다. 실행해서 확인한 차이는
          이렇습니다.
        </p>
        <ul className="placement-page__list">
          <li>
            <strong>callback</strong> — <code>tl.add(fn, 3)</code> 뒤 child 수가 하나 늘고, 그 child의 <code>duration()</code>은{' '}
            <code>0</code>이었습니다. 즉 함수는 <strong>길이 0짜리 Tween으로 감싸여</strong> 들어갑니다.
          </li>
          <li>
            <strong>label</strong> — <code>tl.add("myLabel", 3)</code> 뒤 <code>tl.labels</code>는{' '}
            <code>{'{ myLabel: 3 }'}</code>이 되지만 <code>recent()</code>는 여전히 <code>undefined</code>였습니다. label은 child가
            아닙니다.
          </li>
          <li>
            <strong>배열</strong> — <code>tl.add([a, b], 2)</code> 뒤 두 tween의 <code>startTime()</code>이 <strong>둘 다 2</strong>
            였습니다. 배열은 순서대로 이어 붙는 게 아니라 <strong>같은 자리에 겹쳐</strong> 놓입니다. 그리고{' '}
            <code>recent()</code>는 배열의 마지막 항목을 가리켰습니다.
          </li>
        </ul>
        <p className="placement-page__provenance">
          공식 페이지에 없는 내용입니다. GSAP 3.15.0에서 각각 <code>gsap.timeline(&#123;paused:true&#125;)</code>에 위 호출을 한 뒤{' '}
          <code>getChildren(false).length</code>, <code>duration()</code>, <code>labels</code>, <code>startTime()</code>,{' '}
          <code>recent()</code>를 읽었습니다.
        </p>
      </div>

      <div className="placement-page__subheading">
        <h3>position을 생략하면 어디로 갈까요</h3>
        <p>
          이것이 <code>add()</code>에서 가장 자주 쓰이는 경우입니다. 공식 문장은 명확합니다.
        </p>
      </div>

      <div className="placement-page__split">
        <div className="placement-page__prose">
          <p>
            <strong>"기본적으로 animation은 timeline의 끝에 추가되어 서로 차례차례 이어진다. 하지만 position 파라미터로 어디에 놓일지
            정확히 제어할 수 있다."</strong>
          </p>
          <p>
            이 한 문장이 Timeline의 기본 성격입니다. 아무 생각 없이 <code>tl.to(...)</code>를 여러 번 부르면 <strong>순차 재생</strong>이
            되는 이유가 여기 있습니다. 겹치게 하려면 <strong>따로 요구해야</strong> 합니다.
          </p>
        </div>
        <div className="placement-page__prose">
          <p>
            그런데 <code>position</code>의 기본값은 <code>0</code>이 아니라 <code>"+=0"</code>입니다. 문자열입니다.
          </p>
          <p>
            <code>"+="</code>는 다음 섹션에서 배울 <strong>상대 표기</strong>이고, 기준은 <strong>timeline의 끝</strong>입니다. 그러니{' '}
            <code>"+=0"</code>은 <strong>"끝에서 0초 뒤" = "끝에 딱 붙여서"</strong>라는 뜻입니다. 기본값 표기 자체가 위 문장을 그대로
            옮긴 것입니다.
          </p>
        </div>
      </div>

      <div className="placement-page__note placement-page__note--probe">
        <h3>기본값을 실행으로 확인하면</h3>
        <p>
          공식은 기본값이 <code>"+=0"</code>이라고 적어 둘 뿐, <strong>인자를 아예 생략했을 때의 결과를 따로 보이지는 않습니다.</strong>{' '}
          duration 2짜리 tween 하나만 들어 있는 timeline(끝 = 2초)에 두 번째 child를 넣어 봤습니다.
        </p>
        <p>
          <code>tl.add(child)</code> — position 생략 → <code>startTime()</code>은 <strong>2</strong>.<br />
          <code>tl.add(child, "+=0")</code> — 기본값 명시 → <code>startTime()</code>도 <strong>2</strong>.
        </p>
        <p className="placement-page__provenance">
          공식 페이지에 없는 내용입니다. GSAP 3.15.0에서 <code>gsap.timeline(&#123;paused:true&#125;)</code>에 duration 2인 tween을{' '}
          <code>0</code>에 넣어 끝을 2초로 만든 뒤, 두 번째 child를 위 두 방식으로 넣고 <code>startTime()</code>을 읽었습니다. 같은
          fixture의 전체 표기별 결과는 <a href="#position-syntax">03 섹션</a>에 있습니다.
        </p>
      </div>

      <div className="placement-page__warning">
        <h3>"유연한 문법"이라는 예고</h3>
        <p>
          공식 문서는 기본 배치를 설명한 직후 <strong>"다음과 같은 선택지를 가진 유연한 문법을 사용한다"</strong>고 적고 표기법 목록을
          펼칩니다. 즉 <code>position</code>은 숫자 하나가 아니라 <strong>여러 표기법을 받는 작은 언어</strong>입니다. 다음 섹션이 그
          목록 전체입니다.
        </p>
      </div>
    </section>
  )
}
