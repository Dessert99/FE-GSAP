/** SplitText create의 DOM과 instance array 학습 단위를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { SplitInspectorLab } from './examples/SplitInspectorLab/SplitInspectorLab'
import { AccessibleDomSection } from './sections/AccessibleDomSection/AccessibleDomSection'
import { CreateModelSection } from './sections/CreateModelSection/CreateModelSection'
import { splitTextCreateMeta } from './split-text-create.meta'
import './SplitTextCreatePage.css'

/** SplitText instance가 생성하는 wrapper와 array를 읽는 학습 페이지다. */
export function SplitTextCreatePage() {
  return (
    <article className="split-text-create-page">
      <header>
        <p>{splitTextCreateMeta.category}</p>
        <h1>{splitTextCreateMeta.title}</h1>
        <p>{splitTextCreateMeta.summary}</p>
        <div className="split-text-create-page__links">
          {splitTextCreateMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
      </header>
      <CreateModelSection />
      <SplitInspectorLab />
      <AccessibleDomSection />
    </article>
  )
}
