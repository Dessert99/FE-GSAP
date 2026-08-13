/** MorphSVG static conversion과 RawPath serialization 학습 단계를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { toHref } from '../../../../app/routes'
import { GeometryConverter } from './examples/GeometryConverter/GeometryConverter'
import { morphSvgPathDataMeta } from './morph-svg-path-data.meta'
import './MorphSvgPathDataPage.css'

export function MorphSvgPathDataPage() {
  return (
    <article className="morph-svg-path-data-page">
      <header>
        <p>{morphSvgPathDataMeta.category}</p>
        <h1>{morphSvgPathDataMeta.title}</h1>
        <div>
          {morphSvgPathDataMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
      </header>
      <section>
        <h2>shape input → path DOM</h2>
        <p>
          <a href={toHref('/fundamentals/morph-svg')}>MorphSVG 모양 변환</a>
          에서 이어집니다. convertToPath는 기본으로 source element 자리에 path를
          swap합니다. listeners나 stored references가 있으면 교체를 의식해야
          합니다.
        </p>
      </section>
      <GeometryConverter />
      <section>
        <h2>round-trip boundary</h2>
        <p>
          RawPath는 각 M command의 segment와 alternating x/y cubic values입니다.
          MotionPath도 같은 raw representation을 재사용하지만 그 API는 별도
          페이지가 소유합니다.
        </p>
      </section>
    </article>
  )
}
