/** ticker를 떼어 내고 외부 loop가 root 시간을 직접 주는 updateRoot()의 용도와 순서를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 updateRoot 페이지의 두 코드 블록 원문
const unhookExample = `//unhooks the GSAP ticker
gsap.ticker.remove(gsap.updateRoot);`

const updateExample = `//sets the root time to 20 seconds manually
gsap.updateRoot(20);`

// 01단계에서 본 흐름과 무엇이 달라지는지 한 줄로 대조한다
const chainCompare = [
  { label: '기본', detail: '브라우저 rAF → gsap.ticker → gsap.globalTimeline → 내 Tween' },
  { label: 'updateRoot', detail: '내 게임 loop → gsap.updateRoot(시간) → gsap.globalTimeline → 내 Tween' },
]

export function UpdateRootSection() {
  return (
    <section id="update-root" className="root-clock-page__section" aria-labelledby="update-root-title">
      <SectionHeading
        number="06"
        id="update-root"
        title="시간을 밖에서 직접 준다"
        description="지금까지는 GSAP이 스스로 시간을 밀었습니다. 이미 자기 render loop를 가진 프로그램이라면 그 역할을 가져올 수 있습니다."
      />

      <div className="root-clock-page__prose">
        <p>
          공식 문서의 첫 문장이 배경을 그대로 말합니다 — 보통 GSAP은 <code>requestAnimationFrame</code> loop로{' '}
          <strong>모든 timing을 내부에서 처리</strong>하며(rAF를 쓸 수 없으면 <code>setTimeout()</code>으로 되돌아갑니다),{' '}
          <strong>일부 게임 개발자가 root(global) timeline을 수동으로 갱신할 방법을 요청했고</strong>{' '}
          <code>gsap.updateRoot()</code>가 정확히 그것을 허용합니다.
        </p>
        <p>
          게임 엔진이나 WebGL 렌더러는 대개 자기 loop를 이미 돌리고 있습니다. 그런 곳에서는 GSAP이 <strong>따로 또 하나의 시계를
          돌리는 것</strong>이 오히려 문제입니다. 두 시계가 아주 조금씩 어긋나기 때문입니다.
        </p>
      </div>

      <div className="root-clock-page__warning">
        <h3>공식이 붙인 단 한 줄의 조건</h3>
        <p>
          <strong>이것은 오직 고급(advanced) 사용자만을 위한 것입니다.</strong> 공식 문서가 직접 적어 둔 문장입니다. 자기 loop가
          이미 없다면 이 기능은 필요하지 않습니다.
        </p>
      </div>

      <ul className="root-clock-page__compare">
        {chainCompare.map((row) => (
          <li key={row.label}>
            <strong>{row.label}</strong>
            <span>{row.detail}</span>
          </li>
        ))}
      </ul>

      <div className="root-clock-page__subheading">
        <h3>순서가 정해져 있다</h3>
        <p>공식 문서는 두 단계로 나눠 설명합니다. 순서를 바꾸면 두 시계가 동시에 돌게 됩니다.</p>
      </div>

      <div className="root-clock-page__split">
        <div className="root-clock-page__prose">
          <p>
            <strong>먼저</strong> GSAP의 ticker를 떼어냅니다. 03단계에서 본 <code>gsap.ticker.remove()</code>를 그대로 쓰는데,
            떼어내는 대상이 <strong>내 함수가 아니라 GSAP 자신의 갱신 함수</strong>라는 점이 다릅니다.
          </p>
        </div>
        <pre className="root-clock-page__code">
          <code>{unhookExample}</code>
        </pre>
      </div>

      <div className="root-clock-page__split">
        <div className="root-clock-page__prose">
          <p>
            <strong>그다음</strong> 자신의 custom 시간으로 갱신합니다. 공식 주석은 이 호출이 <strong>root 시간을 수동으로 20초로
            설정한다</strong>고 적습니다.
          </p>
        </div>
        <pre className="root-clock-page__code">
          <code>{updateExample}</code>
        </pre>
      </div>

      <div className="root-clock-page__note root-clock-page__note--probe">
        <h3>실행으로 확인한 세 가지</h3>
        <p>
          공식 페이지에는 <strong>시그니처도, Parameters 절도, Returns 줄도 없습니다.</strong> 그래서 인자의 의미를 실행으로
          확인했습니다.
        </p>
        <p>
          첫째, <code>gsap.updateRoot(t)</code>의 <code>t</code>는 <strong>누적 증가분이 아니라 root의 절대 시간</strong>입니다.
          root 시간 0.5초에 만든 tween에 <code>gsap.updateRoot(4.25)</code>를 부르자 그 tween의 <code>time()</code>이{' '}
          <strong>3.7495</strong>가 되었습니다. 4.25에서 시작 시각 0.5를 뺀 값입니다. 그래서 매 frame 호출할 때는{' '}
          <strong>"이번 delta"가 아니라 "지금까지 누적한 총 시간"</strong>을 넘겨야 합니다.
        </p>
        <p>
          둘째, 반환값은 <strong>undefined</strong>입니다. 셋째, ticker에서 <code>gsap.updateRoot</code>를 떼어낸 뒤에는 wall clock{' '}
          <strong>300ms 동안 tween의 time()이 0.0000에서 전혀 움직이지 않았습니다.</strong> 떼어내는 순간 GSAP은 정말로 멈추고, 이후
          시간은 전적으로 내가 줘야 합니다.
        </p>
        <p className="root-clock-page__provenance">
          측정 방법 · <code>gsap.ticker.remove(gsap.updateRoot)</code> 뒤 10초짜리 tween을 만들고 300ms 대기하며{' '}
          <code>tween.time()</code>을 출력, 이어서 <code>gsap.updateRoot(globalTimeline.time() + 4)</code> 호출 후 같은 값을 출력.
          재현 조건 · gsap 3.15.0, Node 22 단독 실행.
        </p>
      </div>

      <div className="root-clock-page__warning">
        <h3>떼어내면 전부 멈춘다</h3>
        <p>
          <code>gsap.ticker.remove(gsap.updateRoot)</code>는 <strong>앱 전체의 GSAP을 멈추는 한 줄</strong>입니다. 이 페이지의 다른
          예제, 다른 화면의 animation, 예약해 둔 <code>delayedCall</code>이 전부 함께 멈춥니다.
        </p>
        <p>
          그래서 이 절에는 <strong>실행 예제를 두지 않았습니다.</strong> 학습 페이지 안에서 이 줄을 실행하면 되돌리기 전까지 페이지가
          통째로 얼어붙고, 그 사이 사용자가 다른 곳으로 이동하면 복구할 기회 자체가 사라집니다. 다시 <code>gsap.ticker.add(gsap.updateRoot)</code>로
          되돌릴 수는 있지만, 학습 화면에서 감수할 위험이 아닙니다.
        </p>
      </div>
    </section>
  )
}
