/** 한 영역의 GSAP 작업을 모아 되돌리는 방법을 여섯 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { gsapContextMeta } from './gsap-context.meta'
import { AddAndIgnoreSection } from './sections/AddAndIgnoreSection/AddAndIgnoreSection'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { CollectAndRevertSection } from './sections/CollectAndRevertSection/CollectAndRevertSection'
import { RevertLifetimeSection } from './sections/RevertLifetimeSection/RevertLifetimeSection'
import { ScopedSelectorSection } from './sections/ScopedSelectorSection/ScopedSelectorSection'
import { SelectorUtilitySection } from './sections/SelectorUtilitySection/SelectorUtilitySection'
import './GsapContextPage.css'

export function GsapContextPage() {
  return (
    <article className="context-page">
      <header className="context-page__header">
        <p className="context-page__eyebrow">{gsapContextMeta.category}</p>
        <h1>{gsapContextMeta.title}</h1>
        <p className="context-page__summary">{gsapContextMeta.summary}</p>
        <div className="context-page__official-links">
          {gsapContextMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="context-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{gsapContextMeta.sourcePath}</code>
        </div>
        <p className="context-page__reviewed">공식 문서 대조일 · {gsapContextMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <CollectAndRevertSection />
      <ScopedSelectorSection />
      <SelectorUtilitySection />
      <AddAndIgnoreSection />
      <RevertLifetimeSection />
      <BoundariesSection />
    </article>
  )
}
