/** MotionPath coordinate utilities를 source point부터 relative gap까지 순서로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { toHref } from '../../../../app/routes'
import { CoordinateMatrixLab } from './examples/CoordinateMatrixLab/CoordinateMatrixLab'
import { motionPathCoordinatesMeta } from './motion-path-coordinates.meta'
import './MotionPathCoordinatesPage.css'

export function MotionPathCoordinatesPage() {
  return (
    <article className="motion-path-coordinates-page">
      <header>
        <p>{motionPathCoordinatesMeta.category}</p>
        <h1>{motionPathCoordinatesMeta.title}</h1>
        <div>
          {motionPathCoordinatesMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
      </header>
      <section>
        <h2>01 · from과 to의 local axes</h2>
        <p>
          point는 from의 local 좌표입니다. convertCoordinates가 nested
          transform을 지나 to axes에 맞는 새 point 또는 재사용 가능한 Matrix2D를
          돌려줍니다.
        </p>
      </section>
      <section>
        <h2>02 · global과 align matrix</h2>
        <p>
          getGlobalMatrix는 viewport 방향 matrix를, getAlignMatrix는 두 origin을
          맞출 matrix를 제공합니다. a,b,c,d,e,f는
          scale/rotation/skew/translation을 함께 담습니다.
        </p>
      </section>
      <CoordinateMatrixLab />
      <section>
        <h2>03 · relative position</h2>
        <p>
          getRelativePosition은 from parent coordinate에서 x/y gap을 돌려줍니다.
          먼저 <a href={toHref('/fundamentals/motion-path')}>MotionPath</a>
          와{' '}
          <a href={toHref('/fundamentals/motion-path-data')}>
            RawPath 변환
          </a>
          을 확인하면 좌표 utility의 입력 경계를 연결해서 볼 수 있습니다.
        </p>
      </section>
    </article>
  )
}
