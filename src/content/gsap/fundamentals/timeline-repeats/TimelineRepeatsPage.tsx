/** sequence 반복과 child 값 재계산을 일곱 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { CallFormsSection } from './sections/CallFormsSection/CallFormsSection'
import { InvalidateChildrenSection } from './sections/InvalidateChildrenSection/InvalidateChildrenSection'
import { IterationNumberSection } from './sections/IterationNumberSection/IterationNumberSection'
import { RepeatCountSection } from './sections/RepeatCountSection/RepeatCountSection'
import { RepeatGapSection } from './sections/RepeatGapSection/RepeatGapSection'
import { YoyoDirectionSection } from './sections/YoyoDirectionSection/YoyoDirectionSection'
import { timelineRepeatsMeta } from './timeline-repeats.meta'
import './TimelineRepeatsPage.css'

export function TimelineRepeatsPage() {
  return <article className="tl-repeats-page"><header className="tl-repeats-page__header"><p className="tl-repeats-page__eyebrow">{timelineRepeatsMeta.category}</p><h1>{timelineRepeatsMeta.title}</h1><p className="tl-repeats-page__summary">{timelineRepeatsMeta.summary}</p><div className="tl-repeats-page__official-links">{timelineRepeatsMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}</div><div className="tl-repeats-page__path"><span>이 페이지의 코드 위치</span><code>{timelineRepeatsMeta.sourcePath}</code></div><p className="tl-repeats-page__reviewed">공식 문서 대조일 · {timelineRepeatsMeta.reviewedAt}</p></header><PageCoverage/><RepeatCountSection/><RepeatGapSection/><YoyoDirectionSection/><IterationNumberSection/><InvalidateChildrenSection/><CallFormsSection/><BoundariesSection/></article>
}
