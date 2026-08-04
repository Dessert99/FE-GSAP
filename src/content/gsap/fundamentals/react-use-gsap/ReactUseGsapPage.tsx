/** React render lifecycle 안에서 GSAP을 만들고 정리하는 흐름을 여섯 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { ConfigObjectSection } from './sections/ConfigObjectSection/ConfigObjectSection'
import { ContextSafeSection } from './sections/ContextSafeSection/ContextSafeSection'
import { HookBasicsSection } from './sections/HookBasicsSection/HookBasicsSection'
import { SsrSection } from './sections/SsrSection/SsrSection'
import { WhyCleanupSection } from './sections/WhyCleanupSection/WhyCleanupSection'
import { reactUseGsapMeta } from './react-use-gsap.meta'
import './ReactUseGsapPage.css'

export function ReactUseGsapPage() {
  return (
    <article className="react-gsap-page">
      <header className="react-gsap-page__header">
        <p className="react-gsap-page__eyebrow">{reactUseGsapMeta.category}</p>
        <h1>{reactUseGsapMeta.title}</h1>
        <p className="react-gsap-page__summary">{reactUseGsapMeta.summary}</p>
        <div className="react-gsap-page__official-links">
          {reactUseGsapMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="react-gsap-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{reactUseGsapMeta.sourcePath}</code>
        </div>
        <p className="react-gsap-page__reviewed">공식 문서 대조일 · {reactUseGsapMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <WhyCleanupSection />
      <HookBasicsSection />
      <ConfigObjectSection />
      <ContextSafeSection />
      <SsrSection />
      <BoundariesSection />
    </article>
  )
}
