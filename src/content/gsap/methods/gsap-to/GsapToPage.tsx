/** 공식 gsap.to() 목차에 대응하는 학습 섹션을 순서대로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { gsapToPageMeta } from './gsap-to.meta'
import { CallbacksSection } from './sections/CallbacksSection/CallbacksSection'
import { KeyframesSection } from './sections/KeyframesSection/KeyframesSection'
import { MethodAnatomySection } from './sections/MethodAnatomySection/MethodAnatomySection'
import { OverviewSection } from './sections/OverviewSection/OverviewSection'
import { PageCoverageSection } from './sections/PageCoverageSection/PageCoverageSection'
import { PluginsSection } from './sections/PluginsSection/PluginsSection'
import { PropertyExamplesSection } from './sections/PropertyExamplesSection/PropertyExamplesSection'
import { SequencingSection } from './sections/SequencingSection/SequencingSection'
import { SpecialPropertiesSection } from './sections/SpecialPropertiesSection/SpecialPropertiesSection'
import { StaggersSection } from './sections/StaggersSection/StaggersSection'
import { ValueModesSection } from './sections/ValueModesSection/ValueModesSection'
import './GsapToPage.css'

export function GsapToPage() {
  return (
    <article className="gsap-method-page">
      <header className="gsap-method-page__header">
        <p className="gsap-method-page__eyebrow">{gsapToPageMeta.category}</p>
        <div className="gsap-method-page__title-row"><h1>{gsapToPageMeta.title}</h1><OfficialDocsLink label="공식 gsap.to() 문서" href={gsapToPageMeta.officialUrl} /></div>
        <p className="gsap-method-page__summary">{gsapToPageMeta.summary}</p>
        <div className="gsap-method-page__path"><span>이 페이지의 코드 위치</span><code>{gsapToPageMeta.sourcePath}</code></div>
        <p className="gsap-method-page__reviewed">공식 문서 대조일 · {gsapToPageMeta.reviewedAt}</p>
      </header>

      <PageCoverageSection />
      <OverviewSection />
      <MethodAnatomySection />
      <SpecialPropertiesSection />
      <PropertyExamplesSection />
      <PluginsSection />
      <ValueModesSection />
      <StaggersSection />
      <SequencingSection />
      <KeyframesSection />
      <CallbacksSection />
    </article>
  )
}
