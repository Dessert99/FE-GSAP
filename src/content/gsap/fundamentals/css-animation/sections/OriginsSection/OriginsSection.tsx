/** HTML·SVG origin과 directional rotation의 좌표·허용값·경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function OriginsSection() {
  return (
    <section id="origins" className="css-animation-page__section" aria-labelledby="origins-title">
      <SectionHeading number="05" id="origins" title="회전축과 방향을 명시하기" description="같은 rotation도 어느 좌표를 중심으로 어느 방향으로 가는지에 따라 경로가 달라집니다. HTML 요소 내부 좌표와 SVG 캔버스 좌표를 구분합니다." />
      <div className="css-animation-page__origin-grid">
        <article className="css-animation-page__card">
          <h3>transformOrigin</h3>
          <p>2D 기본값은 <code>'50% 50%'</code>입니다. <code>'left top'</code>, <code>'100% 100%'</code>, <code>'50px 20px'</code>처럼 keyword·percent·px를 받습니다.</p>
          <p>세 번째 값 <code>'50% 50% -400px'</code>은 3D 회전축의 z-origin 거리입니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>SVG origin 두 방식</h3>
          <p><code>transformOrigin</code>은 요소 내부 좌표, <code>svgOrigin:'250 100'</code>은 SVG 캔버스 전체 좌표입니다. 둘은 동시에 쓸 수 없고 svgOrigin은 percent를 받지 않습니다.</p>
          <p>GSAP은 SVG origin을 브라우저마다 일관되게 다루지만 SVG 3D transform은 공식 지원 범위가 아닙니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>smoothOrigin</h3>
          <p>SVG origin을 바꿀 때 요소가 튀지 않도록 보정값을 기록·적용합니다. 트윈별 <code>true/false</code> 또는 <code>CSSPlugin.defaultSmoothOrigin</code>으로 조절할 수 있습니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>directional rotation</h3>
          <p><code>'-170_short'</code>는 최단 경로, <code>'-=30_cw'</code>는 시계 방향 상대 회전, <code>'1.5rad_ccw'</code>는 반시계 방향 rad 회전입니다.</p>
          <p>suffix는 rotation·rotationX·rotationY에 바로 쓰며 CSS target에는 별도 plugin이 필요 없습니다.</p>
        </article>
      </div>
      <pre className="css-animation-page__code css-animation-page__code--wide"><code>{`gsap.to(element, {
  rotation: '-170_short',
  rotationX: '-=30_cw',
  rotationY: '1.5rad_ccw',
  transformOrigin: '50% 50% -400px',
  duration: 2
})

gsap.to(svgElement, {
  rotation: 270,
  svgOrigin: '250 100'
})`}</code></pre>
    </section>
  )
}
