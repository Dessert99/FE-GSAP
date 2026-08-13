/** 반응형 정리 simulator와 navigation 경계를 한 페이지에 조립한다. */
import { toHref } from '../../../../app/routes'
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { ResponsiveRestorationLab } from './examples/ResponsiveRestorationLab/ResponsiveRestorationLab'
import { scrollTriggerResponsiveMeta } from './scroll-trigger-responsive.meta'
import './ScrollTriggerResponsivePage.css'

/** 반응형 조건 정리와 navigation 책임을 페이지 스크롤 변경 없이 설명한다. */
export function ScrollTriggerResponsivePage() {
  return (
    <article className='scroll-trigger-responsive-page'>
      <header>
        <p>{scrollTriggerResponsiveMeta.category}</p>
        <h1>{scrollTriggerResponsiveMeta.title}</h1>
        <p>{scrollTriggerResponsiveMeta.summary}</p>
        <div className='scroll-trigger-responsive-page__links'>
          {scrollTriggerResponsiveMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
      </header>
      <ResponsiveRestorationLab />
      <section aria-labelledby='responsive-boundary-title'>
        <h2 id='responsive-boundary-title'>
          condition cleanup과 navigation cleanup을 섞지 않습니다
        </h2>
        <p>
          <code>ScrollTrigger.matchMedia()</code>와{' '}
          <code>clearMatchMedia()</code>는 deprecated이며 core{' '}
          <code>gsap.matchMedia()</code>로 이동했습니다.{' '}
          <a href={toHref('/fundamentals/scroll-trigger-create')}>
            ScrollTrigger 생성
          </a>
          과{' '}
          <a href={toHref('/fundamentals/responsive-motion')}>
            core 반응형 모션
          </a>
          에서 각각의 기초를 먼저 확인할 수 있습니다.
        </p>
        <p>
          현재 공식 문서는 <code>clearMatchMedia()</code>가 연결된 trigger와
          animation을 kill하지 않는다고 설명하지만, 설치된 3.15 source는 일치하는
          context를 kill합니다. 이 차이를 임의로 합치지 않고, 이 simulator에서는
          deprecated API를 호출하지 않습니다.
        </p>
        <p>
          <code>clearScrollMemory()</code>는 recorded ScrollTrigger positions를
          지우고 optional history restoration 값을 바꿀 수 있습니다. 이 페이지는
          이를 호출하지 않으며 앱의 navigation 처리 지점에서 history policy와 함께
          결정합니다.
        </p>
      </section>
    </article>
  )
}
