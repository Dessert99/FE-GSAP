/** 참조를 잃은 Tween이라는 상황을 세우고, 변수와 id라는 두 가지 되찾는 방법을 구분한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 학습자가 실제로 겪는 상황 — 반환값을 버렸기 때문에 나중에 손댈 방법이 없다
const lostCall = `function onEnter() {
  // 반환값을 아무 데도 담지 않았습니다.
  gsap.to('.panel', { x: 300, duration: 2 })
}

function onLeave() {
  // 그 Tween을 어떻게 멈추죠? 이름도 없고 변수도 없습니다.
}`

// 공식 getById 페이지가 권하는 방법 — 원문 코드 그대로다
const variableCall = `let myTween = gsap.to(obj, { duration: 1, x: 100 });
// later
myTween.pause();`

// 같은 Tween에 이름표만 붙여 두는 방법
const idCall = `gsap.to('.panel', { x: 300, duration: 2, id: 'panelSlide' })

// 변수가 없어도 이름으로 다시 찾습니다.
gsap.getById('panelSlide').pause()`

export function LostReferenceSection() {
  return (
    <section id="lost-reference" className="find-stop-page__section" aria-labelledby="lost-reference-title">
      <SectionHeading
        number="01"
        id="lost-reference"
        title="변수를 잃어버린 Tween"
        description="gsap.to()는 Tween 하나를 만들어 돌려줍니다. 그 반환값을 담아 두지 않으면, 화면에서는 계속 움직이는데 코드에서는 손댈 방법이 사라집니다."
      />

      <div className="find-stop-page__split">
        <div className="find-stop-page__prose">
          <p>
            먼저 용어를 정리하겠습니다. <strong>Tween</strong>은 "무엇을, 어디에서 어디까지, 얼마 동안 바꿀지"를 담은 실행 단위이고,{' '}
            <code>gsap.to()</code>는 그 Tween 하나를 <strong>만들어서 돌려줍니다.</strong>
          </p>
          <p>
            <strong>참조(reference)</strong>는 그 Tween을 다시 가리킬 수 있는 손잡이입니다. 변수에 담으면 손잡이가 생기고, 담지 않으면
            사라집니다. 오른쪽 코드에는 손잡이가 없습니다.
          </p>
          <p>
            중요한 건 <strong>Tween이 사라진 게 아니라는 점</strong>입니다. GSAP은 지금도 그 Tween을 들고 매 프레임 값을 쓰고 있습니다.
            없어진 것은 우리 쪽 손잡이뿐입니다. 그래서 <strong>GSAP에게 되물어 보는 방법</strong>이 따로 있습니다.
          </p>
        </div>
        <pre className="find-stop-page__code">
          <code>{lostCall}</code>
        </pre>
      </div>

      <div className="find-stop-page__subheading">
        <h3>손잡이를 만드는 두 가지 방법</h3>
        <p>공식 문서는 상황에 따라 다른 방법을 권합니다. 둘은 대체재가 아니라 쓰임이 다릅니다.</p>
      </div>

      <div className="find-stop-page__split">
        <div>
          <div className="find-stop-page__subheading">
            <h3>1. 변수에 담는다 — 공식 권장</h3>
            <p>
              공식 <code>getById()</code> 페이지는 <strong>animation이 완료된 뒤에도 참조를 유지해야 한다면 변수를 쓰라</strong>고 적고
              아래 코드를 제시합니다. 아래는 그 원문입니다.
            </p>
          </div>
          <pre className="find-stop-page__code">
            <code>{variableCall}</code>
          </pre>
        </div>

        <div>
          <div className="find-stop-page__subheading">
            <h3>2. id라는 이름표를 붙인다</h3>
            <p>
              공식 문서의 표현으로는 "tween이나 timeline을 만들 때 <code>id</code>를 부여하면 나중에 그것을 참조할 수 있다"입니다. 변수
              대신 <strong>문자열 이름</strong>이 손잡이가 됩니다.
            </p>
          </div>
          <pre className="find-stop-page__code">
            <code>{idCall}</code>
          </pre>
        </div>
      </div>

      <div className="find-stop-page__note">
        <h3>왜 변수 대신 이름표가 필요할까요?</h3>
        <p>
          공식 문서는 이유를 이렇게 적습니다. <strong>"React 같은 framework와 build tool에서 변수를 계속 추적하기 어려울 때 도움이
          된다."</strong> 컴포넌트가 다시 렌더링되고 함수가 매번 새로 만들어지는 환경에서는, 변수를 어디에 두어야 살아남는지 자체가
          까다로운 문제이기 때문입니다.
        </p>
        <p>
          다만 <code>id</code>는 만능이 아닙니다. 다음 단계에서 볼 <strong>완료된 animation은 찾을 수 없다</strong>는 경계가 있어서,
          공식 문서는 완료 후에도 필요하면 변수 쪽을 권합니다.
        </p>
      </div>
    </section>
  )
}
