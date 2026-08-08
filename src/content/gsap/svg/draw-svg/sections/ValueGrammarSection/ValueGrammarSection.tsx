/** DrawSVG value form과 live suffix를 하나의 grammar로 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** range·absolute length·single value·live의 다른 계산 시점을 구분한다. */
export function ValueGrammarSection() {
  return (
    <section
      id="value-grammar"
      className="draw-svg-page__section"
      aria-labelledby="value-grammar-title"
    >
      <SectionHeading
        number="02"
        id="value-grammar"
        title="한 값·range·길이·live를 읽는다"
        description="percentage는 total length의 비율이고, absolute number는 stroke length unit입니다. 두 값은 visible start/end를 함께 고릅니다."
      />
      <div className="draw-svg-page__prose">
        <p>
          <code>'100%'</code>, <code>'0 100%'</code>, <code>true</code>는 full
          stroke입니다. <code>0</code>은 hidden state이고, <code>'20 50'</code>
          처럼 absolute lengths도 쓸 수 있습니다. start/end를 같이 움직이면 고정
          길이 dash를 path 위로 보낼 수 있습니다.
        </p>
        <p>
          responsive SVG처럼 animation 중 길이가 바뀌는 드문 경우에는{' '}
          <code>'20% 70% live'</code>처럼 suffix를 붙여 매 tick length를 다시
          계산합니다. 여러 stroke의 stagger와 timeline control은 GSAP tween
          API로 가능하지만 이 lab은 한 stroke range만 소유합니다.
        </p>
      </div>
      <pre className="draw-svg-page__code">
        <code>
          {
            "drawSVG: 0\ndrawSVG: '100%'\ndrawSVG: '20% 80%'\ndrawSVG: '20 50'\ndrawSVG: '20% 70% live'"
          }
        </code>
      </pre>
      <div className="draw-svg-page__warning">
        <h3>stroke가 먼저 있어야 합니다</h3>
        <p>
          DrawSVG는 fill을 바꾸지 않습니다. CSS 또는 SVG attribute로{' '}
          <code>stroke</code>와 <code>stroke-width</code>를 적용한 rendered SVG
          element가 필요합니다. multi-M path는 segment별 rendering이 어려워
          single-segment path가 더 안전합니다.
        </p>
      </div>
    </section>
  )
}
