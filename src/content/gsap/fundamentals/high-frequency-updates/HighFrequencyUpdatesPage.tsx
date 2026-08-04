/** 고빈도 입력 갱신의 세 fast path를 일곱 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { FollowTheInputSection } from './sections/FollowTheInputSection/FollowTheInputSection'
import { InputStormSection } from './sections/InputStormSection/InputStormSection'
import { PipeAndMultiValueSection } from './sections/PipeAndMultiValueSection/PipeAndMultiValueSection'
import { ReadCurrentValueSection } from './sections/ReadCurrentValueSection/ReadCurrentValueSection'
import { SkippedConveniencesSection } from './sections/SkippedConveniencesSection/SkippedConveniencesSection'
import { ThreeFastPathsSection } from './sections/ThreeFastPathsSection/ThreeFastPathsSection'
import { highFrequencyUpdatesMeta } from './high-frequency-updates.meta'
import './HighFrequencyUpdatesPage.css'

export function HighFrequencyUpdatesPage() {
  return (
    <article className="hfu-page">
      <header className="hfu-page__header">
        <p className="hfu-page__eyebrow">{highFrequencyUpdatesMeta.category}</p>
        <h1>{highFrequencyUpdatesMeta.title}</h1>
        <p className="hfu-page__summary">{highFrequencyUpdatesMeta.summary}</p>
        <div className="hfu-page__official-links">
          {highFrequencyUpdatesMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="hfu-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{highFrequencyUpdatesMeta.sourcePath}</code>
        </div>
        <p className="hfu-page__reviewed">공식 문서 대조일 · {highFrequencyUpdatesMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <InputStormSection />
      <ReadCurrentValueSection />
      <ThreeFastPathsSection />
      <SkippedConveniencesSection />
      <FollowTheInputSection />
      <PipeAndMultiValueSection />
      <BoundariesSection />
    </article>
  )
}
