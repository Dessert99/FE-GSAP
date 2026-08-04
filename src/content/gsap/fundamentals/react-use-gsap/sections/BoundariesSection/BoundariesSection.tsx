/** 공식 자료가 게시하지 않은 범위와 다른 페이지가 소유한 개념을 명시해 추측을 막는다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 React 자료가 실제로 게시하지 않은 항목
const unpublished = [
  'useGSAP()이 요구하는 GSAP 또는 @gsap/react의 최소 버전',
  'gsap.registerPlugin(useGSAP) 호출이 필수인지 여부 — 예제에 등장할 뿐 명시가 없다',
  'scope 옵션의 기본값',
  '훅이 돌려주는 객체에 contextSafe 말고 무엇이 더 있는지',
]

// 이 페이지가 전제로만 쓰고 설명 소유권은 다른 페이지에 있는 개념들
const otherOwners = [
  { label: 'gsap.context()의 범위 지정과 revert', href: '/fundamentals/gsap-context' },
  { label: 'gsap.to()의 target과 vars 전체', href: '/fundamentals/gsap-to' },
  { label: '조건별 animation과 reduced-motion 처리', href: '/fundamentals/responsive-motion' },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="react-gsap-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="06"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="공식 자료가 적어 두지 않은 것을 추측해 채우지 않았습니다. 무엇을 모르는지 아는 것도 학습의 일부입니다."
      />

      <div className="react-gsap-page__split">
        <div>
          <div className="react-gsap-page__subheading">
            <h3>공식 자료에 게시되지 않은 것</h3>
            <p>아래 항목은 공식 React 자료에 없습니다.</p>
          </div>
          <ul className="react-gsap-page__list">
            {unpublished.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="react-gsap-page__subheading">
            <h3>다른 페이지가 소유한 개념</h3>
            <p>이 페이지는 아래 내용을 전제로만 사용했습니다.</p>
          </div>
          <ul className="react-gsap-page__list">
            {otherOwners.map((owner) => (
              <li key={owner.href}>
                <a href={toHref(owner.href)}>{owner.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="react-gsap-page__note">
        <p>
          공식 자료에는 starter template과 새 React 앱 만들기 안내도 있지만, 이 학습 사이트는 이미 만들어진 프로젝트라 그 절차는 옮기지
          않았습니다. 대신 이 사이트의 예제 코드 자체가 <code>useGSAP()</code>의 실제 사용 예입니다. 각 예제 아래의{' '}
          <strong>실행 코드 위치</strong>를 따라가면 <code>scope</code>·<code>dependencies</code>·<code>revertOnUpdate</code>가 함께
          쓰인 훅을 볼 수 있습니다.
        </p>
      </div>
    </section>
  )
}
