/** selector·array-like·single input을 toArray()의 같은 출력 모양으로 비교한다. */
import { CollectionNormalizationLab } from '../../examples/CollectionNormalizationLab/CollectionNormalizationLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** 후보를 고르기 전 input 모양을 flat Array로 맞추는 이유를 설명한다. */
export function CollectionNormalizationSection() {
  return (
    <section className="utility-collections-page__section" id="collection-normalization">
      <SectionHeading number="01" title="후보의 모양을 배열 하나로 맞춘다">
        <code>toArray()</code>는 selector, NodeList처럼 여러 개인 값, object 하나를 모두 flat Array라는 한 모양으로 만듭니다. 이후의 선택·순서 코드는 input 종류를 다시 나눌 필요가 없습니다.
      </SectionHeading>
      <div className="utility-collections-page__split">
        <div className="utility-collections-page__prose"><h3>scope는 selector의 검색 울타리입니다</h3><p><code>scope</code>는 selector text를 받았을 때만 의미가 있습니다. document 전체가 아니라 scope Element의 descendant만 찾으므로, 같은 className이 바깥에 있어도 후보로 섞이지 않습니다.</p></div>
        <div className="utility-collections-page__prose"><h3>배열은 값의 내용이 아니라 다루기 쉬운 모양입니다</h3><p>반환값은 항상 Array입니다. 하나의 element나 object도 첫 칸 하나를 가진 Array가 됩니다. 3.15.0 설치본에서 single object를 넣어 이 반환 모양을 별도 probe로 확인했습니다.</p></div>
      </div>
      <div className="utility-collections-page__subheading"><h3>공식 문서의 네 호출 형태</h3><p>아래 예제는 target 종류가 달라도 반환값이 flat Array라는 같은 결과를 보입니다. selector text Array는 comma selector와 같은 결과라는 점도 함께 보존합니다.</p></div>
      <pre className="utility-collections-page__code"><code>{`// selector text → raw elements wrapped in a flat Array
let targets = gsap.utils.toArray('.class')
// raw element or object → one-item Array
targets = gsap.utils.toArray(myElement)
// selector text Array → same as '.class1, .class2'
targets = gsap.utils.toArray(['.class1', '.class2'])
// scope Element의 descendant만 선택
targets = gsap.utils.toArray('.class', myElement)`}</code></pre>
      <p className="utility-collections-page__related"><code>targets</code>는 Object | String | NodeList | Array이고, optional <code>scope</code>는 Element | Ref입니다. scope는 selector text일 때만 도움이 됩니다.</p>
      <CollectionNormalizationLab />
    </section>
  )
}
