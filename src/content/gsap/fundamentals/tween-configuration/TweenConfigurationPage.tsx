/** 설정의 출처와 적용 범위를 여섯 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { ConfigCatalogSection } from './sections/ConfigCatalogSection/ConfigCatalogSection'
import { DefaultsInheritanceSection } from './sections/DefaultsInheritanceSection/DefaultsInheritanceSection'
import { PrecedenceSection } from './sections/PrecedenceSection/PrecedenceSection'
import { TwoScopesSection } from './sections/TwoScopesSection/TwoScopesSection'
import { VarsRecordSection } from './sections/VarsRecordSection/VarsRecordSection'
import { tweenConfigurationMeta } from './tween-configuration.meta'
import './TweenConfigurationPage.css'

export function TweenConfigurationPage() {
  return (
    <article className="tween-config-page">
      <header className="tween-config-page__header">
        <p className="tween-config-page__eyebrow">{tweenConfigurationMeta.category}</p>
        <h1>{tweenConfigurationMeta.title}</h1>
        <p className="tween-config-page__summary">{tweenConfigurationMeta.summary}</p>
        <div className="tween-config-page__official-links">
          {tweenConfigurationMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="tween-config-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{tweenConfigurationMeta.sourcePath}</code>
        </div>
        <p className="tween-config-page__reviewed">공식 문서 대조일 · {tweenConfigurationMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <TwoScopesSection />
      <ConfigCatalogSection />
      <DefaultsInheritanceSection />
      <PrecedenceSection />
      <VarsRecordSection />
      <BoundariesSection />
    </article>
  )
}
