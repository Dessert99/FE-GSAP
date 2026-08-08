/** P39의 local ScrollToPlugin example과 config restoration 설명을 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { LocalScrollLab } from './examples/LocalScrollLab/LocalScrollLab'
import { scrollToMeta } from './scroll-to.meta'
import './ScrollToPage.css'

/** window와 element target 경계 및 autoKill ownership을 학습 순서로 보여 준다. */
export function ScrollToPage() {
  return (
    <article className='scroll-to-page'>
      <header>
        <p>{scrollToMeta.category}</p>
        <h1>{scrollToMeta.title}</h1>
        <p>{scrollToMeta.summary}</p>
        <div>
          {scrollToMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <code>{scrollToMeta.sourcePath}</code>
      </header>
      <LocalScrollLab />
      <section>
        <h2>global config는 snapshot 뒤 복원합니다</h2>
        <p>
          <code>ScrollToPlugin.config()</code>의 autoKill과 threshold는 전역
          설정입니다. example owner는 변경 전 <code>gsap.config()</code>을
          복사하고 unmount에서 복원해 다른 lesson의 interruption 정책을 바꾸지
          않습니다.
        </p>
        <p>
          window target은 page scroll을 바꾸며 element target은 그 element의
          scrollTop/scrollLeft만 바꿉니다. 이 page는 후자만 실행합니다.
        </p>
      </section>
    </article>
  )
}
