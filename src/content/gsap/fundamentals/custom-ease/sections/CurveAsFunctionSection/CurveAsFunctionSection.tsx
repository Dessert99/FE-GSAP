/** ease가 무엇인지 먼저 정의하고, 준비된 ease의 한계와 CustomEase가 여는 범위를 대조한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function CurveAsFunctionSection() {
  return (
    <section id="curve-as-function" className="custom-ease-page__section" aria-labelledby="curve-as-function-title">
      <SectionHeading
        number="01"
        id="curve-as-function"
        title="준비된 ease로는 못 만드는 움직임이 있습니다"
        description="GSAP에는 power, back, bounce처럼 미리 만들어 둔 ease가 있습니다. 그 목록에 없는 모양이 필요할 때 쓰는 것이 CustomEase입니다."
      />

      <div className="custom-ease-page__prose">
        <p>
          먼저 용어부터 정하겠습니다. <strong>ease</strong>는 "시간이 얼마나 흘렀나"를 "값이 얼마나 갔나"로 바꿔 주는 함수입니다. tween이
          절반쯤 흘렀을 때(<code>progress = 0.5</code>) 상자를 목적지의 절반에 둘지, 8할 지점에 둘지 정하는 것이 ease입니다. 같은 거리를
          같은 시간에 가더라도 이 함수가 다르면 느낌이 완전히 달라집니다.
        </p>
        <p>
          ease가 무엇이고 <code>power2.out</code> 같은 이름이 어떻게 해석되는지는{' '}
          <a href={toHref('/fundamentals/easing')}>Easing 페이지</a>가 소유합니다. 이 페이지는 그 다음 질문 하나만 다룹니다.{' '}
          <strong>준비된 이름 중에 원하는 모양이 없으면 어떻게 하나요?</strong>
        </p>
        <p>
          공식 문서의 답은 분명합니다. CustomEase는 <strong>"준비된 easing 선택지의 한계에서 벗어나게 해 준다"</strong>고 적혀 있습니다.
          Ease Visualizer에서 곡선을 직접 그리거나 SVG path를 복사해 붙여 넣는 것만으로, 상상할 수 있는 어떤 easing 곡선이든 만들 수
          있다는 뜻입니다.
        </p>
      </div>

      <div className="custom-ease-page__note">
        <h3>제어점 개수에 제한이 없습니다</h3>
        <p>
          공식 문서는 이 문단을 <strong>"Zero limitations. Use as many control points as you want."</strong>라는 두 문장으로 끝냅니다.{' '}
          <strong>제어점(control point)</strong>은 곡선의 모양을 잡아 주는 점입니다. CSS의 <code>cubic-bezier()</code>가 제어점 두 개만
          허용하는 것과 달리, CustomEase는 점을 원하는 만큼 찍어 여러 번 꺾이고 되돌아오는 곡선까지 만들 수 있습니다.
        </p>
      </div>

      <div className="custom-ease-page__warning">
        <h3>여기서 미리 알아 둘 한 가지</h3>
        <p>
          "어떤 곡선이든"에는 <strong>1을 넘거나 0으로 되돌아오는 곡선</strong>도 포함됩니다. ease가 만든 값이 1이면 목적지, 0이면
          출발점입니다. 그러니 곡선이 중간에 1을 넘으면 목적지를 지나쳤다가 돌아오고, 끝에서 0이 되면 출발점으로 되돌아옵니다. 공식
          예제인 <code>"hop"</code>이 정확히 그런 곡선입니다. 04단계에서 직접 확인합니다.
        </p>
      </div>
    </section>
  )
}
