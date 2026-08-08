/** getLength와 getPosition이 descriptor의 percentage를 실제 geometry 숫자로 바꾸는 방식을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** measurement method의 입력·출력과 rendered signature 불일치를 보여 준다. */
export function LengthPositionSection() {
  return (
    <section
      id="length-position"
      className="draw-svg-page__section"
      aria-labelledby="length-position-title"
    >
      <SectionHeading
        number="04"
        id="length-position"
        title="getLength()와 getPosition()으로 숫자를 읽는다"
        description="두 method는 Element 또는 selector text를 받고 path, rect, circle, ellipse, line, polyline, polygon의 rendered stroke geometry를 읽습니다."
      />
      <div className="draw-svg-page__prose">
        <p>
          <code>DrawSVGPlugin.getLength(element)</code>는 Number length를
          반환합니다. <code>getPosition(element)</code>은 현재 stroke interval을
          읽고, 공식 example은 두 번째 값 <code>position[1]</code>을{' '}
          <code>length / 100</code>으로 나눠 current percentage를 계산합니다.
        </p>
        <p>
          rendered docs의 getPosition signature/Returns는 Number라고 적지만
          official example, installed d.ts, raw implementation은{' '}
          <code>[start, end]</code> number array를 보입니다. lab은 이 array의 두
          값을 각각 보여 주며 그 불일치를 숨기지 않습니다.
        </p>
      </div>
      <pre className="draw-svg-page__code">
        <code>
          {
            'const length = DrawSVGPlugin.getLength(path)\nconst [start, end] = DrawSVGPlugin.getPosition(path)\nconst endPercent = Math.floor(end / (length / 100))'
          }
        </code>
      </pre>
    </section>
  )
}
