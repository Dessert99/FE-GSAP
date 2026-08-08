/** target에서 descendant Tween을 역조회하는 공식 nested 인자와 실제 onlyActive 동작 차이를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function GetTweensOfSection() {
  return (
    <section id="get-tweens-of" className="inspect-page__section" aria-labelledby="get-tweens-of-title">
      <SectionHeading number="04" id="get-tweens-of" title="움직이는 대상에서 거꾸로 되짚는다" description="id를 모를 때는 element·object·selector·target 배열을 넘겨 이 Timeline 안에서 그 대상을 움직이는 Tween만 찾는다." />
      <pre className="inspect-page__signature"><code>getTweensOf(target:[Object | Selector text | Array], nested:Boolean) : Array</code></pre>
      <div className="inspect-page__split">
        <div className="inspect-page__prose"><h3>공식 예제</h3><pre className="inspect-page__code"><code>{`// target이 .myClass인 Tween
tl.getTweensOf('.myClass')
// myElem의 Tween, nested Timeline 포함
tl.getTweensOf(myElem, true)`}</code></pre><p>여러 target은 배열이나 selector text로 한 번에 넘길 수 있고, 반환값은 Tween instance 배열입니다.</p></div>
        <div className="inspect-page__warning"><strong>두 번째 인자는 실행과 다릅니다.</strong><p>공식은 <code>nested</code>이며 기본 <code>true</code>라고 쓰지만 GSAP 3.15.0은 <code>onlyActive</code>처럼 동작합니다. <code>true</code>면 현재 active인 Tween만, 숫자면 그 global time에 걸친 Tween만 남고 중첩 탐색은 항상 일어났습니다.</p></div>
      </div>
      <div className="inspect-page__table-wrap"><table className="inspect-page__table"><caption>세 조회 메서드가 답하는 질문</caption><thead><tr><th>메서드</th><th>입력</th><th>반환</th></tr></thead><tbody>
        <tr><th><code>getChildren()</code></th><td>종류·깊이·시각</td><td>Tween + Timeline 목록</td></tr>
        <tr><th><code>getById()</code></th><td>id 하나</td><td>Animation 하나 또는 undefined</td></tr>
        <tr><th><code>getTweensOf()</code></th><td>target</td><td>Tween 목록</td></tr>
      </tbody></table></div>
    </section>
  )
}
