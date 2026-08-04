/** 공식 Staggers 내용을 출발 순서 조절 예제와 상세 문서로 연결한다. */
import { OfficialDocsLink } from '../../../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { MultipleTargetsExample } from '../../examples/MultipleTargetsExample/MultipleTargetsExample'
import { officialLinks } from '../../gsap-to.meta'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function StaggersSection() {
  return (
    <section id="staggers" className="gsap-method-page__section" aria-labelledby="staggers-title">
      <SectionHeading number="08" id="staggers-title" title="Staggers" description="여러 targets에 같은 변화를 적용하면서 시작 순서와 간격만 나눕니다." />
      <MultipleTargetsExample />
      <div className="gsap-method-page__note"><p><strong>숫자와 객체</strong> <code>stagger: 0.1</code>은 배열 순서대로 일정 간격을 만들고, 객체는 <code>each</code>, <code>amount</code>, <code>from</code>, <code>grid</code>, <code>ease</code>로 분배 방식을 정합니다.</p><OfficialDocsLink label="공식 Staggers 문서" href={officialLinks.stagger} /></div>
    </section>
  )
}
