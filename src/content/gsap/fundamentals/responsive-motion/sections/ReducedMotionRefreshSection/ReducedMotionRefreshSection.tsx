/** prefers-reduced-motion을 조건으로 쓰는 이유와 gsap.matchMediaRefresh()가 그 조건 밖의 설정을 어떻게 반영하는지 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { ReduceMotionRefreshLab } from '../../examples/ReduceMotionRefreshLab/ReduceMotionRefreshLab'

// matchMediaRefresh()가 하는 일과 하지 않는 일 — 공식 두 문장을 나란히 둔다
const refreshFacts = [
  {
    label: '하는 일',
    body: '활성·매치 중인 모든 MatchMedia 객체를 즉시 revert하고, 현재 매치되는 것을 실행합니다.',
  },
  {
    label: '하지 않는 일',
    body: 'gsap.matchMedia() 인스턴스를 destroy하지 않습니다. 현재 매치 중인 것을 revert하고, 매치되는 것을 다시 실행할 뿐입니다.',
  },
  {
    label: '언제 쓰나',
    body: '"reduce motion" 같은 것을 토글하는 UI 체크박스를 다뤄야 할 때 특히 유용합니다.',
  },
  {
    label: '어떻게 상상하나',
    body: '창을 완전히 리사이즈해서 매치되던 것이 모두 매치되지 않게 만든 다음, 다시 원래 크기로 되돌려 다시 매치되게 한 것과 거의 같습니다.',
  },
]

export function ReducedMotionRefreshSection() {
  return (
    <section id="reduced-motion-refresh" className="responsive-page__section" aria-labelledby="reduced-motion-refresh-title">
      <SectionHeading
        number="06"
        id="reduced-motion-refresh"
        title="모션을 줄여 달라는 요청에 답한다"
        description="화면 폭과 달리 모션 설정은 사용자 접근성 선호를 나타냅니다. 운영체제의 요청과 앱 안의 토글, 두 경로를 어떻게 한 handler에서 다룰지가 이 단계의 주제입니다."
      />

      <div className="responsive-page__prose">
        <p>
          공식 문서가 이 조건을 다루는 이유를 분명히 적어 두었습니다 —{' '}
          <strong>
            animation은 전정기관 장애가 있는 사용자에게 메스꺼움을 유발할 수 있으므로, 최소한의 animation이나 아예 없는 animation을 제공해
            그들의 선호를 존중해야 한다.
          </strong>{' '}
          그리고 <strong>이를 위해 prefers reduced motion media query를 쓸 수 있다</strong>고 이어집니다. 공식 페이지는 더 읽을 자료로{' '}
          <a href="https://css-tricks.com/empathetic-animation/" target="_blank" rel="noreferrer">
            CSS-Tricks의 empathetic animation
          </a>{' '}
          글을 링크합니다.
        </p>
        <p>
          <code>(prefers-reduced-motion: reduce)</code>는 다른 media query와 문법이 다르지 않습니다. 폭 대신 <strong>사용자가 운영체제에
          설정한 값</strong>을 묻는다는 차이만 있습니다. 그래서 <code>conditions</code> 객체 안에 <code>isDesktop</code>과 나란히 놓을 수
          있고, 03단계의 공식 예제도 정확히 그렇게 했습니다.
        </p>
        <p>
          이 학습 사이트의 다른 예제들이 모션 감소 설정에서 다르게 동작하는 것도 같은 질문에 답한 결과입니다. 다만 그쪽은 React 훅으로
          같은 media query를 읽어 실행값을 바꾸고, 이 페이지는 GSAP에게 그 판단과 정리를 함께 맡깁니다.
        </p>
      </div>

      <div className="responsive-page__subheading">
        <h3>운영체제 설정은 우리가 바꿀 수 없습니다</h3>
        <p>
          그래서 많은 사이트가 자체 "모션 줄이기" 토글을 둡니다. 문제는 그 토글이 media query가 아니라는 것입니다. 값이 바뀌어도 조건은
          토글되지 않으니 handler가 다시 실행되지 않습니다. <code>gsap.matchMediaRefresh()</code>가 그 자리를 메웁니다.
        </p>
      </div>

      <div className="responsive-page__table-wrap">
        <table className="responsive-page__table">
          <caption>gsap.matchMediaRefresh() — 공식 페이지가 밝힌 전부</caption>
          <thead>
            <tr>
              <th scope="col">항목</th>
              <th scope="col">공식 문서</th>
            </tr>
          </thead>
          <tbody>
            {refreshFacts.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.body}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">인자 · 반환값 · 시그니처</th>
              <td>공식 페이지에 명시 없음 — parameter 표도, Returns 줄도, 시그니처 줄도 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ReduceMotionRefreshLab />
    </section>
  )
}
