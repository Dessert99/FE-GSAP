/** CustomWiggle의 wiggles·type 명세와 "세기는 property가 정한다"는 규칙을 예제와 함께 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { WiggleShapeLab } from '../../examples/WiggleShapeLab/WiggleShapeLab'

const officialWiggleCode = `//Create a wiggle with 6 oscillations (default type:"easeOut")
CustomWiggle.create("myWiggle", {wiggles: 6});
//now use it in an ease. "rotation" will wiggle to 30 and back just as much in the opposite direction, ending where it began.
gsap.to(".class", {duration: 2, rotation: 30, ease: "myWiggle"});`

const officialAnticipateCode = `//Create a 10-wiggle anticipation ease:
CustomWiggle.create("funWiggle", {wiggles: 10, type: "anticipate"});
gsap.to(".class", {duration: 2, rotation: 30, ease: "funWiggle"});`

const stringFormatCode = `ease: "wiggle(15)" //<-- easy!
ease: "wiggle({type:anticipate, wiggles:8})" //advanced`

/** 공식 Config Object 표에서 이 섹션이 다루는 두 항목이다. */
const wiggleOptions = [
  {
    name: 'wiggles',
    type: 'Integer',
    fallback: '10',
    range: '공식 페이지에 범위 명시 없음',
    detail: '앞뒤로 오가는 진동(oscillation) 횟수입니다.',
  },
  {
    name: 'type',
    type: 'String',
    fallback: '"easeOut"',
    range: '"easeOut" · "easeInOut" · "anticipate" · "uniform" · "random"',
    detail: '흔들림의 종류(스타일)입니다. 공식 문서는 이 다섯 이름만 게시합니다.',
  },
]

