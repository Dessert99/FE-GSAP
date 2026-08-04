/** 선택자 텍스트가 닿는 범위를 좁히는 scope 인자와 기본 scope·덮어쓰기 규칙을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 Scoping selector text 예제 — add()의 셋째 인자로 범위를 준다
const perAddScope = `let mm = gsap.matchMedia();

mm.add("(min-width: 800px)", () => {
  gsap.to(".box", {...}) // <- normal selector text, automatically scoped to myRefOrElement
}, myRefOrElement); // <- scope!!!`

// 공식 default scope 예제 — 만들 때 준 범위를 개별 add가 덮어쓴다
const defaultScope = `let mm = gsap.matchMedia(myRefOrElement);

mm.add("(min-width: 800px)", () => {
  // selector text scoped to myRefOrElement
  gsap.to(".class", {...});
});

mm.add("(max-width: 799px)", () => {
  // selector text scoped to myOtherElement
  gsap.to(".class", {...});
}, myOtherElement); // <- overrides default scope!!!`

export function ScopeSelectorSection() {
  return (
    <section id="scope-selector" className="responsive-page__section" aria-labelledby="scope-selector-title">
      <SectionHeading
        number="05"
        id="scope-selector"
        title="선택자가 닿는 범위를 좁힌다"
        description="handler 안에서 '.box'라고 적으면 문서 전체에서 찾습니다. 같은 클래스 이름이 다른 컴포넌트에도 있다면 그쪽까지 움직입니다."
      />

      <div className="responsive-page__prose">
        <p>
          공식 문장입니다 —{' '}
          <strong>
            셋째 parameter로 Element나 React Ref나 Angular ElementRef를 넘기면 그 함수 안의 모든 선택자 텍스트가 해당 Element/Ref로
            scoped된다.
          </strong>{' '}
          공식 문서는 그 동작을 <strong>그 Element/Ref에 querySelectorAll()을 부르는 것과 같다</strong>고 설명합니다. 문서 전체가 아니라
          그 요소의 자손만 후보가 됩니다.
        </p>
      </div>

      <pre className="responsive-page__code">
        <code>{perAddScope}</code>
      </pre>

      <div className="responsive-page__prose">
        <p>
          받을 수 있는 값의 종류도 적혀 있습니다 —{' '}
          <strong>scope는 ".myClass" 같은 선택자 텍스트 자체일 수도 있고 Element, React Ref, Angular ElementRef일 수도 있다.</strong>{' '}
          React에서는 <code>useRef</code>로 만든 ref를 그대로 넘기면 됩니다.
        </p>
        <p>
          add()마다 같은 범위를 반복해서 적기 싫다면, MatchMedia를 만들 때 한 번만 주면 됩니다. 공식 문장은{' '}
          <strong>MatchMedia를 만들 때 유일한 parameter로 넘기면 기본 scope가 된다</strong>이고, 개별 <code>add()</code>의 scope 인자는{' '}
          <strong>그 기본 scope를 덮어씁니다.</strong>
        </p>
      </div>

      <pre className="responsive-page__code">
        <code>{defaultScope}</code>
      </pre>

      <div className="responsive-page__note">
        <h3>이 페이지의 예제도 그 방식을 씁니다</h3>
        <p>
          위 두 예제는 모두 <code>gsap.matchMedia(scope)</code> 형태로 기본 scope를 주고 있습니다. 그래서 handler 안의{' '}
          <code>'.condition-rebuild-lab__box'</code>가 다른 예제의 사각형까지 잡는 일이 생기지 않습니다. 예제 코드 패널의 첫 줄에서 그
          형태를 확인할 수 있습니다.
        </p>
      </div>
    </section>
  )
}
