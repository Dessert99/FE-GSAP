/** cleanup function과 revert()의 영구성·재사용, 그리고 Context가 제어 도구가 아니라는 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { RevertKillLab } from '../../examples/RevertKillLab/RevertKillLab'

// 공식이 게시한 cleanup function 예제 원문 — 함수를 return하는 형태 자체가 계약이다
const cleanupExample = `let ctx = gsap.context(() => {
  ...
  return () => {
    // my custom cleanup code. Called when ctx.revert() is triggered.
  };
});`

export function RevertLifetimeSection() {
  return (
    <section id="revert-lifetime" className="context-page__section" aria-labelledby="revert-lifetime-title">
      <SectionHeading
        number="05"
        id="revert-lifetime"
        title="되돌림은 언제 끝나고 무엇을 남기나"
        description="revert()를 부른 뒤 그 Context는 어떻게 되는지, 그리고 GSAP이 모르는 내 정리 코드는 어디에 적어야 하는지를 정리합니다."
      />

      <div className="context-page__subheading">
        <h3>GSAP이 모르는 정리는 내가 적는다</h3>
        <p>Context는 GSAP 작업만 압니다. 그 밖의 것은 내가 알려 줘야 합니다.</p>
      </div>

      <div className="context-page__prose">
        <p>
          Context 함수에서 <strong>함수를 하나 return</strong>하면 그것이 "cleanup function"이 됩니다. 공식 문장으로는, context가
          revert될 때 불려야 할 cleanup function을 선택적으로 return할 수 있고 거기에 직접 만든 정리 코드를 담을 수 있습니다.
        </p>
      </div>

      <pre className="context-page__code">
        <code>{cleanupExample}</code>
      </pre>

      <div className="context-page__prose">
        <p>
          이 자리는 GSAP이 자동으로 되돌리지 못하는 것들을 위한 곳입니다. 직접 등록한 event listener, 타이머, 외부 라이브러리
          인스턴스 같은 것들입니다.
        </p>
        <p>
          공식은 범위도 함께 밝혀 두었습니다 — <strong>어떤 <code>.add()</code> 함수에서도</strong> cleanup function을 return할 수
          있고, Context의 <code>revert()</code>가 호출될 때 <strong>그것들이 모두</strong> 불립니다. 앞 단계에서 등록한 클릭
          handler에서도 정리 코드를 돌려줄 수 있다는 뜻입니다.
        </p>
      </div>

      <div className="context-page__subheading">
        <h3>revert()를 부른 뒤 그 Context는 어떻게 되나</h3>
        <p>공식이 Tips에 적어 둔 내용인데, 얼핏 모순처럼 읽히는 부분이 있어 나눠 봅니다.</p>
      </div>

      <div className="context-page__table-wrap">
        <table className="context-page__table">
          <caption>revert() 이후 — 공식 Tips의 주장을 둘로 나눈 것</caption>
          <thead>
            <tr>
              <th scope="col">무엇에 대해</th>
              <th scope="col">공식이 밝힌 결과</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">그때까지 담고 있던 애니메이션</th>
              <td>
                <strong>영구적(permanent)</strong>입니다. 되돌려지고 kill되며, Context는 자신을 비워 그것들이 garbage collection
                대상이 되게 합니다. 그 애니메이션들을 다시 살릴 방법은 없습니다.
              </td>
            </tr>
            <tr>
              <th scope="row">Context 객체 자신</th>
              <td>
                버려지지 않습니다. <strong>그 뒤에도 애니메이션을 더 추가할 수 있고</strong>, 같은 Context에{' '}
                <code>revert()</code>를 <strong>다시</strong> 불러 그 새 애니메이션들을 되돌릴 수 있습니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="context-page__prose">
        <p>
          정리하면 <code>revert()</code>는 <strong>Context를 끝내는 것이 아니라 지금까지의 기록을 확정해 비우는 것</strong>입니다.
          영구적인 대상은 "그 Context"가 아니라 "그때 담겨 있던 애니메이션들"입니다.
        </p>
      </div>

      <div className="context-page__warning">
        <h3>Context는 재생을 제어하는 도구가 아닙니다</h3>
        <p>
          공식이 Tips에서 분명히 선을 긋습니다 — <strong>Context는 애니메이션을 제어하는 수단이 아닙니다. 그것은 Timeline이 할
          일입니다.</strong> Context는 오직 되돌리기·없애기와, 선택적으로 selector text의 범위를 정하는 것만을 위한 것입니다.
        </p>
        <p>
          그래서 Context에는 <code>play()</code>나 <code>pause()</code>, <code>seek()</code> 같은 것이 없습니다. 여러 애니메이션의
          순서와 재생을 다루고 싶다면 Timeline을 쓰고, 그 Timeline을 Context 안에서 만들면 됩니다. 둘은 경쟁 관계가 아니라 층이
          다릅니다.
        </p>
      </div>

      <div className="context-page__note context-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p>
          공식은 <code>revert()</code>와 <code>kill()</code>을 "한 번에 처리하는 방법" 정도로 나란히 언급할 뿐 둘의 차이를 적어
          두지 않았습니다. 실행해 보면 분명히 갈립니다. <code>revert()</code>는 값을 애니메이션 시작 전 상태로 되돌리고{' '}
          <code>isReverted</code>를 <code>true</code>로 만들며 <code>data</code>를 비웁니다. <code>kill()</code>은 값을{' '}
          <strong>현재 자리에 그대로 둔 채</strong> 애니메이션만 없애고 <code>isReverted</code>는 <code>false</code>로 남습니다.{' '}
          <code>kill(true)</code>은 <code>revert()</code>처럼 값까지 되돌립니다.
        </p>
        <p>
          cleanup function도 함께 갈립니다. <code>revert()</code>와 <code>kill(true)</code>은 cleanup function을 부르지만{' '}
          <strong>
            <code>kill()</code>은 부르지 않습니다.
          </strong>{' '}
          그리고 한 번 불린 cleanup function이 두 번째 <code>revert()</code>에서 다시 불리지는 않습니다.
        </p>
        <p className="context-page__provenance">
          측정 방법 · GSAP 3.15.0을 Node에서 import해 같은 조건의 Context 세 개를 만들고 각각 <code>revert()</code>,{' '}
          <code>kill()</code>, <code>kill(true)</code>로 끝냈습니다. 대상은 DOM이 아니라 일반 객체{' '}
          <code>{'{ v: 0 }'}</code>이고 <code>ease: 'none'</code>으로 100까지 보간한 뒤 <code>progress(1)</code>로 끝까지 옮긴
          상태에서 호출했습니다. 결과는 순서대로 값 0/100/0, <code>isReverted</code> true/false/true, cleanup 호출 1/0/1회였고{' '}
          <code>data.length</code>는 셋 다 0이었습니다.
        </p>
      </div>

      <RevertKillLab />
    </section>
  )
}
