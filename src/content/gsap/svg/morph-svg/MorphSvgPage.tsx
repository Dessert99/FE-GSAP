/** MorphSVG의 compatibility부터 restoration까지의 학습 순서를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { IconMorphLab } from './examples/IconMorphLab/IconMorphLab'
import { morphSvgMeta } from './morph-svg.meta'
import './MorphSvgPage.css'

export function MorphSvgPage() {
  return (
    <article className="morph-svg-page">
      <header>
        <p>{morphSvgMeta.category}</p>
        <h1>{morphSvgMeta.title}</h1>
        <p>{morphSvgMeta.summary}</p>
        <div>
          {morphSvgMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
      </header>
      <section>
        <h2>01 · shape compatibility</h2>
        <p>
          동일한 점 수가 아니어도 plugin이 cubic bezier와 anchor를 맞추지만,
          복잡한 artwork는 map·shapeIndex·winding을 실험해야 합니다.
        </p>
      </section>
      <section>
        <h2>02 · config와 defaults/hooks</h2>
        <p>
          shape은 selector, Element 또는 raw d입니다. map, origin, type,
          curveMode, smooth, precision, render을 config object로 조합할 수
          있습니다. global defaults는 page-wide 동작이므로 바꾸면 반드시
          원복합니다.
        </p>
      </section>
      <IconMorphLab />
      <section>
        <h2>03 · restoration</h2>
        <p>
          MorphSVG는 target에 original data를 저장할 수 있지만 lab은 mount d를
          직접 snapshot하여 restore합니다. conversion utility와 raw path
          utility는 P19에서 다룹니다.
        </p>
      </section>
    </article>
  )
}
