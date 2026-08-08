/** P21의 header, four explanations와 one follower lab을 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { MotionPathLab } from './examples/MotionPathLab/MotionPathLab'
import { AlignmentSection } from './sections/AlignmentSection/AlignmentSection'
import { BoundarySection } from './sections/BoundarySection/BoundarySection'
import { OrientationSection } from './sections/OrientationSection/OrientationSection'
import { PathInputSection } from './sections/PathInputSection/PathInputSection'
import { motionPathMeta } from './motion-path.meta'
import './MotionPathPage.css'
/** MotionPathPlugin으로 한 follower를 path progress에 맞춰 움직이는 페이지다. */
export function MotionPathPage() {
  return (
    <article className="motion-path-page">
      <header>
        <p>{motionPathMeta.category}</p>
        <h1>{motionPathMeta.title}</h1>
        <div>
          {motionPathMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <PageCoverage />
      </header>
      <PathInputSection />
      <MotionPathLab />
      <AlignmentSection />
      <OrientationSection />
      <BoundarySection />
    </article>
  )
}
