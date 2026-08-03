/** Core 지도를 실제 curriculum의 다음 학습 순서와 연결한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const steps = [
  { title: 'Installation', description: 'npm·CDN·framework 환경에서 GSAP을 가져오는 방법', available: false },
  { title: 'gsap.to()', description: '현재값에서 목표값으로 가는 첫 standalone Tween', available: true },
  { title: 'to · from · fromTo · set', description: '시작값과 도착값을 누가 정하는지 비교', available: false },
  { title: 'Tween configuration', description: '기본값과 전역·지역 설정의 적용 범위', available: false },
  { title: 'CSS · non-CSS targets', description: '대상 종류에 따라 값을 표현하는 방법', available: false },
  { title: 'Easing', description: '같은 거리와 duration에서 속도감이 달라지는 이유', available: false },
  { title: 'Tween · Timeline instances', description: '만들어진 animation의 상태·시간·제어 method', available: false },
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
              {step.available ? <a href="/fundamentals/gsap-to">{step.title}</a> : <strong>{step.title}</strong>}
              <p>{step.description}</p>
            </div>
            <small>{step.available ? '읽을 수 있음' : '다음 handoff 후보'}</small>
          </li>
        ))}
      </ol>
    </section>
  )
}
