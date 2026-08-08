/** makeAbsolute의 flow mutation과 Array return을 fit absolute option과 구분한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
export function AbsoluteFlowSection() {
  return (
    <section id="absolute-flow" className="flip-fit-absolute-page__section">
      <SectionHeading
        number="03"
        id="absolute-flow"
        title="makeAbsolute()은 flow에서 box를 뺀다"
        description="현재 화면 위치를 유지한 채 position:absolute로 바꾸고 affected Elements Array를 반환합니다."
      />
      <p>
        <code>absolute: true</code>는 Flip.fit에도 있지만,{' '}
        <code>Flip.makeAbsolute(targets)</code>는 이 conversion만 독립적으로
        실행합니다. selector, Element, Array, NodeList, FlipState를 받을 수
        있으므로 넓은 target을 무심코 넘기지 않습니다.
      </p>
    </section>
  )
}
