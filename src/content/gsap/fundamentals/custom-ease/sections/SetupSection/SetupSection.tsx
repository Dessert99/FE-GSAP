/** CustomEase가 core에 없다는 사실과 등록이 tree shaking을 막는 이유를 FAQ 원문 기준으로 설명한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 FAQ 네 문항을 학습자가 실제로 겪는 순서(가져오기 → 등록 → 빌드에서 사라짐 → 중복 등록)로 정렬한 표 데이터
const faqRows = [
  {
    id: 'core',
    question: 'GSAP core에 들어 있나요?',
    answer: '아니요. 공식 답은 "No, you must load/import it separately"입니다. 따로 불러와야 합니다.',
  },
  {
    id: 'install',
    question: '어떻게 가져오나요?',
    answer:
      'CDN, NPM, download 등 모든 방법은 공식 installation 페이지에 있습니다. 필요한 코드를 만들어 주는 인터랙티브 헬퍼도 그 페이지에 있습니다.',
  },
  {
    id: 'tree-shaking',
    question: '개발에서는 되는데 빌드하면 멈춥니다.',
    answer:
      'build tool이 tree shaking으로 plugin을 떨어뜨린 것입니다. 등록 호출이 plugin을 tree shaking에서 보호합니다. registerPlugin()을 부르세요.',
  },
  {
    id: 'multiple',
    question: '여러 번 등록해도 되나요?',
    answer: '괜찮습니다. 공식 답은 "It doesn\'t help anything, nor does it hurt"입니다. 도움도 없고 해도 없습니다.',
  },
]

export function SetupSection() {
  return (
    <section id="setup" className="custom-ease-page__section" aria-labelledby="setup-title">
      <SectionHeading
        number="02"
        id="setup"
        title="core에 없으니 따로 가져와 등록합니다"
        description="CustomEase는 plugin입니다. gsap만 import해서는 쓸 수 없고, 파일을 가져오는 일과 등록하는 일을 둘 다 해야 합니다."
      />

      <div className="custom-ease-page__prose">
        <p>
          <strong>plugin</strong>은 GSAP core에 기능을 얹어 주는 별도 파일입니다. core를 가볍게 유지하려고 자주 쓰지 않는 기능을 밖으로
          빼 둔 것입니다. CustomEase가 그중 하나라서, 공식 FAQ는 core 포함 여부를 묻는 질문에 <strong>"No"</strong> 한 단어로 답합니다.
        </p>
        <p>
          공식 Quick Start가 등록 코드로 제시하는 것은 딱 한 줄입니다. 이 줄이 없으면 <code>ease: "hop"</code>이라고 적어도 GSAP은 그
          이름을 모릅니다.
        </p>
      </div>

      <pre className="custom-ease-page__code">
        <code>{`import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

// 공식 Quick Start가 제시하는 등록 코드 한 줄
gsap.registerPlugin(CustomEase)`}</code>
      </pre>

      <div className="custom-ease-page__note">
        <h3>import 경로는 설치 방식에 맞춥니다</h3>
        <p>
          위 import 경로는 이 프로젝트의 ES module 환경에 맞춘 형태입니다. CDN·NPM·download 중 어느 방식을 쓰는지에 따라
          가져오는 코드가 달라지므로 <a href={toHref('/fundamentals/installation')}>설치와 등록 페이지</a>에서 환경에 맞는 형태를 확인하세요.
        </p>
      </div>

      <div className="custom-ease-page__table-wrap">
        <table className="custom-ease-page__rules-table">
          <caption>공식 FAQ 네 문항을 학습 순서로 정리</caption>
          <thead>
            <tr>
              <th scope="col">질문</th>
              <th scope="col">공식 답</th>
            </tr>
          </thead>
          <tbody>
            {faqRows.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.question}</th>
                <td>{row.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="custom-ease-page__warning">
        <h3>등록은 "쓰겠다"는 선언이기도 합니다</h3>
        <p>
          <strong>tree shaking</strong>은 build tool이 "아무도 안 쓰는 코드"를 결과물에서 지우는 최적화입니다.{' '}
          <code>ease: "hop"</code>은 문자열이라서 build tool 눈에는 CustomEase를 쓰는 코드로 보이지 않습니다. 그래서 개발 서버에서는
          잘 되던 것이 빌드 후에 조용히 멈춥니다. <code>gsap.registerPlugin(CustomEase)</code>는 그 이름을 실제로 사용하는 코드라서
          plugin이 지워지지 않게 지켜 줍니다. tree shaking 자체는{' '}
          <a href={toHref('/fundamentals/installation')}>설치와 등록 페이지</a>에서 더 자세히 다룹니다.
        </p>
      </div>
    </section>
  )
}
