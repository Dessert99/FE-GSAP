/** create()의 두 번째 인자에 무엇을 적는지, 좌표의 x·y가 각각 무엇을 뜻하는지 설명한다. */
import { CustomEasePathLab } from '../../examples/CustomEasePathLab/CustomEasePathLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 두 번째 인자로 받아들여지는 형식과 각 형식의 공식 근거를 한 줄씩 대조하는 표 데이터
const formats = [
  {
    id: 'normalized',
    label: '정규화된 path',
    sample: 'M0,0 C0.5,0 0.5,1 1,1',
    meaning: '공식 문서가 "보통 이렇게 쓴다"고 적은 형식입니다. x가 progress 0에서 1, y가 값 0에서 1입니다.',
  },
  {
    id: 'raw',
    label: '아무 크기의 SVG path',
    sample: 'M0,500 C0,500 250,0 500,0',
    meaning:
      'cubic bezier 명령("M", "C", "S", "L", "Z")을 쓰는 path data라면 무엇이든 넘길 수 있고, GSAP이 내부적으로 normalize합니다.',
  },
  {
    id: 'cubic-bezier',
    label: 'cubic-bezier 네 숫자',
    sample: '.17,.67,.83,.67',
    meaning:
      'cubic-bezier.com에서 얻는 것 같은 표준 cubic-bezier() 값도 인식합니다. Ease Visualizer 아래 주황색 입력란에 붙여 넣거나 create()에 바로 넘깁니다.',
  },
]

export function PathDataSection() {
  return (
    <section id="path-data" className="custom-ease-page__section" aria-labelledby="path-data-title">
      <SectionHeading
        number="04"
        id="path-data"
        title="곡선은 path 문자열 하나에 들어 있습니다"
        description="create()의 두 번째 인자가 곡선 자체입니다. 좌표 하나하나가 '시간이 여기쯤일 때 값은 이만큼'이라는 뜻입니다."
      />

      <div className="custom-ease-page__prose">
        <p>
          <strong>SVG path data</strong>는 그림 하나를 문자열로 적는 표기법입니다. <code>M</code>은 펜을 옮기고,{' '}
          <code>C</code>는 제어점 두 개를 써서 곡선을 그립니다. CustomEase는 이 표기법을 그대로 빌려 씁니다. 다만 이 그림은 화면에
          보이는 그림이 아니라 <strong>시간과 값의 관계를 그린 그래프</strong>입니다.
        </p>
        <p>
          그래서 좌표를 읽는 법이 정해집니다. <strong>가로(x)는 progress</strong>, 즉 시간이 얼마나 흘렀는지입니다.{' '}
          <strong>세로(y)는 ease가 내놓는 값</strong>입니다. 공식 문서의 표현으로는 path 문자열이{' '}
          <strong>보통 정규화된 값(0-1)</strong>을 씁니다. x가 0에서 1까지, y도 0(출발점)에서 1(목적지)까지라는 뜻입니다.
        </p>
      </div>

      <figure className="custom-ease-page__diagram">
        <svg viewBox="0 0 240 175" role="img" aria-labelledby="path-data-diagram-title">
          <title id="path-data-diagram-title">
            가로축이 progress 0에서 1, 세로축이 값 0에서 1이고 그 안에 부드러운 S자 곡선이 그려진 좌표계
          </title>
          <path className="custom-ease-page__diagram-axis" d="M40,25 L40,145 L210,145" />
          <path className="custom-ease-page__diagram-curve" d="M40,145 C125,145 125,25 210,25" />
          <text className="custom-ease-page__diagram-label" x="34" y="29" textAnchor="end">
            값 1
          </text>
          <text className="custom-ease-page__diagram-label" x="34" y="149" textAnchor="end">
            값 0
          </text>
          <text className="custom-ease-page__diagram-label" x="40" y="160" textAnchor="middle">
            0
          </text>
          <text className="custom-ease-page__diagram-label" x="210" y="160" textAnchor="middle">
            1
          </text>
          <text className="custom-ease-page__diagram-label" x="125" y="172" textAnchor="middle">
            progress
          </text>
        </svg>
        <figcaption>
          <code>M0,0 C0.5,0 0.5,1 1,1</code>을 그린 모습입니다. 왼쪽 아래에서 출발해 오른쪽 위로 도착하고, 양 끝이 평평해서 천천히
          출발했다가 천천히 도착합니다.
        </figcaption>
      </figure>

      <div className="custom-ease-page__table-wrap">
        <table className="custom-ease-page__rules-table">
          <caption>create()의 두 번째 인자로 넣을 수 있는 세 형식</caption>
          <thead>
            <tr>
              <th scope="col">형식</th>
              <th scope="col">예시</th>
              <th scope="col">공식 문서의 설명</th>
            </tr>
          </thead>
          <tbody>
            {formats.map((format) => (
              <tr key={format.id}>
                <th scope="row">{format.label}</th>
                <td>
                  <code>{format.sample}</code>
                </td>
                <td>{format.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="custom-ease-page__note custom-ease-page__note--probe">
        <h3>cubic-bezier는 숫자 네 개만 넘깁니다</h3>
        <p>
          <code>".17,.67,.83,.67"</code>처럼 <strong>숫자 네 개만</strong> 넘깁니다. GSAP 3.15.0에서{' '}
          <code>"cubic-bezier(.17,.67,.83,.67)"</code>처럼 껍데기까지 붙이면 <code>malformed path</code> 오류로 실패했습니다.
        </p>
      </div>

      <div className="custom-ease-page__note custom-ease-page__note--probe">
        <h3>정규화할 때 SVG의 y축 방향을 맞춥니다</h3>
        <p>
          GSAP 3.15.0에서 확인한 결과,{' '}
          <strong>x가 0에서 시작해 1로 끝나지 않는 데이터</strong>는 0-1로 다시 스케일되면서 <strong>y축이 뒤집혔습니다.</strong>{' '}
          SVG 화면 좌표는 y가 아래로 갈수록 커지기 때문입니다. 덕분에 Illustrator에서 왼쪽 아래→오른쪽 위로 그린 곡선을 그대로 붙여
          넣어도 의도한 방향으로 동작합니다.
        </p>
        <p>
          반대로 <strong>x가 정확히 0에서 시작해 1로 끝나는</strong> 정규화된 데이터에는 이 변환이 걸리지 않고 y 값이 그대로 ease 값이
          됩니다. 그래서 정규화 형식으로 적을 때는 <strong>y를 뒤집지 말고</strong> 0이 출발점, 1이 목적지로 쓰면 됩니다.
        </p>
      </div>

      <div className="custom-ease-page__warning">
        <h3>y가 1을 넘거나 0으로 돌아올 수 있습니다</h3>
        <p>
          공식 hop 데이터의 마지막 좌표는 <code>1,0</code>입니다. progress 1에서 값이 0이라는 뜻이고, GSAP 3.15.0에서 실행해 확인해 보니{' '}
          <code>gsap.to(el, {'{'} y: -100, ease: "hop" {'}'})</code>은 progress 1에서 실제로 <code>y = 0</code>, 즉{' '}
          <strong>시작값으로 되돌아왔습니다.</strong> 이 결과는 GSAP 3.15.0에서 확인했으며, <strong>곡선의 끝 y가 그 트윈의 최종 화면
          상태</strong>라고 읽으면 됩니다.
        </p>
      </div>

      <CustomEasePathLab />
    </section>
  )
}
