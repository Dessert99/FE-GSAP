/** CSSPlugin의 자동 포함·지원 대상·다른 plugin 경계를 먼저 정의한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function PluginBoundarySection() {
  return (
    <section id="plugin-boundary" className="css-animation-page__section" aria-labelledby="plugin-boundary-title">
      <SectionHeading number="01" id="plugin-boundary" title="CSSPlugin의 경계부터 잡기" description="CSSPlugin은 DOM 요소의 CSS 값을 읽고 쓰도록 GSAP Core에 포함된 플러그인입니다. property 이름을 외우기 전에 CSSPlugin이 다루는 값과 다른 플러그인이 필요한 값을 구분합니다." />
      <div className="css-animation-page__grid">
        <article className="css-animation-page__card">
          <h3>등록 없이 vars에 바로 쓰기</h3>
          <p><strong>CSSPlugin은 GSAP Core에 자동 포함</strong>됩니다. 오래된 <code>css: {'{ ... }'}</code> wrapper도 필요 없습니다.</p>
          <pre className="css-animation-page__code"><code>{`gsap.to(element, {
  x: 120,
  backgroundColor: 'tomato'
})`}</code></pre>
        </article>
        <article className="css-animation-page__card">
          <h3>목록보다 유효한 중간값</h3>
          <p>공식 전체 property 목록은 없습니다. 표준 animatable CSS뿐 아니라 GSAP이 중간값을 만들 수 있는 많은 값이 동작합니다.</p>
          <p>시작·중간·끝 CSS가 모두 유효하지 않은 <code>background-image</code> 교체 같은 값은 연속 보간 대신 한 시점에 설정됩니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>보간하지 않는 값의 시점</h3>
          <p><code>position:'absolute'</code>나 <code>borderStyle:'solid'</code>은 Tween 시작에 바로 적용합니다. 단, <code>display:'none'</code>은 대상이 움직이는 동안 사라지지 않도록 끝에 적용합니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>다른 기능이 필요한 경우</h3>
          <p>복잡한 layout 전환은 Flip, 숫자형 DOM attribute는 AttrPlugin, text 교체는 TextPlugin이 맡습니다. 일반 객체의 방향 회전에는 DirectionalRotationPlugin을 사용합니다.</p>
        </article>
      </div>
      <div className="css-animation-page__links" aria-label="관련 공식 문서">
        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties" target="_blank" rel="noreferrer">MDN animatable CSS · 새 탭</a>
        <a href="https://gsap.com/docs/v3/Plugins/Flip/" target="_blank" rel="noreferrer">Flip · 새 탭</a>
        <a href="https://gsap.com/docs/v3/GSAP/CorePlugins/Attributes/" target="_blank" rel="noreferrer">AttrPlugin · 새 탭</a>
        <a href="https://gsap.com/docs/v3/Plugins/TextPlugin/" target="_blank" rel="noreferrer">TextPlugin · 새 탭</a>
        <a href="https://gsap.com/docs/v3/GSAP/CorePlugins/Snap/" target="_blank" rel="noreferrer">Snap · 새 탭</a>
        <a href="#origins">Directional rotation · 이 페이지</a>
      </div>
    </section>
  )
}
