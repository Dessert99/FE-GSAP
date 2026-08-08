/** P33의 actual lifecycle lab과 autoSplit disposal boundary를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { toHref } from '../../../../app/routes'
import { SplitTextLifecycleLab } from './examples/SplitTextLifecycleLab/SplitTextLifecycleLab'
import { splitTextLifecycleMeta } from './split-text-lifecycle.meta'
import { ResizeBoundarySection } from './sections/ResizeBoundarySection/ResizeBoundarySection'
import './SplitTextLifecyclePage.css'

/** P33은 responsive SplitText instance의 re-split과 restoration을 가르치는 page다. */
export function SplitTextLifecyclePage() {
  return (
    <article className="split-text-lifecycle-page">
      <header>
        <p>{splitTextLifecycleMeta.category}</p>
        <h1>{splitTextLifecycleMeta.title}</h1>
        <p>{splitTextLifecycleMeta.summary}</p>
        {splitTextLifecycleMeta.officialSources.map((source) => (
          <OfficialDocsLink key={source.href} {...source} />
        ))}
        <p>
          <code>{splitTextLifecycleMeta.sourcePath}</code> · 공식 대조일{' '}
          {splitTextLifecycleMeta.reviewedAt}
        </p>
      </header>
      <p>
        wrapper와 instance array를 처음 만드는 과정은{' '}
        <a href={toHref('/fundamentals/split-text-create')}>
          P32 SplitText 만들기
        </a>
        에서 먼저 확인할 수 있습니다.
      </p>
      <SplitTextLifecycleLab />
      <ResizeBoundarySection />
    </article>
  )
}
