/** distribute()가 즉시 값이 아니라 세 입력을 받는 재사용 함수를 반환함을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function ReturnedFunctionSection() {
  return (
    <section id="returned-function" className="utility-distribute-page__section" aria-labelledby="returned-function-title">
      <SectionHeading number="01" id="returned-function" title="설정은 index를 값으로 바꾸는 함수를 만든다" description="config를 넣는 첫 호출과 index·target·array를 넣는 두 번째 호출을 분리해서 읽어야 합니다." />
      <div className="utility-distribute-page__split">
        <div className="utility-distribute-page__prose">
          <h3>1. 배분 규칙 만들기</h3>
          <pre className="utility-distribute-page__code"><code>{`const distributor = gsap.utils.distribute({\n  amount: 100,\n  from: 'center',\n})`}</code></pre>
          <p><code>distribute(config)</code>의 반환값은 숫자가 아니라 <strong>Function</strong>입니다. 같은 규칙을 모든 target에 재사용할 수 있습니다.</p>
        </div>
        <div className="utility-distribute-page__prose">
          <h3>2. 한 target의 값 구하기</h3>
          <pre className="utility-distribute-page__code"><code>{`const value = distributor(\n  index,\n  target,\n  targets,\n)`}</code></pre>
          <p>공식 예제는 <strong>index, 해당 target, 전체 targets 배열</strong>을 함께 넘깁니다. 위치와 전체 규모가 있어야 상대 거리를 계산할 수 있습니다.</p>
        </div>
      </div>
      <p className="utility-distribute-page__note">공식 종합 예제는 <code>gsap.utils.toArray('.box')</code>로 targets를 만든 뒤 <code>distributor(2, targets[2], targets)</code>를 호출합니다.</p>
    </section>
  )
}
