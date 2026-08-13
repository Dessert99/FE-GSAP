/** 여섯 공식 페이지가 게시하지 않은 범위와 다른 페이지에서 설명하는 개념을 명시해 추측을 막는다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 여섯 canonical이 실제로 게시하지 않은 항목 — 이 페이지가 답을 주지 않는다고 밝히는 자리다
const unpublished = [
  'getById() · getTweensOf() · isTweening() · killTweensOf()의 signature와 Parameters 절 — 네 페이지 모두 없다',
  'id로 쓸 수 있는 값의 타입과, 같은 id를 둘 이상에 붙였을 때의 규칙',
  'kill()이나 revert() 뒤에 조회 API가 무엇을 돌려주는지',
  'revert()가 DOM이 아닌 일반 object의 값을 어디까지 되돌리는지',
  'garbage collection이 정확히 몇 프레임 뒤에 일어나는지',
]

// 이 페이지가 전제로만 쓰고 자세한 설명은 다른 페이지에 있는 개념들
const otherOwners = [
  { label: 'Tween을 만드는 방법과 vars 전체 명세 (id도 vars의 한 자리다)', href: '/fundamentals/gsap-to' },
  { label: 'progress() · pause() · restart() 같은 재생 헤드 조작', href: '/fundamentals/tween-playhead' },
  { label: '설정이 어디서 와서 어디까지 적용되는지', href: '/fundamentals/tween-configuration' },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="find-stop-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="06"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="공식 문서가 적어 두지 않은 것을 추측해 채우지 않았습니다. 무엇을 모르는지 아는 것도 학습의 일부입니다."
      />

      <div className="find-stop-page__split">
        <div>
          <div className="find-stop-page__subheading">
            <h3>공식 페이지에 게시되지 않은 것</h3>
            <p>아래 항목 중 학습에 꼭 필요한 것은 직접 실행해 확인했고, 그렇다고 표시해 두었습니다.</p>
          </div>
          <ul className="find-stop-page__list">
            {unpublished.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="find-stop-page__subheading">
            <h3>다른 페이지에서 설명하는 개념</h3>
            <p>이 페이지는 아래 내용을 전제로만 사용했습니다.</p>
          </div>
          <ul className="find-stop-page__list">
            {otherOwners.map((owner) => (
              <li key={owner.href}>
                <a href={toHref(owner.href)}>{owner.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="find-stop-page__note">
        <p>
          Timeline에도 같은 이름의 <code>kill()</code>과 <code>revert()</code>가 있고, <code>gsap.getById()</code>는 Timeline도
          돌려줍니다. 이 페이지가 담당하는 공식 문서는 <strong>Tween 쪽 두 페이지와 gsap 전역 메서드 네 개</strong>뿐이라, Timeline의
          하위 animation 정리 규칙은 Timeline 학습 페이지가 따로 다룹니다.
        </p>
        <p>
          React에서 <code>useGSAP()</code>가 컴포넌트 정리 시점에 자동으로 되돌려 주는 범위도 이 페이지의 여섯 문서에는 없습니다. 이
          페이지의 예제들도 그 자동 정리를 쓰고 있지만, 자세한 계약은 React 통합 문서에서 설명합니다.
        </p>
      </div>
    </section>
  )
}
