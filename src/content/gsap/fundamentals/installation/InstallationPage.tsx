/** 설치부터 plugin 등록까지의 setup 순서를 여섯 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { installationMeta } from './installation.meta'
import { EntryChoiceSection } from './sections/EntryChoiceSection/EntryChoiceSection'
import { FileFormatsSection } from './sections/FileFormatsSection/FileFormatsSection'
import { ImportFormsSection } from './sections/ImportFormsSection/ImportFormsSection'
import { RegisterPluginSection } from './sections/RegisterPluginSection/RegisterPluginSection'
import { TreeShakingSection } from './sections/TreeShakingSection/TreeShakingSection'
import { TroubleshootingSection } from './sections/TroubleshootingSection/TroubleshootingSection'
import './InstallationPage.css'

export function InstallationPage() {
  return (
    <article className="installation-page">
      <header className="installation-page__header">
        <p className="installation-page__eyebrow">{installationMeta.category}</p>
        <h1>{installationMeta.title}</h1>
        <p className="installation-page__summary">{installationMeta.summary}</p>
        <div className="installation-page__official-links">
          {installationMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="installation-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{installationMeta.sourcePath}</code>
        </div>
        <p className="installation-page__reviewed">공식 문서 대조일 · {installationMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <EntryChoiceSection />
      <FileFormatsSection />
      <ImportFormsSection />
      <RegisterPluginSection />
      <TreeShakingSection />
      <TroubleshootingSection />
    </article>
  )
}
