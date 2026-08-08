/** GSAP update와 Stage draw가 이어지는 ticker sequence를 보여 준다. */
import { BoundaryDiagram } from '../../components/BoundaryDiagram/BoundaryDiagram'
export function SequenceSection() {
  return (
    <section id="stage-draw-sequence">
      <h2>04 · GSAP update 뒤 Stage가 canvas를 다시 그립니다</h2>
      <p>
        plugin registration 뒤{' '}
        <code>gsap.ticker.add(() =&gt; stage.update())</code>가 tick마다 Stage
        draw를 요청합니다. tween이 object 값을 바꿔도 Stage가 update되지 않으면
        canvas result가 보이지 않습니다.
      </p>
      <BoundaryDiagram />
    </section>
  )
}
