/** 두 공식 페이지가 게시하지 않은 범위와 다음 학습 경로를 명시해 추측을 막는다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 두 canonical이 실제로 게시하지 않은 항목 — 이 페이지가 답을 주지 않는다고 밝히는 자리다
const unpublished = [
  'gsap.matchMedia()와 gsap.matchMediaRefresh()의 형식 시그니처 줄 — 두 페이지 모두 시그니처 표기가 없다',
  'add() 세 인자의 기본값과 반환값',
  'mm.kill()과 mm.revert(config)의 차이, config에 무엇을 넣는지',
  '조건이 여러 개 동시에 토글될 때 handler가 몇 번 실행되는지',
]

// 공식 페이지의 데모가 코드로 제공되지 않는다는 사실 — 대조 범위를 정직하게 밝힌다
const demoNote =
  '공식 matchMedia 페이지의 데모 셋(Demo using conditional syntax, simple demo, checkbox toggle)과 Examples는 CodePen 임베드라 본문에 코드가 없습니다. Examples는 CodePen Collection 링크만 제공합니다. 그래서 이 페이지의 대조 근거는 본문 문장과 본문 코드 블록으로 한정했습니다.'

// 이 페이지에서 전제로만 쓴 개념을 더 자세히 설명하는 다음 학습 경로다
const nextTopics = [
  { label: 'duration·rotation 같은 tween 설정이 어디서 오는지', href: '/fundamentals/tween-configuration' },
  { label: 'gsap.to()의 vars 전체 명세', href: '/fundamentals/gsap-to' },
  { label: 'transform과 CSS property를 GSAP이 다루는 방식', href: '/fundamentals/css-animation' },
]

// 아직 라우팅에 등록되지 않아 링크 대신 이름만 남기는 선행·후속 개념들
const upcoming = [
  'gsap.context() 자체의 생성·기록·revert 명세 — 이 페이지는 "matchMedia가 내부적으로 만든다"는 공식 문장까지만 다룬다',
  'React의 useGSAP() 생명주기 — 이 페이지의 예제는 그 훅을 쓰지만 여기서는 자세히 설명하지 않는다',
  'ScrollTrigger.matchMedia()와 ScrollTrigger.clearMatchMedia() — 플러그인 쪽 legacy API',
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="responsive-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="07"
        id="boundaries"
        title="공식 문서가 밝히지 않은 경계"
        description="공식 문서가 적어 두지 않은 것을 추측해 채우지 않았습니다. 무엇을 모르는지 아는 것도 학습의 일부입니다."
      />

      <div className="responsive-page__split">
        <div>
          <div className="responsive-page__subheading">
            <h3>공식 페이지에 게시되지 않은 것</h3>
            <p>아래 세부 동작은 두 공식 페이지의 본문만으로 확정할 수 없습니다.</p>
          </div>
          <ul className="responsive-page__list">
            {unpublished.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="responsive-page__subheading">
            <h3>다음에 이어서 볼 개념</h3>
            <p>아래 내용은 연결된 페이지에서 더 자세히 확인할 수 있습니다.</p>
          </div>
          <ul className="responsive-page__list">
            {nextTopics.map((topic) => (
              <li key={topic.href}>
                <a href={toHref(topic.href)}>{topic.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="responsive-page__subheading">
        <h3>아직 별도 페이지가 없는 이웃 개념</h3>
        <p>여기서는 관계만 밝히고 자세한 사용법은 다루지 않습니다.</p>
      </div>
      <ul className="responsive-page__list">
        {upcoming.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="responsive-page__note">
        <p>{demoNote}</p>
      </div>
    </section>
  )
}
