/** 조건부로만 생기는 네 번째 속성의 존재와 경계만 다루고, ScrollTrigger plugin 계약 전체는 공식 문서로 넘긴다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 scrollTrigger 전용 페이지가 게시한 signature 한 줄
const signature = 'scrollTrigger: ScrollTrigger | undefined'

// 공식 페이지의 흐름을 실행 가능한 Tween 코드로 정리해 설정과 인스턴스 접근을 보여준다
const officialExample = `// Tween에 ScrollTrigger를 붙입니다
const tween = gsap.to("#id", {
  scrollTrigger: { start: "top center" },
});

// 붙은 ScrollTrigger에 접근해 여러 메서드를 부릅니다
tween.scrollTrigger.refresh();
// 또는
tween.scrollTrigger.kill();`

export function ScrollTriggerBoundarySection() {
  return (
    <section id="scroll-trigger" className="instance-page__section" aria-labelledby="scroll-trigger-title">
      <SectionHeading
        number="06"
        id="scroll-trigger"
        title="있을 때만 생기는 속성 하나"
        description="공식 Properties 표의 네 번째 행입니다. 그런데 이 속성은 앞의 셋과 성격이 다릅니다. 항상 있는 게 아니라 조건이 맞을 때만 생깁니다."
      />

      <pre className="instance-page__signature">
        <code>{signature}</code>
      </pre>

      <div className="instance-page__split">
        <div className="instance-page__prose">
          <p>
            먼저 용어입니다. <strong>ScrollTrigger</strong>는 스크롤 위치에 애니메이션을 연결해 주는 GSAP <strong>plugin</strong>입니다.
            plugin은 core에 없는 기능을 필요할 때만 더하는 별도 모듈입니다.
          </p>
          <p>
            공식 설명은 짧습니다. 첫 문장은 <strong>"tween에 연결된 ScrollTrigger에 접근하는 편리한 방법"</strong>이고, 두 번째 문장은{' '}
            <strong>"tween이 ScrollTrigger를 가지고 있을 때만 접근할 수 있다"</strong>입니다.
          </p>
          <p>
            여기서 이 페이지의 관심사는 하나뿐입니다. <strong>인스턴스에 무엇이 남는가</strong>. 답은{' '}
            <strong>"조건부로 하나 더 남을 수 있다"</strong>입니다. 앞의 세 속성이 무조건 생기는 것과 대비됩니다.
          </p>
        </div>
        <pre className="instance-page__code">
          <code>{officialExample}</code>
        </pre>
      </div>

      <div className="instance-page__warning">
        <h3>공식 경고 문구</h3>
        <p>
          공식 페이지는 경고 상자로 이렇게 강조합니다.{' '}
          <strong>"scrollTrigger property는 Timeline이나 Tween이 ScrollTrigger를 가지고 있을 때만 추가된다."</strong>
        </p>
        <p>
          <strong>"추가된다(added)"</strong>는 단어에 주목하세요. 값이 비어 있는 게 아니라 <strong>속성 자체가 붙지 않는다</strong>는
          뜻입니다. 바로 아래에서 실행으로 확인합니다.
        </p>
      </div>

      <div className="instance-page__note">
        <h3>흐름은 두 단계입니다</h3>
        <p>
          공식 예제의 흐름을 실행 가능한 Tween 코드로 정리하면 이렇습니다. 첫째, 만들 때 <code>vars</code> 안에{' '}
          <code>scrollTrigger: {'{ ... }'}</code>를 적습니다. 둘째, 만들어진 인스턴스에서 <code>tween.scrollTrigger</code>를 꺼내{' '}
          <code>refresh()</code>나 <code>kill()</code> 같은 메서드를 부릅니다.
        </p>
        <p>
          <strong>설정을 넣는 자리와 결과를 꺼내는 자리가 다릅니다.</strong> 넣을 때는 <code>vars</code> 안의 평범한 설정 객체이고,
          꺼낼 때는 메서드를 가진 ScrollTrigger 객체입니다. ScrollTrigger plugin이 설정에 따라 객체를 만들고 Tween에 연결합니다.
        </p>
      </div>

      <div className="instance-page__note instance-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p className="instance-page__provenance">
          아래는 공식 문서에 적혀 있지 않습니다. GSAP 3.15.0을 Node에서 직접 실행해 확인한 결과입니다.
        </p>
        <p>
          공식 signature는 <code>ScrollTrigger | undefined</code>라고 적혀 있어서 "없으면 undefined가 들어 있다"고 읽기 쉽습니다. 실제로는
          다릅니다. ScrollTrigger를 붙이지 않은 Tween에서 <code>&apos;scrollTrigger&apos; in tween</code>은 <code>false</code>입니다.{' '}
          <strong>값이 undefined인 것이 아니라 속성이 아예 없습니다.</strong>
        </p>
        <p>
          05번 단계의 <code>data</code>와 정확히 반대입니다. <code>data</code>는 비어 있어도 자리가 있고, <code>scrollTrigger</code>는
          조건이 맞아야 자리가 생깁니다. 이 차이는 위 예제 표의 마지막 줄에서 확인할 수 있습니다.
        </p>
      </div>

      <div className="instance-page__warning">
        <h3>여기서 멈춥니다</h3>
        <p>
          공식 페이지도 마지막에 <strong>"자세한 내용은 ScrollTrigger 문서를 보라"</strong>고 넘깁니다. 이 페이지가 담당하는 공식 문서는{' '}
          <code>Tween.scrollTrigger</code> 한 장뿐이라, <strong>스크롤 연동의 설정값·동작·성능 계약은 다루지 않습니다.</strong>
        </p>
        <p>
          <code>start</code>가 무엇을 뜻하는지, <code>scrub</code>이나 <code>pin</code>이 어떻게 동작하는지, plugin을 어떻게 등록하는지는
          전부 ScrollTrigger plugin 학습 페이지의 몫입니다. 여기서 배울 것은{' '}
          <strong>"만든 Tween에서 그것을 꺼낼 수 있다"</strong>는 사실 하나입니다.
        </p>
        <p>
          <a href="https://gsap.com/docs/v3/Plugins/ScrollTrigger/">공식 ScrollTrigger 문서</a>
        </p>
      </div>
    </section>
  )
}
