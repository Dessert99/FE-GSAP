/** random()의 number·increment·Array overload와 함수 모드를 선택 흐름으로 설명한다. */
import { toHref } from '../../../../../../app/routes'
import { RandomChoiceLab } from '../../examples/RandomChoiceLab/RandomChoiceLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** random 호출에서 지금 값과 나중 함수 중 무엇을 받을지 구분한다. */
export function RandomChoiceSection() {
  return (
    <section className="utility-collections-page__section" id="random-choice">
      <SectionHeading number="02" title="값 하나를 지금 뽑거나 나중에도 뽑는다">
        <code>random()</code>은 number range 또는 후보 Array에서 하나를 고릅니다. 마지막 <code>true</code>는 값을 당장 받는 대신, 같은 규칙으로 계속 뽑을 수 있는 function을 받겠다는 선택입니다.
      </SectionHeading>
      <div className="utility-collections-page__table-wrap"><table className="utility-collections-page__table"><thead><tr><th>입력</th><th>즉시 반환</th><th><code>true</code>를 주면</th></tr></thead><tbody><tr><th><code>min, max</code></th><td>범위 안 number</td><td>원래 범위에서 다시 뽑는 function</td></tr><tr><th><code>min, max, increment</code></th><td>가장 가까운 increment로 snap한 number</td><td>같은 increment 규칙의 function</td></tr><tr><th><code>array</code></th><td>후보 중 value 하나</td><td>원래 Array에서 다시 뽑는 function</td></tr></tbody></table></div>
      <pre className="utility-collections-page__code"><code>{`// 1) random(minimum, maximum[, snapIncrement, returnFunction])
gsap.utils.random(-100, 100)
gsap.utils.random(0, 500, 5)
const snappedRandom = gsap.utils.random(-200, 500, 10, true)
snappedRandom()

// 2) random(array[, returnFunction])
gsap.utils.random(['red', 'blue', 'green'])
const arrayRandom = gsap.utils.random([0, 100, 200], true)
arrayRandom()

// 3) increment를 생략한 number overload
const rangeRandom = gsap.utils.random(-10, 50, true)
rangeRandom()`}</code></pre>
      <p className="utility-collections-page__related">공식 tip은 reusable function을 <code>pipe()</code>에 결합해 clamp → normalize → interpolate 같은 연속 변환을 만들 수 있다고 설명합니다. 이 페이지는 선택 함수의 반환 경계만 보존합니다.</p>
      <aside className="utility-collections-page__note"><h3>재현 가능한 순서를 보장하는 API가 아닙니다</h3><p>이 문서의 예제는 매 호출 결과가 달라질 수 있습니다. 따라서 자동화 테스트를 추가하지 않고, 학습 화면도 예측한 값을 따로 계산하지 않습니다. 화면에는 runtime이 실제로 뽑은 스냅샷만 표시합니다.</p></aside>
      <RandomChoiceLab />
      <p className="utility-collections-page__related">여러 reusable function을 왼쪽부터 잇는 <code>pipe()</code>의 전체 계약은 <a href={toHref('/fundamentals/utility-pipelines-units')}>계산 함수와 CSS 단위 연결</a> 페이지가 소유합니다.</p>
    </section>
  )
}
