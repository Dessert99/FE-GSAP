/** registerPlugin()의 호출 형태와 시점, 그리고 import를 대체하지 않는다는 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const registerCode = `gsap.registerPlugin(MotionPathPlugin, ScrollToPlugin, TextPlugin)`

const orderCode = `import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 1. 가져오기 — 파일을 코드로 불러옵니다.
// 2. 등록하기 — core가 이 plugin을 알게 합니다.
gsap.registerPlugin(ScrollTrigger)

// 3. 사용하기 — 이제 scrollTrigger 옵션을 인식합니다.
gsap.to('.box', { x: 300, scrollTrigger: '.box' })`

// 정확한 CDN 주소는 공식 Install Helper가 생성하므로 순서만 보여주고 host·버전은 지어내지 않는다
const scriptTagCode = `<script src="…/gsap.min.js"></script>
<script src="…/ScrollTrigger.min.js"></script>
<!-- core를 먼저 넣어야 뒤따라 로드된 plugin이 스스로 등록할 수 있습니다. -->
<!-- 실제 주소는 공식 Install Helper에서 생성해 붙여 넣으세요. -->`

export function RegisterPluginSection() {
  return (
    <section id="register-plugin" className="installation-page__section" aria-labelledby="register-plugin-title">
      <SectionHeading
        number="04"
        id="register-plugin"
        title="plugin을 core에 등록하기"
        description="plugin은 core에 특수 기능을 더하는 별도 파일입니다. 파일을 가져오는 것과 core가 그 존재를 아는 것은 다른 일이라, 등록이라는 단계가 따로 있습니다."
      />

      <p className="installation-page__lead">
        <strong>plugin</strong>이란 SVG 모양 바꾸기나 스크롤 연동처럼 특수한 기능을 담당하는 추가 파일입니다. 이렇게 나눠 둔 덕분에
        core는 작게 유지되고, 필요한 기능만 골라 쓸 수 있습니다.
      </p>

      <pre className="installation-page__code installation-page__code--wide">
        <code>{registerCode}</code>
      </pre>

      <div className="installation-page__split">
        <div className="installation-page__prose">
          <p>
            인자로 plugin을 쉼표로 나열하면 한 번에 등록됩니다. 등록은 <strong>그 plugin을 쓰기 전에</strong> 끝나 있어야 합니다.
          </p>
          <p>
            보통 앱이 시작될 때 한 번 실행되는 위치, 예를 들어 진입 파일이나 앞 단계에서 만든 재export 파일에 둡니다.
          </p>
        </div>
        <pre className="installation-page__code">
          <code>{orderCode}</code>
        </pre>
      </div>

      <div className="installation-page__warning">
        <p>
          <strong>등록은 가져오기를 대신하지 않습니다.</strong> <code>registerPlugin()</code>은 이미 불러온 plugin을 core에 알리는
          역할만 합니다. import나 script tag 없이 이름만 넘기면 그 이름은 존재하지 않습니다.
        </p>
      </div>

      <div className="installation-page__subheading">
        <h3>script tag는 스스로 등록을 시도합니다</h3>
        <p>
          CDN의 minified 파일처럼 ES Module이 아닌 버전은 로드될 때 자기 자신을 등록하려고 시도합니다. core가 먼저 로드돼 있으면
          브라우저에서는 대체로 그대로 잘 동작합니다.
        </p>
      </div>

      <pre className="installation-page__code installation-page__code--wide">
        <code>{scriptTagCode}</code>
      </pre>
    </section>
  )
}
