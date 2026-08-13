/** ScrambleText의 setup, 동작 원리, 예제와 content 경계를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PhraseLab } from './examples/PhraseLab/PhraseLab'
import { scrambleTextMeta } from './scramble-text.meta'
import { ContentBoundarySection } from './sections/ContentBoundarySection/ContentBoundarySection'
import { MentalModelSection } from './sections/MentalModelSection/MentalModelSection'
import { SetupSection } from './sections/SetupSection/SetupSection'
import './ScrambleTextPage.css'

/** ScrambleText의 replaceable intermediate와 stable final meaning을 가르친다. */
export function ScrambleTextPage() {
  return (
    <article className="scramble-text-page">
      <header>
        <p>{scrambleTextMeta.category}</p>
        <h1>{scrambleTextMeta.title}</h1>
        <p>{scrambleTextMeta.summary}</p>
        <div className="scramble-text-page__links">
          {scrambleTextMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
      </header>
      <SetupSection />
      <MentalModelSection />
      <PhraseLab />
      <ContentBoundarySection />
    </article>
  )
}
