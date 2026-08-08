/** P22의 input 변환, DOM boundary, RawPath round-trip 학습 단위를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { toHref } from '../../../../app/routes'
import { RawPathPipelineLab } from './examples/RawPathPipelineLab/RawPathPipelineLab'
import { motionPathDataMeta } from './motion-path-data.meta'
import './MotionPathDataPage.css'

/** 여러 geometry representation을 one RawPath pipeline으로 가르치는 P22 페이지다. */
export function MotionPathDataPage() {
  return (
    <article className="motion-path-data-page">
      <header>
        <p>{motionPathDataMeta.category}</p>
        <h1>{motionPathDataMeta.title}</h1>
        <p>{motionPathDataMeta.summary}</p>
        <div className="motion-path-data-page__links">
          {motionPathDataMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
      </header>
      <section id="input-shapes">
        <p>01 · input shapes</p>
        <h2>point의 모양은 달라도 RawPath는 numeric segment입니다</h2>
        <p>
          먼저 <a href={toHref('/fundamentals/motion-path')}>P21 MotionPath</a>
          에서 실제 경로 이동의 입력 형식을 확인합니다.{' '}
          <code>pointsToSegment()</code>는 flat alternating x/y numbers를 cubic
          segment로,
          <code>arrayToRawPath()</code>는 object point array를 RawPath array로
          바꿉니다.
          <code>curviness</code>는 이 변환의 control-point 곡률이고 0, 1, 2를
          비교할 수 있습니다.
        </p>
      </section>
      <section id="svg-boundary">
        <p>02 · SVG DOM boundary</p>
        <h2>
          shape conversion은 계산만이 아니라 DOM replacement일 수 있습니다
        </h2>
        <p>
          <code>convertToPath(shape, true)</code>는 supplied shape 자리에 path를
          swap합니다. 이 page는 React가 소유하지 않는 <code>g</code> host
          안에서만 rect를 만들고 교체합니다. restore는 same React node를
          되살리지 않고 fresh baseline rect를 만든 뒤 unmount에서 host를
          비웁니다.
        </p>
      </section>
      <RawPathPipelineLab />
      <section id="raw-structure">
        <p>04 · raw structure and resolution boundary</p>
        <h2>한 M command가 한 RawPath segment를 시작합니다</h2>
        <p>
          <code>getRawPath()</code>, <code>stringToRawPath()</code>,{' '}
          <code>rawPathToString()</code>은 element/string과 numeric cubic
          representation을 연결합니다. original d에 line, arc, quadratic
          command가 있어도 resulting RawPath는 cubic bezier입니다.{' '}
          <code>resolution</code>은 P21 motion measurement option이지 이 여섯
          conversion API의 documented input이 아닙니다.
        </p>
      </section>
    </article>
  )
}