export function WiggleDesignSection() {
  return (
    <section id="wiggle-design" className="bounce-wiggle-page__section" aria-labelledby="wiggle-design-title">
      <SectionHeading
        number="06"
        id="wiggle-design"
        title="몇 번 흔들지와 어떤 결로 흔들지"
        description="CustomWiggle에는 세기를 정하는 설정이 없습니다. 세기는 Tween이 정하고, 곡선은 횟수와 결만 정합니다."
      />

      <div className="bounce-wiggle-page__split">
        <div className="bounce-wiggle-page__prose">
          <p>
            공식 최소 예제입니다. <code>wiggles: 6</code> 하나만 넘겨 곡선을 만들고, 주석이 기본 type은 <code>"easeOut"</code>
            이라고 알려 줍니다.
          </p>
          <p>
            그 아래 Tween의 주석도 그대로 옮길 만합니다. <strong>"rotation은 30까지 갔다가 반대 방향으로도 똑같이 움직여
            시작한 곳에서 끝난다."</strong> 흔들림 곡선의 성격이 이 한 문장에 다 들어 있습니다. 목표값을 향해 갔다가{' '}
            <strong>반대쪽으로도 같은 만큼</strong> 가고, 결국 <strong>제자리</strong>로 돌아옵니다.
          </p>
        </div>
        <pre className="bounce-wiggle-page__code">
          <code>{officialWiggleCode}</code>
        </pre>
      </div>

      <div className="bounce-wiggle-page__table-wrap">
        <table className="bounce-wiggle-page__options-table">
          <caption>CustomWiggle 설정 객체 · 기본 항목 두 개 (고급 항목 둘은 다음 섹션)</caption>
          <thead>
            <tr>
              <th scope="col">이름</th>
              <th scope="col">타입</th>
              <th scope="col">기본값</th>
              <th scope="col">허용값</th>
              <th scope="col">무엇을 바꾸나</th>
            </tr>
          </thead>
          <tbody>
            {wiggleOptions.map((option) => (
              <tr key={option.name}>
                <th scope="row">
                  <code>{option.name}</code>
                </th>
                <td>{option.type}</td>
                <td>
                  <code>{option.fallback}</code>
                </td>
                <td>{option.range}</td>
                <td>{option.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bounce-wiggle-page__warning">
        <h3>세기를 정하는 설정은 없습니다</h3>
        <p>
          CustomBounce에는 <code>strength</code>가 있지만 <strong>CustomWiggle에는 같은 이름의 설정이 없습니다.</strong> 공식
          문서가 직접 답합니다. <strong>"흔들림의 세기(얼마나 멀리 가는지)는 어떻게 조절하나요? tween의 property 값 자체로
          정합니다. 예를 들어 <code>rotation:30</code>으로 흔드는 것이 <code>rotation:10</code>보다 강합니다."</strong>
        </p>
        <p>
          같은 곡선을 <code>x</code>에 쓰면 좌우로 흔들리고 <code>rotation</code>에 쓰면 회전으로 흔들립니다. 아래 예제에서{' '}
          <code>rotation</code>만 10과 30 사이에서 바꿔 보면, 곡선 그림은 그대로인데 바늘이 가는 거리만 달라지는 것을 볼 수
          있습니다.
        </p>
      </div>

      <WiggleShapeLab />

      <div className="bounce-wiggle-page__note bounce-wiggle-page__note--probe">
        <h3>공식 문서에 없는 숫자 · 다섯 type이 실제로 어떻게 다른가</h3>
        <p>
          공식 문서는 다섯 이름만 게시하고 각 type이 어떤 모양인지는 embed된 demo에 맡깁니다. 그 demo는 본문에서 확인할 수 없어,
          곡선을 직접 실행해 구간별 최대 진폭을 재 보았습니다. <code>wiggles: 6</code> 기준으로 진행률을 4등분한 값입니다.
        </p>
        <ul className="bounce-wiggle-page__list">
          <li>
            <code>easeOut</code> — 0.99 · 0.98 · 0.71 · 0.37. 처음이 가장 크고 점점 잦아듭니다.
          </li>
          <li>
            <code>easeInOut</code> — 0.44 · 0.90 · 0.97 · 0.43. 가운데가 가장 큽니다.
          </li>
          <li>
            <code>anticipate</code> — 0.75 · 0.99 · 0.90 · 0.08. 중반에 최대이고 끝은 거의 멈춥니다.
          </li>
          <li>
            <code>uniform</code> — 1.00 · 1.00 · 1.00 · 1.00. 처음부터 끝까지 세기가 같습니다.
          </li>
          <li>
            <code>random</code> — 만들 때마다 달라집니다. 같은 설정으로 다시 <code>create()</code>해도 곡선이 같지 않습니다.
          </li>
        </ul>
        <p>
          <code>wiggles</code>도 대체로 값 그대로 나타납니다. <strong>N을 주면 곡선의 방향 전환이 N번</strong> 일어납니다. 다만{' '}
          <strong><code>random</code>은 예외</strong>여서, <code>wiggles: 6</code>을 줘도 전환이 2번뿐인 경우가 나왔습니다. 무작위
          배치라 진동 횟수까지 보장되지 않습니다. 그리고 다섯 type 모두 <strong>시작값과 끝값이 0</strong>이라 어떤 설정에서든
          제자리로 돌아옵니다.
        </p>
        <p className="bounce-wiggle-page__provenance">
          이 숫자들은 공식 페이지에 게시돼 있지 않습니다. GSAP 3.15.0을 직접 실행해 확인한 내용입니다. 특히{' '}
          <code>random</code>은 공식 문서가 seed나 재현성을 전혀 언급하지 않으므로, 매번 같은 모양을 기대하는 코드는 쓰지 않는
          편이 안전합니다.
        </p>
      </div>

      <div className="bounce-wiggle-page__subheading">
        <h3>type을 바꾼 공식 예제와 축약 형식</h3>
      </div>

      <div className="bounce-wiggle-page__split">
        <div>
          <pre className="bounce-wiggle-page__code">
            <code>{officialAnticipateCode}</code>
          </pre>
          <pre className="bounce-wiggle-page__code">
            <code>{stringFormatCode}</code>
          </pre>
        </div>
        <div className="bounce-wiggle-page__prose">
          <p>
            위는 공식 sample의 두 번째 예제입니다. <code>wiggles: 10</code>과 <code>type: "anticipate"</code>로{' '}
            <code>funWiggle</code>이라는 이름을 만들고, 아래 Tween이 <strong>그 이름만</strong> 씁니다.
          </p>
          <p>
            아래는 CustomWiggle이 로드돼 있을 때 쓸 수 있는 <strong>축약 문자열 형식</strong>입니다. 숫자 하나만 넘기면{' '}
            <code>wiggles</code>가 되고, 중괄호를 쓰면 <code>type</code>까지 함께 넘길 수 있습니다.
          </p>
          <p>
            bounce와 마찬가지로 축약 형식에는 이름이 없습니다. 한 번 쓰고 마는 흔들림이면 짧아서 좋고, 곡선을 그려 보거나 여러
            곳에서 재사용할 거라면 <code>create()</code>가 낫습니다.
          </p>
        </div>
      </div>
    </section>
  )
}
