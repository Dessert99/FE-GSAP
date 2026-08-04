/** Tween의 시간 계산을 하나의 시간축에서 출발하는 일곱 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { DurationTotalSection } from './sections/DurationTotalSection/DurationTotalSection'
import { GetterSetterSection } from './sections/GetterSetterSection/GetterSetterSection'
import { GlobalTimeSection } from './sections/GlobalTimeSection/GlobalTimeSection'
import { StartEndSection } from './sections/StartEndSection/StartEndSection'
import { TimeAxisSection } from './sections/TimeAxisSection/TimeAxisSection'
import { TimeScaleSection } from './sections/TimeScaleSection/TimeScaleSection'
import { tweenTimingMathMeta } from './tween-timing-math.meta'
import './TweenTimingMathPage.css'

export function TweenTimingMathPage() {
  return (
    <article className="timing-page">
      <header className="timing-page__header">
        <p className="timing-page__eyebrow">{tweenTimingMathMeta.category}</p>
        <h1>{tweenTimingMathMeta.title}</h1>
        <p className="timing-page__summary">{tweenTimingMathMeta.summary}</p>
        <div className="timing-page__official-links">
          {tweenTimingMathMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="timing-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{tweenTimingMathMeta.sourcePath}</code>
        </div>
        <p className="timing-page__reviewed">공식 문서 대조일 · {tweenTimingMathMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <TimeAxisSection />
      <GetterSetterSection />
      <DurationTotalSection />
      <StartEndSection />
      <TimeScaleSection />
      <GlobalTimeSection />
      <BoundariesSection />
    </article>
  )
}
