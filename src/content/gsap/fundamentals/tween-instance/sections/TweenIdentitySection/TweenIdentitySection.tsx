/** Tween이라는 단어를 먼저 정의하고, 세 생성 메서드가 모두 같은 객체를 돌려준다는 사실을 고정한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 Quick Start의 최소 예제 — 이 페이지에서 처음이자 유일하게 인용하는 "만드는" 코드다
const minimalExample = `// 이것이 Tween 하나입니다.
gsap.to(".box", { rotation: 27, x: 100, duration: 1 });`

// 같은 Tween instance를 돌려주는 세 메서드 — 이 페이지의 source가 밝힌 것은 반환값이 같다는 사실뿐이다
const creators = ['gsap.to()', 'gsap.from()', 'gsap.fromTo()']

export function TweenIdentitySection() {
  return (
    <section id="tween-identity" className="instance-page__section" aria-labelledby="tween-identity-title">
      <SectionHeading
        number="01"
        id="tween-identity"
        title="Tween은 관계 하나를 담은 객체다"
        description="지금까지는 gsap.to()를 '움직이는 명령'으로 써 왔습니다. 사실 이 호출은 명령이면서 동시에 객체 하나를 돌려줍니다. 그 객체의 이름이 Tween입니다."
      />

      <div className="instance-page__split">
        <div className="instance-page__prose">
          <p>
            먼저 용어를 정하겠습니다. <strong>instance</strong>는 "특정 설정으로 실제로 만들어진 하나"를 뜻합니다. 붕어빵 틀이 아니라
            구워져 나온 붕어빵 하나입니다. <code>gsap.to()</code>를 부를 때마다 Tween instance가 하나씩 만들어집니다.
          </p>
          <p>
            공식 문서는 Tween을 <strong>"애니메이션 작업을 실제로 수행하는 것"</strong>이라고 정의하고,{' '}
            <strong>high-performance property setter</strong>로 생각하라고 안내합니다. 값을 대신 써 주는 기계라는 뜻입니다.
          </p>
          <p>
            그 기계에 넣는 것은 세 가지입니다. <strong>targets</strong>(움직일 대상), <strong>duration</strong>(걸리는 시간), 그리고{' '}
            <strong>움직일 property들</strong>입니다. 공식 설명에 따르면 Tween은 자신의 <strong>playhead</strong>가 새 위치로 갈 때마다
            그 시점에 property 값이 얼마여야 하는지 계산해서 적용합니다.
          </p>
        </div>
        <pre className="instance-page__code">
          <code>{minimalExample}</code>
        </pre>
      </div>

      <div className="instance-page__note">
        <h3>playhead라는 말이 처음이라면</h3>
        <p>
          <strong>playhead</strong>는 영상 재생 바의 동그란 손잡이를 떠올리면 됩니다. "지금 이 애니메이션의 몇 초 지점인가"를 가리키는
          표시입니다. Tween은 이 표시가 움직일 때마다 그 위치에 맞는 값을 계산해 대상에 씁니다.{' '}
          <a href={toHref('/fundamentals/tween-playhead')}>이 표시를 읽고 옮기는 방법</a>은 별도 페이지가 다룹니다.
        </p>
      </div>

      <div className="instance-page__subheading">
        <h3>세 메서드가 모두 같은 것을 돌려줍니다</h3>
        <p>
          공식 문서는 Tween을 만드는 메서드를 셋으로 못 박고, <strong>"이 메서드들은 모두 Tween instance를 반환한다"</strong>고
          덧붙입니다. 시작·끝 값을 어떻게 적느냐만 다르고, 손에 쥐게 되는 물건은 같습니다.
        </p>
      </div>

      <div className="instance-page__table-wrap">
        <table className="instance-page__basic-table">
          <caption>Tween을 만드는 세 가지 방법</caption>
          <thead>
            <tr>
              <th scope="col">메서드</th>
              <th scope="col">반환값</th>
              <th scope="col">시작·끝 값을 정하는 방식</th>
            </tr>
          </thead>
          <tbody>
            {creators.map((creator) => (
              <tr key={creator}>
                <th scope="row">
                  <code>{creator}</code>
                </th>
                <td>Tween instance 하나</td>
                <td>
                  <a href={toHref('/fundamentals/tween-start-end-values')}>Tween 시작·끝 값 페이지</a>가 소유합니다
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="instance-page__note">
        세 메서드의 차이는 <strong>이 페이지가 담당하는 네 문서에 정의돼 있지 않습니다.</strong> 다만 Tween 페이지의{' '}
        <code>runBackwards</code> 설명이 한 줄을 흘립니다. <strong>"시작값과 끝값을 뒤집는 것이 from() tween이 내부적으로 하는 일"</strong>
        이라는 문장입니다. 나머지는 전부 위 링크의 페이지가 소유합니다. 이 페이지는{' '}
        <strong>어느 메서드로 만들었든 돌아오는 물건이 같다</strong>는 것만 씁니다.
      </p>

      <div className="instance-page__note">
        <h3>대상이 꼭 화면 위에 있을 필요는 없습니다</h3>
        <p>
          공식 문서는 <strong>"GSAP은 어떤 객체의 어떤 property든 animate할 수 있으므로 CSS property나 DOM object에 한정되지 않는다"</strong>
          고 분명히 밝힙니다. 화면에 보이지 않는 평범한 JavaScript 객체의 숫자도 같은 방식으로 움직입니다. 04번 단계의 예제에서 직접
          확인합니다.
        </p>
        <p>
          참고로 최소 예제의 <code>x: 100</code>은 CSS <code>translateX()</code> transform의 단축 표기라고 공식 예제 주석이 밝혀 둡니다.
          <code>rotation: 27</code>과 함께 1초 동안 움직이는 코드입니다.
        </p>
      </div>
    </section>
  )
}
