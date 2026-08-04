/** 두 공식 페이지가 게시하지 않은 범위와 다른 페이지가 소유한 개념을 명시해 추측을 막는다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 두 canonical이 실제로 게시하지 않은 항목 — 이 페이지가 답을 주지 않는다고 밝히는 자리다
const unpublished = [
  'getter가 등록된 콜백이 없을 때 무엇을 돌려주는지',
  'then()이 돌려주는 Promise가 무엇으로 resolve되는지',
  '완료되지 않는 Tween의 Promise가 어떻게 되는지',
  'eventCallback()이 받는 type의 전체 목록 — 공식 페이지는 예시만 나열한다',
]

// 이 페이지가 전제로만 쓰고 설명 소유권은 다른 페이지에 있는 개념들
const otherOwners = [
  { label: '각 콜백이 정확히 언제 불리는지와 vars 전체 명세', href: '/fundamentals/gsap-to' },
  { label: 'Tween을 재생·정지·재시작하는 방법', href: '/fundamentals/tween-playhead' },
  { label: '설정이 어디서 와서 어디까지 적용되는지', href: '/fundamentals/tween-configuration' },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="callbacks-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="05"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="공식 문서가 적어 두지 않은 것을 추측해 채우지 않았습니다. 무엇을 모르는지 아는 것도 학습의 일부입니다."
      />

      <div className="callbacks-page__split">
        <div>
          <div className="callbacks-page__subheading">
            <h3>공식 페이지에 게시되지 않은 것</h3>
            <p>아래 항목은 두 문서에 없어서 직접 실행해 확인했고, 그렇다고 표시해 두었습니다.</p>
          </div>
          <ul className="callbacks-page__list">
            {unpublished.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="callbacks-page__subheading">
            <h3>다른 페이지가 소유한 개념</h3>
            <p>이 페이지는 아래 내용을 전제로만 사용했습니다.</p>
          </div>
          <ul className="callbacks-page__list">
            {otherOwners.map((owner) => (
              <li key={owner.href}>
                <a href={toHref(owner.href)}>{owner.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="callbacks-page__note">
        <p>
          Timeline에도 같은 이름의 <code>eventCallback()</code>과 <code>then()</code>이 있습니다. 이 페이지가 담당하는 공식 문서는{' '}
          Tween 쪽 두 페이지뿐이라, Timeline 쪽 명세는 Timeline 학습 페이지가 따로 다룹니다.
        </p>
      </div>
    </section>
  )
}
