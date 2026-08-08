/** P24 header, static ruler, three measurement sections를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { toHref } from '../../../../app/routes'
import { PathRulerLab } from './examples/PathRulerLab/PathRulerLab'
import { LengthSection } from './sections/LengthSection/LengthSection'
import { SampleSection } from './sections/SampleSection/SampleSection'
import { SliceSection } from './sections/SliceSection/SliceSection'
import { motionPathMeasureMeta } from './motion-path-measure.meta'
import './MotionPathMeasurePage.css'
/** MotionPath utility로 static path geometry를 읽는 페이지다. */
export function MotionPathMeasurePage() {
  return (
    <article className="motion-path-measure-page">
      <header>
        <p>{motionPathMeasureMeta.category}</p>
        <h1>{motionPathMeasureMeta.title}</h1>
        <div>
          {motionPathMeasureMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p>3 official measurement items covered</p>
        <p>
          실제 이동 설정은{' '}
          <a href={toHref('/fundamentals/motion-path')}>P21 MotionPath</a>에서,
          RawPath 변환은{' '}
          <a href={toHref('/fundamentals/motion-path-data')}>P22 데이터 변환</a>
          에서 먼저 확인할 수 있습니다.
        </p>
      </header>
      <LengthSection />
      <PathRulerLab />
      <SampleSection />
      <SliceSection />
    </article>
  )
}
