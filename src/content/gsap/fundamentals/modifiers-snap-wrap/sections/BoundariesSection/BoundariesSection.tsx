/** 다섯 공식 문서가 게시하지 않은 범위와 다른 페이지가 소유한 개념을 명시해 추측을 막는다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 다섯 canonical이 실제로 게시하지 않은 항목
const unpublished = [
  'modifier 함수가 돌려줘야 하는 값의 타입과 잘못된 반환의 처리',
  'radius 밖의 값이 어떻게 되는지 (실행으로 확인해 따로 표기했다)',
  'wrap과 wrapYoyo의 최댓값 처리 차이 (실행으로 확인해 따로 표기했다)',
  'SnapPlugin의 snap vars와 gsap.utils.snap()의 차이에 대한 공식 비교',
]

// 이 페이지가 전제로만 쓰고 설명 소유권은 다른 페이지에 있는 개념들
const otherOwners = [
  { label: 'gsap.to()의 vars와 target 전체 명세', href: '/fundamentals/gsap-to' },
  { label: 'CSS 값과 transform 처리', href: '/fundamentals/css-animation' },
  { label: 'attr과 endArray 채널', href: '/fundamentals/non-css-target-values' },
  { label: 'utility 함수 전체 지도', href: '/fundamentals/gsap-utils' },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="msw-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="06"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="공식 문서가 적어 두지 않은 것을 추측해 채우지 않았습니다. 무엇을 모르는지 아는 것도 학습의 일부입니다."
      />

      <div className="msw-page__split">
        <div>
          <div className="msw-page__subheading">
            <h3>공식 페이지에 게시되지 않은 것</h3>
            <p>아래 항목은 다섯 문서에 없습니다.</p>
          </div>
          <ul className="msw-page__list">
            {unpublished.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="msw-page__subheading">
            <h3>다른 페이지가 소유한 개념</h3>
            <p>이 페이지는 아래 내용을 전제로만 사용했습니다.</p>
          </div>
          <ul className="msw-page__list">
            {otherOwners.map((owner) => (
              <li key={owner.href}>
                <a href={toHref(owner.href)}>{owner.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="msw-page__note">
        <p>
          <code>roundProps</code>는 <code>modifiers</code>와 같은 자리를 두고 다투는 옵션이라 02단계에서 제약으로만 언급했습니다.{' '}
          <code>roundProps</code> 자체의 명세는 <a href={toHref('/fundamentals/gsap-to')}>gsap.to() 페이지</a>가 소유합니다.
        </p>
      </div>
    </section>
  )
}
