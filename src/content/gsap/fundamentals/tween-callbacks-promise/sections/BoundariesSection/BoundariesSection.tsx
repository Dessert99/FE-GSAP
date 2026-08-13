/** 현재 주제와 함께 보면 좋은 다음 학습 페이지를 안내한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 이 페이지 다음에 이어 보면 콜백과 Promise를 실제 animation 흐름에 연결할 수 있다
const relatedLessons = [
  { label: '각 콜백이 언제 불리는지와 vars 전체 옵션', href: '/fundamentals/gsap-to' },
  { label: 'Tween을 재생·정지·재시작하는 방법', href: '/fundamentals/tween-playback-controls' },
  { label: '설정이 어디서 와서 어디까지 적용되는지', href: '/fundamentals/tween-configuration' },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="callbacks-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="05"
        id="boundaries"
        title="다음에 이어서 볼 내용"
        description="콜백의 호출 시점이나 Tween의 재생 제어가 더 필요하다면 관련 학습 페이지에서 이어갈 수 있습니다."
      />

      <div className="callbacks-page__subheading">
        <h3>관련 학습 페이지</h3>
        <p>지금 익힌 메서드를 다음 주제와 연결해 보세요.</p>
      </div>
      <ul className="callbacks-page__list">
        {relatedLessons.map((lesson) => (
          <li key={lesson.href}>
            <a href={toHref(lesson.href)}>{lesson.label}</a>
          </li>
        ))}
      </ul>

      <div className="callbacks-page__note">
        <p>
          Timeline에도 같은 이름의 <code>eventCallback()</code>과 <code>then()</code>이 있습니다. 여기서는 Tween에서 두 메서드를
          사용하는 방법에 집중했습니다.
        </p>
      </div>
    </section>
  )
}
