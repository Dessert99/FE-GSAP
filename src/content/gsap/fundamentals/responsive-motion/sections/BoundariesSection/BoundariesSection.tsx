/** 두 공식 페이지가 게시하지 않은 범위와 다른 페이지가 소유한 개념을 명시해 추측을 막는다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 두 canonical이 실제로 게시하지 않은 항목 — 이 페이지가 답을 주지 않는다고 밝히는 자리다
const unpublished = [
  'gsap.matchMedia()와 gsap.matchMediaRefresh()의 형식 시그니처 줄 — 두 페이지 모두 시그니처 표기가 없다',
  'add()의 반환값과 add() 호출 시점의 첫 실행 여부',
  'MatchMedia가 가진 멤버 목록 — revert()와 add()를 문장 안에서 쓰기만 한다',
  'mm.kill()과 mm.revert(config)의 차이, config에 무엇을 넣는지',
  '조건이 여러 개 동시에 토글될 때 handler가 몇 번 실행되는지',
]

// 공식 페이지의 데모가 코드로 제공되지 않는다는 사실 — 대조 범위를 정직하게 밝힌다
const demoNote =
  '공식 matchMedia 페이지의 데모 셋(Demo using conditional syntax, simple demo, checkbox toggle)과 Examples는 CodePen 임베드라 본문에 코드가 없습니다. Examples는 CodePen Collection 링크만 제공합니다. 그래서 이 페이지의 대조 근거는 본문 문장과 본문 코드 블록으로 한정했습니다.'

// 이 페이지가 전제로만 쓰고 설명 소유권은 다른 페이지에 있는 개념들
const otherOwners = [
  { label: 'duration·rotation 같은 tween 설정이 어디서 오는지', href: '/fundamentals/tween-configuration' },
  { label: 'gsap.to()의 vars 전체 명세', href: '/fundamentals/gsap-to' },
  { label: 'transform과 CSS property를 GSAP이 다루는 방식', href: '/fundamentals/css-animation' },
]

// 아직 라우팅에 등록되지 않아 링크 대신 이름만 남기는 선행·후속 개념들
const upcoming = [
  'gsap.context() 자체의 생성·기록·revert 명세 — 이 페이지는 "matchMedia가 내부적으로 만든다"는 공식 문장까지만 다룬다',
  'React의 useGSAP() 생명주기 — 이 페이지의 예제는 그 훅을 쓰지만 명세는 소유하지 않는다',
  'ScrollTrigger.matchMedia()와 ScrollTrigger.clearMatchMedia() — 플러그인 쪽 legacy API',
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="responsive-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="07"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="공식 문서가 적어 두지 않은 것을 추측해 채우지 않았습니다. 무엇을 모르는지 아는 것도 학습의 일부입니다."
      />

      <div className="responsive-page__split">
        <div>
          <div className="responsive-page__subheading">
            <h3>공식 페이지에 게시되지 않은 것</h3>
            <p>아래 항목 중 일부는 직접 실행해 확인했고, 그렇다고 표시해 두었습니다. 나머지는 확인하지 않았습니다.</p>
          </div>
          <ul className="responsive-page__list">
            {unpublished.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="responsive-page__subheading">
            <h3>다른 페이지가 소유한 개념</h3>
            <p>이 페이지는 아래 내용을 전제로만 사용했습니다.</p>
          </div>
          <ul className="responsive-page__list">
            {otherOwners.map((owner) => (
              <li key={owner.href}>
                <a href={toHref(owner.href)}>{owner.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="responsive-page__subheading">
        <h3>아직 별도 페이지가 없는 이웃 개념</h3>
        <p>이 페이지가 경계를 밝히기만 하고 설명을 소유하지 않는 것들입니다.</p>
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
