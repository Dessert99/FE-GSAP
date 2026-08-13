/** 다섯 공식 페이지가 게시하지 않은 범위와 다음 학습 경로를 명시해 추측을 막는다. */
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

// 이 페이지에서 전제로만 쓴 개념을 더 자세히 설명하는 다음 학습 페이지들
const nextTopics = [
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
        title="공식 문서가 밝히지 않은 경계"
        description="아래 세부 동작은 다섯 공식 문서만으로 확정할 수 없습니다. 예제에서 관찰한 값도 공식 계약처럼 일반화하지 않습니다."
      />

      <div className="repeats-page__split">
        <div>
          <div className="repeats-page__subheading">
            <h3>공식 페이지에 게시되지 않은 것</h3>
            <p>
              다섯 페이지 모두 짧은 메서드 문서입니다. 아래 항목은 공식 설명에 없으며 버전별 실행 결과와 구분해서 봐야 합니다.
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
            <h3>다음에 이어서 볼 개념</h3>
            <p>이 페이지에서 짧게 사용한 개념을 더 자세히 확인할 수 있습니다.</p>
          </div>
          <ul className="repeats-page__list">
            {nextTopics.map((topic) => (
              <li key={topic.href}>
                <a href={toHref(topic.href)}>{topic.label}</a>
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
