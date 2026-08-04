/** CustomBounce·CustomWiggle 학습을 여덟 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { BounceDesignSection } from './sections/BounceDesignSection/BounceDesignSection'
import { BounceSquashSection } from './sections/BounceSquashSection/BounceSquashSection'
import { CurveGraphSection } from './sections/CurveGraphSection/CurveGraphSection'
import { EaseGeneratorSection } from './sections/EaseGeneratorSection/EaseGeneratorSection'
import { SetupSection } from './sections/SetupSection/SetupSection'
import { WiggleAdvancedSection } from './sections/WiggleAdvancedSection/WiggleAdvancedSection'
import { WiggleDesignSection } from './sections/WiggleDesignSection/WiggleDesignSection'
import { customBounceWiggleMeta } from './custom-bounce-wiggle.meta'
import './CustomBounceWigglePage.css'

export function CustomBounceWigglePage() {
  return (
    <article className="bounce-wiggle-page">
      <header className="bounce-wiggle-page__header">
        <p className="bounce-wiggle-page__eyebrow">{customBounceWiggleMeta.category}</p>
        <h1>{customBounceWiggleMeta.title}</h1>
        <p className="bounce-wiggle-page__summary">{customBounceWiggleMeta.summary}</p>
        <div className="bounce-wiggle-page__official-links">
          {customBounceWiggleMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="bounce-wiggle-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{customBounceWiggleMeta.sourcePath}</code>
        </div>
        <p className="bounce-wiggle-page__reviewed">공식 문서 대조일 · {customBounceWiggleMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <EaseGeneratorSection />
      <SetupSection />
      <BounceDesignSection />
      <BounceSquashSection />
      <CurveGraphSection />
      <WiggleDesignSection />
      <WiggleAdvancedSection />
      <BoundariesSection />
    </article>
  )
}
