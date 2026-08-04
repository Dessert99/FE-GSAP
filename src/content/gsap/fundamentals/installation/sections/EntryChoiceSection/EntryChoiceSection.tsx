/** GSAP 파일을 가져오는 세 경로와 공식 Install Helper가 고르게 해주는 선택지를 정리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const npmCode = `npm install gsap`

// 공식 Install Helper가 체크박스로 제공하는 plugin 19개 — 이름만 옮기고 개별 사용법은 각 plugin 페이지가 설명한다
const helperPlugins = [
  'Draggable', 'DrawSVG', 'Easel', 'Flip', 'GSDevTools', 'Inertia', 'MotionPathHelper',
  'MotionPath', 'MorphSVG', 'Observer', 'Physics2D', 'PhysicsProps', 'Pixi',
  'ScrambleText', 'ScrollTrigger', 'ScrollSmoother', 'ScrollTo', 'SplitText', 'Text',
]

// 공식 Install Helper가 plugin과 분리해서 제공하는 ease 6개
const helperEases = ['RoughEase', 'ExpoScaleEase', 'SlowMo', 'CustomEase', 'CustomBounce', 'CustomWiggle']

export function EntryChoiceSection() {
  return (
    <section id="entry-choice" className="installation-page__section" aria-labelledby="entry-choice-title">
      <SectionHeading
        number="01"
        id="entry-choice"
        title="가져오는 방법 고르기"
        description="GSAP은 React나 Vue 같은 특정 framework 전용 라이브러리가 아니라 그냥 JavaScript 파일입니다. 그래서 첫 결정은 '이 파일을 어떻게 내 프로젝트로 가져올까'입니다."
      />

      <p className="installation-page__lead">
        먼저 용어 두 개를 정리합니다. <strong>package manager</strong>는 프로젝트가 쓰는 외부 코드를 명령 한 줄로 내려받고 버전까지
        관리해 주는 도구입니다. <strong>plugin</strong>은 SVG 모양 바꾸기나 스크롤 연동처럼 특수한 기능을 담당하는 별도 파일로, core에
        기능을 더해 줍니다.
      </p>

      <div className="installation-page__split">
        <div className="installation-page__prose">
          <p>
            <strong>package manager</strong>는 build tool(Vite, webpack, Next.js 등)을 쓰는 프로젝트의 기본 선택입니다.{' '}
            <strong>npm</strong>과 <strong>Yarn</strong> 모두 공식 Install Helper가 지원하고, <code>npm install gsap</code>은 GSAP을
            프로젝트 의존성으로 내려받는 명령입니다.
          </p>
          <p>
            <strong>CDN script tag</strong>는 build 도구 없이 HTML 파일만으로 작업할 때 씁니다. <strong>직접 내려받기</strong>는 파일을
            저장소에 같이 넣어두고 싶을 때 씁니다.
          </p>
          <p>
            가져오는 경로와 파일 형식은 <strong>서로 다른 선택</strong>입니다. 경로를 고른 뒤 어떤 모듈 형식을 쓸지 다음 단계에서 다시
            고릅니다.
          </p>
        </div>
        <pre className="installation-page__code">
          <code>{npmCode}</code>
        </pre>
      </div>

      <div className="installation-page__note">
        <p>
          <strong>공식 Install Helper</strong>는 위 선택과 필요한 plugin을 고르면 그 조합에 맞는 설치 명령과 import 코드를 만들어 줍니다.
          조합이 많아 여기서 전부 옮기지 않으므로, 정확한 코드는{' '}
          <a href="https://gsap.com/docs/v3/Installation" target="_blank" rel="noreferrer">
            공식 Installation 페이지<span className="installation-page__sr-only"> (새 탭에서 열기)</span>
          </a>
          에서 직접 생성해 쓰는 것을 권합니다.
        </p>
      </div>

      <div className="installation-page__catalog">
        <article>
          <h3>Helper가 고르게 해주는 plugin</h3>
          <p>기능이 필요할 때만 함께 받으면 됩니다. 처음에는 하나도 고르지 않아도 core만으로 시작할 수 있습니다.</p>
          <ul>
            {helperPlugins.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>따로 제공되는 ease</h3>
          <p>움직임의 속도 곡선을 바꾸는 ease는 plugin과 목록이 나뉘어 있습니다. React용 useGSAP도 별도 항목입니다.</p>
          <ul>
            {helperEases.map((name) => (
              <li key={name}>{name}</li>
            ))}
            <li>useGSAP (React)</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
