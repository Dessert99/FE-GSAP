/** 반복 회차와 값 재계산이라는 두 질문을 일곱 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { CallFormsSection } from './sections/CallFormsSection/CallFormsSection'
import { InvalidateRecomputeSection } from './sections/InvalidateRecomputeSection/InvalidateRecomputeSection'
import { IterationNumberSection } from './sections/IterationNumberSection/IterationNumberSection'
import { RepeatCountSection } from './sections/RepeatCountSection/RepeatCountSection'
import { RepeatGapSection } from './sections/RepeatGapSection/RepeatGapSection'
import { YoyoDirectionSection } from './sections/YoyoDirectionSection/YoyoDirectionSection'
import { tweenRepeatsMeta } from './tween-repeats.meta'
import './TweenRepeatsPage.css'

export function TweenRepeatsPage() {
  return (
    <article className="repeats-page">
      <header className="repeats-page__header">
        <p className="repeats-page__eyebrow">{tweenRepeatsMeta.category}</p>
        <h1>{tweenRepeatsMeta.title}</h1>
        <p className="repeats-page__summary">{tweenRepeatsMeta.summary}</p>
        <div className="repeats-page__official-links">
          {tweenRepeatsMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="repeats-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{tweenRepeatsMeta.sourcePath}</code>
        </div>
        <p className="repeats-page__reviewed">공식 문서 대조일 · {tweenRepeatsMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <RepeatCountSection />
      <RepeatGapSection />
      <YoyoDirectionSection />
      <IterationNumberSection />
      <InvalidateRecomputeSection />
      <CallFormsSection />
      <BoundariesSection />
    </article>
  )
}
