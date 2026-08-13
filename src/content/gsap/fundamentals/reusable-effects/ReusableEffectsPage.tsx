/** reusable effect의 등록·direct call·Timeline extension을 여섯 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { reusableEffectsMeta } from './reusable-effects.meta'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { DirectCallSection } from './sections/DirectCallSection/DirectCallSection'
import { EffectMentalModelSection } from './sections/EffectMentalModelSection/EffectMentalModelSection'
import { RegisterContractSection } from './sections/RegisterContractSection/RegisterContractSection'
import { RegisteredExampleSection } from './sections/RegisteredExampleSection/RegisteredExampleSection'
import { TimelineExtensionSection } from './sections/TimelineExtensionSection/TimelineExtensionSection'
import './ReusableEffectsPage.css'

export function ReusableEffectsPage() {
  return (
    <article className="reusable-effects-page">
      <header className="reusable-effects-page__header">
        <p className="reusable-effects-page__eyebrow">{reusableEffectsMeta.category}</p>
        <h1>{reusableEffectsMeta.title}</h1>
        <p className="reusable-effects-page__summary">{reusableEffectsMeta.summary}</p>
        <div className="reusable-effects-page__official-links">{reusableEffectsMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}</div>
        <p className="reusable-effects-page__reviewed">공식 문서 대조일 · {reusableEffectsMeta.reviewedAt}</p>
      </header>
      <PageCoverage />
      <EffectMentalModelSection />
      <RegisterContractSection />
      <DirectCallSection />
      <RegisteredExampleSection />
      <TimelineExtensionSection />
      <BoundariesSection />
    </article>
  )
}
