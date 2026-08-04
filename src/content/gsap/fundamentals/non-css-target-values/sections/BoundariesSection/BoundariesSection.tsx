/** 두 공식 페이지가 게시하지 않은 범위와 다른 페이지가 소유한 개념을 명시해 추측을 막는다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 두 canonical이 실제로 게시하지 않은 항목 — 이 페이지가 답을 주지 않는다고 밝히는 자리다
const unpublished = [
  'signature 블록, 인자 표, 기본값 표, 반환값 절 — 두 페이지 모두 없습니다.',
  '브라우저·버전 지원 표',
  '숫자가 아닌 attribute 값이나 배열 원소를 어떻게 다루는지',
  'sparse 배열, typed 배열, 중첩 배열의 처리',
]

// 이 페이지가 전제로만 쓰고 설명 소유권은 다른 페이지에 있는 개념들
const otherOwners = [
  { label: 'gsap.to()의 target과 vars 전체', href: '/fundamentals/gsap-to' },
  { label: 'CSS 값과 transform 처리', href: '/fundamentals/css-animation' },
  { label: 'ease 곡선의 의미', href: '/fundamentals/easing' },
  { label: 'progress()와 재생 헤드', href: '/fundamentals/tween-playhead' },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="non-css-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="05"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="공식 문서가 적어 두지 않은 것을 추측해 채우지 않았습니다. 무엇을 모르는지 아는 것도 학습의 일부입니다."
      />

      <div className="non-css-page__split">
        <div>
          <div className="non-css-page__subheading">
            <h3>공식 페이지에 게시되지 않은 것</h3>
            <p>Attributes와 EndArray 문서는 둘 다 짧습니다. 아래 항목은 문서에 아예 없습니다.</p>
          </div>
          <ul className="non-css-page__list">
            {unpublished.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="non-css-page__subheading">
            <h3>다른 페이지가 소유한 개념</h3>
            <p>이 페이지는 아래 내용을 전제로만 사용했습니다.</p>
          </div>
          <ul className="non-css-page__list">
            {otherOwners.map((owner) => (
              <li key={owner.href}>
                <a href={toHref(owner.href)}>{owner.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="non-css-page__note">
        일반 JavaScript object의 property를 animate하는 방법은 두 공식 페이지 어느 쪽도 다루지 않아 이 페이지에 넣지 않았습니다.
      </p>
    </section>
  )
}
