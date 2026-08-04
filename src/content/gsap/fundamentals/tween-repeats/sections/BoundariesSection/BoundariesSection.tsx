/** 다섯 공식 페이지가 게시하지 않은 범위와 다른 페이지가 소유한 개념을 명시해 추측을 막는다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 다섯 canonical이 실제로 게시하지 않은 항목 — 이 페이지가 답을 주지 않는다고 밝히는 자리다
const unpublished = [
  'repeat·repeatDelay·yoyo가 전체 시간(totalDuration)을 어떻게 만드는지에 관한 공식 계산식',
  'repeat: -1일 때 totalDuration()과 totalProgress()가 무엇이 되는지',
  '회차 경계 시각이 앞 회차와 뒤 회차 중 어느 쪽에 속하는지',
  'repeatDelay 구간 동안 iteration()과 대상 값이 어떻게 되는지',
  'iteration()에 범위를 벗어난 값을 넘겼을 때의 처리',
  'iteration() setter의 인자 이름·타입·기본값 (signature에 괄호가 비어 있음)',
  '음수 duration, 소수 repeat 같은 잘못된 입력의 처리',
]

// 이 페이지가 전제로만 쓰고 설명 소유권은 다른 페이지에 있는 개념들
const otherOwners = [
  { label: 'gsap.to()의 target·vars와 repeatRefresh 값 계약', href: '/fundamentals/gsap-to' },
  { label: 'vars·defaults·config의 적용 범위', href: '/fundamentals/tween-configuration' },
  { label: 'progress()·totalProgress()와 재생 헤드', href: '/fundamentals/tween-playhead' },
  { label: '시작값과 끝값을 적는 여러 방법', href: '/fundamentals/tween-start-end-values' },
  { label: 'ease 곡선의 의미', href: '/fundamentals/easing' },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="repeats-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="07"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="공식 문서가 적어 두지 않은 것을 추측해 채우지 않았습니다. 무엇을 모르는지 아는 것도 학습의 일부입니다."
      />

      <div className="repeats-page__split">
        <div>
          <div className="repeats-page__subheading">
            <h3>공식 페이지에 게시되지 않은 것</h3>
            <p>
              다섯 페이지 모두 짧은 메서드 문서입니다. 아래 항목은 문서에 없어, 앞 섹션에서 실행으로 확인한 것들은 그렇다고 따로 표시해
              두었습니다.
            </p>
          </div>
          <ul className="repeats-page__list">
            {unpublished.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="repeats-page__subheading">
            <h3>다른 페이지가 소유한 개념</h3>
            <p>이 페이지는 아래 내용을 전제로만 사용했습니다.</p>
          </div>
          <ul className="repeats-page__list">
            {otherOwners.map((owner) => (
              <li key={owner.href}>
                <a href={toHref(owner.href)}>{owner.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="repeats-page__note">
        Timeline의 반복과 <code>invalidate()</code>는 별도의 공식 페이지들이 따로 있어 이 페이지에 넣지 않았습니다. 여기서는{' '}
        <code>Tween.invalidate()</code> 문서가 밝힌 <strong>"timeline을 invalidate하면 children이 자동으로 모두 invalidate된다"</strong>는
        관계만 보존했습니다.
      </p>
    </section>
  )
}
