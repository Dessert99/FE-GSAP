/** GSAP이 값을 적용하기 직전에 함수로 가로채는 구조를 정의한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const anatomy = `gsap.to('.box', {
  x: 1000,

  modifiers: {
    // x에 적용될 값을 쓰기 직전에 가로챕니다
    x: (value, target) => {
      // 돌려준 값이 대신 적용됩니다
      return Math.round(value)
    },
  },
})`

// 공식 페이지가 사용 예로 제시한 세 가지 (heading 이름 그대로)
const officialUseCases = ['Snap rotation', 'Clamp with Modulus', 'Carousel Wrap']

export function InterceptSection() {
  return (
    <section id="intercept" className="msw-page__section" aria-labelledby="intercept-title">
      <SectionHeading
        number="01"
        id="intercept"
        title="값을 쓰기 직전에 가로채기"
        description="GSAP은 매 프레임 값을 계산해 대상에 씁니다. 그 사이에 함수를 하나 끼워 넣으면 계산된 값을 바꿔서 쓸 수 있습니다."
      />

      <div className="msw-page__split">
        <div className="msw-page__prose">
          <p>
            먼저 용어. <strong>modifier</strong>는 "고치는 것"입니다. GSAP이 <strong>매 update tick에 적용하려던 값을 가로채</strong>{' '}
            내 함수에 통과시키고, <strong>돌려받은 값을 대신 적용</strong>합니다.
          </p>
          <p>
            함수는 인자 두 개를 받습니다. 첫째는 <strong>적용 직전의 값</strong>(숫자 또는 문자열)이고, 둘째는{' '}
            <strong>target 객체 자신</strong>입니다.
          </p>
          <p>
            공식 문서는 <strong>거의 모든 property에 modifier를 정의할 수 있다</strong>고 밝힙니다. 다음 단계에서 볼 몇 가지 예외만
            빼면 됩니다.
          </p>
        </div>
        <pre className="msw-page__code">
          <code>{anatomy}</code>
        </pre>
      </div>

      <div className="msw-page__note">
        <h3>따로 설치할 필요가 없습니다</h3>
        <p>
          <strong>ModifiersPlugin</strong>은 공식 문서가 말하는 <em>internal plugin</em>입니다. GSAP core에 자동으로 포함되어 있어{' '}
          <code>gsap.registerPlugin()</code>으로 등록할 필요가 없습니다. <code>modifiers</code>를 적으면 그냥 동작합니다.
        </p>
      </div>

      <div className="msw-page__subheading">
        <h3>공식이 제시하는 세 가지 쓰임</h3>
        <p>Modifiers 페이지가 데모 제목으로 내건 것들입니다. 이 페이지의 나머지 단계가 각각에 필요한 도구를 다룹니다.</p>
      </div>

      <ul className="msw-page__token-list">
        {officialUseCases.map((useCase) => (
          <li key={useCase}>
            <code>{useCase}</code>
          </li>
        ))}
      </ul>

      <p className="msw-page__note">
        공식 페이지의 이 세 데모는 코드 블록이 동적으로 불러와지는 형태라 원문 코드를 그대로 옮기지 못했습니다. 제목이 가리키는 기법
        자체는 아래 단계에서 <code>snap</code>·<code>wrap</code>으로 다룹니다.
      </p>

      <div className="msw-page__note">
        <p>
          공식 문서가 덧붙인 사실 하나. <strong>RoundPropsPlugin과 SnapPlugin은 modifier와 같은 내부 메커니즘을 씁니다.</strong> 즉
          다음 단계의 <code>snap</code>은 새로운 장치가 아니라 <strong>자주 쓰는 modifier를 짧게 쓰는 문법</strong>입니다.
        </p>
      </div>
    </section>
  )
}
