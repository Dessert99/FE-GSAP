/** descriptor-driven DrawSVG reveal lab을 learning flow의 중앙에 배치한다. */
import { StrokeRangeLab } from '../../examples/StrokeRangeLab/StrokeRangeLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** 한 path의 range 변화와 plugin vars·code panel 연결을 보여 준다. */
export function RevealLabSection() {
  return (
    <section
      id="reveal-lab"
      className="draw-svg-page__section"
      aria-labelledby="reveal-lab-title"
    >
      <SectionHeading
        number="03"
        id="reveal-lab"
        title="같은 range descriptor로 stroke를 reveal한다"
        description="slider value는 ruler width, DrawSVGPlugin vars, measurement readout, code panel에 따로 복사되지 않고 하나의 descriptor에서 나옵니다."
      />
      <StrokeRangeLab />
    </section>
  )
}
