/** React가 컴포넌트를 반복 실행한다는 사실이 왜 애니메이션 문제로 이어지는지 정의한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const withoutHook = `// useEffect로 직접 만들면
useEffect(() => {
  gsap.to('.box', { x: 200 })
}, [])

// strict mode에서 이 안이 두 번 실행됩니다.
// → 같은 상자에 Tween이 두 개 생깁니다.`

export function WhyCleanupSection() {
  return (
    <section id="why-cleanup" className="react-gsap-page__section" aria-labelledby="why-cleanup-title">
      <SectionHeading
        number="01"
        id="why-cleanup"
        title="React가 애니메이션에 만드는 문제"
        description="React는 컴포넌트를 지웠다 다시 만듭니다. 애니메이션은 그 사실을 모릅니다. 이 어긋남에서 문제가 시작됩니다."
      />

      <div className="react-gsap-page__split">
        <div className="react-gsap-page__prose">
          <p>
            먼저 용어 하나. <strong>정리(cleanup)</strong>는 만들어 둔 것을 더 이상 필요 없을 때 치우는 일입니다. 애니메이션에서는
            "이 Tween을 없애고 대상 값을 원래대로 돌려놓기"를 뜻합니다.
          </p>
          <p>
            React에서 이게 왜 문제가 되냐면, <strong>React 18은 로컬 개발에서 기본적으로 strict mode로 돌아가고, 그 때문에 Effect가 두
            번 호출되기 때문</strong>입니다. 공식 문서가 대문자로 강조하는 지점입니다.
          </p>
          <p>
            두 번 호출되면 애니메이션도 두 번 만들어집니다. 공식 문서 표현으로 <strong>중복되고 충돌하는 animation이나 논리 문제</strong>가
            생깁니다. 같은 상자를 두 Tween이 서로 다른 값으로 밀면 화면이 떨리거나 엉뚱한 자리에 멈춥니다.
          </p>
        </div>
        <pre className="react-gsap-page__code">
          <code>{withoutHook}</code>
        </pre>
      </div>

      <div className="react-gsap-page__note">
        <h3>useGSAP()이 하는 일</h3>
        <p>
          공식 문서는 <code>useGSAP()</code>을 <strong><code>useEffect()</code>나 <code>useLayoutEffect()</code>를 그대로 대체하는
          drop-in replacement</strong>라고 정의합니다. 그리고 <strong><code>gsap.context()</code>를 써서 정리를 자동으로 처리</strong>합니다.
        </p>
        <p>
          즉 새로운 애니메이션 기능을 주는 훅이 아닙니다. <strong>치우는 일을 대신해 주는 훅</strong>입니다. 그래서 이 페이지의 주제는
          "무엇을 만드느냐"가 아니라 "언제 치워지느냐"입니다.
        </p>
      </div>
    </section>
  )
}
