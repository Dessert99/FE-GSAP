/** Tween이 저절로 움직이는 것처럼 보이는 이유를 분해해 시간의 구조와 시간의 동력을 구분해 준다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 한 frame이 만들어지는 순서 — 왼쪽에서 오른쪽으로 신호가 전달된다
const chain = [
  { label: '브라우저', detail: 'requestAnimationFrame으로 "이제 한 장 그릴 차례"라고 알린다' },
  { label: 'gsap.ticker', detail: '그 알림을 받아 GSAP 전체에 한 번의 tick을 돌린다' },
  { label: 'gsap.globalTimeline', detail: 'tick만큼 시간이 흘렀다고 보고 자식들의 재생 위치를 옮긴다' },
  { label: '내가 만든 Tween', detail: '옮겨진 위치에 해당하는 값을 계산해 화면에 쓴다' },
]

// 지금까지 한 번도 쓰지 않았던 코드 — 이 페이지가 열어 보이려는 자리다
const invisibleCode = `// 지금까지 쓴 코드는 이게 전부였습니다
gsap.to('.box', { x: 200, duration: 1 })

// 재생 버튼을 누른 적이 없습니다.
// setInterval도, requestAnimationFrame도 쓴 적이 없습니다.
// 그런데도 상자는 움직였습니다. 누가 움직였을까요?`

export function WhoDrivesSection() {
  return (
    <section id="who-drives" className="root-clock-page__section" aria-labelledby="who-drives-title">
      <SectionHeading
        number="01"
        id="who-drives"
        title="아무도 재생 버튼을 누르지 않았는데 움직였다"
        description="지금까지 만든 Tween은 만들자마자 스스로 움직였습니다. 이 페이지는 그 '스스로'의 정체를 두 개로 갈라 봅니다."
      />

      <div className="root-clock-page__split">
        <div className="root-clock-page__prose">
          <p>
            애니메이션은 <strong>정지 화면을 아주 빠르게 갈아 끼우는 것</strong>입니다. 브라우저는 초당 여러 번 "이제 한 장 그릴
            차례"라고 알려 주는데, 이 한 장을 <strong>frame</strong>이라고 부르고, 알려 주는 창구가{' '}
            <code>requestAnimationFrame</code>입니다.
          </p>
          <p>
            그러니 누군가는 매 frame마다 <strong>"지금 몇 초가 지났으니 상자를 여기로 옮겨라"</strong>를 계산해야 합니다. 우리가 그
            코드를 쓴 적이 없다면, GSAP 안에 그 일을 하는 것이 있다는 뜻입니다.
          </p>
          <p>
            그것은 하나가 아니라 <strong>둘</strong>입니다. 서로 다른 질문에 답하기 때문입니다.
          </p>
        </div>
        <pre className="root-clock-page__code">
          <code>{invisibleCode}</code>
        </pre>
      </div>

      <div className="root-clock-page__subheading">
        <h3>질문이 두 개다</h3>
        <p>이 둘을 섞으면 나머지 내용이 전부 헷갈립니다. 먼저 갈라 둡니다.</p>
      </div>

      <div className="root-clock-page__split">
        <div className="root-clock-page__note">
          <h3>시간의 구조 — gsap.globalTimeline</h3>
          <p>
            "지금 몇 초인가"를 <strong>보관하는</strong> 쪽입니다. 공식 문서는 이것을 <strong>GSAP의 모든 것을 구동하는 root
            Timeline instance</strong>라고 정의하고, 그래서 모든 animation을 한 번에 다룰 수 있는 강력한 수단이라고 설명합니다.
            우리가 만든 Tween은 전부 이것의 자식입니다.
          </p>
        </div>
        <div className="root-clock-page__note">
          <h3>시간의 동력 — gsap.ticker</h3>
          <p>
            "그 시간을 앞으로 <strong>밀어 주는</strong>" 쪽입니다. 공식 문서는 이것을 <strong>GSAP 엔진의 심장 박동</strong>에
            비유하며, 매 <code>requestAnimationFrame</code> event마다 globalTimeline을 갱신한다고 적습니다. 시계를 들고 있는 쪽과
            시계 태엽을 감는 쪽이 다른 셈입니다.
          </p>
        </div>
      </div>

      <div className="root-clock-page__subheading">
        <h3>한 frame이 만들어지는 순서</h3>
        <p>왼쪽에서 오른쪽으로 한 번 흐르면 화면이 한 장 갱신됩니다. 이 흐름이 초당 수십 번 반복됩니다.</p>
      </div>

      <ol className="root-clock-page__chain">
        {chain.map((step) => (
          <li key={step.label}>
            <strong>{step.label}</strong>
            <span>{step.detail}</span>
          </li>
        ))}
      </ol>

      <div className="root-clock-page__note">
        <h3>초당 몇 번인가는 정해져 있지 않다</h3>
        <p>
          공식 문서는 <code>requestAnimationFrame</code> event가 <strong>보통 초당 60번쯤</strong> 일어난다고 적으면서, 이는{' '}
          <strong>브라우저에 달렸고 시스템 성능에도 좌우된다</strong>고 덧붙입니다. 일부 최신 기기는 <strong>120hz</strong>로
          갱신합니다.
        </p>
        <p>
          그래서 <strong>"한 frame = 16.6ms"라고 코드에 박아 두면 안 됩니다.</strong> 뒤에서 볼 <code>deltaTime</code>과{' '}
          <code>deltaRatio()</code>가 바로 이 문제를 위해 존재합니다.
        </p>
      </div>

      <div className="root-clock-page__note">
        <h3>rAF가 없으면 어떻게 되나</h3>
        <p>
          공식 문서는 <code>requestAnimationFrame</code>이 지원되지 않으면 ticker가 <strong>자동으로 일반 setTimeout() loop로
          되돌아간다</strong>고 밝힙니다. 우리가 분기를 쓸 필요는 없다는 뜻입니다.
        </p>
      </div>
    </section>
  )
}
