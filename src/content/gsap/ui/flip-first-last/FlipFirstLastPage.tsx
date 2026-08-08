/** Flip의 capture·mutation·from/to·cleanup 학습 단위를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { FlipCardLab } from './examples/FlipCardLab/FlipCardLab'
import { flipFirstLastMeta } from './flip-first-last.meta'
import './FlipFirstLastPage.css'

export function FlipFirstLastPage() {
  return (
    <article className="flip-first-last-page">
      <header>
        <p>{flipFirstLastMeta.category}</p>
        <h1>{flipFirstLastMeta.title}</h1>
        <p>{flipFirstLastMeta.summary}</p>
        <div>
          {flipFirstLastMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <code>{flipFirstLastMeta.sourcePath}</code>
      </header>
      <section>
        <h2>01 · First → Last → Invert → Play</h2>
        <p>
          먼저 현재 layout을 기록하고, 원하는 DOM 변경을 실제로 적용합니다. Flip은 바뀐 DOM을
          되돌리지 않고 이전 위치처럼 보이는 offset을 잠시 적용한 뒤 그 offset을 제거합니다.
        </p>
        <FlipCardLab />
      </section>
      <section>
        <h2>02 · capture는 mutation보다 앞입니다</h2>
        <p>
          <code>Flip.getState()</code>는 selector, element, array 또는 NodeList를 capture합니다.
          기본 geometry 외 CSS 값은 <code>props</code> comma list로 기록해야 from/to가 사용할 대응
          data가 생깁니다.
        </p>
      </section>
      <section>
        <h2>03 · from과 to의 방향을 구분합니다</h2>
        <p>
          <code>Flip.from(state)</code>은 captured First에서 현재 Last로,{' '}
          <code>Flip.to(state)</code>은 현재에서 captured state로 향합니다. 둘 다 Timeline을
          반환하므로 control·add가 가능합니다.
        </p>
      </section>
      <section>
        <h2>04 · vars는 layout 가정을 드러냅니다</h2>
        <p>
          <code>absolute</code>는 flow를 제거하고, <code>nested</code>는 parent/child offset 중첩을
          보정합니다. <code>simple</code>은 rotation·scale·skew container가 없을 때만 계산을 줄이는
          약속입니다.
        </p>
      </section>
      <section>
        <h2>05 · interrupt와 render timing을 정리합니다</h2>
        <p>
          새 flip 전에 active timeline을 kill하고 intended DOM location을 복원합니다. framework가
          DOM을 나중에 render하면 render 뒤에 state comparison을 해야 하며, Flip은 3D transform을
          처리하지 않고 border-box가 권장됩니다.
        </p>
      </section>
    </article>
  )
}
