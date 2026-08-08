/** P29 header와 physics 학습 단위를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PhysicsMotionLab } from './examples/PhysicsMotionLab/PhysicsMotionLab'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { ModeSelectionSection } from './sections/ModeSelectionSection/ModeSelectionSection'
import { physicsMotionMeta } from './physics-motion.meta'
import './PhysicsMotionPage.css'

/** 발사 벡터와 property별 physics input을 구분하는 학습 페이지다. */
export function PhysicsMotionPage() {
  return (
    <article className="physics-motion-page">
      <header>
        <p>{physicsMotionMeta.category}</p>
        <h1>{physicsMotionMeta.title}</h1>
        <p>{physicsMotionMeta.summary}</p>
        <div className="physics-motion-page__links">
          {physicsMotionMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p>
          <code>{physicsMotionMeta.sourcePath}</code> · 공식 대조일{' '}
          {physicsMotionMeta.reviewedAt}
        </p>
      </header>
      <ModeSelectionSection />
      <PhysicsMotionLab />
      <BoundariesSection />
    </article>
  )
}
