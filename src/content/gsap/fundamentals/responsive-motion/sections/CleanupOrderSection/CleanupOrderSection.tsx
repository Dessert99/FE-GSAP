/** 자동 revert와 handler가 반환하는 cleanup 함수의 역할 차이, 그리고 나중에 만들어지는 animation을 기록하는 방법을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 Interactivity and cleanup 예제 — 나중에 실행되는 handler의 animation을 Context에 태우는 방법이다
const contextAddCode = `let mm = gsap.matchMedia();

mm.add("(min-width: 800px)", (context) => {
  context.add("onClick", () => {
    gsap.to(".box", { rotation: 360 }); // <- now it gets recorded in the Context
  });
  myButton.addEventListener("click", context.onClick);
  return () => {
    // make sure to clean up event listeners in the cleanup function!
    myButton.removeEventListener("click", context.onClick);
  };
});`

// 두 층이 각각 무엇을 담당하는지 — 이 섹션의 결론이다
const cleanupLayers = [
  {
    layer: 'GSAP이 자동으로 하는 것',
    what: 'handler가 실행되는 동안 만들어진 모든 GSAP animation과 ScrollTrigger를 revert합니다.',
    who: '내가 코드를 쓰지 않습니다.',
  },
  {
    layer: '내가 반환한 cleanup 함수',
    what: 'GSAP이 모르는 것 — event listener 해제, 타이머 정리, 외부 라이브러리 정리를 합니다.',
    who: '내가 씁니다. 여기서 context.revert()를 부르면 안 됩니다.',
  },
]

export function CleanupOrderSection() {
  return (
    <section id="cleanup-order" className="responsive-page__section" aria-labelledby="cleanup-order-title">
      <SectionHeading
        number="04"
        id="cleanup-order"
        title="자동 정리와 내가 쓰는 정리는 층이 다르다"
        description="handler는 함수 하나를 반환할 수 있습니다. 그 함수가 GSAP의 정리를 대신하는 것이라고 오해하면, 같은 일을 두 번 시키게 됩니다."
      />

      <div className="responsive-page__table-wrap">
        <table className="responsive-page__table">
          <caption>정리의 두 층</caption>
          <thead>
            <tr>
              <th scope="col">층</th>
              <th scope="col">담당</th>
              <th scope="col">누가 쓰나</th>
            </tr>
          </thead>
          <tbody>
            {cleanupLayers.map((row) => (
              <tr key={row.layer}>
                <th scope="row">{row.layer}</th>
                <td>{row.what}</td>
                <td>{row.who}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="responsive-page__prose">
        <p>
          공식 문서는 반환 함수의 실행 시점을 이렇게 적습니다 —{' '}
          <strong>조건이 더 이상 매치되지 않게 될 때(매치된 적이 있는 뒤에) 호출되는, 선택적인 cleanup 함수</strong>. 그리고 바로 이어서
          경고합니다.
        </p>
      </div>

      <div className="responsive-page__warning">
        <h3>여기서 context.revert()를 부르지 마세요</h3>
        <p>
          공식 주석 원문입니다 — <code>it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code
          here.</code> 자동으로 <code>context.revert()</code>가 불리므로, 반환 함수 안에는 <strong>GSAP이 모르는 정리</strong>만 넣어야
          합니다.
        </p>
      </div>

      <div className="responsive-page__subheading">
        <h3>나중에 만들어지는 animation은 어떻게 기록되나</h3>
        <p>
          "handler가 실행되는 동안 만들어진 것"이 자동 정리 대상이라면, handler가 끝난 뒤 클릭 때 만들어지는 animation은 어떻게 될까요?
          공식 문서가 이 질문을 그대로 던지고 답합니다.
        </p>
      </div>

      <div className="responsive-page__prose">
        <p>
          먼저 전제가 있습니다. <strong>Context가 만들어져 handler의 유일한 parameter로 전달됩니다.</strong> 공식 문서는 이것이{' '}
          <strong>
            MatchMedia에 revert()가 불릴 때 함께 revert돼야 하는 animation·ScrollTrigger를 나중에 만드는 event handler나 코드를 작성할 때
            유용하다
          </strong>
          고 설명합니다.
        </p>
        <p>
          방법은 <strong>context 객체 자체에 이름 붙인 함수를 add()</strong>하는 것입니다. 그러면 그 함수가 나중에 실행될 때 만들어진
          animation도 Context에 수집됩니다.
        </p>
      </div>

      <pre className="responsive-page__code">
        <code>{contextAddCode}</code>
      </pre>

      <div className="responsive-page__prose">
        <p>
          공식 예제의 마지막 주석이 두 층을 한 화면에서 보여 줍니다. <code>gsap.to</code>는 Context가 알아서 되돌리지만,{' '}
          <code>addEventListener</code>는 GSAP의 관심사가 아닙니다. 그래서 주석이 <strong>cleanup 함수에서 event listener를 반드시
          제거하라</strong>고 못박습니다.
        </p>
      </div>

      <div className="responsive-page__note">
        <h3>gsap.context()를 따로 써야 하나요?</h3>
        <p>
          공식 페이지가 같은 제목으로 답합니다 — <strong>아니요.</strong> 이유는{' '}
          <strong>gsap.matchMedia()가 내부적으로 gsap.context()를 만들기 때문에 둘을 함께 쓰는 것은 불필요하다</strong>입니다. 공식
          문서는 <strong>gsap.matchMedia()를 gsap.context()의 특수화된 wrapper로 생각하라</strong>고 하고,{' '}
          <strong>matchMedia 객체에 revert()를 부르는 것은 gsap.context()에 부르는 것과 같다</strong>고 덧붙입니다. handler가 받는 인자
          이름이 <code>context</code>인 것도 그래서입니다.
        </p>
      </div>

      <div className="responsive-page__note responsive-page__note--probe">
        <h3>공식 문서에 없는 것 하나 — revert()를 직접 부를 때</h3>
        <p>
          공식 페이지는 반환한 cleanup 함수가 <strong>"조건이 더 이상 매치되지 않을 때"</strong> 불린다고만 적었습니다. 설치본에서
          확인하면 <code>mm.revert()</code>를 직접 부를 때도 같은 함수가 불리고, 그 시점에 handler가 만든 tween의 값도 원래대로
          돌아갑니다. 조건 변화든 수동 revert든 정리 경로가 하나라는 뜻입니다.
        </p>
        <p className="responsive-page__provenance">
          이 항목은 공식 페이지에 게시돼 있지 않습니다. GSAP 3.15.0을 직접 실행해 확인한 내용입니다. 실행 순서도 함께 확인했습니다 —
          정리가 먼저이고 재실행이 나중입니다.
        </p>
      </div>
    </section>
  )
}
