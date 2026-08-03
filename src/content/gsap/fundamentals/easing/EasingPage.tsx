/** 공식 Easing의 mental model과 세 실행 예제를 학습 순서로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { easingMeta } from './easing.meta'
import { DefaultsBoundarySection } from './sections/DefaultsBoundarySection/DefaultsBoundarySection'
import { ModelFamiliesSection } from './sections/ModelFamiliesSection/ModelFamiliesSection'
import { ParseRegisterSection } from './sections/ParseRegisterSection/ParseRegisterSection'
import { SteppedEaseSection } from './sections/SteppedEaseSection/SteppedEaseSection'
import './EasingPage.css'

export function EasingPage() {
  return (
    <article className="easing-page">
      <header className="easing-page__header">
        <p className="easing-page__eyebrow">{easingMeta.category}</p>
        <h1>{easingMeta.title}</h1>
        <p className="easing-page__summary">{easingMeta.summary}</p>
        <div className="easing-page__official-links">{easingMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}</div>
        <div className="easing-page__path"><span>이 페이지의 코드 위치</span><code>{easingMeta.sourcePath}</code></div>
        <p className="easing-page__reviewed">공식 문서 대조일 · {easingMeta.reviewedAt}</p>
      </header>
      <PageCoverage />
      <ModelFamiliesSection />
      <SteppedEaseSection />
      <ParseRegisterSection />
      <DefaultsBoundarySection />
    </article>
  )
}
