/** to·from·fromTo·set의 인자 모양과 시작값·끝값·즉시 render 차이를 sequence lab과 연결한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { SequenceBuilderLab } from '../../examples/SequenceBuilderLab/SequenceBuilderLab'

// 네 creator가 같은 target을 서로 다른 값 계약으로 다루는 최소 호출이다
const creatorCalls = `timeline
  .to(target, { x: 100, duration: 1 })
  .from(target, { autoAlpha: 0, duration: 1 })
  .fromTo(target, { scale: 0.8 }, { scale: 1, duration: 1 })
  .set(target, { color: 'tomato' })`

// 공식 페이지가 편의 메서드와 add() 형태가 같은 결과라고 설명한 구조다
const convenienceCalls = `const tween = gsap.to(element, { duration: 1, x: 100, opacity: 0.5 })
timeline.add(tween)

// 위 두 줄과 같은 결과
timeline.to(element, { duration: 1, x: 100, opacity: 0.5 })`

// 네 creator 페이지가 공통으로 싣는 chaining 예제를 주석·값 불일치까지 그대로 보존한다
const officialChaining = `const timeline = gsap.timeline({ onComplete: myFunction })
timeline.from(element, { duration: 1, x: -100 })
  .to(element, { duration: 1, y: 50 })
  // then set element's opacity to 0.5 immediately
  .set(element, { opacity: 0 })
  .call(otherFunction)
  .to('.myClass', { duration: 1.5, rotation: 45, stagger: 0.25 })`

export function ChildCreatorsSection() {
  return (
    <section id="child-creators" className="timeline-page__section" aria-labelledby="child-creators-title">
      <SectionHeading number="04" id="child-creators" title="안을 채우는 네 메서드 · to · from · fromTo · set" description="네 메서드는 Tween을 만들고 같은 Timeline에 넣은 뒤 self를 돌려줘 다음 호출을 계속 이어 붙입니다." />

      <div className="timeline-page__table-wrap">
        <table className="timeline-page__table">
          <caption>Timeline child creator 네 가지</caption>
          <thead><tr><th scope="col">메서드</th><th scope="col">signature</th><th scope="col">값의 의미</th></tr></thead>
          <tbody>
            <tr><th scope="row"><code>to()</code></th><td><code>to(target, vars, position) : self</code></td><td>현재 값 → vars의 끝 값</td></tr>
            <tr><th scope="row"><code>from()</code></th><td><code>from(target, vars, position) : self</code></td><td>vars의 시작 값 → 현재 값</td></tr>
            <tr><th scope="row"><code>fromTo()</code></th><td><code>fromTo(target, fromVars, toVars, position) : self</code></td><td>명시한 시작 값 → 명시한 끝 값</td></tr>
            <tr><th scope="row"><code>set()</code></th><td><code>set(target, vars, position) : self</code></td><td>playhead가 닿을 때 duration 0으로 즉시 설정</td></tr>
          </tbody>
        </table>
      </div>

      <div className="timeline-page__prose">
        <p><code>to</code>·<code>from</code>·<code>fromTo</code>의 target은 Object·Array·CSS selector text이며 selector 문자열은 <code>document.querySelectorAll()</code>로 전달됩니다. <code>set()</code> 페이지의 target 설명에는 selector 문장이 따로 없습니다.</p>
        <p>position 기본은 네 메서드 모두 <code>&quot;+=0&quot;</code>, 즉 현재 Timeline 끝입니다. 없는 label을 position으로 쓰면 그 label이 끝에 생기고, 반환은 모두 self라 chaining할 수 있습니다.</p>
      </div>

      <pre className="timeline-page__code"><code>{creatorCalls}</code></pre>
      <pre className="timeline-page__code"><code>{officialChaining}</code></pre>

      <div className="timeline-page__split">
        <article><h3>편의 메서드가 줄이는 것</h3><pre className="timeline-page__code"><code>{convenienceCalls}</code></pre><p>각 공식 페이지는 <code>add(gsap.*(...))</code>와 Timeline creator가 같은 결과를 만든다고 설명합니다.</p></article>
        <article><h3>fromTo의 special property 위치</h3><pre className="timeline-page__code"><code>{`timeline.fromTo(
  target,
  { x: -100 },
  { x: 100, duration: 1, ease: 'power2.out' },
)`}</code></pre><p><code>duration</code>·<code>ease</code>·<code>delay</code>는 fromVars가 아니라 toVars에 둡니다.</p></article>
      </div>

      <div className="timeline-page__warning">
        <h3>from·fromTo는 먼저 쓰고, set은 기다립니다</h3>
        <p>공식 문서에서 <code>from()</code>과 <code>fromTo()</code>의 <code>immediateRender</code> 기본은 true라 delay와 무관하게 시작 상태를 즉시 render합니다. <code>set()</code>의 기본은 false라 playhead가 해당 위치에 닿을 때까지 기다립니다. 실행 probe에서도 future from은 값을 먼저 썼고 future set은 쓰지 않았습니다.</p>
      </div>

      <div className="timeline-page__warning">
        <h3>공식 chaining 예제의 주석과 값이 다릅니다</h3>
        <p>to·from·fromTo·set 네 페이지는 같은 예제를 싣습니다. 주석은 opacity를 <code>0.5</code>로 설정한다고 쓰지만 바로 아래 코드는 <code>{'{ opacity: 0 }'}</code>입니다. 원문 불일치라 임의로 한쪽에 맞추지 않습니다.</p>
      </div>

      <div className="timeline-page__note">
        <h3>set() 공식 설명 두 문장을 함께 보존합니다</h3>
        <p>페이지 첫 설명은 <code>add(gsap.to(target, {'{'} duration: 0, ... {'}'}))</code>와 같다고 적고, Details 예제는 <code>add(gsap.set(...))</code>와 같다고 적습니다. 둘 다 공식 페이지에 있는 표현이라 한쪽을 지우지 않습니다.</p>
      </div>

      <div className="timeline-page__note timeline-page__note--probe">
        <h3>여덟 호출 모두 같은 Timeline을 반환했습니다</h3>
        <p>to·from·fromTo·set을 position 있이·없이 실행한 8개 조합이 모두 <code>=== timeline</code>이었습니다. 이는 공식의 “self, chaining을 쉽게 함”을 실행으로 확인한 결과입니다.</p>
      </div>

      <SequenceBuilderLab />
    </section>
  )
}
