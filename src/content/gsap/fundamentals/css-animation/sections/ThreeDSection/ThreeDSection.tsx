/** 3D alias·perspective 위치·force3D·fallback의 역할을 분리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function ThreeDSection() {
  return (
    <section id="three-d" className="css-animation-page__section" aria-labelledby="three-d-title">
      <SectionHeading number="04" id="three-d" title="3D 깊이와 perspective 구분하기" description="rotationX/Y/Z와 z는 자세를 만들고, perspective는 그 깊이를 어떤 소실점에서 바라볼지 결정합니다." />
      <div className="css-animation-page__grid">
        <article className="css-animation-page__card">
          <h3>2D와 3D를 같은 vars에</h3>
          <pre className="css-animation-page__code"><code>{`gsap.to(element, {
  rotationX: 45,
  scaleX: 0.8,
  z: -300,
  duration: 2
})`}</code></pre>
          <p><code>rotationZ</code>는 일반 <code>rotation</code>과 같습니다. 3D를 지원하지 않는 브라우저에서는 3D 값만 무시되고 2D transform은 유지됩니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>부모 요소의 perspective</h3>
          <pre className="css-animation-page__code"><code>{`gsap.set(container, {
  perspective: 500
})`}</code></pre>
          <p>여러 자식 요소가 같은 소실점을 공유해야 할 때 부모 컨테이너에 둡니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>요소의 transformPerspective</h3>
          <pre className="css-animation-page__code"><code>{`gsap.set(element, {
  transformPerspective: 500
})`}</code></pre>
          <p>해당 요소의 transform 안에 <code>perspective(500px)</code>를 넣는 것과 같아 한 대상에만 적용됩니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>force3D의 렌더링 방식</h3>
          <p>기본 <code>'auto'</code>는 트윈 중 <code>translate3d()</code>를 사용하고 3D가 더 필요하지 않으면 완료 후 2D로 돌아가 GPU 메모리를 줄입니다. <code>true</code>는 3D를 유지하고, <code>false</code>는 가능한 2D를 유지합니다.</p>
        </article>
      </div>
      <div className="css-animation-page__note css-animation-page__note--warning"><strong>렌더링 경계</strong> 실제 3D 깊이를 보이려면 부모의 <code>perspective</code> 또는 대상의 <code>transformPerspective</code>가 필요합니다. 표면의 안티앨리어싱 품질은 브라우저 렌더링에 따라 달라집니다.</div>
    </section>
  )
}
