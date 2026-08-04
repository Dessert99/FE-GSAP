/** 값 하나만 받는 함수라는 성질이 만드는 두 가지 조합 — pipe 연결과 여러 값 트릭을 설명한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// "css"·"attr" 트릭으로 되찾는 것과 그 대가를 한 줄씩 대조하는 정적 표의 데이터
const multiValueRows = [
  {
    id: 'css',
    property: '"css"',
    call: 'boxSet({ x: "+=100", y: "random(-100, 100)" })',
    regains: 'CSSPlugin의 이점 — 상대값, "random()" 파싱 등과 여러 property 동시 적용',
  },
  {
    id: 'attr',
    property: '"attr"',
    call: 'circleSet({ cx: "+=100", cy: "random(-100, 100)" })',
    regains: '같은 기법을 attribute에 적용합니다.',
  },
]

export function PipeAndMultiValueSection() {
  return (
    <section id="pipe-and-multi-value" className="hfu-page__section" aria-labelledby="pipe-and-multi-value-title">
      <SectionHeading
        number="06"
        id="pipe-and-multi-value"
        title="값을 다듬어 넣고 여러 property를 한 번에"
        description="두 함수 모두 '숫자 하나를 받아 처리하는 함수'입니다. 이 단순한 형태 덕분에 다른 함수 뒤에 그대로 이어 붙일 수 있습니다."
      />

      <div className="hfu-page__prose">
        <p>
          공식 문서 두 곳이 같은 제목의 절을 갖고 있습니다. <strong>"값을 하나만 받으므로"</strong> <code>gsap.utils.pipe()</code>{' '}
          끝에 붙일 수 있다는 것입니다. <code>pipe()</code>는 함수를 여러 개 이어 붙여, 앞 함수의 결과가 뒤 함수의 입력이 되게 만드는
          utility입니다. 입력값을 다듬는 함수들을 앞에 세우고 맨 뒤에 쓰기 함수를 두면, <strong>"입력을 정리해서 곧장 화면에 쓰는 함수"
          </strong> 하나가 완성됩니다.
        </p>
        <p>
          공식 예제는 <code>clamp(0, 100)</code>으로 범위를 자르고 <code>snap(5)</code>로 5의 배수에 맞춘 뒤 쓰기 함수에 넘깁니다. 두
          문서의 예제가 마지막 한 줄만 다릅니다.
        </p>
      </div>

      <div className="hfu-page__split">
        <div>
          <div className="hfu-page__subheading">
            <h3>quickSetter를 끝에 두면</h3>
            <p>다듬은 값이 즉시 화면에 찍힙니다.</p>
          </div>
          <pre className="hfu-page__code">
            <code>{`let xSetter = gsap.utils.pipe(
    gsap.utils.clamp(0, 100),    //make sure the number is between 0 and 100
    gsap.utils.snap(5),          //snap to the closest increment of 5
    gsap.quickSetter("#id", "x", "px") //apply it to the #id element's x property and append a "px" unit
  );

//then later...
xSetter(150) //sets the #el's transform to translateX(100px) (clamped to 100)
xSetter(3)   //sets it to 5px (snapped)`}</code>
          </pre>
        </div>

        <div>
          <div className="hfu-page__subheading">
            <h3>quickTo를 끝에 두면</h3>
            <p>다듬은 값으로 부드럽게 이동합니다.</p>
          </div>
          <pre className="hfu-page__code">
            <code>{`let xTo = gsap.utils.pipe(
    gsap.utils.clamp(0, 100),    // make sure the number is between 0 and 100
    gsap.utils.snap(5),          // snap to the closest increment of 5
    gsap.quickTo("#id", "x", {duration: 0.8, ease: "power3"})
  );

//then later...
xTo(150) // animates the #el's transform to translateX(100px) (clamped to 100)
xTo(3)   // animates it to 5px (snapped)`}</code>
          </pre>
        </div>
      </div>

      <p className="hfu-page__note">
        <code>xSetter(150)</code>이 <code>100px</code>이 되는 것은 <code>clamp</code>가 잘랐기 때문이고, <code>xSetter(3)</code>이{' '}
        <code>5px</code>가 되는 것은 <code>snap</code>이 5의 배수로 당겼기 때문입니다. 쓰기 함수는 이미 다듬어진 숫자만 받습니다.{' '}
        <code>gsap.utils</code>의 각 함수는 이 페이지가 소유하지 않고, 여기서는 <strong>맨 뒤에 붙일 수 있다</strong>는 사실만
        보존합니다.
      </p>

      <div className="hfu-page__subheading">
        <h3>quickSetter로 여러 값을 한 번에</h3>
        <p>04단계에서 포기했던 편의들을 일부 되찾는 방법이 quickSetter에는 하나 더 있습니다.</p>
      </div>

      <div className="hfu-page__prose">
        <p>
          property 자리에 실제 property 이름 대신 <strong><code>"css"</code></strong>를 두고 값으로 <strong>객체</strong>를 넘기면,
          CSSPlugin의 이점(상대값, <code>"random()"</code> 파싱 등)과 여러 property 동시 적용을 얻습니다. 같은 기법이 attribute에도
          통합니다. 그때는 <code>"attr"</code>을 씁니다.
        </p>
      </div>

      <div className="hfu-page__table-wrap">
        <table className="hfu-page__rules-table">
          <caption>quickSetter의 여러 값 트릭</caption>
          <thead>
            <tr>
              <th scope="col">property 자리에 넣는 값</th>
              <th scope="col">호출 형태</th>
              <th scope="col">되찾는 것</th>
            </tr>
          </thead>
          <tbody>
            {multiValueRows.map((row) => (
              <tr key={row.id}>
                <th scope="row">
                  <code>{row.property}</code>
                </th>
                <td>
                  <code>{row.call}</code>
                </td>
                <td>{row.regains}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre className="hfu-page__code">
        <code>{`var boxSet = gsap.quickSetter("#box", "css");
boxSet({ x: "+=100", y: "random(-100, 100)" }); //works!

var circleSet = gsap.quickSetter("#circle", "attr");
circleSet({ cx: "+=100", cy: "random(-100, 100)" }); //works!`}</code>
      </pre>

      <div className="hfu-page__warning">
        <h3>공짜는 아닙니다</h3>
        <p>
          공식 문서가 곧바로 대가를 밝힙니다. 이 방식은 <code>gsap.quickSetter("#box", "x", "px")</code>처럼{' '}
          <strong>특정 property를 지정할 때만큼의 성능 향상을 주지는 못합니다.</strong> 다만{' '}
          <strong>표준 <code>gsap.set()</code>보다는 여전히 빠릅니다.</strong> 편의를 되찾은 만큼 해석 비용도 함께 돌아왔기
          때문입니다.
        </p>
        <p>
          그리고 이 트릭은 <strong>quickSetter에만</strong> 있습니다. <code>quickTo</code> 문서에는 이런 절이 없고, 오히려{' '}
          <code>attr:</code> 값을 쓸 수 없다고 못 박습니다. attribute를 시간에 따라 움직여야 한다면{' '}
          <a href={toHref('/fundamentals/non-css-target-values')}>CSS가 아닌 값 페이지</a>의 방식대로 일반{' '}
          <a href={toHref('/fundamentals/gsap-to')}>gsap.to()</a>를 쓰세요.
        </p>
      </div>
    </section>
  )
}
