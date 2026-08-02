/** 플러그인이 vars를 확장하는 원리와 현재 페이지의 설명 경계를 정한다. */
import { OfficialDocsLink } from '../../../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { officialLinks } from '../../gsap-to.meta'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import './PluginsSection.css'

export function PluginsSection() {
  return (
    <section id="plugins" className="gsap-method-page__section" aria-labelledby="plugins-title">
      <SectionHeading number="04" id="plugins-title" title="Plugins" description="플러그인은 gsap.to()의 모양을 바꾸지 않고 vars가 이해하는 속성을 확장합니다." />
      <div className="plugins-section">
        <div>
          <p className="plugins-section__label">CORE만 사용할 때</p>
          <pre><code>{`gsap.to('.box', {
  x: 100,
  rotation: 90
})`}</code></pre>
        </div>
        <span aria-hidden="true">→</span>
        <div>
          <p className="plugins-section__label">플러그인을 등록한 뒤</p>
          <pre><code>{`gsap.registerPlugin(ScrollTrigger)

gsap.to('.box', {
  x: 100,
  scrollTrigger: '.box'
})`}</code></pre>
        </div>
      </div>
      <div className="gsap-method-page__note"><p><strong>이 페이지의 범위</strong> 플러그인의 존재와 vars 확장 원리까지 설명합니다. 각 플러그인의 옵션은 해당 공식 페이지와 1:1인 별도 로컬 페이지에서 다룹니다.</p><OfficialDocsLink label="공식 Plugins 문서" href={officialLinks.plugins} /></div>
    </section>
  )
}
