/** 전역 defaults와 별도로 배울 설정 경로를 다음 학습에 연결한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const timelineDefaultsCode = `// Timeline의 defaults는 전역이 아니라 그 안에서 만드는 자식 애니메이션에 적용됩니다.
const tl = gsap.timeline({ defaults: { duration: 5 } })`

export function BoundariesSection() {
  return (
    <section id="boundaries" className="tween-config-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="06"
        id="boundaries"
        title="여기서 다루지 않는 설정"
        description="설정을 넣을 수 있는 자리는 더 있습니다. 전역 defaults와 헷갈리기 쉬운 경우를 구분하고 다음 학습을 찾아봅니다."
      />

      <div className="tween-config-page__split">
        <div className="tween-config-page__prose">
          <p>
            <strong>Timeline의 defaults</strong>는 이름이 같지만 전역이 아닙니다. 그 Timeline 안에서 만드는 자식 애니메이션이 물려받으므로,
            전역 <code>gsap.defaults()</code>를 건드리지 않고도 한 sequence의 기본값을 맞출 수 있습니다.
          </p>
          <p>
            <strong>각 special property의 동작</strong>이 궁금하다면 <code>gsap.to()</code>에서 이어서 확인하세요. 여기서는 값이 어디서
            오는지와 어떤 값이 우선하는지에 집중했습니다.
          </p>
        </div>
        <pre className="tween-config-page__code">
          <code>{timelineDefaultsCode}</code>
        </pre>
      </div>

      <ol className="tween-config-page__roadmap">
        <li>
          <span>함께 보기</span>
          <div>
            <a href={toHref('/fundamentals/timeline-basics')}>Timeline sequence 만들기</a>
            <p>Timeline defaults가 자식 애니메이션에 적용되는 범위를 배웁니다.</p>
          </div>
        </li>
        <li>
          <span>함께 보기</span>
          <div>
            <a href={toHref('/fundamentals/gsap-to')}>gsap.to()</a>
            <p>defaults가 채워 주는 special property 전체 명세입니다.</p>
          </div>
        </li>
        <li>
          <span>함께 보기</span>
          <div>
            <a href={toHref('/fundamentals/easing')}>Easing</a>
            <p>defaults로 가장 자주 지정하는 값이 ease입니다.</p>
          </div>
        </li>
        <li>
          <span>이전</span>
          <div>
            <a href={toHref('/fundamentals/gsap-core-map')}>GSAP Core 지도</a>
            <p>gsap 객체가 가진 설정 API가 전체 지도에서 어디에 있는지 확인합니다.</p>
          </div>
        </li>
      </ol>
    </section>
  )
}
