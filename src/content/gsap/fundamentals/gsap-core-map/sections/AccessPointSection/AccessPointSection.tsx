/** gsap 객체를 Core 기능으로 들어가는 단일 access point로 소개한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const quickStartCode = `npm install gsap

import { gsap } from 'gsap'

// Timeline에 넣지 않은 독립 Tween 하나
gsap.to('.box', { rotation: 27, x: 100, duration: 1 })

// Tween 세 개를 순서대로 담은 Timeline 하나
const timeline = gsap.timeline()
timeline
  .to('#green', { x: 786, duration: 1 })
  .to('#blue', { x: 786, duration: 2 })
  .to('#orange', { x: 786, duration: 1 })`

export function AccessPointSection() {
  return (
    <section id="access-point" className="core-map-page__section" aria-labelledby="access-point-title">
      <SectionHeading number="01" id="access-point" title="하나의 입구에서 시작하기" description="설치한 GSAP을 import하면 animation을 만들고 제어하는 대부분의 기능을 gsap에서 찾습니다." />
      <div className="core-map-page__split">
        <div className="core-map-page__prose">
          <p><strong>access point</strong>는 여러 기능으로 들어가는 공통 입구입니다. <code>gsap</code>은 GSAP Core 대부분의 기능을 제공하는 JavaScript 객체입니다.</p>
          <p><strong>target</strong>은 바꿀 대상, <strong>property</strong>는 바꿀 값의 이름, <strong>duration</strong>은 변화에 쓸 시간입니다. <strong>Tween</strong>은 target의 property 값을 시간에 따라 계산하고, <strong>Timeline</strong>은 여러 animation을 원하는 시간에 배치합니다.</p>
          <p>오른쪽 <code>gsap.to()</code>의 <code>x</code>는 CSS <code>translateX()</code>를 짧게 쓴 property입니다. 그 아래 <code>gsap.timeline()</code> 뒤의 체인은 세 Tween을 하나의 순서로 묶습니다.</p>
          <a className="core-map-page__resource-link" href="https://courses.snorkl.tv/courses/gsap-3-express?ref=44f484" target="_blank" rel="noopener noreferrer" aria-label="공식 페이지가 연결한 GSAP 3 Express 빠른 개요 새 탭에서 열기">공식 페이지가 연결한 GSAP 3 Express 빠른 개요 열기 <span aria-hidden="true">↗</span></a>
        </div>
        <pre className="core-map-page__code"><code>{quickStartCode}</code></pre>
      </div>
      <p className="core-map-page__boundary-note"><strong>이 페이지의 경계</strong> npm·CDN·framework·SSR별 설치는 다루지 않습니다. 여기서는 import가 끝난 뒤 어떤 객체와 개념을 만나는지만 정리합니다.</p>
    </section>
  )
}
