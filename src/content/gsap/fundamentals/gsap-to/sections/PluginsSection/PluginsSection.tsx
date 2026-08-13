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
      <div className="gsap-method-page__note">
        <p>
          <strong>왜 플러그인으로 나눌까요?</strong> GSAP Core는 작게 유지하고, 렌더링 라이브러리 연결·도형
          변형·드래그처럼 필요한 기능만 추가하기 위해서입니다. 이 페이지는 플러그인이 vars를 확장한다는 원리까지만
          설명하며, 각 플러그인의 등록·옵션·정리 방법은 해당 플러그인 학습 페이지에서 다룹니다.
        </p>
        <OfficialDocsLink label="공식 Plugins 문서" href={officialLinks.plugins} />
      </div>
    </section>
  )
}
