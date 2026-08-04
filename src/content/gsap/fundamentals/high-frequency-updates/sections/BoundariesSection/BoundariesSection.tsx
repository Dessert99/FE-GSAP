/** 세 공식 페이지가 게시하지 않은 범위와 다른 페이지가 소유한 개념을 명시해 추측을 막는다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 세 canonical이 실제로 게시하지 않은 항목 — 이 페이지가 답을 주지 않는다고 밝히는 자리다
const unpublished = [
  'formal signature 블록, 인자 표, 기본값 표 — 세 페이지 모두 없습니다. 반환 표기(Returns : * / Function)만 있습니다.',
  '"50% - 250%"라는 수치를 어떤 환경에서 어떻게 쟀는지',
  'quickSetter가 돌려준 함수의 반환값',
  'quickTo가 돌려준 함수의 3번째 인자',
  'quickTo의 duration 하한과 duration: 0일 때의 동작',
  'DOM element가 아닌 일반 객체를 target으로 넘겼을 때의 getProperty unit·null 동작',
  '브라우저·버전 지원 표',
  'quickSetter·quickTo를 만든 뒤 되돌리거나 정리하는 방법',
]

// 이 페이지가 전제로만 쓰고 설명 소유권은 다른 페이지에 있는 개념들
const otherOwners = [
  { label: 'gsap.to()의 target과 vars 전체', href: '/fundamentals/gsap-to' },
  { label: 'transform 이름 규칙과 CSS 값 처리', href: '/fundamentals/css-animation' },
  { label: 'attribute 채널과 attr 객체', href: '/fundamentals/non-css-target-values' },
  { label: 'ease 곡선의 의미와 power3의 모양', href: '/fundamentals/easing' },
  { label: 'Tween 인스턴스의 메서드와 재생 헤드', href: '/fundamentals/tween-playhead' },
  { label: 'vars 기본값이 어디서 오는지', href: '/fundamentals/tween-configuration' },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="hfu-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="07"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="공식 문서가 적어 두지 않은 것을 추측해 채우지 않았습니다. 무엇을 모르는지 아는 것도 학습의 일부입니다."
      />

      <div className="hfu-page__split">
        <div>
          <div className="hfu-page__subheading">
            <h3>공식 페이지에 게시되지 않은 것</h3>
            <p>세 문서 모두 산문 위주로 짧습니다. 아래 항목은 문서에 아예 없습니다.</p>
          </div>
          <ul className="hfu-page__list">
            {unpublished.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="hfu-page__subheading">
            <h3>다른 페이지가 소유한 개념</h3>
            <p>이 페이지는 아래 내용을 전제로만 사용했습니다.</p>
          </div>
          <ul className="hfu-page__list">
            {otherOwners.map((owner) => (
              <li key={owner.href}>
                <a href={toHref(owner.href)}>{owner.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="hfu-page__note">
        <code>gsap.utils.pipe()</code>, <code>clamp()</code>, <code>snap()</code>과 <code>gsap.ticker</code>는 아직 이 학습 사이트에
        전용 페이지가 없습니다. 06단계는 세 공식 페이지가 게시한 범위 — <strong>맨 뒤에 붙일 수 있다</strong> — 까지만 설명하고, 각
        utility의 계약 자체는 주장하지 않습니다.
      </p>

      <p className="hfu-page__note">
        마지막으로 한 번 더 짚습니다. 이 페이지의 도구들은 <strong>먼저 쓸 도구가 아닙니다.</strong> 공식 문서가 note로 적어 둔 대로{' '}
        <code>gsap.set()</code>과 <a href={toHref('/fundamentals/gsap-to')}>gsap.to()</a>로 시작하고,{' '}
        <strong>입력이 실제로 초당 수십 번 들어오는 자리에서만</strong> 이쪽으로 옮기세요.
      </p>
    </section>
  )
}
