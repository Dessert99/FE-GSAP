/** P35 header와 두 component-owned React pattern example을 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { ContextSafeEventLab } from './examples/ContextSafeEventLab/ContextSafeEventLab'
import { ScopedListRevealLab } from './examples/ScopedListRevealLab/ScopedListRevealLab'
import { BoundarySection } from './sections/BoundarySection/BoundarySection'
import { OrganizationSection } from './sections/OrganizationSection/OrganizationSection'
import { reactGsapPatternsMeta } from './react-gsap-patterns.meta'
import './ReactGsapPatternsPage.css'

/** advanced React composition을 resource ownership 중심으로 가르치는 페이지다. */
export function ReactGsapPatternsPage() {
  return (
    <article className="react-gsap-patterns-page">
      <header>
        <p>{reactGsapPatternsMeta.category}</p>
        <h1>{reactGsapPatternsMeta.title}</h1>
        <p>{reactGsapPatternsMeta.summary}</p>
        <div className="react-gsap-patterns-page__links">
          {reactGsapPatternsMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p>2 official pattern resources covered</p>
      </header>
      <OrganizationSection />
      <ScopedListRevealLab />
      <ContextSafeEventLab />
      <BoundarySection />
    </article>
  )
}
