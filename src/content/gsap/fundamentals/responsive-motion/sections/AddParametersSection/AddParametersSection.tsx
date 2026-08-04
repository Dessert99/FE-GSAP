/** mm.add()의 세 인자와 호출 시점 규칙을 공식 원문 그대로 정리하고, 문자열 형태의 최소 사용법을 보여준다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 문서가 "So the structure looks like:"로 소개한 한 줄 — 세 인자의 자리를 한눈에 보여준다
const structure = `mm.add("(min-width: 800px)", () => {...}, myElementOrRef);`

// 공식 Quick Start 코드 — 만들고, 조건을 걸고, 나중에 되돌리는 세 동작이 모두 들어 있다
const quickStart = `// create
let mm = gsap.matchMedia();

// add a media query. When it matches, the associated function will run
mm.add("(min-width: 800px)", () => {
  // this setup code only runs when viewport is at least 800px wide
  gsap.to(...);
  gsap.from(...);
  ScrollTrigger.create({...});
  return () => { // optional
    // custom cleanup code here (runs when it STOPS matching)
  };
});

// later, if we need to revert all the animations/ScrollTriggers...
mm.revert();`

// 공식 desktop/mobile 예제 — 하나의 mm에 서로 반대인 조건 둘을 각각 add한다
const desktopMobile = `let mm = gsap.matchMedia();

mm.add("(min-width: 800px)", () => {
  // desktop setup code here...
});

mm.add("(max-width: 799px)", () => {
  // mobile setup code here...
});`

export function AddParametersSection() {
  return (
    <section id="add-parameters" className="responsive-page__section" aria-labelledby="add-parameters-title">
      <SectionHeading
        number="02"
        id="add-parameters"
        title="mm.add()에 넘기는 세 가지"
        description="MatchMedia는 만들기만 해서는 아무 일도 하지 않습니다. 조건과 할 일을 add()로 짝지어 줘야 비로소 움직입니다."
      />

      <pre className="responsive-page__signature">
        <code>{structure}</code>
      </pre>

      <div className="responsive-page__prose">
        <p>
          첫 인자가 <strong>언제</strong>, 둘째 인자가 <strong>무엇을</strong>, 셋째 인자가 <strong>어디서</strong>를 정합니다. 셋째는
          선택입니다.
        </p>
      </div>

      <div className="responsive-page__table-wrap">
        <table className="responsive-page__table">
          <caption>add()의 인자 — 공식 페이지의 세 항목</caption>
          <thead>
            <tr>
              <th scope="col">인자</th>
              <th scope="col">타입</th>
              <th scope="col">공식 설명</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                query / conditions
                <small>필수</small>
              </th>
              <td>
                <code>String</code> 또는 <code>Object</code>
              </td>
              <td>
                <code>"(min-width: 800px)"</code> 같은 media query 문자열이거나, 원하는 만큼 임의 이름의 query 문자열을 담은 conditions
                객체입니다. 객체를 넘기면 각각의 매치 상태를 boolean으로 확인할 수 있습니다.
              </td>
            </tr>
            <tr>
              <th scope="row">
                handler function
                <small>필수</small>
              </th>
              <td>
                <code>Function</code>
              </td>
              <td>
                매치가 있을 때 호출할 함수입니다. 이 함수가 실행되는 동안 만들어진 모든 GSAP animation과 ScrollTrigger는 context에 수집돼,
                MatchMedia가 revert될 때(조건이 더 이상 맞지 않을 때처럼) 함께 revert됩니다.
              </td>
            </tr>
            <tr>
              <th scope="row">
                scope
                <small>[optional]</small>
              </th>
              <td>
                <code>Element</code> · <code>React Ref</code> · <code>Angular ElementRef</code>
              </td>
              <td>
                handler 함수 안의 모든 GSAP 관련 선택자 텍스트가 이 Element/Ref로 scoped됩니다. <a href="#scope-selector">05단계</a>에서
                자세히 봅니다.
              </td>
            </tr>
            <tr>
              <th scope="row">기본값</th>
              <td>—</td>
              <td>공식 페이지에 명시 없음 — 세 인자 어디에도 기본값 표기가 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="responsive-page__subheading">
        <h3>media query 문자열은 브라우저 것을 그대로 씁니다</h3>
        <p>
          GSAP이 따로 만든 문법이 아닙니다. 공식 문장은{' '}
          <strong>각 media query 문자열은 브라우저의 native window.matchMedia()에 넘기는 것과 정확히 같다</strong>입니다. CSS에서 쓰던
          질문을 그대로 옮겨 적으면 됩니다.
        </p>
      </div>

      <pre className="responsive-page__code">
        <code>{quickStart}</code>
      </pre>

      <div className="responsive-page__prose">
        <p>
          공식 문서가 <code>mm</code>이라는 변수를 두는 이유도 밝혀 두었습니다 —{' '}
          <strong>
            mm 변수 하나에 원하는 만큼 add()로 media query를 더할 수 있고, 그 하나의 객체에 revert()를 부르면 연결된 모든 MatchMedia
            함수에서 만들어진 animation·ScrollTrigger가 즉시 revert된다.
          </strong>{' '}
          정리 스위치를 하나로 모으기 위한 그릇입니다.
        </p>
        <p>
          그리고 handler는 한 번만 불리는 함수가 아닙니다. 공식 문장은{' '}
          <strong>
            함수는 활성(매치) 상태가 될 때마다 호출된다. 사용자가 breakpoint를 넘나들며 여러 번 크기를 바꾸면 함수도 여러 번 호출된다
          </strong>
          입니다. 그래서 handler 안에는 <strong>몇 번 실행돼도 같은 결과가 나오는 코드</strong>만 두어야 합니다.
        </p>
      </div>

      <div className="responsive-page__subheading">
        <h3>조건이 둘이면 add()도 둘</h3>
        <p>공식 desktop/mobile 예제는 하나의 mm에 서로 반대인 조건을 각각 add합니다.</p>
      </div>

      <pre className="responsive-page__code">
        <code>{desktopMobile}</code>
      </pre>

      <div className="responsive-page__note responsive-page__note--probe">
        <h3>공식 문서에 없는 것 둘 — 반환값과 첫 실행 시점</h3>
        <p>
          공식 페이지는 <code>add()</code>가 무엇을 돌려주는지, 그리고 <code>add()</code>를 부르는 그 순간 handler가 실행되는지를 적어
          두지 않았습니다. 설치본에서 확인한 것은 두 가지입니다. <code>add()</code>는 <strong>MatchMedia 자신</strong>을 돌려주므로
          이어서 <code>add()</code>를 붙일 수 있고, <strong>add()를 부르는 시점에 이미 조건이 맞으면 handler가 그 자리에서 한 번
          실행됩니다.</strong>
        </p>
        <p className="responsive-page__provenance">
          이 항목은 공식 페이지에 게시돼 있지 않습니다. GSAP 3.15.0을 직접 실행해 확인한 내용입니다. 반대로 말하면{' '}
          <strong>add() 시점에 맞는 조건이 하나도 없으면 handler는 그때 실행되지 않습니다.</strong>
        </p>
      </div>

      <div className="responsive-page__warning">
        <h3>mobile 기기에서 조건이 안 맞는 것 같다면</h3>
        <p>
          공식 페이지의 마지막 항목입니다. <code>&lt;head&gt;&lt;/head&gt;</code>에 아래 한 줄을 넣어 보라고 안내합니다. viewport meta가
          없으면 mobile 브라우저가 실제 기기 폭이 아닌 가상 폭으로 media query에 답하기 때문입니다.
        </p>
        <pre className="responsive-page__code">
          <code>{'<meta name="viewport" content="width=device-width, initial-scale=1" />'}</code>
        </pre>
      </div>
    </section>
  )
}
