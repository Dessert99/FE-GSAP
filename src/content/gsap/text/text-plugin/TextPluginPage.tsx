/** P34의 setup, token mental model, actual lab, content boundary를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { TokenAlignmentLab } from './examples/TokenAlignmentLab/TokenAlignmentLab'
import { textPluginMeta } from './text-plugin.meta'
import { ContentBoundarySection } from './sections/ContentBoundarySection/ContentBoundarySection'
import { MentalModelSection } from './sections/MentalModelSection/MentalModelSection'
import { SetupSection } from './sections/SetupSection/SetupSection'
import './TextPluginPage.css'

/** TextPlugin의 token replacement와 stable final meaning을 가르친다. */
export function TextPluginPage() {
  return (
    <article className="text-plugin-page">
      <header>
        <p>{textPluginMeta.category}</p>
        <h1>{textPluginMeta.title}</h1>
        <p>{textPluginMeta.summary}</p>
        <div className="text-plugin-page__links">
          {textPluginMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p>15 complete technical items covered</p>
      </header>
      <SetupSection />
      <MentalModelSection />
      <TokenAlignmentLab />
      <ContentBoundarySection />
    </article>
  )
}
