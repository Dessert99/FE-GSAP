/** 만든 곡선을 SVG path 문자열로 꺼내는 getSVGData의 인자와 사용처를 설명한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const officialGraphCode = `//create a CustomEase with an ID of "hop"
CustomBounce.create("myBounce", {
  strength: 0.6,
  squash: 3,
  squashID: "myBounce-squash",
});

//draw the ease visually in the SVG that has an ID of "ease" at 500px by 400px:
CustomEase.getSVGData("myBounce", { width: 500, height: 400, path: "#ease" });`

/** 공식 문장이 예시로 든 vars 네 개를 역할별로 나눠 옮긴다. */
const graphVars = [
  { name: 'width', detail: '곡선을 그릴 상자의 가로 크기입니다. 진행률 0이 왼쪽 끝, 1이 오른쪽 끝이 됩니다.' },
  { name: 'height', detail: '상자의 세로 크기입니다. ease 출력값 1이 위쪽 끝, 0이 아래쪽 끝이 됩니다.' },
  { name: 'x', detail: '상자를 가로로 얼마나 밀어 둘지 정합니다.' },
  { name: 'y', detail: '상자를 세로로 얼마나 밀어 둘지 정합니다.' },
  {
    name: 'path',
    detail: '여기에 SVG path element를 지정하면 반환값을 받지 않고도 그 element의 d attribute를 대신 채워 줍니다.',
  },
]

export function CurveGraphSection() {
  return (
    <section id="curve-graph" className="bounce-wiggle-page__section" aria-labelledby="curve-graph-title">
      <SectionHeading
        number="05"
        id="curve-graph"
        title="만든 곡선을 SVG로 꺼내 본다"
        description="곡선을 설정값으로 만들었으니 눈으로 확인할 방법이 필요합니다. CustomBounce는 CustomEase의 그리기 method를 그대로 공유합니다."
      />

      <div className="bounce-wiggle-page__split">
        <div className="bounce-wiggle-page__prose">
          <p>
            공식 문서의 설명입니다. CustomBounce는 <strong>어떤 ease든 정한 크기로 시각화하는 SVG <code>&lt;path&gt;</code> data
            문자열을 계산하는 CustomEase의 method를 공유</strong>합니다.
          </p>
          <p>
            무엇을 넘길 수 있는지도 명시돼 있습니다. <strong>CustomEase 인스턴스, 그와 연결된 ID, 심지어{' '}
            <code>Power2.easeOut</code> 같은 표준 ease</strong>까지 받습니다. 그래서 이 페이지의 예제는 방금 만든 이름을 그대로
            다시 넘겨 곡선을 받습니다.
          </p>
          <p>
            이름을 만들어 두는 것의 이점이 여기서 드러납니다. <strong>Tween에 쓰는 이름과 그림을 그리는 이름이 같기 때문에</strong>{' '}
            둘이 어긋날 수 없습니다.
          </p>
        </div>
        <pre className="bounce-wiggle-page__code">
          <code>{officialGraphCode}</code>
        </pre>
      </div>

      <div className="bounce-wiggle-page__table-wrap">
        <table className="bounce-wiggle-page__options-table">
          <caption>getSVGData의 두 번째 인자 · 공식 문서가 예로 든 항목</caption>
          <thead>
            <tr>
              <th scope="col">이름</th>
              <th scope="col">무엇을 정하나</th>
            </tr>
          </thead>
          <tbody>
            {graphVars.map((item) => (
              <tr key={item.name}>
                <th scope="row">
                  <code>{item.name}</code>
                </th>
                <td>{item.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bounce-wiggle-page__note">
        <h3>곡선을 직접 편집하려면</h3>
        <p>
          <code>getSVGData</code>는 원래 CustomEase의 method입니다. CustomBounce 페이지는 <strong>"이 method도 함께 쓸 수
          있다"</strong>는 사실만 밝히고, 곡선 데이터 형식·편집기·직접 그리는 방법은 CustomEase 공식 문서가 다룹니다. 이 페이지는
          그중 <strong>이름을 넘겨 그림을 받는 부분</strong>만 씁니다.
        </p>
        <p>
          위 두 예제의 곡선도 이 method가 돌려준 문자열을 그대로 <code>&lt;path d="…"&gt;</code>에 넣은 것입니다. 그림과 실제
          움직임이 <strong>같은 곡선에서 나온다</strong>는 뜻입니다. ease 곡선을 읽는 법 자체는{' '}
          <a href={toHref('/fundamentals/easing')}>Easing 페이지</a>가 다룹니다.
        </p>
      </div>
    </section>
  )
}
