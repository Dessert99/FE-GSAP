/** conditions 객체가 왜 필요한지, context.conditions의 boolean을 어떻게 읽는지, 언제 다시 실행되는지를 예제와 함께 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { ConditionRebuildLab } from '../../examples/ConditionRebuildLab/ConditionRebuildLab'

// 공식 문서가 제시한 conditions 객체 모양 — 이름은 임의, 값은 media query 문자열이다
const conditionsShape = `{
  isDesktop: "(min-width: 800px)",
  isMobile: "(max-width: 799px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}`

// 공식 conditions 예제 전문 — boolean으로 값만 갈아 끼우는 방식을 그대로 보여준다
const officialExample = `let mm = gsap.matchMedia(),
  breakPoint = 800;

mm.add(
  {
    // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
    isDesktop: \`(min-width: \${breakPoint}px)\`,
    isMobile: \`(max-width: \${breakPoint - 1}px)\`,
    reduceMotion: "(prefers-reduced-motion: reduce)",
  },
  (context) => {
    // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
    let { isDesktop, isMobile, reduceMotion } = context.conditions;

    gsap.to(".box", {
      rotation: isDesktop ? 360 : 180, // spin further if desktop
      duration: reduceMotion ? 0 : 2, // skip to the end if prefers-reduced-motion
    });

    return () => {
      // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
      // it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
    };
  });`

export function ConditionsObjectSection() {
  return (
    <section id="conditions-object" className="responsive-page__section" aria-labelledby="conditions-object-title">
      <SectionHeading
        number="03"
        id="conditions-object"
        title="조건을 객체로 묶고 boolean으로 읽는다"
        description="조건마다 add()를 따로 쓰면 거의 같은 코드가 두 벌, 세 벌이 됩니다. 달라지는 값이 몇 개뿐이라면 조건을 객체로 묶는 편이 낫습니다."
      />

      <div className="responsive-page__prose">
        <p>
          공식 문서가 던지는 질문이 이 형태의 이유를 그대로 말합니다 —{' '}
          <strong>"여러 media query의 setup 코드가 거의 같은데 핵심 값 몇 개만 다르다면?"</strong> 그럴 때{' '}
          <strong>첫 인자에 문자열 대신 임의 이름의 conditions 객체를 넘기면 그중 하나라도 매치될 때 함수가 호출되고, 각 조건을 boolean으로
          확인할 수 있습니다.</strong>
        </p>
      </div>

      <pre className="responsive-page__code">
        <code>{conditionsShape}</code>
      </pre>

      <div className="responsive-page__prose">
        <p>
          왼쪽의 <code>isDesktop</code>, <code>isMobile</code>, <code>reduceMotion</code>은 GSAP이 정한 이름이 아닙니다. 공식 문장은{' '}
          <strong>조건 이름은 원하는 대로 지어도 된다</strong>입니다. 오른쪽 문자열만 브라우저가 읽고, 왼쪽 이름은 우리가 코드 안에서 다시
          읽기 위한 꼬리표입니다.
        </p>
        <p>
          그 꼬리표는 handler 안에서 <code>context.conditions</code>로 돌아옵니다. 공식 주석이 정확한 설명입니다 —{' '}
          <strong>context.conditions는 위에서 정의한 각 조건마다 매치 여부를 나타내는 boolean property를 갖는다.</strong>
        </p>
      </div>

      <pre className="responsive-page__code">
        <code>{officialExample}</code>
      </pre>

      <div className="responsive-page__prose">
        <p>
          공식 예제에서 실제로 조건을 쓰는 곳은 두 줄뿐입니다. <code>rotation: isDesktop ? 360 : 180</code>은 desktop이면 더 돌라는
          뜻이고, <code>duration: reduceMotion ? 0 : 2</code>는 모션 감소를 요청했으면 끝 상태로 건너뛰라는 뜻입니다. setup 코드 한 벌을
          공유하면서 <strong>값만 갈아 끼우는</strong> 것이 conditions 객체를 쓰는 이유입니다.
        </p>
      </div>

      <div className="responsive-page__warning">
        <h3>언제 다시 실행되는가</h3>
        <p>
          공식 문장 그대로입니다 —{' '}
          <strong>조건 중 하나라도 토글되면 revert하고 handler를 다시 실행한다. 하나도 매치되지 않으면 다시 실행하지 않는다.</strong>{' '}
          공식 예시도 함께 적혀 있습니다. 조건 셋 중 둘이 매치되면 실행되고, 매치되던 query 하나가 <code>false</code>로 토글되면 revert
          후 <strong>갱신된 조건 값으로</strong> 함수를 다시 실행합니다.
        </p>
        <p>
          여기서 놓치기 쉬운 것은 <strong>"하나도 매치되지 않으면 다시 실행하지 않는다"</strong>입니다. 조건을 하나만 걸어 두면, 그 조건이
          거짓인 동안 handler는 아예 실행되지 않습니다. 서로 반대인 조건을 쌍으로 두는 습관이 여기서 나옵니다.
        </p>
      </div>

      <div className="responsive-page__note responsive-page__note--probe">
        <h3>공식 문서에 없는 것 하나 — context.queries</h3>
        <p>
          공식 페이지는 <code>context.conditions</code>만 설명합니다. 설치본에서 확인하면 그 옆에 <code>context.queries</code>가 있고,
          조건 이름별 <strong>원본 query 문자열</strong>을 그대로 들고 있습니다. 아래 예제의 표가 query 문자열을 보여줄 수 있는 이유도
          같은 값을 실행 시점에 만들어 두기 때문입니다.
        </p>
        <p className="responsive-page__provenance">
          이 항목은 공식 페이지에 게시돼 있지 않습니다. GSAP 3.15.0을 직접 실행해 확인한 내용입니다.
        </p>
      </div>

      <ConditionRebuildLab />
    </section>
  )
}
