/** scale 중 속도가 변해 보이는 문제를 숫자로 세운 뒤 expoScale의 문법과 제약을 예제와 함께 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { ScaleSpeedLab } from '../../examples/ScaleSpeedLab/ScaleSpeedLab'

// 공식 minimal usage 예제 원문
const minimalExample = `// we're starting at a scale of 1 and animating to 2, so pass those into config()...
gsap.to("#image", { duration: 1, scale: 2, ease: "expoScale(1, 2)" });`

// 공식 확장 예제 원문
const templateExample = `//scale from 0.5 to 3 using "power2.inOut" ...
gsap.fromTo(
  "#image",
  { scale: 0.5 },
  { duration: 1, scale: 3, ease: "expoScale(0.5, 3, power2.inOut)" }
);`

// 공식 문서가 게시한 세 인자만 타입·기본값·허용값으로 정리한 정적 표의 데이터
const parameters = [
  {
    id: 'start',
    name: '첫 번째 인자 · 시작 scale',
    type: 'Number',
    fallback: '공식 페이지에 명시 없음 (생략할 수 없음)',
    allowed: '0이 아닌 값. 0이 필요하면 0.01 같은 작은 값',
    role: 'tween이 출발하는 scale. 실제 tween의 시작 scale과 같아야 한다',
  },
  {
    id: 'end',
    name: '두 번째 인자 · 끝 scale',
    type: 'Number',
    fallback: '공식 페이지에 명시 없음 (생략할 수 없음)',
    allowed: '0이 아닌 값',
    role: 'tween이 도착하는 scale. 실제 tween의 끝 scale과 같아야 한다',
  },
  {
    id: 'base',
    name: '세 번째 인자 · 구부릴 ease',
    type: 'String',
    fallback: '"none"',
    allowed: '"power2.inOut" 같은 ease 이름',
    role: '이 ease를 scale 보정에 맞게 구부린다. 생략하면 등속 곡선을 구부린다',
  },
]

export function ExpoScaleSection() {
  return (
    <section id="expo-scale" className="ease-pack-page__section" aria-labelledby="expo-scale-title">
      <SectionHeading
        number="03"
        id="expo-scale"
        title="ExpoScaleEase · 커지는 동안 속도가 변해 보이는 문제"
        description="크기를 키우는 애니메이션에만 생기는 문제입니다. 처음 보면 낯설기 때문에 ease 문법보다 문제부터 숫자로 확인합니다."
      />

      <div className="ease-pack-page__prose">
        <p>
          상자를 <code>1</code>배에서 <code>2</code>배로 등속으로 키운다고 해 봅시다. 절반쯤에서 크기는 <code>1.5</code>배입니다. 숫자만
          보면 딱 중간입니다.
        </p>
        <p>
          그런데 <strong>앞 절반</strong>의 상대 변화는 1배에서 1.5배, 즉 <strong>1.5배</strong>이고, <strong>뒤 절반</strong>은 1.5배에서
          2배, 즉 <strong>약 1.33배</strong>입니다. 같은 <code>0.5</code>만큼 늘어도 구간별 배율은 다릅니다. 아래 예제는 이 구간별
          배율을 linear ease와 ExpoScaleEase에서 직접 비교합니다.
        </p>
        <p>
          공식 문서는 이것을 <em>"object의 scale을 animate할 때 linear ease를 써도 속도가 변하는 것처럼 보이는 흥미로운 현상"</em>이라
          부르고, ExpoScaleEase가 <em>"그에 맞게 easing curve를 구부려 이 효과를 보정한다"</em>고 적었습니다.
        </p>
      </div>

      <div className="ease-pack-page__split">
        <div className="ease-pack-page__prose">
          <p>
            그래서 이 ease는 <strong>시작 scale과 끝 scale을 알아야</strong> 합니다. 곡선을 얼마나 구부릴지가 그 두 값에 달려 있기
            때문입니다. 공식 문서의 문장은 <strong>"올바른 easing curve를 만들려면 시작 값과 끝 값을 문자열 안에 반드시 넘겨야
            한다"</strong>입니다.
          </p>
          <p>
            여기서 자주 하는 실수는 문자열의 숫자와 <code>vars</code>의 <code>scale</code>을 다르게 적는 것입니다. 두 값이 어긋나면 보정도
            어긋납니다.
          </p>
        </div>
        <pre className="ease-pack-page__code">
          <code>{minimalExample}</code>
        </pre>
      </div>

      <div className="ease-pack-page__subheading">
        <h3>세 번째 인자로 다른 ease를 구부릴 수 있습니다</h3>
        <p>
          기본값은 <code>"none"</code>, 즉 등속 곡선을 구부립니다. 여기에 <code>"power2.inOut"</code> 같은 이름을 세 번째로 적으면 그
          곡선을 scale 보정에 맞게 구부립니다.
        </p>
      </div>
      <pre className="ease-pack-page__code">
        <code>{templateExample}</code>
      </pre>

      <div className="ease-pack-page__table-wrap">
        <table className="ease-pack-page__rules-table">
          <caption>expoScale 문자열이 받는 인자</caption>
          <thead>
            <tr>
              <th scope="col">인자</th>
              <th scope="col">타입</th>
              <th scope="col">기본값</th>
              <th scope="col">허용값·특수값</th>
              <th scope="col">하는 일</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((parameter) => (
              <tr key={parameter.id}>
                <th scope="row">{parameter.name}</th>
                <td>{parameter.type}</td>
                <td>
                  <code>{parameter.fallback}</code>
                </td>
                <td>{parameter.allowed}</td>
                <td>{parameter.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ease-pack-page__warning">
        <h3>scale 값에 0을 넣으면 안 됩니다</h3>
        <p>
          공식 note의 문장입니다. <strong>"config()에 넘기는 scale 값은 0이면 안 된다. 0으로는 수학이 성립하지 않기 때문이다.
          0.01 같은 작은 값을 써도 된다."</strong>
        </p>
        <p>
          다만 <code>0.00000001</code>처럼 극단적으로 작은 값도 권하지 않습니다. 공식 문서는 그 경우{' '}
          <strong>"tween의 큰 부분이 아주 작은 값들을 지나는 데 쓰이므로 이상적이지 않을 수 있다"</strong>고 적었습니다.
        </p>
      </div>

      <div className="ease-pack-page__note ease-pack-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p>
          <strong>중간 지점은 산술 중간이 아니라 기하 중간입니다.</strong> <code>expoScale(1, 2)</code>로 tween하면 정중앙의 scale은
          1.5가 아니라 <code>1.414</code>(=√2)였습니다. 매 구간이 같은 <em>배율</em>로 커지도록 곡선이 구부러진 결과입니다. 공식
          문서에는 이 계산식이 없습니다.
        </p>
        <p>
          <strong>시작과 끝 scale이 같으면 값이 깨집니다.</strong> <code>expoScale(1, 1)</code>은 ease가 <code>NaN</code>을 돌려주고
          target 값도 <code>NaN</code>이 됐습니다. 공식 문서는 0만 금지하고 이 경우는 언급하지 않습니다. scale이 바뀌지 않는 구간에는
          이 ease를 쓰지 않는 편이 안전합니다.
        </p>
        <p className="ease-pack-page__provenance">두 항목 모두 GSAP 3.15.0 설치본을 직접 실행해 확인한 내용입니다.</p>
      </div>

      <ScaleSpeedLab />
    </section>
  )
}
