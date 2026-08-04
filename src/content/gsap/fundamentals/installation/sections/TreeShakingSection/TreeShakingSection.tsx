/** build tool이 plugin을 제거하는 tree shaking을 통해 등록이 왜 필수인지 이유를 세운다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const droppedCode = `import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ScrollTrigger를 직접 부르는 코드가 없습니다.
// build tool은 "안 쓰는 import"로 보고 결과물에서 제외할 수 있습니다.
gsap.to('.box', { x: 300, scrollTrigger: '.box' })`

const keptCode = `import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 등록 호출이 ScrollTrigger를 실제로 사용하므로 제거 대상이 아닙니다.
gsap.registerPlugin(ScrollTrigger)

gsap.to('.box', { x: 300, scrollTrigger: '.box' })`

export function TreeShakingSection() {
  return (
    <section id="tree-shaking" className="installation-page__section" aria-labelledby="tree-shaking-title">
      <SectionHeading
        number="05"
        id="tree-shaking"
        title="등록이 필요한 이유 이해하기"
        description="등록을 빼먹으면 개발 중에는 멀쩡하다가 배포한 뒤에만 기능이 사라지는 일이 생깁니다. 원인은 build tool의 최적화입니다."
      />

      <p className="installation-page__lead">
        <strong>tree shaking</strong>은 build tool이 '아무도 쓰지 않는 코드'를 찾아 결과물에서 빼는 최적화입니다. 파일을 가볍게
        만들어 주지만, 쓰는지 아닌지를 코드 모양만 보고 판단합니다.
      </p>

      <div className="installation-page__split">
        <div>
          <p className="installation-page__code-label">등록이 없으면</p>
          <pre className="installation-page__code">
            <code>{droppedCode}</code>
          </pre>
        </div>
        <div>
          <p className="installation-page__code-label">등록이 있으면</p>
          <pre className="installation-page__code">
            <code>{keptCode}</code>
          </pre>
        </div>
      </div>

      <div className="installation-page__prose installation-page__prose--wide">
        <p>
          <code>scrollTrigger</code>는 문자열 key로만 등장하기 때문에, build tool은 위쪽 import와 이 사용처를 연결하지 못합니다. 그래서
          import한 plugin이 어디에도 안 쓰인 것처럼 보이고 제거 대상이 됩니다.
        </p>
        <p>
          <code>gsap.registerPlugin(ScrollTrigger)</code>는 그 이름을 실제로 사용하는 코드입니다. 등록 호출 하나가 "이건 살려둬야 한다"는
          신호가 됩니다.
        </p>
        <p>
          이 문제는 <strong>브라우저가 아니라 build 환경에서</strong> 생깁니다. script tag로 직접 넣을 때는 build 단계가 없으니 해당하지
          않습니다.
        </p>
      </div>

      <div className="installation-page__note">
        <p>
          같은 plugin을 여러 번 등록해도 <strong>문제가 생기지는 않습니다.</strong> 다만 이득도 없습니다. 여러 파일에서 중복 등록하고
          있다면 한 곳으로 모으는 편이 읽기 좋습니다.
        </p>
      </div>
    </section>
  )
}
