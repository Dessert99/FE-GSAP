/** 재생 제어 다음에 이어서 볼 관련 학습 페이지를 안내한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 시간 좌표·콜백·설정처럼 재생 제어와 함께 쓰이는 관련 학습 페이지들
const relatedLessons = [
  { label: 'Tween을 만드는 방법과 vars 전체 명세', href: '/fundamentals/gsap-to' },
  { label: 'time·progress·seek로 playhead를 읽고 옮기는 좌표계', href: '/fundamentals/tween-playhead' },
  { label: '각 콜백이 정확히 언제 불리는지와 완료를 기다리는 방법', href: '/fundamentals/tween-callbacks-promise' },
  { label: 'delay를 포함한 설정이 어디서 와서 어디까지 적용되는지', href: '/fundamentals/tween-configuration' },
  { label: 'ease 곡선의 의미 — reverse()가 뒤집는 대상', href: '/fundamentals/easing' },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="playback-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="06"
        id="boundaries"
        title="다음에 이어서 볼 개념"
        description="재생 제어와 함께 쓰이는 시간 좌표, 콜백, 설정, ease를 각 주제 페이지에서 이어서 살펴봅니다."
      />

      <div className="playback-page__subheading">
        <h3>관련 학습 페이지</h3>
        <p>필요한 주제를 골라 이어서 읽어 보세요.</p>
      </div>
      <ul className="playback-page__list">
        {relatedLessons.map((lesson) => (
          <li key={lesson.href}>
            <a href={toHref(lesson.href)}>{lesson.label}</a>
          </li>
        ))}
      </ul>

      <div className="playback-page__note">
        <p>
          재생을 다루는 메서드가 이 여덟 개뿐인 것은 아닙니다. 재생 <strong>속도</strong>를 바꾸는 <code>timeScale()</code>이나 Tween을{' '}
          <strong>없애는</strong> <code>kill()</code>은 각자 공식 페이지가 따로 있어서 이 페이지가 담당하지 않습니다. 여기서{' '}
          <code>timeScale</code>은 <code>play()</code>와 <code>resume()</code>의 주의점에서만 간단히 다뤘습니다.
        </p>
        <p>
          Timeline에도 같은 이름의 메서드가 있습니다. Timeline label을 <code>from</code>이나 <code>atTime</code>에 넘기는 문법은
          Timeline을 배울 때 함께 살펴보세요.
        </p>
      </div>
    </section>
  )
}
