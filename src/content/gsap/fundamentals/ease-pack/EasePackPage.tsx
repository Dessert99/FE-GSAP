/** EasePack 세 ease를 "어떤 문제를 푸는가" 흐름의 여섯 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { EaseChoiceSection } from './sections/EaseChoiceSection/EaseChoiceSection'
import { EasePackSetupSection } from './sections/EasePackSetupSection/EasePackSetupSection'
import { ExpoScaleSection } from './sections/ExpoScaleSection/ExpoScaleSection'
import { RoughEaseSection } from './sections/RoughEaseSection/RoughEaseSection'
import { SlowMoSection } from './sections/SlowMoSection/SlowMoSection'
import { easePackMeta } from './ease-pack.meta'
import './EasePackPage.css'

export function EasePackPage() {
  return (
    <article className="ease-pack-page">
      <header className="ease-pack-page__header">
        <p className="ease-pack-page__eyebrow">{easePackMeta.category}</p>
        <h1>{easePackMeta.title}</h1>
        <p className="ease-pack-page__summary">{easePackMeta.summary}</p>
        <div className="ease-pack-page__official-links">
          {easePackMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="ease-pack-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{easePackMeta.sourcePath}</code>
        </div>
        <p className="ease-pack-page__reviewed">공식 문서 대조일 · {easePackMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <EaseChoiceSection />
      <EasePackSetupSection />
      <ExpoScaleSection />
      <RoughEaseSection />
      <SlowMoSection />
      <BoundariesSection />
    </article>
  )
}
