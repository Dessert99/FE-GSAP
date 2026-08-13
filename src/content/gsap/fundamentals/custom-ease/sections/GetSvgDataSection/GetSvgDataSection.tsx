/** getSVGData()가 무엇을 받아 무엇을 돌려주는지 정리하고 공식 예제와 실행 확인 사실을 분리해 표시한다. */
import { EaseGraphLab } from '../../examples/EaseGraphLab/EaseGraphLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 문서가 게시한 인자와, 게시하지 않아 실행으로 확인한 기본값을 근거와 함께 한 행씩 대조하는 표 데이터
const configRows = [
  {
    id: 'ease',
    name: '첫 번째 인자',
    type: 'CustomEase · ease의 ID · 표준 ease 이름',
    fallback: '공식 페이지에 명시 없음',
    note: 'CustomEase, 그 곡선의 ID, 또는 power2 같은 표준 ease를 받습니다.',
  },
  {
    id: 'width',
    name: 'width',
    type: '숫자',
    fallback: '100 (실행 확인)',
    note: '그래프의 가로 크기입니다. 공식 예제는 500을 씁니다.',
  },
  {
    id: 'height',
    name: 'height',
    type: '숫자',
    fallback: '100 (실행 확인)',
    note: '그래프의 세로 크기입니다. 공식 예제는 400을 씁니다.',
  },
  {
    id: 'x',
    name: 'x',
    type: '숫자',
    fallback: '공식 페이지에 명시 없음',
    note: '그래프를 오른쪽으로 미는 여백입니다. 공식 설명은 "{width: 500, height: 400, x: 10, y: 50} 같은" 형태만 보여 줍니다.',
  },
  {
    id: 'y',
    name: 'y',
    type: '숫자',
    fallback: '공식 페이지에 명시 없음',
    note: '그래프를 아래로 미는 여백입니다.',
  },
  {
    id: 'path',
    name: 'path',
    type: 'path element를 가리키는 값',
    fallback: '공식 페이지에 명시 없음',
    note: '넣어 주면 그 element의 d attribute를 GSAP이 대신 채웁니다. 공식 예제는 "#ease"를 넘깁니다.',
  },
]

// 공식 .getSVGData() 절이 게시한 예제 원문
const officialExample = `//create a CustomEase with an ID of "hop"
CustomEase.create(
  "hop",
  "M0,0 C0,0 0.056,0.445 0.175,0.445 0.294,0.445 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0"
);

//draw the ease visually in the SVG that has an ID of "ease" at 500px by 400px:
CustomEase.getSVGData("hop", { width: 500, height: 400, path: "#ease" });`

export function GetSvgDataSection() {
  return (
    <section id="get-svg-data" className="custom-ease-page__section" aria-labelledby="get-svg-data-title">
      <SectionHeading
        number="06"
        id="get-svg-data"
        title="만든 곡선을 그림으로 되돌려 봅니다"
        description="곡선을 문자열로 적었으니 반대 방향도 필요합니다. getSVGData()는 어떤 ease든 화면에 그릴 수 있는 <path> 데이터로 바꿔 줍니다."
      />

      <div className="custom-ease-page__prose">
        <p>
          공식 문서의 정의는 이렇습니다. CustomEase에는 <code>getSVGData()</code> 메서드가 있어서,{' '}
          <strong>어떤 ease든 내가 정한 크기로 그래프처럼 그릴 SVG <code>&lt;path&gt;</code> 데이터 문자열을 계산해 줍니다.</strong>{' '}
          크기는 <code>{'{width: 500, height: 400, x: 10, y: 50}'}</code> 같은 형태로 넘깁니다.
        </p>
        <p>
          중요한 것은 <strong>넘길 수 있는 대상의 범위</strong>입니다. 내가 만든 CustomEase나 그 ID뿐 아니라{' '}
          <code>"power2"</code> 같은 <strong>표준 ease도 그대로 받습니다.</strong> 그래서 팀에서 쓰는 ease를 커스텀이든 표준이든 한
          화면에 나란히 그릴 수 있습니다.
        </p>
        <p>
          그리고 편의 기능이 하나 더 있습니다. vars 객체에 <code>path</code>를 넣어 주면 그 element의 <code>d</code> attribute를 GSAP이
          대신 채워 줍니다. 아래 예제는 곡선을 만들고 <code>#ease</code> path에 결과를 넣는 순서를 보여 줍니다.
        </p>
      </div>

      <pre className="custom-ease-page__code">
        <code>{officialExample}</code>
      </pre>

      <div className="custom-ease-page__table-wrap">
        <table className="custom-ease-page__rules-table">
          <caption>getSVGData()에 넘기는 값과 역할</caption>
          <thead>
            <tr>
              <th scope="col">이름</th>
              <th scope="col">타입</th>
              <th scope="col">기본값</th>
              <th scope="col">역할</th>
            </tr>
          </thead>
          <tbody>
            {configRows.map((row) => (
              <tr key={row.id}>
                <th scope="row">
                  <code>{row.name}</code>
                </th>
                <td>{row.type}</td>
                <td>{row.fallback}</td>
                <td>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="custom-ease-page__note custom-ease-page__note--probe">
        <h3>반환값과 기본 크기</h3>
        <p>
          GSAP 3.15.0에서 확인한 결과, 이
          메서드는 계산한 <strong>d 문자열을 그대로 반환</strong>했고, <code>width</code>와 <code>height</code>를 생략하면{' '}
          <strong>100 × 100</strong>이 쓰였습니다(<code>{'{}'}</code>만 넘겼을 때 결과가 <code>M0,100 C0,100 50,0 100,0</code>).{' '}
          <code>path</code>를 함께 넘겨도 반환값은 똑같이 나오므로, 둘 중 편한 쪽을 쓰면 됩니다.
        </p>
      </div>

      <EaseGraphLab />
    </section>
  )
}
