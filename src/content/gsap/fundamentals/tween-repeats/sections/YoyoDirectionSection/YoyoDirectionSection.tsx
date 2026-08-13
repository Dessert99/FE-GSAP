/** yoyo가 회차마다 방향을 뒤집는 방식과 repeat·reversed와의 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 문서가 vars 설정 예로 실은 원문
const officialVars = `gsap.to(obj, {duration: 1, x: 100, repeat: 1, yoyo: true});`

// 공식 문서에 실린 getter·setter 코드 예제 원문
const officialCall = `//gets current yoyo state
var yoyo = myAnimation.yoyo();

//sets yoyo to true
myAnimation.yoyo(true);`

// 공식 문서가 repeat 2 기준으로 보여준 값 흐름 원문
const stripRows = [
  { yoyo: 'false', strip: 'start - 1 - 2 - 3 - 1 - 2 - 3 - 1 - 2 - 3 - end' },
  { yoyo: 'true', strip: 'start - 1 - 2 - 3 - 3 - 2 - 1 - 1 - 2 - 3 - end' },
]

export function YoyoDirectionSection() {
  return (
    <section id="yoyo-direction" className="repeats-page__section" aria-labelledby="yoyo-direction-title">
      <SectionHeading
        number="03"
        id="yoyo-direction"
        title="되돌아오며 반복한다"
        description="yoyo를 끄면 매 회차가 같은 자리에서 다시 출발합니다. 켜면 왔던 길을 되짚어 돌아옵니다."
      />

      <div className="repeats-page__prose">
        <p>
          <code>yoyo</code>는 공식 문서의 표현으로 <strong>"true면 tween이 앞뒤로 오가며 매 repeat마다 정방향과 역방향을 번갈아"</strong>{' '}
          가게 합니다. 요요 장난감처럼 갔다가 돌아온다고 생각하면 됩니다.
        </p>
        <p>
          공식 문서는 값의 흐름을 숫자 띠로 보여줍니다. <code>repeat</code>가 2일 때 두 경우를 나란히 놓은 것입니다.
        </p>
      </div>

      <div className="repeats-page__table-wrap">
        <table className="repeats-page__rules-table">
          <caption>
            공식 문서의 값 흐름 비교 · <code>repeat: 2</code>
          </caption>
          <thead>
            <tr>
              <th scope="col">yoyo</th>
              <th scope="col">값이 지나가는 순서</th>
            </tr>
          </thead>
          <tbody>
            {stripRows.map((row) => (
              <tr key={row.yoyo}>
                <th scope="row">
                  <code>{row.yoyo}</code>
                </th>
                <td>
                  <code>{row.strip}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="repeats-page__prose">
        <p>
          <code>false</code>인 줄을 보면 <code>3</code> 다음에 곧바로 <code>1</code>로 <strong>튀어 돌아갑니다.</strong> 매 회차가 같은
          시작값에서 다시 출발하기 때문입니다. <code>true</code>인 줄에는 <code>3 - 3</code>과 <code>1 - 1</code>처럼 같은 값이 이어집니다.
          끝에 닿은 자리에서 <strong>방향만 바꿔</strong> 되돌아오기 때문입니다.
        </p>
      </div>

      <div className="repeats-page__warning">
        <h3>repeat가 0이면 yoyo는 아무 일도 하지 않습니다</h3>
        <p>
          공식 문서의 문장입니다. <strong>"yoyo는 repeat와 함께 동작한다. repeat가 몇 번 반복할지를, yoyo가 각 반복이 방향을 바꿀지를
          정한다. 그래서 tween을 yoyo시키려면 repeat를 0이 아닌 값으로 두어야 한다."</strong> 되돌아올 반복 자체가 없으면 뒤집을 것도
          없습니다.
        </p>
      </div>

      <div className="repeats-page__note">
        <h3>
          역방향으로 가는 것과 <code>reversed</code>는 다릅니다
        </h3>
        <p>
          공식 문서는 <strong>"yoyo 동작은 tween의 reversed property에 영향을 주지 않는다"</strong>고 못박습니다. yoyo의 되돌아오는 회차는{' '}
          <strong>정방향으로 흐르는 시간 안에서</strong> 값만 거꾸로 지나가는 것입니다. Tween 전체를 거꾸로 재생하는{' '}
          <code>reverse()</code>와는 다른 개념이라, 되돌아오는 중에 <code>reversed()</code>를 읽어도 여전히 <code>false</code>입니다.
        </p>
      </div>

      <div className="repeats-page__split">
        <div>
          <div className="repeats-page__subheading">
            <h3>만들 때 정하기</h3>
            <p>공식 문서가 든 vars 설정 예입니다.</p>
          </div>
          <pre className="repeats-page__code">
            <code>{officialVars}</code>
          </pre>
        </div>
        <div>
          <div className="repeats-page__subheading">
            <h3>만든 뒤에 읽고 바꾸기</h3>
            <p>공식 문서에 실린 getter·setter 예제입니다.</p>
          </div>
          <pre className="repeats-page__code">
            <code>{officialCall}</code>
          </pre>
        </div>
      </div>

    </section>
  )
}
