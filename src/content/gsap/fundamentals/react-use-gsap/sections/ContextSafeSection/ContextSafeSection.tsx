/** 훅 실행 이후 만들어지는 애니메이션이 왜 정리 대상에서 빠지는지와 두 가지 해결 방법을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const returnedObject = `const { contextSafe } = useGSAP({ scope: container })

const onClickGood = contextSafe(() => {
  gsap.to('.good', { rotation: 180 })
})`

const secondArgument = `useGSAP((context, contextSafe) => {
  gsap.to(goodRef.current, { x: 100 })

  const onClickGood = contextSafe(() => {
    gsap.to(goodRef.current, { rotation: 180 })
  })

  goodRef.current.addEventListener('click', onClickGood)

  return () => {
    goodRef.current.removeEventListener('click', onClickGood)
  }
}, { scope: container })`

export function ContextSafeSection() {
  return (
    <section id="context-safe" className="react-gsap-page__section" aria-labelledby="context-safe-title">
      <SectionHeading
        number="04"
        id="context-safe"
        title="훅 밖에서 만든 애니메이션"
        description="버튼을 눌러야 만들어지는 애니메이션은 훅이 이미 끝난 뒤에 태어납니다. 그래서 자동 정리 목록에 들어가지 못합니다."
      />

      <div className="react-gsap-page__prose">
        <p>
          02단계에서 자동 revert 대상은 <strong>"훅이 실행될 때 만들어진 것"</strong>이라고 했습니다. 클릭 핸들러 안의{' '}
          <code>gsap.to()</code>는 그 조건에 맞지 않습니다. 훅은 이미 한참 전에 끝났고, 애니메이션은 사용자가 버튼을 누른 순간
          태어나기 때문입니다.
        </p>
        <p>
          공식 문서 표현으로 이런 애니메이션은 <strong>context-safe하지 않습니다.</strong> 컴포넌트가 사라져도 이 애니메이션은 정리
          목록에 없어서 그대로 남습니다.
        </p>
        <p>
          해결책이 <code>contextSafe()</code>입니다. 함수를 이걸로 감싸면 <strong>그 안에서 만들어진 animation이 context에 기록되어
          제대로 revert됩니다.</strong> 쓰는 방법은 두 가지이고, <strong>어디서 쓰느냐</strong>로 갈립니다.
        </p>
      </div>

      <div className="react-gsap-page__split">
        <div>
          <div className="react-gsap-page__subheading">
            <h3>1) 훅이 돌려주는 객체에서 꺼내기</h3>
            <p>훅 바깥에서 쓸 때입니다. JSX의 onClick에 바로 연결하는 경우가 여기 해당합니다.</p>
          </div>
          <pre className="react-gsap-page__code">
            <code>{returnedObject}</code>
          </pre>
        </div>
        <div>
          <div className="react-gsap-page__subheading">
            <h3>2) 콜백의 두 번째 인자로 받기</h3>
            <p>훅 안에서 쓸 때입니다. addEventListener로 직접 붙이는 경우가 여기 해당합니다.</p>
          </div>
          <pre className="react-gsap-page__code">
            <code>{secondArgument}</code>
          </pre>
        </div>
      </div>

      <div className="react-gsap-page__note">
        <h3>selector도 함께 좁혀집니다</h3>
        <p>
          공식 문장입니다. <strong>context-safe 함수 안의 selector text도 Context의 scope를 사용합니다.</strong> 즉{' '}
          <code>contextSafe()</code>로 감싸면 정리만 되는 게 아니라 03단계에서 본 <code>scope</code> 한정도 그대로 적용됩니다.
        </p>
      </div>

      <div className="react-gsap-page__warning">
        <h3>이벤트 리스너는 직접 떼야 합니다</h3>
        <p>
          두 번째 방법의 공식 예제를 보면 마지막에 <strong>cleanup 함수를 반환해 <code>removeEventListener</code>를 부릅니다.</strong>{' '}
          <code>contextSafe()</code>가 정리해 주는 것은 <strong>GSAP 객체</strong>이지 이벤트 리스너가 아닙니다. 직접 붙인 리스너는 직접
          떼야 합니다.
        </p>
      </div>
    </section>
  )
}
