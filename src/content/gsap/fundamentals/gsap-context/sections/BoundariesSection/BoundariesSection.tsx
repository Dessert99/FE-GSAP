/** 두 공식 페이지가 게시하지 않은 범위와 다른 페이지가 소유한 개념을 명시해 추측을 막는다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 두 canonical이 실제로 게시하지 않은 항목 — 이 페이지가 답을 주지 않는다고 밝히는 자리다
const unpublished = [
  'gsap.context()의 signature·인자 타입·기본값·반환 타입 — 형식 명세 절 자체가 없다',
  'revert()와 kill()의 차이, kill()이 받는 인자',
  'Context 객체가 가진 속성과 메서드의 목록 (data, isReverted, getTweens 등)',
  'revert()에 넘길 수 있다고 타입 선언에만 적혀 있는 config 객체의 내용',
  'gsap.utils.selector()에서 scope를 생략했을 때의 기본 범위',
]

// 이 페이지가 전제로만 쓰고 설명 소유권은 다른 페이지에 있는 개념들
const otherOwners = [
  { label: 'Tween을 만드는 방법과 target·vars 전체 명세', href: '/fundamentals/gsap-to' },
  { label: '만든 Tween을 재생·정지·seek하는 방법', href: '/fundamentals/tween-playhead' },
  { label: '설정이 어디서 와서 어디까지 적용되는지', href: '/fundamentals/tween-configuration' },
  { label: 'React에서 정리를 대신해 주는 useGSAP() 훅', href: '/fundamentals/react-use-gsap' },
  { label: '화면 조건에 따라 다시 만들기 (gsap.matchMedia())', href: '/fundamentals/responsive-motion' },
]

// 아직 학습 페이지가 열리지 않아 링크 대신 이름으로만 경계를 밝히는 개념들
const upcoming = [
  {
    label: '여러 애니메이션의 순서 제어 (Timeline)',
    note: '공식이 "제어는 Timeline이 할 일"이라고 못 박은 영역입니다. 이 페이지는 그 경계만 밝히고 Timeline 자체는 다루지 않습니다.',
  },
  {
    label: 'ScrollTrigger',
    note: 'Context가 Tween과 함께 기록하는 대상이라 이름만 나옵니다. 플러그인 자체는 별도 학습 페이지가 소유합니다.',
  },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="context-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="06"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="공식 문서가 적어 두지 않은 것을 추측해 채우지 않았습니다. 무엇을 모르는지 아는 것도 학습의 일부입니다."
      />

      <div className="context-page__split">
        <div>
          <div className="context-page__subheading">
            <h3>공식 페이지에 게시되지 않은 것</h3>
            <p>
              아래 항목은 두 문서에 없습니다. 그중 학습에 꼭 필요한 것만 직접 실행해 확인했고, 그렇다고 표시해 두었습니다.
            </p>
          </div>
          <ul className="context-page__list">
            {unpublished.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="context-page__subheading">
            <h3>다른 페이지가 소유한 개념</h3>
            <p>이 페이지는 아래 내용을 전제로만 사용했습니다.</p>
          </div>
          <ul className="context-page__list">
            {otherOwners.map((owner) => (
              <li key={owner.href}>
                <a href={toHref(owner.href)}>{owner.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="context-page__subheading">
        <h3>아직 학습 페이지가 없는 인접 개념</h3>
        <p>이 페이지에서 이름만 나오고 설명은 하지 않은 것들입니다. 링크할 페이지가 아직 없어 이름으로만 남깁니다.</p>
      </div>

      <div className="context-page__table-wrap">
        <table className="context-page__table">
          <caption>경계와 그 이유</caption>
          <thead>
            <tr>
              <th scope="col">개념</th>
              <th scope="col">왜 여기서 다루지 않나</th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map((item) => (
              <tr key={item.label}>
                <th scope="row">{item.label}</th>
                <td>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="context-page__note">
        <p>
          <code>gsap.utils.selector()</code>는 GSAP의 여러 utility method 중 하나입니다. 이 페이지는 그중{' '}
          <strong>범위 지정</strong>이라는 역할만, Context의 scope와 이어지는 만큼만 소유합니다. 나머지 utility method의 명세는
          각자의 학습 페이지가 소유합니다.
        </p>
      </div>
    </section>
  )
}
