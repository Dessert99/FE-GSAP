/** 인자 개수 하나로 읽기와 쓰기가 갈리는 두 상태 메서드와 읽기 전용 isActive()를 대비해 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { StateReadoutLab } from '../../examples/StateReadoutLab/StateReadoutLab'

// 세 상태 메서드의 공식 signature 원문 — 반환 타입 자리가 이 절의 핵심이다
const signatures = `paused( value:Boolean ) : [Boolean | self]
reversed( value:Boolean ) : [Boolean | self]
isActive( ) : Boolean`

// 같은 이름이 인자 개수에 따라 무엇을 하고 무엇을 돌려주는지 갈라 놓은 정적 표의 데이터
const twoFaces = [
  {
    id: 'getter',
    call: 'tween.paused()',
    role: '읽기 (getter)',
    does: '지금 값을 물어본다',
    returns: 'Boolean',
    chain: '이어 쓸 수 없다 — 돌려받은 것이 Tween이 아니다',
  },
  {
    id: 'setter',
    call: 'tween.paused(true)',
    role: '쓰기 (setter)',
    does: '값을 바꾼다',
    returns: 'self (Tween 자신)',
    chain: '이어 쓸 수 있다',
  },
  {
    id: 'read-only',
    call: 'tween.isActive()',
    role: '읽기 전용',
    does: '실제로 재생 중인지 물어본다',
    returns: 'Boolean',
    chain: '쓰기 얼굴이 없다',
  },
]

const officialPaused = `//gets current paused state
var paused = myAnimation.paused();
//sets paused state to true (just like pause())
myAnimation.paused(true);
//toggles the paused state
myAnimation.paused(!myAnimation.paused());`

const officialReversed = `//gets current orientation
var rev = myAnimation.reversed();
//sets the orientation to reversed
myAnimation.reversed(true);
//toggles the orientation
myAnimation.reversed(!myAnimation.reversed());`

const officialChaining = `myAnimation.paused(true).delay(2).timeScale(0.5);`

const activeGuard = `gsap.globalTimeline.getChildren().filter(tween => tween.isActive())`

export function StateGetterSection() {
  return (
    <section id="state-getters" className="playback-page__section" aria-labelledby="state-getters-title">
      <SectionHeading
        number="05"
        id="state-getters"
        title="같은 이름으로 읽기도 하고 쓰기도 한다"
        description="pause()와 paused()는 글자 하나 차이인데 하는 일이 다릅니다. 여기서 가장 많이 헷갈리니 천천히 갈라 봅니다."
      />

      <pre className="playback-page__signature">
        <code>{signatures}</code>
      </pre>

      <div className="playback-page__prose">
        <p>
          앞의 세 signature 중 두 개는 반환 타입 자리에 <code>[Boolean | self]</code>라고 <strong>두 가지가 함께</strong> 적혀 있습니다.
          "Boolean을 돌려줄 수도 있고 자기 자신을 돌려줄 수도 있다"는 뜻입니다. 어느 쪽인지는 <strong>내가 괄호에 값을 넣었느냐</strong>
          가 정합니다.
        </p>
        <p>
          공식 문장은 이렇습니다 — <strong>인자를 생략하면 현재 값을 돌려주는 getter이고, 인자를 넘기면 값을 설정하는 setter가 되어
          chaining을 쉽게 하려고 instance 자신을 돌려줍니다.</strong> 두 메서드의 <code>value</code>는 모두 <code>Boolean</code>이고
          기본값은 <code>false</code>입니다.
        </p>
        <p>
          마지막 <code>isActive()</code>만 반환 타입이 <code>Boolean</code> 하나입니다. 괄호 안에 넣을 것도 없습니다. 01단계에서 본
          대로 이 값은 <strong>우리가 정하는 게 아니라 계산되는 결과</strong>이기 때문입니다.
        </p>
      </div>

      <div className="playback-page__table-wrap">
        <table className="playback-page__table">
          <caption>괄호 안에 값이 있느냐가 정하는 것</caption>
          <thead>
            <tr>
              <th scope="col">호출</th>
              <th scope="col">역할</th>
              <th scope="col">하는 일</th>
              <th scope="col">돌려주는 것</th>
              <th scope="col">점 찍어 이어 쓰기</th>
            </tr>
          </thead>
          <tbody>
            {twoFaces.map((face) => (
              <tr key={face.id}>
                <th scope="row">
                  <code>{face.call}</code>
                </th>
                <td>{face.role}</td>
                <td>{face.does}</td>
                <td>
                  <code>{face.returns}</code>
                </td>
                <td>{face.chain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="playback-page__split">
        <div>
          <div className="playback-page__subheading">
            <h3>paused() 공식 예제</h3>
            <p>읽기·쓰기·토글 세 줄입니다.</p>
          </div>
          <pre className="playback-page__code">
            <code>{officialPaused}</code>
          </pre>
        </div>
        <div>
          <div className="playback-page__subheading">
            <h3>reversed() 공식 예제</h3>
            <p>모양이 정확히 같습니다.</p>
          </div>
          <pre className="playback-page__code">
            <code>{officialReversed}</code>
          </pre>
        </div>
      </div>

      <div className="playback-page__note">
        <h3>토글이 한 줄로 되는 이유</h3>
        <p>
          <code>myAnimation.paused(!myAnimation.paused())</code>를 안에서부터 읽어 보세요. 안쪽 <code>paused()</code>는 인자가 없으니{' '}
          <strong>지금 값을 읽습니다.</strong> 앞에 붙은 <code>!</code>가 그 값을 뒤집고, 바깥쪽 <code>paused(...)</code>는 인자가
          있으니 <strong>그 값을 씁니다.</strong> 한 줄 안에서 같은 이름이 읽기와 쓰기로 두 번 쓰인 것입니다.
        </p>
        <p>
          공식 문서도 이 쓰임을 따로 권합니다 — 대부분의 경우 멈출 때는 <code>pause()</code>, 재개할 때는 <code>resume()</code>이 가장
          쉽지만, <strong>현재 상태를 확인하려면 반드시 <code>paused()</code>를 써야 하고</strong> 토글에도 유용하다는 것입니다.
        </p>
      </div>

      <div className="playback-page__prose">
        <p>
          setter가 Tween 자신을 돌려주므로 점을 찍어 계속 이어 쓸 수 있습니다. 공식 문서가 든 예입니다 — 멈춘 상태로 만들고, delay를
          2초로 주고, 속도를 절반으로 낮추는 일을 한 줄에 이어 붙였습니다.
        </p>
      </div>

      <pre className="playback-page__code">
        <code>{officialChaining}</code>
      </pre>

      <div className="playback-page__warning">
        <h3>읽기는 이어 쓸 수 없습니다</h3>
        <p>
          <code>tween.paused().delay(2)</code>는 동작하지 않습니다. 앞의 <code>paused()</code>가 돌려준 것은 Tween이 아니라{' '}
          <code>true</code>나 <code>false</code>이고, Boolean에는 <code>delay()</code>가 없기 때문입니다. 점을 찍어 이어 쓸 수 있는 것은{' '}
          <strong>괄호에 값을 넣은 쪽</strong>뿐입니다.
        </p>
      </div>

      <div className="playback-page__subheading">
        <h3>공식 데모가 보여주는 쓰임 — 움직이는 동안 클릭 막기</h3>
        <p>
          <code>isActive()</code> 페이지에는 데모가 하나 실려 있습니다. 공식 설명은 이렇습니다 — <strong>isActive()로 재생 중에는
          방향을 바꾸지 못하게 막고, 상자가 움직이는 동안 방향 전환 버튼을 반복해서 눌러도 클릭이 무시되는 것</strong>을 보여 준다는
          것입니다.
        </p>
      </div>

      <div className="playback-page__prose">
        <p>
          "지금 움직이는 중인가?"를 물어봐야 하는 대표적인 상황입니다. <code>paused()</code>로는 이 판단을 할 수 없습니다. 01단계에서
          본 대로 끝난 Tween도 <code>paused()</code>는 <code>false</code>이기 때문입니다.
        </p>
        <p>
          공식 문서는 지금 활성 상태인 모든 tween을 한 번에 모으는 방법도 알려 줍니다. 전역 timeline의 자식을 훑어 같은 질문을 던지는
          한 줄입니다.
        </p>
      </div>

      <pre className="playback-page__code">
        <code>{activeGuard}</code>
      </pre>

      <StateReadoutLab />
    </section>
  )
}
