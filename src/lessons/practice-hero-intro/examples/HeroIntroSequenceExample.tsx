import { useRef } from 'react' // 이 컴포넌트가 렌더링한 DOM 영역을 GSAP scope로 넘기기 위해 사용한다.
import gsap from 'gsap' // timeline, set, from을 만들어 실제 DOM 스타일을 바꾸는 GSAP 코어다.
import { useGSAP } from '@gsap/react' // React가 컴포넌트를 치울 때 GSAP 애니메이션도 같이 정리해준다.

export function HeroIntroSequenceExample() {
  // 이 ref가 붙은 영역 안에서만 '.hero-intro__title' 같은 셀렉터가 검색된다.
  // 영향: 다른 레슨이나 다른 예제의 같은 class 이름을 실수로 움직이지 않게 막는다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 사용자가 OS에서 "동작 줄이기"를 켜면 true가 된다.
      // 영향: 큰 이동 애니메이션 대신 바로 읽을 수 있는 최종 화면을 보여줄 수 있다.
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        // reduced motion에서는 요소를 숨겼다가 움직이며 보여주지 않는다.
        // 영향: 민감한 사용자에게 불필요한 이동감을 주지 않고, 콘텐츠는 즉시 보이게 한다.
        gsap.set('.hero-intro__eyebrow, .hero-intro__title, .hero-intro__copy, .hero-intro__cta, .hero-intro__card', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        })

        // 여기서 끝내면 아래 timeline이 만들어지지 않는다.
        // 영향: reduced motion 상태에서는 이동 애니메이션 자체가 실행되지 않는다.
        return
      }

      // defaults는 아래 from() tween들이 공통으로 사용할 기본 시간과 ease다.
      // 영향: 각 단계마다 duration/ease를 반복하지 않아도 전체 히어로 모션의 속도감이 통일된다.
      const intro = gsap.timeline({ defaults: { duration: 0.55, ease: 'power3.out' } })

      // from()은 "이 상태에서 시작해서 CSS에 적힌 원래 상태로 돌아가라"는 뜻이다.
      // 영향: eyebrow는 아래에서 살짝 올라오며 나타나고, 끝나면 CSS가 정의한 제자리에 남는다.
      intro
        .from('.hero-intro__eyebrow', { autoAlpha: 0, y: 12 })
        // '-=0.3'은 앞 애니메이션이 끝나기 0.3초 전에 다음 애니메이션을 시작한다.
        // 영향: 제목이 eyebrow를 기다렸다가 딱딱하게 시작하지 않고, 자연스럽게 겹쳐 등장한다.
        .from('.hero-intro__title', { autoAlpha: 0, y: 26 }, '-=0.3')
        // 설명 문장은 제목보다 작은 거리로 움직인다.
        // 영향: 제목보다 덜 강하게 들어와서 시선의 우선순위가 제목에 남는다.
        .from('.hero-intro__copy', { autoAlpha: 0, y: 18 }, '-=0.25')
        // CTA 버튼은 콘텐츠를 읽은 뒤 바로 누를 수 있는 위치로 들어온다.
        // 영향: 버튼이 마지막에 가까운 시점에 나타나 사용자의 다음 행동을 강조한다.
        .from('.hero-intro__cta', { autoAlpha: 0, y: 14 }, '-=0.2')
        // stagger는 같은 selector에 잡힌 카드들을 조금씩 늦게 시작시킨다.
        // 영향: 카드 3개가 동시에 튀어나오지 않고, 왼쪽부터 순서대로 읽히는 흐름이 생긴다.
        .from('.hero-intro__card', { autoAlpha: 0, y: 22, stagger: 0.1 }, '-=0.15')
        // 마지막으로 CTA를 아주 작게 키웠다가 되돌린다.
        // 영향: 전체 진입이 끝난 뒤 사용자가 누를 수 있는 주요 행동을 한 번 더 알려준다.
        .to('.hero-intro__cta', { scale: 1.04, repeat: 1, yoyo: true, duration: 0.22 }, '+=0.05')
    },
    // scope를 지정하면 useGSAP이 이 컴포넌트 안에서 만든 애니메이션만 추적한다.
    // 영향: "다시 재생"으로 컴포넌트가 remount되거나 레슨을 떠날 때 이전 timeline이 정리된다.
    { scope: container },
  )

  return (
    <section ref={container} className="hero-intro" aria-label="Hero intro practice">
      <div className="hero-intro__content">
        <span className="hero-intro__eyebrow">GSAP PRACTICE</span>
        <h3 className="hero-intro__title">Build motion that survives real UI changes.</h3>
        <p className="hero-intro__copy">
          A production intro sequence needs order, readable timing, cleanup, and a fallback for users who reduce motion.
        </p>
        <button type="button" className="hero-intro__cta">
          Start sequence
        </button>
      </div>
      <div className="hero-intro__cards" aria-label="Sequence checklist">
        <span className="hero-intro__card">timeline</span>
        <span className="hero-intro__card">cleanup</span>
        <span className="hero-intro__card">reduced</span>
      </div>
    </section>
  )
}
