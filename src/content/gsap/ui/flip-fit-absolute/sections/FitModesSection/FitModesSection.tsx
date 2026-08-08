/** Flip.fit의 calculate·apply·animate 변형을 lab과 연결한다. */
import { FitAbsoluteLab } from '../../examples/FitAbsoluteLab/FitAbsoluteLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
export function FitModesSection() {
  return (
    <section id="fit-modes" className="flip-fit-absolute-page__section">
      <SectionHeading
        number="02"
        id="fit-modes"
        title="fit()은 calculate·apply·animate로 갈린다"
        description="getVars는 계산만, duration 없는 fit은 즉시 적용, duration 있는 fit은 Tween을 반환합니다."
      />
      <p>
        <code>scale: true</code>는 width/height 대신 scaleX/scaleY를 쓰며,{' '}
        <code>fitChild</code>는 child geometry로 calculation합니다.{' '}
        <code>props</code>와 <code>simple</code>은 각각 추가 CSS matching과
        simple transform assumption을 정합니다.
      </p>
      <FitAbsoluteLab />
    </section>
  )
}
