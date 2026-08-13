/** Core 지도를 실제 curriculum의 다음 학습 순서와 연결한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const steps = [
  { title: 'Installation', description: 'npm·CDN·framework 환경에서 GSAP을 가져오는 방법', href: '/fundamentals/installation' },
  { title: 'gsap.to()', description: '현재값에서 목표값으로 가는 첫 독립 Tween', href: '/fundamentals/gsap-to' },
  { title: 'to · from · fromTo · set', description: '시작값과 도착값을 누가 정하는지 비교', href: '/fundamentals/tween-start-end-values' },
  { title: 'Tween configuration', description: '기본값과 전역·지역 설정의 적용 범위', href: '/fundamentals/tween-configuration' },
  { title: 'CSS targets', description: 'CSS property와 transform 값을 표현하는 방법', href: '/fundamentals/css-animation' },
  { title: 'Non-CSS targets', description: '일반 객체와 배열의 값을 바꾸는 방법', href: '/fundamentals/non-css-target-values' },
  { title: 'Easing', description: '같은 거리와 duration에서 속도감이 달라지는 이유', href: '/fundamentals/easing' },
  { title: 'Tween playhead', description: 'Tween의 현재 시간과 진행률을 읽고 옮기는 방법', href: '/fundamentals/tween-playhead' },
  { title: 'Timeline basics', description: '여러 Tween을 원하는 순서와 시간 위치에 배치하는 방법', href: '/fundamentals/timeline-basics' },
] as const

export function NextStepsSection() {
  return (
    <section id="next-steps" className="core-map-page__section" aria-labelledby="next-steps-title">
      <SectionHeading number="06" id="next-steps" title="다음 학습 순서 고르기" description="지금은 전체 지도를 얻었습니다. 아래 순서로 작은 질문 하나씩 내려가면 API 이름을 맥락과 함께 익힐 수 있습니다." />
      <ol className="core-map-page__roadmap">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <a href={toHref(step.href)}>{step.title}</a>
              <p>{step.description}</p>
            </div>
            <small>읽을 수 있음</small>
          </li>
        ))}
      </ol>
    </section>
  )
}
