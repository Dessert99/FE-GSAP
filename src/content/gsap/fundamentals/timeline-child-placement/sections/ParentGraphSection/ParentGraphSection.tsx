/** 배치를 배우기 전에 "좌표가 누구를 기준으로 한 것인가"를 parent 속성 하나로 먼저 세운다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 이 페이지 전체에서 반복해 쓰는 용어를 첫 섹션에서 사용 전에 정의한다
const glossary = [
  {
    id: 'timeline',
    term: 'Timeline',
    meaning: '여러 animation을 담고 각각에게 "몇 초에 시작하라"는 좌표를 배정하는 시간축입니다. 자신도 하나의 animation입니다.',
  },
  {
    id: 'child',
    term: 'child(자식)',
    meaning: 'Timeline 안에 놓인 Tween·Timeline·callback 하나하나입니다. 공식 문서가 child라고 부르는 대상이 이것입니다.',
  },
  {
    id: 'parent',
    term: 'parent(부모)',
    meaning: '그 child를 담고 있는 Timeline입니다. 어떤 animation의 시작 좌표는 언제나 이 부모의 시간축 위에서 잰 값입니다.',
  },
  {
    id: 'start-time',
    term: 'startTime',
    meaning: '부모 시간축 위에서 이 child가 시작하는 시각(초)입니다. 이 페이지가 말하는 "자리"와 "좌표"는 전부 이 값입니다.',
  },
  {
    id: 'playhead',
    term: '재생 헤드(playhead)',
    meaning: '지금 timeline이 몇 초를 재생 중인지 가리키는 바늘입니다. 06 섹션에서 이 바늘의 위치가 핵심이 됩니다.',
  },
  {
    id: 'global-timeline',
    term: 'gsap.globalTimeline',
    meaning: 'GSAP이 만들어 두는 단 하나의 최상위 Timeline입니다. 내가 만든 어떤 Timeline에도 속하지 않은 animation이 여기에 놓입니다.',
  },
]

// parent 문서가 본문에서 연결하는 관련 페이지 — 이 페이지가 어디까지 설명하는지의 경계이기도 하다
const relatedOfficial = [
  { id: 'timeline', label: 'Timeline', href: 'https://gsap.com/docs/v3/GSAP/Timeline', role: 'Timeline 클래스 전체' },
  { id: 'global', label: 'gsap.globalTimeline', href: 'https://gsap.com/docs/v3/GSAP/gsap.globalTimeline', role: '최상위 timeline 자체' },
  { id: 'tween', label: 'Tween', href: 'https://gsap.com/docs/v3/GSAP/Tween', role: 'child가 되는 animation' },
  { id: 'add', label: 'add()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/add()', role: 'parent를 바꾸는 메서드 — 02·03 섹션' },
  { id: 'mechanics', label: 'Timeline 문서의 mechanics 절', href: 'https://gsap.com/docs/v3/GSAP/Timeline#mechanics', role: '공식이 "개념적으로 이해하면 매우 도움이 된다"고 안내한 곳' },
]

export function ParentGraphSection() {
  return (
    <section id="parent-graph" className="placement-page__section" aria-labelledby="parent-graph-title">
      <SectionHeading
        number="01"
        id="parent-graph"
        title="부모는 언제나 하나뿐이다"
        description="배치를 배우기 전에 먼저 답해야 할 질문이 있습니다. 어떤 animation이 '3초에 시작한다'고 할 때, 그 3초는 누구의 시계로 잰 3초인가요? 답은 언제나 '그 animation의 부모'입니다."
      />

      <div className="placement-page__table-wrap">
        <table className="placement-page__rules-table">
          <caption>이 페이지에서 계속 쓰는 여섯 단어</caption>
          <thead>
            <tr>
              <th scope="col">용어</th>
              <th scope="col">뜻</th>
            </tr>
          </thead>
          <tbody>
            {glossary.map((entry) => (
              <tr key={entry.id}>
                <th scope="row">{entry.term}</th>
                <td>{entry.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="placement-page__subheading">
        <h3>parent는 인자도 반환값도 없는 속성입니다</h3>
        <p>
          공식 문서가 게시한 signature는 한 줄이 전부입니다. <code>Parameters</code> 절도 <code>Returns</code> 절도 없습니다. 메서드가
          아니라 <strong>읽어 보는 속성</strong>이기 때문입니다.
        </p>
      </div>

      <div className="placement-page__table-wrap">
        <table className="placement-page__rules-table">
          <caption>공식 명세 그대로</caption>
          <thead>
            <tr>
              <th scope="col">항목</th>
              <th scope="col">공식 표기</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">signature</th>
              <td>
                <code>parent : Timeline</code>
              </td>
            </tr>
            <tr>
              <th scope="row">인자</th>
              <td>공식 페이지에 명시 없음 — Parameters 절이 없습니다.</td>
            </tr>
            <tr>
              <th scope="row">반환값</th>
              <td>공식 페이지에 명시 없음 — Returns 절이 없습니다. 속성이므로 타입 <code>Timeline</code>을 그대로 읽습니다.</td>
            </tr>
            <tr>
              <th scope="row">공식 코드 예제</th>
              <td>공식 페이지에 명시 없음 — 이 페이지에는 코드 블록이 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="placement-page__split">
        <div className="placement-page__prose">
          <p>
            공식 정의는 <strong>"animation이 붙어 있는 부모 Timeline"</strong>입니다. 그리고 곧바로 중요한 문장이 이어집니다 —{' '}
            <strong>"직접 만든 Timeline 안에 있지 않은 것은 기본적으로 gsap.globalTimeline에 놓인다"</strong>.
          </p>
          <p>
            즉 <code>gsap.to()</code>로 animation을 만들 때 부모를 직접 지정하지 않아도 생성 직후 그 tween은{' '}
            이미 <strong>전역 timeline의 child</strong>입니다. 직접 <code>remove()</code>한 뒤에는 아래 probe처럼 parent가 null이 됩니다.
          </p>
        </div>
        <div className="placement-page__prose">
          <p>
            두 번째 규칙이 이 페이지 전체를 지탱합니다. <strong>"Tween이든 Timeline이든 모든 animation은 오직 하나의 부모에만 존재할 수
            있다."</strong>
          </p>
          <p>
            공식 문서가 붙인 비유는 <strong>"부모를 여럿 가질 수 없는 DOM element처럼 생각하라"</strong>입니다. 같은 tween을 두 timeline에
            동시에 넣어 두 번 재생시킬 수는 없다는 뜻입니다.
          </p>
        </div>
      </div>

      <div className="placement-page__note">
        <h3>그래서 add()는 "복사"가 아니라 "이사"입니다</h3>
        <p>
          공식 문장은 <strong>"add()로 다른 Timeline에 animation을 넣으면 그 animation의 parent가 그 Timeline으로 바뀐다"</strong>입니다.
          부모가 하나뿐이라는 규칙과 합치면 결론은 하나입니다 — 새 부모에 들어가는 순간 <strong>이전 부모에서는 빠집니다.</strong> 02
          섹션의 <code>add()</code>는 그래서 단순한 추가가 아니라 소속을 옮기는 동작입니다.
        </p>
      </div>

      <div className="placement-page__note placement-page__note--probe">
        <h3>실행으로 확인한 소속 이동</h3>
        <p>
          공식은 "하나의 부모에만 존재한다"고만 적고 <strong>이전 부모에서 실제로 빠지는지, 부모가 없어지면 어떤 값이 되는지는 적지
          않습니다.</strong> 실행해 보면 다음과 같습니다.
        </p>
        <ul className="placement-page__list">
          <li>
            <code>gsap.to()</code>로 만든 tween의 <code>parent</code>는 <code>gsap.globalTimeline</code>과 <strong>같은 객체</strong>였습니다.
          </li>
          <li>
            <code>tlA.add(tween)</code> 뒤 <code>tlB.add(tween)</code>을 하면 <code>tlA</code>의 child 수가 <code>1 → 0</code>이 되고{' '}
            <code>tlB</code>가 <code>1</code>이 됩니다. 정말로 옮겨 갑니다.
          </li>
          <li>
            <code>tl.remove(tween)</code> 뒤 그 tween의 <code>parent</code>는 <code>null</code>입니다. 전역 timeline으로 돌아가지
            않습니다.
          </li>
          <li>
            <code>gsap.globalTimeline.parent</code>도 <code>null</code>입니다. 최상위라서 부모가 없습니다.
          </li>
        </ul>
        <p className="placement-page__provenance">
          공식 페이지에 없는 내용입니다. GSAP 3.15.0에서 <code>node</code>로 <code>gsap</code>을 import해 위 네 가지를 순서대로 실행하고{' '}
          <code>parent</code>와 <code>getChildren(false).length</code>를 읽었습니다.
        </p>
      </div>

      <div className="placement-page__subheading">
        <h3>부모의 부모도 있습니다</h3>
        <p>
          Timeline 자신도 animation이므로 다른 Timeline의 child가 될 수 있습니다. 현재 parent에 연결된 graph에서 <code>parent</code>를 계속
          따라 올라가면 <strong>전역 timeline에서 멈춥니다.</strong> 직접 remove한 animation은 앞서 확인한 대로 parent가 null입니다.
        </p>
      </div>

      <ol className="placement-page__tree">
        <li data-depth="0">
          <code>gsap.globalTimeline</code>
          <span>최상위. 이것의 parent는 null입니다. 그리고 이 timeline만 smoothChildTiming이 true입니다(06 섹션).</span>
        </li>
        <li data-depth="1">
          <code>outer</code>
          <span>내가 만든 Timeline. outer.parent는 gsap.globalTimeline입니다.</span>
        </li>
        <li data-depth="2">
          <code>inner</code>
          <span>outer.add(inner, 1)로 넣은 Timeline. inner.parent는 outer이고, inner의 startTime 1은 outer의 시계로 잰 값입니다.</span>
        </li>
        <li data-depth="2">
          <code>tween</code>
          <span>inner.add(tween, 0.5)로 넣은 Tween. tween.parent는 inner이고, 0.5는 inner의 시계로 잰 값입니다.</span>
        </li>
      </ol>

      <div className="placement-page__note placement-page__note--probe">
        <p>
          위 네 층의 소속 관계를 GSAP 3.15.0에서 그대로 만들어 확인했습니다. <code>inner.parent === outer</code>,{' '}
          <code>tween.parent === inner</code>, <code>tween.parent.parent === outer</code>,{' '}
          <code>outer.parent === gsap.globalTimeline</code>이 모두 <code>true</code>였고,{' '}
          <code>outer.add(inner, 1)</code> 직후 <code>gsap.globalTimeline</code>의 child 목록에서 <code>inner</code>가 빠졌습니다.
        </p>
        <p className="placement-page__provenance">
          공식 페이지에 없는 내용입니다. 위의 소속 이동 probe와 같은 실행에서 <code>parent</code> 체인을 최상위까지 따라 올라가 기록했습니다.
        </p>
      </div>

      <div className="placement-page__subheading">
        <h3>공식이 여기서 더 읽어 보라고 안내하는 곳</h3>
        <p>
          <code>parent</code> 페이지에는 <strong>"How do timelines work?"</strong>라는 절이 있는데, 내용은 설명이 아니라 안내
          한 줄입니다 — <strong>"자세한 것은 Timeline 문서를 보라. 메커니즘이 개념적으로 어떻게 동작하는지 이해해 두면 매우 도움이 된다."</strong>
        </p>
      </div>

      <div className="placement-page__table-wrap">
        <table className="placement-page__rules-table">
          <caption>parent 페이지 본문이 연결하는 공식 문서 다섯 개</caption>
          <thead>
            <tr>
              <th scope="col">공식 문서</th>
              <th scope="col">이 페이지와의 경계</th>
            </tr>
          </thead>
          <tbody>
            {relatedOfficial.map((entry) => (
              <tr key={entry.id}>
                <th scope="row">
                  <a href={entry.href} target="_blank" rel="noopener noreferrer">
                    {entry.label}
                  </a>
                </th>
                <td>{entry.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
