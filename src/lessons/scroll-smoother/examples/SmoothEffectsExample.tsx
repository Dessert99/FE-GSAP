import gsapUrl from 'gsap/dist/gsap.min.js?url' // iframe 안에서 GSAP 코어를 로드할 정적 파일 URL
import scrollTriggerUrl from 'gsap/dist/ScrollTrigger.min.js?url' // iframe 안에서 ScrollTrigger를 로드할 정적 파일 URL
import scrollSmootherUrl from 'gsap/dist/ScrollSmoother.min.js?url' // iframe 안에서 ScrollSmoother를 로드할 정적 파일 URL

export function SmoothEffectsExample() {
  // ScrollSmoother는 window/body를 다루므로 학습 앱 밖의 독립 문서에서 실행한다.
  const demoDocument = `
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <style>
      html,
      body {
        margin: 0;
        min-height: 100%;
        background: #111827;
        color: #e2e8f0;
        font-family: system-ui, -apple-system, sans-serif;
      }

      #smooth-wrapper {
        overflow: hidden;
      }

      #smooth-content {
        min-height: 1200px;
        padding: 32px;
        box-sizing: border-box;
      }

      .block {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 220px;
        margin-bottom: 48px;
        border-radius: 8px;
        background: #1e293b;
        font-weight: 700;
      }

      .block[data-speed] {
        background: #38bdf8;
        color: #0f172a;
      }

      .hint {
        position: fixed;
        top: 12px;
        left: 12px;
        z-index: 2;
        padding: 6px 10px;
        border-radius: 6px;
        background: rgba(15, 23, 42, 0.8);
        color: #94a3b8;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="hint">scroll inside this frame</div>
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <section class="block">normal speed</section>
        <section class="block" data-speed="0.65">data-speed 0.65</section>
        <section class="block">normal speed</section>
        <section class="block" data-speed="1.25">data-speed 1.25</section>
      </div>
    </div>
    <script src="${gsapUrl}"></script>
    <script src="${scrollTriggerUrl}"></script>
    <script src="${scrollSmootherUrl}"></script>
    <script>
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 0.9,
        effects: true
      });
    </script>
  </body>
</html>`

  return (
    <div className="smoother-demo">
      {/* iframe 안에서는 ScrollSmoother가 실제 페이지 레벨 window/body 스크롤을 제어한다 */}
      <iframe className="smoother-frame" title="ScrollSmoother demo" srcDoc={demoDocument} />
    </div>
  )
}
