/** Context 없이 범위 지정만 필요할 때 쓰는 gsap.utils.selector()의 반환 형태와 사용처를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식이 문제 상황으로 든 마크업 — 같은 컴포넌트를 세 번 쓰면 class가 세 벌이 된다
const repeatedMarkup = `<div class="my-component">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>`

// 공식이 "이렇게 쓰면 안 된다"고 든 코드 — 페이지 전체의 box가 움직인다
const brokenSelector = `myComponent.addEventListener("click", () =>
  gsap.to(".my-component .box", { x: 100, stagger: 0.1 }));`

// 공식 Vanilla 예제 원문 — 선언과 사용이 나뉜다는 것이 이 utility의 형태다
const vanillaExample = `// Vanilla
let q = gsap.utils.selector(myElement); // or use selector text like ".class"
let boxes = q(".box"); // finds only elements with the class "box" that are INSIDE myElement
// or plug directly into animations
gsap.to(q(".circle"), { x: 100 });`

// 공식 React 예제 원문 — ref 하나로 자손을 고르는 형태다
const reactExample = `// React
let el = useRef();
let q = gsap.utils.selector(el);
useEffect(() => {
  // uses el.current.querySelectorAll() internally
  gsap.to(q(".box"), { x: 100 });
}, []);`

// probe에서 실제로 실행한 호출 — 중괄호가 JSX 표현식으로 먹히지 않도록 문자열로 둔다
const probeCall = `gsap.context(() => {}, '.my-scope')`

// 프레임워크마다 내부적으로 어떤 호출로 바뀌는지 — 공식 주석이 밝힌 그대로다
const internalCalls = [
  { framework: 'Vanilla', input: 'Element 또는 ".class"', internal: 'element.querySelectorAll(...)' },
  { framework: 'React', input: 'useRef로 만든 ref', internal: 'el.current.querySelectorAll(...)' },
  { framework: 'Angular', input: 'ElementRef', internal: 'this.el.nativeElement.querySelectorAll(...)' },
  { framework: 'Vue', input: 'this.$el', internal: 'this.$el.querySelectorAll(...)' },
]

export function SelectorUtilitySection() {
  return (
    <section id="selector-utility" className="context-page__section" aria-labelledby="selector-utility-title">
      <SectionHeading
        number="03"
        id="selector-utility"
        title="범위만 필요할 때 쓰는 선택자 함수"
        description="정리는 필요 없고 범위만 좁히고 싶을 때가 있습니다. gsap.utils.selector()는 Context와 따로 쓸 수 있는 독립 도구입니다."
      />

      <div className="context-page__prose">
        <p>
          앞 단계의 scope는 Context에 딸린 기능이었습니다. 그런데 "이 영역 안에서만 고르기"는 정리와 상관없이 그 자체로 필요할
          때가 많습니다. 그럴 때 쓰는 것이 <code>gsap.utils.selector()</code>입니다. 이름 그대로 <strong>선택자</strong> 도구이고,
          되돌리기와는 아무 관계가 없습니다.
        </p>
      </div>

      <div className="context-page__subheading">
        <h3>공식이 든 문제 상황</h3>
        <p>
          공식 문서는 아예 "왜 그냥 <code>document.querySelectorAll('.class')</code>를 쓰면 안 되나?"라는 제목으로 이 문제를
          설명합니다.
        </p>
      </div>

      <div className="context-page__prose">
        <p>컴포넌트 하나가 이렇게 그려진다고 합시다.</p>
      </div>

      <pre className="context-page__code">
        <code>{repeatedMarkup}</code>
      </pre>

      <div className="context-page__prose">
        <p>
          그리고 이 컴포넌트를 한 페이지에서 <strong>세 번</strong> 씁니다. 이제 클릭한 컴포넌트의 box만 움직이려고 아래처럼
          쓰면 어떻게 될까요?
        </p>
      </div>

      <pre className="context-page__code">
        <code>{brokenSelector}</code>
      </pre>

      <div className="context-page__prose">
        <p>
          공식의 답은 이렇습니다 — 그 컴포넌트 안의 box가 아니라 <strong>페이지 전체의 모든 box</strong>가 움직입니다. 선택자
          문자열만으로는 "내가 클릭한 그 하나"를 가리킬 방법이 없습니다.
        </p>
        <p>
          물론 <code>myComponentRef.current.querySelectorAll('.box')</code>를 tween의 대상으로 쓸 수도 있습니다. 공식도 그렇게
          적어 두었습니다. 다만 이미 범위가 정해진 selector를 하나 만들어 두고 class 이름으로 계속 고르는 편이 더 깔끔하다는 것이
          이 utility의 존재 이유입니다.
        </p>
      </div>

      <div className="context-page__subheading">
        <h3>돌려받는 것은 결과가 아니라 함수입니다</h3>
        <p>여기서 한 번 걸려 넘어지기 쉽습니다. 공식도 "Remember"로 강조해 둔 부분입니다.</p>
      </div>

      <div className="context-page__table-wrap">
        <table className="context-page__table">
          <caption>gsap.utils.selector() 명세 — 공식 페이지에 적힌 그대로</caption>
          <thead>
            <tr>
              <th scope="col">항목</th>
              <th scope="col">공식 표기</th>
              <th scope="col">뜻</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">인자 이름</th>
              <td>
                <code>scope</code>
              </td>
              <td>선택 범위를 제한할 대상입니다.</td>
            </tr>
            <tr>
              <th scope="row">인자 타입</th>
              <td>
                <code>[Element | String | Object]</code>
              </td>
              <td>Element, selector text, React Ref, Angular ElementRef를 받습니다.</td>
            </tr>
            <tr>
              <th scope="row">필수 여부</th>
              <td>
                <code>optional</code>
              </td>
              <td>공식은 선택 인자로 표시합니다.</td>
            </tr>
            <tr>
              <th scope="row">기본값</th>
              <td>공식 페이지에 명시 없음</td>
              <td>생략했을 때 무엇이 기준이 되는지는 적혀 있지 않습니다.</td>
            </tr>
            <tr>
              <th scope="row">반환 타입</th>
              <td>
                <code>Function</code>
              </td>
              <td>
                해당 Element에 scope된 <strong>selector function</strong>입니다. 그 Element의 자손만 찾습니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="context-page__prose">
        <p>
          공식 문장을 그대로 옮기면 이렇습니다 — <strong>"gsap.utils.selector()는 재사용 가능한 selector function을 돌려주는
          것이지 선택 결과를 돌려주는 것이 아니다."</strong> 그래서 아래 코드에서 <code>q</code>는 element 목록이 아니라 함수이고,
          실제 목록은 <code>q(".box")</code>라고 <strong>불렀을 때</strong> 나옵니다.
        </p>
      </div>

      <pre className="context-page__code">
        <code>{vanillaExample}</code>
      </pre>

      <div className="context-page__prose">
        <p>
          공식은 이 방식이 컴포넌트에 잘 맞는 이유를 이렇게 정리합니다. 컴포넌트의 컨테이너 element에 scoped selector를 하나
          만들어 두고 그것으로 자손을 고르면 되기 때문이고, 이는 document가 아니라 그 element에{' '}
          <code>.querySelectorAll()</code>을 부르는 것과 비슷하되 <strong>몇 가지 이점이 더해진</strong> 형태입니다.
        </p>
      </div>

      <div className="context-page__note">
        <h3>NodeList가 아니라 Array를 돌려줍니다</h3>
        <p>
          공식이 밝힌 이점입니다. <code>document.querySelectorAll()</code>은 <code>NodeList</code>를 돌려주지만 이 selector
          function은 <strong>Array</strong>를 돌려줍니다. 그래서 <code>.filter()</code>나 <code>.map()</code> 같은 배열 메서드를
          그대로 쓸 수 있습니다. 고른 것 중 일부만 골라 움직이는 일이 한 줄로 끝납니다.
        </p>
      </div>

      <div className="context-page__subheading">
        <h3>프레임워크마다 무엇을 넘기나</h3>
        <p>공식은 네 가지 환경의 예제를 보여 주고, 주석으로 내부에서 어떤 호출이 일어나는지까지 적어 두었습니다.</p>
      </div>

      <pre className="context-page__code">
        <code>{reactExample}</code>
      </pre>

      <div className="context-page__table-wrap">
        <table className="context-page__table">
          <caption>넘기는 값과 내부 호출 — 공식 예제 주석이 밝힌 그대로</caption>
          <thead>
            <tr>
              <th scope="col">환경</th>
              <th scope="col">scope로 넘기는 값</th>
              <th scope="col">내부에서 일어나는 호출</th>
            </tr>
          </thead>
          <tbody>
            {internalCalls.map((row) => (
              <tr key={row.framework}>
                <th scope="row">{row.framework}</th>
                <td>{row.input}</td>
                <td>
                  <code>{row.internal}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="context-page__prose">
        <p>
          React ref와 Angular ElementRef에는 편의가 하나 더 있습니다. 공식 문장으로는, 만들어 둔 selector function을{' '}
          <strong>사용할 때</strong> 그 사이에 re-render가 일어났을 경우를 대비해 <code>.current</code>/
          <code>.nativeElement</code>를 <strong>자동으로 다시 확인</strong>합니다. 컴포넌트가 다시 그려져도 selector를 새로 만들지
          않아도 된다는 뜻입니다.
        </p>
        <p>
          공식은 이 utility의 동기를 이렇게도 설명합니다. React에서 흔한 패턴은 움직일 element마다 ref를 선언하는 것인데 그러면
          코드가 매우 장황해지고 읽기 어려워집니다. scoped selector를 쓰면 <strong>ref 하나</strong>만 있으면 되고 나머지는 자손을
          고르기만 하면 됩니다.
        </p>
      </div>

      <div className="context-page__note context-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p>
          scope를 문자열로 넘기는 형태는 <strong>DOM이 있어야</strong> 해석됩니다. <code>document</code>가 없는 Node 환경에서{' '}
          <code>gsap.context(fn, '.my-scope')</code>를 부르면 <code>querySelectorAll</code>을 읽지 못해 TypeError가 납니다. 서버
          렌더링 단계에서 scope를 해석시키면 안 되는 이유입니다.
        </p>
        <p className="context-page__provenance">
          측정 방법 · GSAP 3.15.0을 Node에서 import해 <code>{probeCall}</code>를 try/catch로 감싸 호출했고{' '}
          <code>TypeError: Cannot read properties of undefined (reading 'querySelectorAll')</code>를 확인했습니다. 같은
          환경에서 <code>typeof document</code>는 <code>undefined</code>였습니다. 브라우저에서의 선택 결과는 이 방법으로 확인할
          수 없어 주장하지 않습니다.
        </p>
      </div>

      <div className="context-page__note">
        <h3>이 페이지가 소유하는 범위</h3>
        <p>
          <code>gsap.utils.selector()</code>는 Context와 독립된 utility이고, GSAP에는 이 밖에도 여러 utility method가 있습니다.
          이 페이지는 그중 <strong>범위 지정</strong>이라는 한 가지 역할만, 그것도 Context의 scope와 이어지는 지점에서만
          설명합니다. 나머지 utility method들은 각자의 학습 페이지가 소유합니다.
        </p>
      </div>
    </section>
  )
}
