/** 흩어진 애니메이션을 Context 하나가 기록했다가 함께 되돌린다는 이 페이지의 출발점을 세운다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { ContextRevertLab } from '../../examples/ContextRevertLab/ContextRevertLab'

// 공식이 게시한 최소 사용 예제 원문 — 이 페이지의 모든 설명이 이 세 줄에서 갈라져 나온다
const minimalUsage = `let ctx = gsap.context(() => { gsap.to(...); gsap.from(...); gsap.timeline().to(...).to(...); ...});
// then later...
ctx.revert(); // BOOM! Every GSAP animation created in that function gets reverted!`

// 변수를 손으로 들고 다니는 방식과 Context에 맡기는 방식을 같은 일에 나란히 놓는다
const beforeAfter = `// 손으로 관리할 때 — 만든 만큼 변수가 늘고, 하나라도 빠뜨리면 남습니다
const t1 = gsap.to('.a', { x: 100 })
const t2 = gsap.from('.b', { opacity: 0 })
const t3 = gsap.timeline().to('.c', { y: 20 })
t1.revert(); t2.revert(); t3.revert()

// Context에 맡길 때 — 변수가 없어도 됩니다
const ctx = gsap.context(() => {
  gsap.to('.a', { x: 100 })
  gsap.from('.b', { opacity: 0 })
  gsap.timeline().to('.c', { y: 20 })
})
ctx.revert()`

export function CollectAndRevertSection() {
  return (
    <section id="collect-and-revert" className="context-page__section" aria-labelledby="collect-and-revert-title">
      <SectionHeading
        number="01"
        id="collect-and-revert"
        title="흩어진 애니메이션을 하나로 묶는다"
        description="한 화면에서 Tween을 다섯 개 만들었다면, 그 화면을 떠날 때 다섯 개를 모두 치워야 합니다. 문제는 다섯 개를 기억하는 일 자체입니다."
      />

      <div className="context-page__prose">
        <p>
          먼저 상황부터 봅시다. 모달 하나를 열면서 배경을 어둡게 하고, 카드를 띄우고, 버튼을 늦게 등장시켰다고 해 봅시다. GSAP
          작업이 셋입니다. 모달을 닫을 때 이 셋을 <strong>전부</strong> 원래대로 돌려놔야 합니다. 하나라도 빠뜨리면 다음에 모달을
          열 때 이상한 자리에서 시작합니다.
        </p>
        <p>
          손으로 하려면 만든 만큼 변수를 들고 있어야 합니다. 아래 두 코드는 같은 일을 합니다. 아래쪽에는 변수가 하나도 없다는 점만
          다릅니다.
        </p>
      </div>

      <pre className="context-page__code">
        <code>{beforeAfter}</code>
      </pre>

      <div className="context-page__subheading">
        <h3>먼저 세 단어를 정해 두고 갑시다</h3>
        <p>이 페이지에서 계속 나올 말입니다. 여기서 뜻을 고정해 두면 뒤가 편합니다.</p>
      </div>

      <div className="context-page__table-wrap">
        <table className="context-page__table">
          <caption>이 페이지의 기본 어휘</caption>
          <thead>
            <tr>
              <th scope="col">용어</th>
              <th scope="col">뜻</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Context</th>
              <td>
                내가 넘긴 함수 안에서 만들어진 GSAP 작업을 <strong>옆에서 목록에 적어 두는 기록원</strong>입니다.{' '}
                <code>gsap.context()</code>를 부르면 이 기록원을 하나 돌려받습니다.
              </td>
            </tr>
            <tr>
              <th scope="row">revert</th>
              <td>
                애니메이션을 없애면서 <strong>그것이 건드린 값을 시작 전 상태로 되돌리는</strong> 일입니다. 단순히 멈추는 것과
                다릅니다.
              </td>
            </tr>
            <tr>
              <th scope="row">scope</th>
              <td>
                선택자가 뒤질 수 있는 <strong>범위</strong>입니다. <code>gsap.context()</code>의 두 번째 인자로 주며, 없어도
                됩니다. 자세한 것은 다음 단계에서 다룹니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="context-page__subheading">
        <h3>공식이 보여 주는 가장 짧은 형태</h3>
        <p>공식 문서가 "Minimal usage"로 적어 둔 세 줄입니다.</p>
      </div>

      <pre className="context-page__code">
        <code>{minimalUsage}</code>
      </pre>

      <div className="context-page__prose">
        <p>
          공식 문장을 그대로 옮기면 Context는 그 함수 안에서 만들어진 <strong>모든 GSAP animation과 ScrollTrigger를 모아 두어</strong>{' '}
          한 번에 <code>revert()</code>하거나 <code>kill()</code>할 수 있게 합니다. 변수나 배열을 따로 추적할 필요가 없다는 것이
          핵심 이유이고, 공식은 이것이 <strong>React module처럼 element를 원래 상태로 되돌려야 하는 곳</strong>에서 특히 유용하다고
          밝힙니다.
        </p>
        <p>
          <code>ScrollTrigger</code>는 스크롤 위치에 따라 애니메이션을 켜고 끄는 GSAP 플러그인입니다. 이 페이지에서 다루지는
          않지만, Context가 Tween뿐 아니라 ScrollTrigger도 함께 기록한다는 사실은 공식이 명시한 내용이라 적어 둡니다.
        </p>
        <p>
          마지막으로 버전입니다. <code>gsap.context()</code>는 <strong>3.11.0</strong>에 추가됐습니다. 그보다 낮은 버전에서는 이
          방법을 쓸 수 없습니다.
        </p>
      </div>

      <div className="context-page__note">
        <h3>공식 페이지에 형식 명세가 없습니다</h3>
        <p>
          다른 GSAP 문서와 달리 <code>gsap.context()</code> 페이지에는 <strong>signature 줄도, Parameters 절도, Returns 절도
          없습니다.</strong> 인자 두 개(실행할 함수와 선택적 scope)는 본문 문장과 코드 예제로만 설명됩니다. 그래서 이 페이지에서도
          타입·기본값·반환값을 공식 명세로 제시하지 않고, 아래처럼 <strong>실행해 확인한 값</strong>으로 따로 표시합니다.
        </p>
      </div>

      <div className="context-page__note context-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p>
          <code>gsap.context()</code>가 돌려주는 것은 생성자 이름이 <code>Context</code>인 객체입니다. 여기에는{' '}
          <code>revert</code>, <code>kill</code>, <code>add</code>, <code>ignore</code>, <code>clear</code>,{' '}
          <code>getTweens</code> 메서드와 <code>data</code>, <code>isReverted</code>, <code>selector</code>, <code>id</code>{' '}
          속성이 있습니다. 넘긴 함수는 <strong>나중이 아니라 그 자리에서 바로</strong> 실행되고, 그 안에서 만든 애니메이션이 곧장{' '}
          <code>data</code> 배열에 쌓입니다.
        </p>
        <p>
          <code>getTweens()</code>는 기록된 것 중 Tween만 골라 배열로 돌려줍니다. 주의할 점은 Timeline을 만들면{' '}
          <code>data</code>에 Timeline과 <strong>그 자식 Tween이 함께</strong> 들어가서, 기록 수가 내가 만든 애니메이션 개수보다
          많아 보일 수 있다는 것입니다.
        </p>
        <p className="context-page__provenance">
          측정 방법 · GSAP 3.15.0을 Node에서 import해 <code>gsap.context()</code>를 만든 뒤 <code>Object.keys()</code>와{' '}
          <code>Object.getOwnPropertyNames(Object.getPrototypeOf(ctx))</code>로 구조를 읽고, 함수 안에 플래그를 두어 실행 시점을,{' '}
          <code>ctx.data.length</code>로 기록 수를 확인했습니다. DOM이 없는 환경이라 selector 동작은 여기서 확인하지 않았습니다.
        </p>
      </div>

      <ContextRevertLab />
    </section>
  )
}
