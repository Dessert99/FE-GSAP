/** P40의 source-backed create runtime과 global ownership 경계를 학습 순서로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { LocalScrollTriggerLab } from './examples/LocalScrollTriggerLab/LocalScrollTriggerLab'
import { scrollTriggerCreateMeta } from './scroll-trigger-create.meta'
import './ScrollTriggerCreatePage.css'

/** local scroller에서 create·measurement·cleanup을 실제 instance로 가르친다. */
export function ScrollTriggerCreatePage() {
  return (
    <article className='scroll-trigger-create-page'>
      <header>
        <p>{scrollTriggerCreateMeta.category}</p>
        <h1>{scrollTriggerCreateMeta.title}</h1>
        <p>{scrollTriggerCreateMeta.summary}</p>
        <div className='scroll-trigger-create-page__links'>
          {scrollTriggerCreateMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p>
          <code>{scrollTriggerCreateMeta.sourcePath}</code> · 공식 대조일{' '}
          {scrollTriggerCreateMeta.reviewedAt}
        </p>
      </header>
      <LocalScrollTriggerLab />
      <section aria-labelledby='scroll-trigger-global-boundary-title'>
        <p className='scroll-trigger-create-page__eyebrow'>GLOBAL OWNERSHIP</p>
        <h2 id='scroll-trigger-global-boundary-title'>
          defaults와 config는 같은 범위가 아닙니다
        </h2>
        <p>
          <code>ScrollTrigger.defaults()</code>는 이후 생성되는 instance가 해당
          vars를 생략했을 때만 채우는 global default입니다. 이 page는 바꾼
          <code>toggleActions</code> key의 prior value를 복사해 owned instance를
          kill한 뒤 복원합니다.
        </p>
        <p>
          <code>ScrollTrigger.config()</code>도 global behavior지만 public
          getter가 없습니다. 따라서 this page-local runtime은 unknown host
          config를 바꾸지 않습니다. application owner가 config를 바꿀 때는
          자신이 set한 prior values를 retain하고 teardown에서 restore해야
          합니다.
        </p>
        <p>
          P36 ScrollSmoother create는 root document scroll 구조를 소유하므로 이
          local scroller와 합치지 않습니다. route integration 전에는 text-only
          prerequisite boundary입니다.
        </p>
      </section>
    </article>
  )
}
