/** 공식 Keyframes 내용을 형식 비교 예제와 후속 문서로 연결한다. */
import { OfficialDocsLink } from '../../../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { KeyframesExample } from '../../examples/KeyframesExample/KeyframesExample'
import { officialLinks } from '../../gsap-to.meta'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function KeyframesSection() {
  return (
    <section id="keyframes" className="gsap-method-page__section" aria-labelledby="keyframes-title">
      <SectionHeading number="10" id="keyframes-title" title="Keyframes" description="같은 target을 여러 상태로 연속해서 바꿀 때 vars 안에 중간 상태를 모읍니다." />
      <KeyframesExample />
      <div className="gsap-method-page__note"><OfficialDocsLink label="공식 Keyframes 문서" href={officialLinks.keyframes} /></div>
    </section>
  )
}
