/** 생성 시 vars에 적는 방식과 생성 뒤 eventCallback()으로 다루는 방식을 비교한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 문서가 "기능적으로 동일하다"고 밝힌 두 줄 — 같은 결과를 두 시점에 만든다는 것을 보여주는 근거다
const equivalentPair = `// (1) 만들 때 vars에 적는다
gsap.to(obj, {duration: 1, x: 100, onComplete: myFunction, onCompleteParams: ['param1', 'param2']});

// (2) 만든 뒤에 eventCallback()으로 적는다
myAnimation.eventCallback('onComplete', myFunction, ['param1', 'param2']);`

export function AfterCreationSection() {
  return (
    <section id="after-creation" className="callbacks-page__section" aria-labelledby="after-creation-title">
      <SectionHeading
        number="01"
        id="after-creation"
        title="이미 만들어진 Tween에 손대야 할 때"
        description="Tween을 만들 때는 무엇을 할지 몰랐는데, 나중에 알게 되는 경우가 있습니다. 그때 Tween을 다시 만들지 않고 콜백만 바꿀 수 있습니다."
      />

      <div className="callbacks-page__split">
        <div className="callbacks-page__prose">
          <p>
            <strong>콜백(callback)</strong>은 "이 일이 끝나면 이 함수를 대신 불러 줘"라고 미리 맡겨 두는 함수입니다. GSAP에서는{' '}
            <code>onComplete</code>, <code>onStart</code>, <code>onUpdate</code>처럼 <strong>언제 부를지가 이름에 적혀 있습니다.</strong>
          </p>
          <p>
            Tween을 만들 때는 이 함수들을 <code>vars</code> 객체 안에 적을 수 있습니다. 공식 문서는 콜백과 parameter가{' '}
            <code>vars</code>에도 저장된다고 설명합니다.
          </p>
          <p>
            <code>eventCallback()</code>은 이미 만들어진 Tween의 콜백을 메서드로 다룹니다. 공식 문서는 이 메서드를{' '}
            <strong>event callback과 거기에 넘길 parameter를 "가져오거나 설정하는(Gets or sets)"</strong> 메서드라고 정의합니다.
          </p>
        </div>
        <pre className="callbacks-page__code">
          <code>{equivalentPair}</code>
        </pre>
      </div>

      <div className="callbacks-page__note">
        <h3>두 방식은 결과가 같습니다</h3>
        <p>
          공식 문서는 위 두 줄을 나란히 놓고 <strong>"기능적으로 동일하다(functionally equivalent)"</strong>고 못 박습니다. 즉{' '}
          두 setter 형태는 같은 콜백과 parameter를 등록합니다. 무엇이 등록되는지가 아니라 <strong>언제 어떤 호출 형태로 등록하는지</strong>가
          다릅니다. <code>eventCallback()</code>의 getter와 삭제 형태는 다음 단계에서 따로 살펴봅니다.
        </p>
      </div>

      <div className="callbacks-page__note">
        <h3>그래서 얻는 것 세 가지</h3>
        <p>공식 문서가 밝힌 <code>eventCallback()</code>의 이점입니다.</p>
        <p>
          첫째, animation instance가 <strong>만들어진 뒤에도</strong> 콜백을 설정할 수 있습니다. 둘째, 지금 등록된{' '}
          <strong>콜백 참조를 조회</strong>할 수 있습니다. 셋째, 그 콜백을 <strong>즉시 삭제</strong>할 수 있습니다.
        </p>
        <p>
          <code>eventCallback()</code>을 쓰면 이 세 동작을 문서화된 메서드 하나로 구분해 표현하고, setter 호출을 다른 Tween 메서드와
          이어 쓸 수 있습니다.
        </p>
      </div>

      <div className="callbacks-page__warning">
        <h3>콜백 이름 자체는 이 페이지가 설명하지 않습니다</h3>
        <p>
          <code>onComplete</code>가 정확히 언제 불리는지, <code>onUpdate</code>가 한 번의 재생에서 몇 번 불리는지 같은{' '}
          <strong>개별 콜백의 전체 명세</strong>는 <a href={toHref('/fundamentals/gsap-to')}>gsap.to() 페이지</a>에서 다룹니다.
        </p>
        <p>
          이 페이지는 <strong>이미 이름을 아는 콜백을 나중에 어떻게 다루느냐</strong>만 다룹니다. 공식{' '}
          <code>eventCallback()</code> 문서가 언급하는 종류는 <code>onComplete</code>, <code>onUpdate</code>, <code>onStart</code>,{' '}
          <code>onReverseComplete</code>, <code>onInterrupt</code>, <code>onRepeat</code>입니다.
        </p>
      </div>
    </section>
  )
}
