/** getProperty()의 반환 형식·조회 순서·호출 형태를 읽기 도구 하나로 묶어 설명한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { PropertyReadout } from '../../examples/PropertyReadout/PropertyReadout'

// 공식 문서가 밝힌 DOM element 조회 순서 — 먼저 찾는 즉시 그 값을 돌려준다
const lookupOrder = [
  { step: '1', label: 'element의 inline CSS', detail: 'style 속성에 직접 적힌 값입니다.' },
  { step: '2', label: 'element의 .getComputedStyle() CSS', detail: '스타일시트까지 반영된 계산된 값입니다.' },
  { step: '3', label: 'element 자체의 property', detail: 'element.property로 접근하는 값입니다.' },
  { step: '4', label: 'element의 attribute', detail: 'element.getAttribute(property)로 얻는 값입니다.' },
]

// unit 인자를 넘겼는지에 따라 갈리는 반환 형식 — 공식 첫 코드 블록이 그대로 보여주는 세 줄이다
const returnShapes = [
  {
    id: 'number',
    call: 'gsap.getProperty("#id", "x")',
    result: '20',
    type: 'number',
    why: 'unit을 생략하면 숫자로 돌려줍니다. parseFloat()이 숫자를 주는 단순한 값에 한합니다.',
  },
  {
    id: 'string',
    call: 'gsap.getProperty("#id", "x", "px")',
    result: '"20px"',
    type: 'string',
    why: 'unit을 넘기면 그 단위가 숫자에 붙어 문자열이 됩니다.',
  },
  {
    id: 'color',
    call: 'gsap.getProperty("#id", "backgroundColor")',
    result: '"rgb(255, 128, 0)"',
    type: 'string',
    why: '애초에 숫자로 바꿀 수 없는 값은 그대로 문자열로 돌아옵니다.',
  },
]

export function ReadCurrentValueSection() {
  return (
    <section id="read-current-value" className="hfu-page__section" aria-labelledby="read-current-value-title">
      <SectionHeading
        number="02"
        id="read-current-value"
        title="지금 값이 얼마인지부터 읽는다"
        description="빠르게 쓰기 전에 읽기부터 봅니다. gsap.getProperty()는 아무것도 움직이지 않고, 대상이 지금 가진 값을 돌려주기만 합니다."
      />

      <div className="hfu-page__prose">
        <p>
          <code>gsap.getProperty()</code>는 <strong>아무 property의 현재 값이나 쉽게 가져오는 방법</strong>입니다. 공식 문서의 반환
          표기는 <code>Returns : *</code>인데, 이 별표는 <strong>돌려주는 타입이 하나로 정해져 있지 않다</strong>는 뜻입니다. 무엇을
          어떻게 요청했는지에 따라 숫자가 오기도 하고 문자열이 오기도 합니다.
        </p>
        <p>
          규칙은 짧습니다. <strong>요청한 property의 값을 가능하면 number로 돌려주고, unit을 지정하면 그 unit이 숫자에 붙어 string이
          됩니다.</strong> 그리고 <strong>값이 존재하지 않으면 null을 돌려줍니다.</strong> 공식 문서 첫 코드 블록 세 줄이 이 규칙을
          그대로 보여줍니다.
        </p>
      </div>

      <div className="hfu-page__table-wrap">
        <table className="hfu-page__rules-table">
          <caption>공식 문서 첫 코드 블록 — 같은 함수가 돌려주는 세 가지 형식</caption>
          <thead>
            <tr>
              <th scope="col">호출</th>
              <th scope="col">돌아오는 값</th>
              <th scope="col">타입</th>
              <th scope="col">왜 이 형식인가</th>
            </tr>
          </thead>
          <tbody>
            {returnShapes.map((shape) => (
              <tr key={shape.id}>
                <th scope="row">
                  <code>{shape.call}</code>
                </th>
                <td>
                  <code>{shape.result}</code>
                </td>
                <td>{shape.type}</td>
                <td>{shape.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="hfu-page__subheading">
        <h3>왜 숫자를 먼저 주나요</h3>
        <p>공식 문서가 이유를 직접 밝혀 둔 몇 안 되는 자리입니다.</p>
      </div>

      <div className="hfu-page__prose">
        <p>
          <code>top</code>이나 <code>left</code>, <code>x</code>는 기술적으로 <code>"20px"</code>입니다. 그런데 unit 인자를 생략하면
          단위 없는 <code>20</code>이 돌아옵니다. 공식 문서의 설명은 이렇습니다. <strong>애니메이션에서 숫자를 다루는 일이 아주
          흔해서</strong>, 실무에서 <code>"20px"</code> 같은 값을 받아 매번 <code>parseFloat()</code>으로 감싸는 것이 번거롭기
          때문입니다. 단위가 필요하면 그때만 세 번째 인자로 요청하면 됩니다.
        </p>
      </div>

      <div className="hfu-page__subheading">
        <h3>DOM element는 네 곳을 순서대로 뒤집니다</h3>
        <p>"현재 값"이 한 곳에만 있는 게 아니기 때문에 찾는 순서가 정해져 있습니다. 먼저 찾는 즉시 그 값을 돌려줍니다.</p>
      </div>

      <ol className="hfu-page__steps">
        {lookupOrder.map((item) => (
          <li key={item.step}>
            <span>{item.step}</span>
            <div>
              <strong>{item.label}</strong>
              <p>{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="hfu-page__note">
        이 순서 덕분에 <code>gsap.getProperty(rect, 'width')</code> 한 줄이 CSS의 <code>width</code>든 SVG <code>&lt;rect&gt;</code>의{' '}
        <code>width</code> attribute든 상관없이 값을 찾아냅니다. attribute와 CSS가 어떻게 다른 채널인지는{' '}
        <a href={toHref('/fundamentals/non-css-target-values')}>CSS가 아닌 값 페이지</a>가 다룹니다.
      </p>

      <div className="hfu-page__subheading">
        <h3>target과 호출 형태</h3>
        <p>무엇을 읽을 대상으로 넘길 수 있고, 반복해 읽을 때는 어떤 문법이 있는지 봅니다.</p>
      </div>

      <div className="hfu-page__prose">
        <p>
          target에는 <strong>selector text와 element를 모두</strong> 넘길 수 있습니다. 그리고 <code>"em"</code> 같은 특정 unit으로
          변환도 됩니다. 공식 Examples 절이 세 줄로 보여줍니다.
        </p>
      </div>

      <pre className="hfu-page__code">
        <code>{`let w = gsap.getProperty("#id", "width"); //you can use selector text
let bgColor = gsap.getProperty(element, "backgroundColor");

// convert into a specific unit, like em
let emWidth = gsap.getProperty(element, "width", "em");`}</code>
      </pre>

      <div className="hfu-page__prose">
        <p>
          여기서 한 가지가 더 있습니다. <strong>property 인자를 생략하면</strong> 값이 아니라 <strong>getter 함수</strong>가
          돌아옵니다. 그 함수는 같은 target의 property를 반복해 가져올 때 재사용합니다. 고빈도 갱신 안에서 같은 대상을 여러 번 읽어야
          한다면, 이 형태가 바로 다음 단계에서 볼 <code>quickSetter</code>·<code>quickTo</code>와 같은 발상입니다.{' '}
          <strong>대상 해석을 미리 한 번만 하고, 이후에는 함수만 부릅니다.</strong>
        </p>
      </div>

      <pre className="hfu-page__code">
        <code>{`let getter = gsap.getProperty("#id");
var x = getter("x"),
  y = getter("y", "em"); //in em units`}</code>
      </pre>

      <PropertyReadout />

      <div className="hfu-page__note hfu-page__note--probe">
        <h3>공식 문서에 없는 경계 — 직접 실행해 확인한 것</h3>
        <p>
          위의 문장들은 모두 <strong>DOM element</strong>를 기준으로 적혀 있습니다. GSAP은 일반 JavaScript 객체도 target으로 받는데,
          그때 어떻게 되는지는 공식 페이지에 없습니다. 그래서 설치본 GSAP 3.15.0을 Node에서 직접 실행해 확인했습니다.
        </p>
        <ul className="hfu-page__list">
          <li>
            <code>gsap.getProperty({'{ x: 5 }'}, 'x', 'px')</code> → <code>5</code> (<code>number</code>). 일반 객체에서는{' '}
            <strong>unit 인자가 무시</strong>됩니다.
          </li>
          <li>
            <code>gsap.getProperty({'{ x: 5 }'}, 'nope')</code> → <code>undefined</code>. 공식 문장의 <code>null</code>은 DOM 조회
            순서를 모두 지나친 뒤의 결과입니다.
          </li>
          <li>
            반면 <code>gsap.quickSetter(obj, 'x', 'px')(42)</code>는 일반 객체에도 단위를 붙여 <code>"42px"</code> 문자열을 씁니다.
            읽기와 쓰기의 unit 처리가 서로 다릅니다.
          </li>
        </ul>
        <p className="hfu-page__provenance">
          측정 방법 · <code>node --input-type=module</code>에서 <code>gsap</code>을 import하고 위 세 줄을 그대로 실행해 반환값과{' '}
          <code>typeof</code>를 읽었습니다. 재현 조건은 GSAP 3.15.0, Node v22.21.0, DOM 없는 환경입니다. DOM element에 대한 동작은 이
          실행으로 확인할 수 없으므로 공식 문장을 그대로 따릅니다.
        </p>
      </div>
    </section>
  )
}
