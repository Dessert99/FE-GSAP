/** 시작·끝 값 소유권을 일곱 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { ChooseMethodSection } from './sections/ChooseMethodSection/ChooseMethodSection'
import { FromAndFromToSection } from './sections/FromAndFromToSection/FromAndFromToSection'
import { ImmediateRenderSection } from './sections/ImmediateRenderSection/ImmediateRenderSection'
import { MethodComparisonSection } from './sections/MethodComparisonSection/MethodComparisonSection'
import { SetSection } from './sections/SetSection/SetSection'
import { SharedVarsSection } from './sections/SharedVarsSection/SharedVarsSection'
import { StateOwnershipSection } from './sections/StateOwnershipSection/StateOwnershipSection'
import { tweenStartEndValuesMeta } from './tween-start-end-values.meta'
import './TweenStartEndValuesPage.css'

/** 현재값 의존 여부에서 네 생성 method 선택까지 순서대로 안내한다. */
export function TweenStartEndValuesPage() {
  return (
    <article className="tween-values-page">
      <header className="tween-values-page__header">
        <p className="tween-values-page__eyebrow">{tweenStartEndValuesMeta.category}</p>
        <h1>{tweenStartEndValuesMeta.title}</h1>
        <p className="tween-values-page__summary">{tweenStartEndValuesMeta.summary}</p>
        <div className="tween-values-page__official-links">
          {tweenStartEndValuesMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}
        </div>
        <div className="tween-values-page__path"><span>이 페이지의 코드 위치</span><code>{tweenStartEndValuesMeta.sourcePath}</code></div>
        <p className="tween-values-page__reviewed">공식 문서 대조일 · {tweenStartEndValuesMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <StateOwnershipSection />
      <MethodComparisonSection />
      <FromAndFromToSection />
      <SetSection />
      <ImmediateRenderSection />
      <SharedVarsSection />
      <ChooseMethodSection />
    </article>
  )
}
