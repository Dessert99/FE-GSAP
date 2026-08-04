/** Context 함수가 끝난 뒤에 생기는 애니메이션을 기록하는 add()와 일부러 빼는 ignore()를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { ContextAddLab } from '../../examples/ContextAddLab/ContextAddLab'

// 공식이 게시한 self.add(이름, 함수) 예제 원문 — 주석까지 그대로 두어야 이름의 역할이 드러난다
const namedAddExample = `let ctx = gsap.context((self) => {
  // use any arbitrary string as a name; it'll be added to the Context object, so in this case you can call ctx.onClick() later...
  self.add("onClick", (e) => {
    gsap.to(...); // <-- gets added to the Context!
  });
}, myRefOrElement);

// now the Context has an onClick() method we can tap into and any animations in that function will get added to the Context
myButton.addEventListener("click", (e) => ctx.onClick(e));`

// 공식이 게시한 ctx.add(함수) 예제 원문 — 즉시 추가하는 두 번째 형태다
const immediateAddExample = `// create context
let ctx = gsap.context(() => {...});

// then later, add to it:
ctx.add(() => {
  gsap.to(...); // now all these get added to the Context.
  gsap.from(...);
});`

// 공식이 게시한 ignore() 예제 원문 — 기록에서 빼는 유일한 방법이다
const ignoreExample = `let ctx = gsap.context((self) => {
  gsap.to(...); // <- will get reverted when ctx.revert() is called
  self.ignore(() => {
    gsap.to(...); // <- will NOT get reverted when ctx.revert() is called. Ignored, not recorded in the Context.
  });
});`

export function AddAndIgnoreSection() {
  return (
    <section id="add-and-ignore" className="context-page__section" aria-labelledby="add-and-ignore-title">
      <SectionHeading
        number="04"
        id="add-and-ignore"
        title="함수가 끝난 뒤 생기는 애니메이션"
        description="Context는 자기 함수가 실행되는 동안만 기록합니다. 그런데 클릭이나 hover로 만드는 애니메이션은 그 함수가 끝난 한참 뒤에 생깁니다."
      />

      <div className="context-page__prose">
        <p>
          여기가 실제 프로젝트에서 가장 자주 새는 지점입니다. 공식 문서도 같은 상황을 짚습니다 — mouse click 같은 event handler가
          만드는 새 애니메이션도 Context에 모아야 할 수 있는데, <strong>그 event는 Context의 함수가 이미 실행된 뒤에</strong>{' '}
          일어납니다.
        </p>
        <p>
          공식이 준 해법은 "Context 객체에 <strong>내 메서드를 추가</strong>해 두는 것"입니다. 그 메서드가 실행될 때 만들어지는
          애니메이션은 다시 Context에 기록됩니다.
        </p>
      </div>

      <div className="context-page__subheading">
        <h3>먼저 self가 무엇인지</h3>
        <p>
          지금부터 나오는 <code>self</code>는 새로운 개념이 아닙니다.
        </p>
      </div>

      <div className="context-page__prose">
        <p>
          공식이 Tips에 적어 둔 그대로입니다 — <strong>Context 객체 자신이 함수에 넘어옵니다.</strong> 그래서{' '}
          <code>gsap.context((self) =&gt; ...)</code>라고 쓰면 <code>self</code>는 방금 만들어지고 있는 그 Context입니다. 밖에서{' '}
          <code>ctx</code>라고 부르는 것과 같은 객체인데, 아직 <code>ctx</code> 변수에 대입되기 전이라 함수 안에서는{' '}
          <code>self</code>로 받습니다.
        </p>
      </div>

      <div className="context-page__subheading">
        <h3>형태 1 — 이름을 붙여 등록해 두고 나중에 부른다</h3>
        <p>공식 예제입니다. 이름은 아무 문자열이나 됩니다.</p>
      </div>

      <pre className="context-page__code">
        <code>{namedAddExample}</code>
      </pre>

      <div className="context-page__prose">
        <p>
          공식 주석이 설명하듯 <code>"onClick"</code>이라는 이름을 주면 Context 객체에 그 이름의 메서드가 생기고, 나중에{' '}
          <code>ctx.onClick()</code>으로 부를 수 있습니다. 그 함수 안에서 만들어진 애니메이션은 Context에 추가됩니다.
        </p>
      </div>

      <div className="context-page__subheading">
        <h3>형태 2 — 지금 바로 추가한다</h3>
        <p>이름 없이 함수만 첫 인자로 넘기는 형태입니다.</p>
      </div>

      <pre className="context-page__code">
        <code>{immediateAddExample}</code>
      </pre>

      <div className="context-page__note context-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p>
          두 형태는 <strong>실행 시점</strong>이 다릅니다. <code>add(이름, 함수)</code>는 함수를 <strong>실행하지 않고</strong>{' '}
          Context에 그 이름의 메서드만 만들어 둡니다. 기록 수는 그대로 0이고, 나중에 그 메서드를 불러야 비로소 애니메이션이
          기록됩니다. 반면 <code>add(함수)</code>는 그 자리에서 함수를 <strong>바로 실행</strong>합니다.
        </p>
        <p>
          두 형태 모두 실행 결과로 <code>undefined</code>를 돌려주므로 이어 붙여 쓸 수 없습니다. 패키지에 함께 들어 있는 타입
          선언에는 반환 타입이 <code>Function</code>으로 적혀 있지만 실제 실행값은 <code>undefined</code>입니다.
        </p>
        <p className="context-page__provenance">
          측정 방법 · GSAP 3.15.0을 Node에서 import해 <code>ctx.data.length</code>를 각 호출 전후로 읽었습니다.{' '}
          <code>self.add('onClick', fn)</code> 직후에는 0, <code>ctx.onClick()</code> 뒤에는 1, 이어서{' '}
          <code>ctx.add(fn)</code> 뒤에는 2였고, 두 호출의 반환값은 모두 <code>undefined</code>였습니다.
        </p>
      </div>

      <div className="context-page__subheading">
        <h3>반대로 기록에서 빼야 할 때</h3>
        <p>
          공식은 이것을 <strong>"very uncommon situations"</strong>라고 못 박습니다. 기본은 기록하는 쪽입니다.
        </p>
      </div>

      <div className="context-page__prose">
        <p>
          공식 문장으로는, 함수 안에서 만들지만 Context에서 <strong>제외해야</strong> 하는(Context가 revert/kill될 때
          revert/kill되지 않아야 하는) 애니메이션이나 ScrollTrigger가 있으면 <code>ignore()</code>를 씁니다.
        </p>
      </div>

      <pre className="context-page__code">
        <code>{ignoreExample}</code>
      </pre>

      <div className="context-page__prose">
        <p>
          공식 주석의 표현이 정확합니다 — <code>ignore()</code> 안의 애니메이션은 <code>ctx.revert()</code> 때 되돌려지지 않고,{' '}
          <strong>애초에 Context에 기록되지 않습니다</strong>. 되돌릴 때 건너뛰는 게 아니라 목록에 적히지 않는 것입니다.
        </p>
      </div>

      <div className="context-page__note context-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p>
          공식 예제는 함수 안에서 <code>self.ignore()</code>를 부르는 형태만 보여 줍니다. 실행해 보면 Context 함수가 이미 끝난
          뒤에 밖에서 <code>ctx.ignore(함수)</code>로 불러도 마찬가지로 기록되지 않습니다. 아래 예제의 네 번째 경로가 그
          형태입니다.
        </p>
        <p className="context-page__provenance">
          측정 방법 · GSAP 3.15.0을 Node에서 import해 Context 함수 실행이 끝난 뒤 <code>ctx.ignore(() =&gt; gsap.to(...))</code>를
          호출하고 <code>ctx.data.length</code>가 늘지 않는 것을 확인했습니다.
        </p>
      </div>

      <ContextAddLab />
    </section>
  )
}
