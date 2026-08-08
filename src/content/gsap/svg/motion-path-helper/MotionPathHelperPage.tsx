/** P20의 path-data prerequisite, editor lifecycle, dependency boundary를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { toHref } from '../../../../app/routes'
import { MotionPathHelperLab } from './examples/MotionPathHelperLab/MotionPathHelperLab'
import { motionPathHelperMeta } from './motion-path-helper.meta'
import './MotionPathHelperPage.css'

/** editable SVG path와 temporary editor cleanup을 가르치는 P20 페이지다. */
export function MotionPathHelperPage() {
  return (
    <article className="motion-path-helper-page">
      <header>
        <p>{motionPathHelperMeta.category}</p>
        <h1>{motionPathHelperMeta.title}</h1>
        <p>{motionPathHelperMeta.summary}</p>
        <div>
          {motionPathHelperMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
      </header>
      <section>
        <p>01 · path-data prerequisite</p>
        <h2>편집할 path data부터 준비합니다</h2>
        <p>
          이 lab은{' '}
          <a href={toHref('/fundamentals/morph-svg-path-data')}>
            P19 MorphSVG path 데이터
          </a>
          에서 준비한 SVG <code>d</code> string을 편집합니다. P21 MotionPath
          fundamentals는 아직 text-only 다음 경계입니다.
        </p>
      </section>
      <MotionPathHelperLab />
      <section>
        <p>03 · editing and dependency boundary</p>
        <h2>editor는 development용 browser DOM입니다</h2>
        <p>
          ALT-click/drag, SHIFT-click, DELETE, CTRL-Z로 anchor와 handle을 편집할
          수 있습니다. MotionPathHelper는 MotionPathPlugin을 요구하므로 두
          plugin을 함께 register하고, unmount·kill·recreate에서 temporary
          controls와 Copy button을 제거합니다. follower preview 없이 SVG path만
          편집할 때는 <code>MotionPathHelper.editPath(path, config)</code>를
          사용합니다.
        </p>
      </section>
    </article>
  )
}
