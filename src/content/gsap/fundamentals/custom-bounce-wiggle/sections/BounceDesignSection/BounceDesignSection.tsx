/** CustomBounce의 네 option 명세와 문자열 축약 형식을 예제와 함께 설명한다. */
import { BounceCurveLab } from '../../examples/BounceCurveLab/BounceCurveLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const officialCreateCode = `CustomBounce.create("myBounce", {
  strength: 0.6,
  squash: 3,
  squashID: "myBounce-squash",
});`

const stringFormatCode = `ease: "bounce(0.5)"; //<-- easy!
ease: "bounce({strength:0.5, endAtStart:true})"; //advanced`

/** 공식 Options 표의 네 행을 타입·기본값·허용값으로 나눠 옮긴다. */
const bounceOptions = [
  {
    name: 'strength',
    type: 'Number',
    fallback: '0.7',
    range: '0과 1 사이',
    detail: '얼마나 "bouncy"한지를 결정합니다. 공식 설명은 0.9가 0.3보다 훨씬 많이 튕긴다고 밝힙니다.',
  },
  {
    name: 'endAtStart',
    type: 'Boolean',
    fallback: 'false',
    range: 'true · false',
    detail:
      'true면 곡선이 시작한 자리로 돌아와 끝납니다. 바닥에 있던 물체가 뛰어올랐다가 다시 튕겨 멈추는 효과를 만들 때 씁니다.',
  },
  {
    name: 'squash',
    type: 'Number',
    fallback: '0',
    range: '공식 페이지에 범위 명시 없음 (2가 적당, 4는 더 김이라고만 예시)',
    detail:
      'squash가 얼마나 지속될지 — 튕김 사이의 간격, 즉 "붙어 있는" 것처럼 보이는 구간의 길이를 정합니다. 4는 나머지 ease 대비 squash를 더 길게 만듭니다.',
  },
  {
    name: 'squashID',
    type: 'String',
    fallback: 'bounce의 ID + "-squash"',
    range: '공식 페이지에 형식 제한 명시 없음',
    detail:
      'squash 곡선에 붙일 이름입니다. 생략하면 bounce 이름 뒤에 "-squash"가 붙습니다. 공식 예시로 create("hop", { strength: 0.6, squash: 2 })는 "hop-squash"가 됩니다.',
  },
]

export function BounceDesignSection() {
  return (
    <section id="bounce-design" className="bounce-wiggle-page__section" aria-labelledby="bounce-design-title">
      <SectionHeading
        number="03"
        id="bounce-design"
        title="얼마나 튕기고 언제 멈출지 정한다"
        description="CustomBounce가 받는 설정값은 네 개뿐입니다. 네 개가 각각 곡선의 어느 부분을 바꾸는지 확인해 보세요."
      />

      <div className="bounce-wiggle-page__split">
        <div className="bounce-wiggle-page__prose">
          <p>
            곡선을 만드는 호출은 <code>CustomBounce.create(이름, 설정)</code> 하나입니다. 첫 번째 인자가 나중에{' '}
            <code>ease</code>에 적을 <strong>이름</strong>이고, 두 번째가 <strong>설정 객체</strong>입니다.
          </p>
          <p>오른쪽은 공식 문서의 예제를 그대로 옮긴 것입니다. 이 페이지의 예제도 같은 형태를 씁니다.</p>
        </div>
        <pre className="bounce-wiggle-page__code">
          <code>{officialCreateCode}</code>
        </pre>
      </div>

      <div className="bounce-wiggle-page__table-wrap">
        <table className="bounce-wiggle-page__options-table">
          <caption>CustomBounce 설정 객체 · 공식 Options 표의 네 항목 전부</caption>
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
            {bounceOptions.map((option) => (
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

      <BounceCurveLab />

      <div className="bounce-wiggle-page__note bounce-wiggle-page__note--probe">
        <h3>예제에서 곡선 값을 읽는 방법</h3>
        <p>
          <code>endAtStart</code>도 값으로 확인할 수 있습니다. <strong>true면 곡선의 마지막 값이 0</strong>, false면 1입니다. 두
          경우 모두 시작값은 0입니다. 위 예제의 "곡선이 끝나는 값" 칸이 이 숫자를 그대로 보여 줍니다.
        </p>
        <p>
          그리고 <code>CustomBounce.create()</code>는 <strong>만들어진 ease 함수를 그대로 돌려줍니다.</strong>{' '}
          <code>gsap.parseEase('myBounce')</code>로 얻는 것과 같은 함수입니다. 이 페이지의 예제는 그 함수로 화면에 표시할
          출력값을 계산합니다.
        </p>
        <p className="bounce-wiggle-page__provenance">
          <code>create()</code>의 반환값은 공식 페이지에 명시돼 있지 않아 GSAP 3.15.0을 직접 실행해 확인했습니다.
        </p>
      </div>

      <div className="bounce-wiggle-page__subheading">
        <h3>이름을 안 만들고 바로 쓰는 축약 형식</h3>
      </div>

      <div className="bounce-wiggle-page__split">
        <pre className="bounce-wiggle-page__code">
          <code>{stringFormatCode}</code>
        </pre>
        <div className="bounce-wiggle-page__prose">
          <p>
            공식 문서는 <strong>GSAP의 축약 문자열 ease 형식</strong>도 쓸 수 있다고 안내합니다. <code>bounce(0.5)</code>는{' '}
            <code>strength</code> 하나만 주는 간단한 형태이고, 중괄호를 쓰면 여러 설정을 함께 넘길 수 있습니다.
          </p>
          <p>
            대신 이 형식에는 <strong>이름이 없습니다.</strong> 곡선을 다시 꺼내 쓰거나 squash 곡선과 짝지어야 한다면{' '}
            <code>create()</code>로 이름을 만드는 쪽이 맞습니다.
          </p>
        </div>
      </div>
    </section>
  )
}
