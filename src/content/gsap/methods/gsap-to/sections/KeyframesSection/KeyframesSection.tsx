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
      <div className="gsap-method-page__note">
        <p>
          <strong>언제 쓰나요?</strong> 같은 target에 <code>gsap.to()</code>를 반복해서 쓰는 코드를 한 Tween으로 줄이거나,
          CSS animation의 여러 단계를 GSAP으로 옮길 때 유용합니다. 이 페이지의 소유 source는 배열형 to-vars를 설명하며,
          백분율·속성 기반 형식은 아래 연결 문서가 제공하는 확장 내용입니다.
        </p>
        <OfficialDocsLink label="공식 Keyframes 문서" href={officialLinks.keyframes} />
      </div>
    </section>
  )
}
