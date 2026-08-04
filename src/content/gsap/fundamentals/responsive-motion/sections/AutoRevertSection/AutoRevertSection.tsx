/** 조건별 animation의 진짜 문제는 생성이 아니라 정리라는 것을 먼저 세우고, matchMedia가 가져가는 책임을 정의한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 이 페이지를 읽기 전에 뜻이 잡혀 있어야 하는 낱말들 — 실행 코드보다 먼저 나온다
const glossary = [
  {
    term: 'media query',
    body: '"(min-width: 800px)"처럼 브라우저 환경에 던지는 질문입니다. 지금 맞는지 아닌지 두 가지 답만 돌아옵니다.',
  },
  {
    term: 'breakpoint',
    body: 'media query가 답을 바꾸는 경계값입니다. 위 예에서는 800px가 breakpoint입니다.',
  },
  {
    term: 'revert',
    body: 'GSAP이 값을 건드리기 전 상태로 되돌리는 것입니다. 재생을 멈추는 것이 아니라, 붙여 둔 transform과 style을 떼어 내는 것입니다.',
  },
  {
    term: 'MatchMedia',
    body: 'gsap.matchMedia()가 돌려주는 객체입니다. 조건과 setup 코드를 짝지어 보관하고, 그 조건이 끝날 때 무엇을 되돌릴지 기억합니다.',
  },
]

// 정리를 누가 하느냐만 다른 두 코드 — 이 페이지 전체의 축이다
const manualCode = `// 직접 정리하는 방식 — 목록을 내가 들고 있어야 합니다
let created = []

function setupWide() {
  created.push(gsap.to('.box', { x: 140 }))
  created.push(gsap.to('.box', { rotation: 360 }))
}

function teardown() {
  created.forEach((tween) => tween.revert()) // 하나라도 빠뜨리면 style이 남습니다
  created = []
}

window.addEventListener('resize', () => {
  teardown()
  if (window.innerWidth >= 800) setupWide()
})`

const matchMediaCode = `// matchMedia에 맡기는 방식 — 목록을 GSAP이 들고 있습니다
const mm = gsap.matchMedia()

mm.add('(min-width: 800px)', () => {
  gsap.to('.box', { x: 140 })
  gsap.to('.box', { rotation: 360 })
  // 조건이 안 맞게 되면 위 두 줄이 만든 것이 자동으로 revert됩니다
})`

export function AutoRevertSection() {
  return (
    <section id="auto-revert" className="responsive-page__section" aria-labelledby="auto-revert-title">
      <SectionHeading
        number="01"
        id="auto-revert"
        title="조건이 바뀌면 이전 animation은 누가 치우나"
        description="화면 폭에 따라 다른 animation을 만드는 것 자체는 어렵지 않습니다. 어려운 쪽은 조건이 바뀐 순간, 이전 조건이 남긴 것을 빠짐없이 되돌리는 일입니다."
      />

      <div className="responsive-page__glossary">
        {glossary.map((item) => (
          <div key={item.term}>
            <h3>{item.term}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>

      <div className="responsive-page__prose">
        <p>
          아래 두 코드는 하는 일이 같습니다. 다른 것은 <strong>정리 목록을 누가 들고 있느냐</strong> 하나뿐입니다.
        </p>
      </div>

      <div className="responsive-page__split">
        <pre className="responsive-page__code">
          <code>{manualCode}</code>
        </pre>
        <pre className="responsive-page__code">
          <code>{matchMediaCode}</code>
        </pre>
      </div>

      <div className="responsive-page__prose">
        <p>
          공식 문서가 <code>gsap.matchMedia()</code>를 소개하는 첫 문장이 정확히 이 차이를 말합니다 —{' '}
          <strong>
            특정 media query가 맞을 때만 실행되는 함수 안에 setup 코드를 넣게 해 주고, 더 이상 맞지 않게 되면 그 함수가 실행되는 동안
            만들어진 모든 GSAP animation과 ScrollTrigger가 자동으로 revert된다.
          </strong>{' '}
          "그 함수가 실행되는 동안 만들어진 모든 것"이 핵심입니다. 내가 배열에 담아 두지 않아도, 그 함수 안에서 만들어졌다는 사실만으로
          정리 대상이 됩니다.
        </p>
        <p>
          공식 문서는 이 API의 용도를 <strong>반응형·접근성 animation과 ScrollTrigger</strong>라고 밝히고,{' '}
          <strong>mobile/desktop 대응이나 prefers-reduced-motion 접근성 대응을 아주 단순하게 만든다</strong>고 적습니다. 화면 폭과
          사용자의 모션 설정, 이 둘이 대표 용도입니다.
        </p>
      </div>

      <div className="responsive-page__table-wrap">
        <table className="responsive-page__table">
          <caption>gsap.matchMedia()의 기본 정보</caption>
          <thead>
            <tr>
              <th scope="col">항목</th>
              <th scope="col">공식 문서가 밝힌 것</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">반환값</th>
              <td>
                <code>MatchMedia</code> — 공식 페이지에 <code>Returns : MatchMedia</code>로 적혀 있습니다.
              </td>
            </tr>
            <tr>
              <th scope="row">인자</th>
              <td>
                기본 scope 하나를 선택적으로 받습니다. 자세한 내용은 <a href="#scope-selector">05단계</a>에서 다룹니다.
              </td>
            </tr>
            <tr>
              <th scope="row">추가된 버전</th>
              <td>GSAP 3.11.0</td>
            </tr>
            <tr>
              <th scope="row">시그니처 표기</th>
              <td>공식 페이지에 명시 없음 — 형식 시그니처 줄 없이 인자 설명과 예제로만 제공됩니다.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="responsive-page__note responsive-page__note--probe">
        <h3>공식 문서에 없는 것 하나 — MatchMedia가 가진 것</h3>
        <p>
          공식 페이지는 <code>revert()</code>와 <code>add()</code>를 문장 안에서 쓰기만 하고, MatchMedia가 가진 멤버 목록을 따로 적어
          두지 않았습니다. 설치본에서 확인한 것은 <code>contexts</code> 배열과 <code>add()</code>, <code>revert(config?)</code>,{' '}
          <code>kill(revert?)</code>입니다.
        </p>
        <p className="responsive-page__provenance">
          이 항목은 공식 페이지에 게시돼 있지 않습니다. GSAP 3.15.0의 설치본 타입 정의와 실행으로 확인한 내용입니다.
        </p>
      </div>
    </section>
  )
}
