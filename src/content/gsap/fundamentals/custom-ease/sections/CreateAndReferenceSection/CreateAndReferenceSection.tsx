/** create()로 이름을 붙여 두고 tween에서 문자열로 부르는 흐름과 이름 충돌 주의점을 설명한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 Quick Start와 "The code" 절이 같은 형태로 두 번 게시한 최소 사용 예제 원문
const officialUsage = `//define your CustomEase and give it an ID ("hop" in this case)
CustomEase.create(
  "hop",
  "M0,0 C0,0 0.056,0.442 0.175,0.442 0.294,0.442 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0"
);

//now you can reference the ease by ID (as a string):
gsap.to(element, { duration: 1, y: -100, ease: "hop" });`

// 실행으로 확인한 대체 사용법 — 공식 문서에는 문자열 ID 사용법만 게시돼 있다
const probeUsage = `const hop = CustomEase.create('hop', 'M0,0 C0,0 …')

typeof hop            // 'function'
hop(0.175)            // 0.442
gsap.parseEase('hop') // 같은 함수

// 이름 대신 반환된 함수를 그대로 넘겨도 결과가 같습니다
gsap.to(element, { y: -100, ease: hop })`

export function CreateAndReferenceSection() {
  return (
    <section
      id="create-and-reference"
      className="custom-ease-page__section"
      aria-labelledby="create-and-reference-title"
    >
      <SectionHeading
        number="03"
        id="create-and-reference"
        title="한 번 만들어 두고 이름으로 부릅니다"
        description="CustomEase는 '곡선 데이터'와 '이름'을 짝지어 등록해 두는 방식으로 씁니다. tween에는 긴 데이터 대신 짧은 이름만 적습니다."
      />

      <div className="custom-ease-page__prose">
        <p>
          곡선 데이터는 뒤에서 보겠지만 꽤 깁니다. 공식 문서는 그 긴 문자열을 tween마다 적는 대신,{' '}
          <code>create()</code>로 <strong>한 번만</strong> 만들고 <code>"hop"</code>이나 <code>"wiggle"</code>처럼 기억하기 쉬운{' '}
          <strong>ID</strong>를 붙이라고 합니다. 그리고 그 뒤로는 어떤 tween에서든 그 ID를 참조하면 됩니다. 만드는 시점은 보통{' '}
          <strong>페이지나 앱이 로드되자마자</strong>입니다.
        </p>
      </div>

      <div className="custom-ease-page__subheading">
        <h3>공식 문서가 두 번 보여 주는 최소 형태</h3>
        <p>
          Quick Start와 "The code" 절이 같은 예제를 반복합니다. 주석까지 공식 원문 그대로입니다. 두 번째 인자에 들어간 긴 문자열이
          곡선이고, 04단계에서 그 문법을 봅니다.
        </p>
      </div>

      <pre className="custom-ease-page__code">
        <code>{officialUsage}</code>
      </pre>

      <div className="custom-ease-page__note">
        <h3>왜 미리 만들라고 할까요</h3>
        <p>
          공식 문서의 이유는 <strong>성능</strong>입니다. CustomEase는 곡선을 받으면 내부적으로 모든 점을 계산하고 실행 중에 아주 빠르게
          읽을 수 있도록 데이터를 최적화합니다. 여기에 약간의 overhead가 드는데,{' '}
          <strong>그 작업은 생성할 때 딱 한 번만 일어납니다.</strong> 미리 만들어 두면 애니메이션이 도는 동안에는 그 비용이 들지
          않습니다.
        </p>
      </div>

      <div className="custom-ease-page__warning">
        <h3>이름을 표준 ease와 같게 짓지 마세요</h3>
        <p>
          공식 caveat입니다. ease 이름을 <code>"expo"</code>나 <code>"power1"</code> 같은 <strong>표준 ease 이름</strong>과 같게 지으면,
          그 표준 ease를 덮어써서 내 CustomEase로 <strong>대체해 버립니다.</strong> 그 이름을 쓰던 다른 코드가 조용히 다른 곡선으로
          움직이게 되므로, 보통 좋은 생각이 아닙니다.
        </p>
      </div>

      <div className="custom-ease-page__note custom-ease-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용 · 덮어쓰기의 범위</h3>
        <p>
          이 프로젝트에 설치된 GSAP 3.15.0에서 직접 실행해 보니, 덮어쓰기는{' '}
          <strong>정확히 같은 이름 하나에만</strong> 적용됐습니다. <code>CustomEase.create('power1', …)</code> 뒤에도{' '}
          <code>"power1.out"</code>은 표준 곡선 그대로였고(<code>0.5</code>에서 <code>0.75</code>), <code>"power1"</code>만 새 곡선으로
          바뀌었습니다(<code>0.5</code>에서 <code>0.5</code>). 공식 문서는 이 범위를 적어 두지 않았으니, 실행으로 확인한 사실로만
          받아들이고 <strong>이름은 그냥 겹치지 않게 짓는 편</strong>이 안전합니다.
        </p>
      </div>

      <div className="custom-ease-page__note custom-ease-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용 · create()가 돌려주는 값</h3>
        <p>
          공식 문서는 <strong>문자열 ID로 참조하는 방법만</strong> 게시합니다. 같은 3.15.0에서 실행해 보니{' '}
          <code>create()</code>는 만들어진 <strong>ease 함수 자체를 반환</strong>했고, <code>gsap.parseEase('hop')</code>도 같은 함수를
          돌려줬습니다. 그 함수를 <code>ease</code>에 직접 넘겨도 문자열 ID를 쓸 때와 값이 같았습니다. 문자열 이름이 어떻게 함수로
          풀리는지는 <a href={toHref('/fundamentals/easing')}>Easing 페이지</a>가 소유합니다.
        </p>
      </div>

      <pre className="custom-ease-page__code">
        <code>{probeUsage}</code>
      </pre>
    </section>
  )
}
