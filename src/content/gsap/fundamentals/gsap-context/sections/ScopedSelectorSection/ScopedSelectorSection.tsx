/** Context의 두 번째 인자 하나가 함수 안 모든 선택자의 범위를 정한다는 두 번째 이점을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { ScopedSelectorLab } from '../../examples/ScopedSelectorLab/ScopedSelectorLab'

// 공식이 게시한 scope 예제 원문 — 주석까지 그대로 두어야 두 번째 인자의 역할이 드러난다
const scopeExample = `let ctx = gsap.context(() => {
  gsap.to(".box", {...}) // <- normal selector text, automatically scoped to myRefOrElement
  gsap.from(".circle", {...});
}, myRefOrElement); // <- scope!!!`

// scope 자리에 넣을 수 있는 값들 — 공식이 문장으로 열거한 그대로다
const scopeKinds = [
  { kind: 'Element', note: '실제 DOM element를 그대로 넘깁니다.' },
  { kind: 'selector text', note: '".myClass"처럼 문자열로 넘겨도 됩니다.' },
  { kind: 'React Ref', note: 'useRef로 만든 ref 객체를 그대로 넘깁니다.' },
  { kind: 'Angular ElementRef', note: 'Angular의 ElementRef를 그대로 넘깁니다.' },
]

export function ScopedSelectorSection() {
  return (
    <section id="scoped-selector" className="context-page__section" aria-labelledby="scoped-selector-title">
      <SectionHeading
        number="02"
        id="scoped-selector"
        title="선택자를 한 영역 안에 가둔다"
        description="Context의 두 번째 능력은 정리와 아무 상관이 없습니다. 함수 안에서 쓰는 모든 선택자가 뒤질 수 있는 범위를 한 번에 정하는 일입니다."
      />

      <div className="context-page__prose">
        <p>
          앞 단계에서 다룬 것은 <strong>모아서 되돌리기</strong>였습니다. 여기서 다루는 것은 그것과 별개인{' '}
          <strong>범위 지정</strong>입니다. 공식 문서도 이 둘을 "두 가지 이점"으로 나란히, 그러나 따로 소개합니다. 두 번째 이점은{' '}
          <strong>선택 사항</strong>이라는 점도 함께 적혀 있습니다. scope를 넘기지 않아도 Context는 잘 동작합니다.
        </p>
        <p>
          문제는 이렇습니다. <code>gsap.to('.box', ...)</code>라고 쓰면 GSAP은 <strong>문서 전체</strong>에서{' '}
          <code>.box</code>를 찾습니다. 그런데 같은 컴포넌트를 화면에 세 번 그렸다면 <code>.box</code>도 세 벌 있습니다. 내가
          움직이려던 것은 그중 한 벌뿐인데 말입니다.
        </p>
      </div>

      <div className="context-page__subheading">
        <h3>두 번째 인자 하나가 답입니다</h3>
        <p>공식 예제입니다. 주석에 붙은 화살표가 하는 말이 전부입니다.</p>
      </div>

      <pre className="context-page__code">
        <code>{scopeExample}</code>
      </pre>

      <div className="context-page__prose">
        <p>
          공식 문장을 옮기면, Element나 React Ref나 Angular ElementRef를 넘기면 그 함수 안의 <strong>모든</strong> selector
          text가 그 Element/Ref로 scope되고, <strong>그 자손(descendant)에만</strong> 적용됩니다. 공식은 이 효과를 "움직이고 싶은
          element마다 Ref를 만들 필요가 없어진다"는 말로 정리합니다.
        </p>
        <p>
          여기서 <strong>자손</strong>이라는 단어가 중요합니다. scope로 넘긴 element <em>자신</em>이 아니라 그 <em>안에</em> 있는
          element들이 대상입니다. 컨테이너를 scope로 넘기고 그 컨테이너 자체를 선택자로 잡으려 하면 찾히지 않습니다.
        </p>
      </div>

      <div className="context-page__table-wrap">
        <table className="context-page__table">
          <caption>scope 자리에 넣을 수 있는 것 — 공식이 열거한 네 가지</caption>
          <thead>
            <tr>
              <th scope="col">넘길 수 있는 값</th>
              <th scope="col">설명</th>
            </tr>
          </thead>
          <tbody>
            {scopeKinds.map((item) => (
              <tr key={item.kind}>
                <th scope="row">
                  <code>{item.kind}</code>
                </th>
                <td>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="context-page__warning">
        <h3>Vue 3 Composition API에서는 ref 객체를 넘기지 마세요</h3>
        <p>
          공식 문서가 따로 적어 둔 주의입니다. Vue 3 Composition API의 ref를 쓸 때는 ref 객체 자체가 아니라{' '}
          <strong>
            <code>onMounted()</code> 이후의 DOM element(<code>container.value</code>)
          </strong>
          를 넘겨야 합니다. React Ref와 Angular ElementRef는 객체를 그대로 넘겨도 되지만 Vue는 다릅니다.
        </p>
      </div>

      <ScopedSelectorLab />
    </section>
  )
}
