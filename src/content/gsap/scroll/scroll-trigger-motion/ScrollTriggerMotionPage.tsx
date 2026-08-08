/** P42의 exclusive motion lab과 trigger lifetime boundary를 조립한다. */
import { toHref } from '../../../../app/routes'
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { MotionModeLab } from './examples/MotionModeLab/MotionModeLab'
import { scrollTriggerMotionMeta } from './scroll-trigger-motion.meta'
import './ScrollTriggerMotionPage.css'
/** scrub·batch·snap과 signed velocity의 쓰임을 순서로 설명한다. */
export function ScrollTriggerMotionPage() {
  return (
    <article className='scroll-trigger-motion-page'>
      <header>
        <p>{scrollTriggerMotionMeta.category}</p>
        <h1>{scrollTriggerMotionMeta.title}</h1>
        <p>
          <code>getVelocity()</code>는 signed scroll velocity를 읽고,{' '}
          <code>getTween()</code>은 scrub tween 또는 <code>true</code>일 때 snap
          tween을 읽습니다.
        </p>
        <div>
          {scrollTriggerMotionMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p>
          <code>{scrollTriggerMotionMeta.sourcePath}</code> · 공식 대조일{' '}
          {scrollTriggerMotionMeta.reviewedAt} · official coverage 4 / 4
        </p>
      </header>
      <MotionModeLab />
      <section>
        <h2>batch와 directional snap의 경계</h2>
        <p>
          batch는 interval 안 callback을 묶고 batchMax에서 자릅니다. directional
          snap function은 양수/음수 direction에 따라 다음 또는 이전 increment를
          고릅니다. 먼저{' '}
          <a href={toHref('/fundamentals/scroll-trigger-create')}>
            P40 생성
          </a>
          과{' '}
          <a href={toHref('/fundamentals/scroll-trigger-geometry')}>
            P41 geometry
          </a>
          에서 instance와 start/end 계산을 확인하세요.
        </p>
      </section>
    </article>
  )
}
