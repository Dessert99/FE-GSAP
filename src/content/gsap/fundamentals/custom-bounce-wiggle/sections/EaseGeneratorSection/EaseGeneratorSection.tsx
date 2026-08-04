/** ease·CustomEase·generator라는 용어를 먼저 정의하고 두 plugin이 곡선을 대신 그린다는 멘탈 모델을 세운다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const pipelineCode = `// 1. 설정값 몇 개를 넘긴다
CustomBounce.create('myBounce', { strength: 0.6 })

// 2. 'myBounce'라는 이름의 곡선이 GSAP 안에 등록된다

// 3. Tween은 그 이름만 쓴다
gsap.to('.box', { y: 300, ease: 'myBounce' })`

export function EaseGeneratorSection() {
  return (
    <section id="ease-generator" className="bounce-wiggle-page__section" aria-labelledby="ease-generator-title">
      <SectionHeading
        number="01"
        id="ease-generator"
        title="곡선을 대신 그려 주는 plugin"
        description="튕김과 떨림은 물리 계산처럼 보이지만, GSAP에서는 곡선 하나를 바꾸는 일입니다. 그 곡선을 손으로 그리지 않고 설정값 몇 개로 얻는 것이 이 두 plugin의 역할입니다."
      />

      <div className="bounce-wiggle-page__prose">
        <h3>먼저 세 단어만 정리합니다</h3>
        <dl className="bounce-wiggle-page__glossary">
          <div>
            <dt>ease</dt>
            <dd>
              Tween이 <strong>0%에서 100%까지 흐르는 동안</strong>, 지금 시점에 값이 어디쯤 있어야 하는지를 정하는 함수입니다.
              입력은 시간 진행률, 출력은 <strong>목표값을 향한 비율</strong>입니다. 자세한 계약은{' '}
              <a href={toHref('/fundamentals/easing')}>Easing 페이지</a>가 소유합니다.
            </dd>
          </div>
          <div>
            <dt>CustomEase</dt>
            <dd>
              내장 ease로는 만들 수 없는 곡선을 <strong>직접 그려서 이름을 붙여 두는</strong> plugin입니다. 한 번 이름을 붙이면 그
              뒤로는 <code>ease: '이름'</code>처럼 문자열로만 씁니다.
            </dd>
          </div>
          <div>
            <dt>generator</dt>
            <dd>
              CustomEase 곡선을 <strong>사람 대신 계산해서 만들어 주는 것</strong>을 이 페이지에서는 generator라고 부릅니다.
              CustomBounce와 CustomWiggle이 여기에 해당합니다.
            </dd>
          </div>
        </dl>
      </div>

      <div className="bounce-wiggle-page__subheading">
        <h3>왜 곡선을 따로 만들어야 하나요?</h3>
      </div>

      <div className="bounce-wiggle-page__split">
        <div className="bounce-wiggle-page__prose">
          <p>
            GSAP에는 이미 <code>"bounce"</code> ease가 있습니다. 하지만 공식 문서는 그 ease에{' '}
            <strong>얼마나 튕길지를 조절하는 방법이 없다</strong>고 밝힙니다. 브랜드마다 원하는 탄성감이 다른데 선택지가 하나뿐인
            것입니다.
          </p>
          <p>
            더 큰 문제는 <strong>찌그러짐(squash)</strong>입니다. 공이 바닥에 닿아 눌리려면 그 순간 잠깐 바닥에 붙어 있어야
            하는데, 내장 <code>"bounce"</code>는 그런 조정을 지원하지 않습니다.
          </p>
          <p>
            그렇다고 <code>scaleX</code>·<code>scaleY</code>용 곡선을 손으로 그리는 것도 답이 아닙니다. 공식 문서는 CustomEase가
            그리는 것 자체는 가능하게 했지만, <strong>점들을 튕기는 지점에 정확히 맞춰 배치하는 일은 여전히 매우 어렵다</strong>고
            적습니다.
          </p>
        </div>
        <div className="bounce-wiggle-page__prose">
          <p>
            그래서 CustomBounce는 <strong>설정값 몇 개를 받아 CustomEase를 둘 다 만들어 줍니다.</strong> 하나는 튕김용, 하나는
            (선택적으로) 찌그러짐용입니다.
          </p>
          <p>
            공식 문서의 표현을 그대로 옮기면 CustomBounce는{' '}
            <strong>"넘긴 변수를 바탕으로 내부에서 CustomEase를 만드는 wrapper"</strong>입니다. 새로운 종류의 애니메이션이 아니라,{' '}
            <strong>곡선을 만드는 지름길</strong>이라는 뜻입니다.
          </p>
          <p>
            CustomWiggle도 같은 자리에 있습니다. 공식 문서는 이 plugin이 <strong>흔들림의 양(amount)과 종류(type)를 설정하게
            해 준다</strong>고 설명합니다.
          </p>
        </div>
      </div>

      <div className="bounce-wiggle-page__subheading">
        <h3>두 plugin이 공유하는 흐름</h3>
      </div>

      <div className="bounce-wiggle-page__split">
        <pre className="bounce-wiggle-page__code">
          <code>{pipelineCode}</code>
        </pre>
        <div className="bounce-wiggle-page__prose">
          <p>
            <strong>설정 → 이름 → Tween</strong>. 이 순서는 두 plugin이 똑같습니다. 그래서 곡선을 만드는 함수 이름만 바꾸면
            나머지는 그대로입니다.
          </p>
          <p>
            여기서 꼭 기억할 문장이 하나 있습니다. 공식 CustomWiggle 문서의 표현입니다.{' '}
            <strong>"ease는 tween에 넘긴 각 property 값을 향한 움직임의 비율만 제어한다."</strong>
          </p>
          <p>
            즉 곡선은 <strong>"목표값의 몇 퍼센트 지점인가"</strong>만 정합니다. 실제로 몇 픽셀 움직이고 몇 도 돌아가는지는 언제나
            Tween이 넘긴 값이 정합니다. 이 구분이 뒤에서 계속 나옵니다.
          </p>
        </div>
      </div>

      <div className="bounce-wiggle-page__note">
        <h3>"물리감"은 물리 계산이 아닙니다</h3>
        <p>
          이 페이지의 제목에 있는 물리감은 <strong>중력·질량·충돌을 계산한다는 뜻이 아닙니다.</strong> 시간 진행률을 튕기거나
          떨리는 모양으로 다시 배치해 <strong>그렇게 느끼게 만드는 곡선 설계</strong>를 말합니다. 실제 물리 시뮬레이션이 필요하면
          GSAP의 다른 plugin을 봐야 합니다.
        </p>
      </div>
    </section>
  )
}
