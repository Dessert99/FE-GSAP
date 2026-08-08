/** DrawSVG가 path를 새로 그리는 대신 stroke dash로 보이는 구간을 정함을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** dasharray와 dashoffset의 역할을 정적 다이어그램으로 먼저 고정한다. */
export function StrokeDashMentalModelSection() {
  return (
    <section
      id="stroke-dash-mental-model"
      className="draw-svg-page__section"
      aria-labelledby="stroke-dash-mental-model-title"
    >
      <SectionHeading
        number="01"
        id="stroke-dash-mental-model"
        title="drawSVG는 stroke의 보이는 구간을 말한다"
        description="DrawSVG는 SVG path를 다시 만들지 않습니다. stroke-dasharray와 stroke-dashoffset으로 전체 길이 중 남길 구간을 고릅니다."
      />
      <div className="draw-svg-page__prose">
        <p>
          stroke는 선의 색과 두께이고, dash는 그 선 위에서 보이는 짧은
          조각입니다. <code>drawSVG: '20% 80%'</code>는 path 전체의 20%부터
          80%까지를 보이게 하는 end state입니다.
        </p>
        <p>
          이 값은 “20%에서 80%까지 animate한다”는 시간 범위가 아닙니다.{' '}
          <code>to()</code>라면 현재 stroke 상태에서 그 visible segment로 가고,{' '}
          <code>from()</code>이라면 그 값이 출발 상태입니다.
        </p>
      </div>
      <figure className="draw-svg-page__diagram">
        <svg
          viewBox="0 0 480 72"
          aria-label="dash offset이 선 전체 중 보이는 가운데 구간만 남기는 그림"
        >
          <line
            x1="20"
            y1="35"
            x2="460"
            y2="35"
            className="draw-svg-page__diagram-track"
          />
          <line
            x1="108"
            y1="35"
            x2="372"
            y2="35"
            className="draw-svg-page__diagram-visible"
          />
        </svg>
        <figcaption>
          전체 stroke 길이의 회색 track 중 color segment가 <code>20% 80%</code>
          입니다. 양 끝의 gap도 value가 함께 결정합니다.
        </figcaption>
      </figure>
    </section>
  )
}
