/** RoughEase의 문자열 config 문법과 여섯 property 전체 명세를 예제와 함께 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { RoughnessLab } from '../../examples/RoughnessLab/RoughnessLab'

// 공식 기본값 예제와 커스터마이즈 예제 원문
const officialExamples = `//use the default values
gsap.from(element, {duration: 1, opacity: 0, ease: "rough"});

//or customize the configuration
gsap.to(element, {duration: 2, y: 300, ease: "rough({strength: 3, points: 50, template: strong.inOut, taper: both, randomize: false})" });`

// 공식 Config Object의 여섯 property를 타입·기본값·허용값으로 정리한 정적 표의 데이터
const configProperties = [
  {
    id: 'clamp',
    name: 'clamp',
    type: 'Boolean',
    fallback: 'false',
    allowed: 'true | false',
    role: 'true면 point가 끝값을 넘거나 시작값 아래로 떨어지지 않는다. false면 도중에 튀어나갈 수 있지만 끝값은 항상 지킨다',
  },
  {
    id: 'points',
    name: 'points',
    type: 'Number',
    fallback: '20',
    allowed: '공식 페이지에 범위 명시 없음',
    role: 'ease를 따라 찍을 point 개수. 더 자주 또는 덜 자주 덜컹거리게 만든다',
  },
  {
    id: 'randomize',
    name: 'randomize',
    type: 'Boolean',
    fallback: 'true',
    allowed: 'true | false',
    role: 'true면 point 배치가 무작위라 거칠어진다. false면 ease를 가로질러 고르게 지그재그한다',
  },
  {
    id: 'strength',
    name: 'strength',
    type: 'Number',
    fallback: '1',
    allowed: '공식 페이지에 범위 명시 없음 (0.1은 아주 가깝게, 5는 훨씬 큰 변화)',
    role: 'point가 template ease에서 얼마나 멀리 벗어날 수 있는지를 정한다',
  },
  {
    id: 'taper',
    name: 'taper',
    type: 'String',
    fallback: '"none"',
    allowed: '"in" | "out" | "both" | "none"',
    role: '거칠기의 세기를 시작·끝·양쪽으로 갈수록 가늘어지게 만든다',
  },
  {
    id: 'template',
    name: 'template',
    type: 'String',
    fallback: '"none"',
    allowed: 'ease 이름 (예: "strong.inOut")',
    role: '흔들림이 따라갈 기준 곡선. RoughEase는 이 template에서 벗어나는 point를 찍는다',
  },
]

export function RoughEaseSection() {
  return (
    <section id="rough-ease" className="ease-pack-page__section" aria-labelledby="rough-ease-title">
      <SectionHeading
        number="04"
        id="rough-ease"
        title="RoughEase · 일부러 거칠게 흔들어야 하는 문제"
        description="여기서는 곡선을 부드럽게 만드는 게 목표가 아닙니다. 얼마나 자주, 얼마나 멀리, 어느 구간에서 덜컹거릴지를 여섯 개의 값으로 정합니다."
      />

      <div className="ease-pack-page__prose">
        <p>
          RoughEase는 곡선을 직접 그리지 않습니다. <strong>기준 곡선(template) 위에 point를 여러 개 흩뿌리고 그 점들을 이어</strong>{' '}
          만듭니다. 여섯 개의 설정은 전부 "그 점들을 어떻게 흩뿌릴까"에 대한 답입니다.
        </p>
        <p>
          설정은 <strong>ease 문자열 안에 객체 리터럴</strong>로 적습니다. 공식 예제를 보면 <code>template</code>과 <code>taper</code>{' '}
          값에 따옴표가 없습니다. 이미 전체가 하나의 문자열이라 안쪽 값은 그대로 적습니다. 아무것도 적지 않고 <code>"rough"</code>만
          쓰면 아래 표의 기본값이 전부 적용됩니다.
        </p>
      </div>

      <pre className="ease-pack-page__code">
        <code>{officialExamples}</code>
      </pre>

      <div className="ease-pack-page__table-wrap">
        <table className="ease-pack-page__rules-table">
          <caption>공식 Config Object · 여섯 개 모두 선택 사항</caption>
          <thead>
            <tr>
              <th scope="col">property</th>
              <th scope="col">타입</th>
              <th scope="col">기본값</th>
              <th scope="col">허용값·특수값</th>
              <th scope="col">하는 일</th>
            </tr>
          </thead>
          <tbody>
            {configProperties.map((property) => (
              <tr key={property.id}>
                <th scope="row">
                  <code>{property.name}</code>
                </th>
                <td>{property.type}</td>
                <td>
                  <code>{property.fallback}</code>
                </td>
                <td>{property.allowed}</td>
                <td>{property.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ease-pack-page__note">
        <h3>clamp를 설명한 공식 예시</h3>
        <p>
          공식 문서는 <code>x</code>를 0에서 100으로 tween하는 상황으로 설명합니다. <strong>clamp가 true면 모든 random point가 0과 100
          사이에 머물고, false면 도중에 100을 넘거나 0 아래로 내려갈 수 있습니다.</strong> 다만 이 예에서도{' '}
          <strong>끝값은 언제나 100</strong>입니다. 흔들리는 것은 가는 길이지 도착점이 아닙니다.
        </p>
      </div>

      <div className="ease-pack-page__note ease-pack-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용 · 같은 문자열이어도 흔들림은 매번 다르다</h3>
        <p>
          <code>randomize</code>의 기본값이 <code>true</code>이고, <strong>ease 문자열을 해석할 때마다 새로 무작위 배치가
          만들어집니다.</strong> 그래서 두 tween에 똑같이 <code>ease: "rough({'{'}points:20{'}'})"</code>를 적어도{' '}
          <strong>서로 다른 모양으로 흔들립니다.</strong> 같은 문자열이니 같은 결과일 거라고 기대하면 어긋납니다.
        </p>
        <p>
          여러 곳에서 <strong>똑같은 흔들림</strong>을 써야 한다면 방법은 두 가지입니다. 만들어진 ease 함수를 한 번만 얻어 변수에
          담아 재사용하거나, <code>randomize: false</code>로 두어 무작위 요소를 없애는 것입니다. 후자는 지그재그가 고르게 바뀝니다.
        </p>
        <p className="ease-pack-page__provenance">
          이 항목은 공식 페이지에 게시돼 있지 않습니다. GSAP 3.15.0 설치본을 직접 실행해 확인했습니다 — 같은 문자열을 두 번 해석해
          progress 0.3에서 각각 0.2482와 0.4241이 나왔고, <code>randomize: false</code>에서는 두 번 모두 0.1이었습니다.
        </p>
      </div>

      <RoughnessLab />
    </section>
  )
}
