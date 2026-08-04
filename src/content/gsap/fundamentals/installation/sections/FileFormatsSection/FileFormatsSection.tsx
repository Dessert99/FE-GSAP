/** 내려받은 zip의 네 디렉터리가 각각 어떤 환경을 위한 형식인지 구분하게 한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 문서가 zip 구성으로 명시한 네 디렉터리 — 순서와 설명을 공식 본문 그대로 유지한다
const formats = [
  {
    dir: '/minified/',
    forWhat: 'script tag',
    description: '웹 페이지에 script tag로 바로 넣는 파일입니다. 범용 호환이고 용량이 가장 작게 압축돼 있습니다.',
  },
  {
    dir: '/UMD/',
    forWhat: '구형 build tool · 디버깅',
    description:
      'minified와 같은 내용을 압축하지 않은 UMD 형식이고 호환성이 높습니다. 주로 구형 build tool에서, 또는 코드를 사람이 읽을 수 있어 디버깅할 때 씁니다.',
  },
  {
    dir: '/ESM/',
    forWhat: 'build tool',
    description: '최신 build tool에 맞게 transpile된 ES Module 파일입니다. Vite나 webpack을 쓰면 보통 이 형식이 쓰입니다.',
  },
  {
    dir: '/src/',
    forWhat: '원본 코드',
    description: '가공하지 않은 최신 ES6 module 원본입니다. 내부 동작을 읽거나 직접 build할 때 씁니다.',
  },
]

export function FileFormatsSection() {
  return (
    <section id="file-formats" className="installation-page__section" aria-labelledby="file-formats-title">
      <SectionHeading
        number="02"
        id="file-formats"
        title="받은 파일의 형식 구분하기"
        description="같은 GSAP이라도 실행 환경에 따라 필요한 파일 형식이 다릅니다. 공식 배포 zip은 이 차이를 네 개의 폴더로 나눠 담고 있습니다."
      />

      <p className="installation-page__lead">
        <strong>ES Module</strong>은 <code>import</code> 문법으로 서로를 불러오는 최신 JavaScript 모듈 형식이고,{' '}
        <strong>UMD</strong>는 <code>import</code>가 없는 환경에서도 동작하도록 만든 예전 방식입니다. 어떤 폴더를 쓸지는 이 둘 중
        무엇을 이해하는 환경에서 코드를 실행하느냐로 정해집니다.
      </p>

      <dl className="installation-page__concept-list">
        {formats.map((format) => (
          <div key={format.dir}>
            <dt>
              <code>{format.dir}</code>
              <small>{format.forWhat}</small>
            </dt>
            <dd>{format.description}</dd>
          </div>
        ))}
      </dl>

      <p className="installation-page__note">
        npm으로 설치하면 이 네 형식이 <code>node_modules/gsap/</code> 아래에 함께 들어옵니다. 폴더를 직접 고를 일은 거의 없고, build
        tool이 상황에 맞는 파일을 알아서 고릅니다.
      </p>

      <div className="installation-page__warning">
        <p>
          <strong>build tool이 ES module을 이해하지 못한다면</strong> ES Module 대신 UMD 형식을 쓰면 됩니다. 공식 Install Helper는
          가져오기 경로(<code>npm</code>, <code>cdn</code>, <code>yarn</code>)와 <strong>모듈 형식(<code>umd</code>, <code>esm</code>)을
          별도로 고르게</strong> 해줍니다. UMD가 필요하면 <code>npm</code>을 고른 뒤 <code>umd</code>를 눌러 생성된 코드를 복사하세요.
          코드에서 어떻게 가리키는지는 다음 단계에서 봅니다.
        </p>
      </div>
    </section>
  )
}
