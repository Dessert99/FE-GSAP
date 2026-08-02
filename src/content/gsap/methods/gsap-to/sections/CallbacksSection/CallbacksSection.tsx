/** 공식 Callbacks 내용을 실행 로그 예제와 후속 문서로 연결한다. */
import { OfficialDocsLink } from '../../../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { CallbacksExample } from '../../examples/CallbacksExample/CallbacksExample'
import { officialLinks } from '../../gsap-to.meta'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function CallbacksSection() {
  return (
    <section id="callbacks" className="gsap-method-page__section" aria-labelledby="callbacks-title">
      <SectionHeading number="11" id="callbacks-title" title="Callbacks" description="특수 속성 12개로 나뉜 여섯 이벤트와 Params를 실제 호출 순서로 묶어 봅니다." />
      <CallbacksExample />
      <div className="gsap-method-page__note"><OfficialDocsLink label="공식 Callback 문서" href={officialLinks.callbacks} /></div>
    </section>
  )
}
