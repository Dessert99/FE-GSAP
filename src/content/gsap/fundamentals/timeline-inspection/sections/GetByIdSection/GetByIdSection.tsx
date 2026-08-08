/** getById의 공식 계약과 중복 id·타입 엄격 비교의 실행 차이를 분리한다. */
import { IdLookupLab } from '../../examples/IdLookupLab/IdLookupLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function GetByIdSection() {
  return (
    <section id="get-by-id" className="inspect-page__section" aria-labelledby="get-by-id-title">
      <SectionHeading number="03" id="get-by-id" title="이름표 하나로 집어낸다" description="animation을 만들 때 vars.id를 붙이면 변수 참조를 멀리 전달하지 않고도 이 Timeline의 descendant에서 다시 찾을 수 있다." />
      <pre className="inspect-page__signature"><code>getById(id:String) : Animation</code></pre>
      <div className="inspect-page__split">
        <div className="inspect-page__prose"><h3>공식 설명</h3><p>일치하는 id를 가진 “첫 번째 descendant” Tween 또는 Timeline을 돌려줍니다. React와 build tool 환경처럼 변수를 계속 추적하기 어려울 때 특히 유용하다고 안내합니다.</p></div>
        <pre className="inspect-page__code"><code>{`var tl = gsap.timeline();
// give the animation a "myTween" id upon creation
tl.to(obj, { id: "myTween", duration: 1, x: 100 });
var myTween = tl.getById("myTween");`}</code></pre>
      </div>
      <IdLookupLab />
    </section>
  )
}
