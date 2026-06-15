import { useRef } from 'react' // 실습 안의 스크롤 영역을 DOM ref로 잡기 위해 사용한다.
import gsap from 'gsap' // ScrollTrigger가 제어할 tween과 초기 상태를 만든다.
import { ScrollTrigger } from 'gsap/ScrollTrigger' // 스크롤 위치로 pin, scrub, batch를 실행하는 GSAP 공식 플러그인이다.
import { useGSAP } from '@gsap/react' // React 언마운트와 다시 재생 시 GSAP 작업을 정리해준다.

gsap.registerPlugin(ScrollTrigger) // ScrollTrigger를 등록해야 scrollTrigger 설정과 ScrollTrigger.create()를 사용할 수 있다.

export function ScrollProductStoryExample() {
  // 이 ref가 실제로 스크롤되는 박스다.
  // 영향: window 스크롤을 건드리지 않고, 실습 패널 안에서만 ScrollTrigger를 테스트할 수 있다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!container.current) return

      // selector를 container 내부로 제한한다.
      // 영향: 다른 실습에 같은 class가 생겨도 이 예제의 ScrollTrigger가 엉뚱한 요소를 움직이지 않는다.
      const q = gsap.utils.selector(container)
      const frame = q<HTMLElement>('.product-story__frame')[0]
      const progress = q<HTMLElement>('.product-story__progress-bar')[0]
      const steps = q<HTMLElement>('.product-story__step')

      if (!frame || !progress || steps.length === 0) return

      // 실습을 다시 재생할 때 이전 inline style이 남아 있으면 시작 상태가 흐려진다.
      // 영향: 모든 카드가 다시 "아래에서 등장하기 전" 상태로 돌아가고 progress 막대도 0에서 시작한다.
      gsap.set(steps, { autoAlpha: 0, y: 28 })
      gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' })

      const mm = gsap.matchMedia() // 화면 폭 조건별로 ScrollTrigger를 만들고, 조건이 바뀌면 자동으로 되돌릴 준비를 한다.

      mm.add('(min-width: 720px)', () => {
        if (!container.current) return

        // 데스크톱에서는 제품 프레임을 스크롤 중 고정한다.
        // 영향: 설명 카드가 지나가는 동안 사용자는 같은 제품 화면을 계속 기준점으로 보고 읽는다.
        ScrollTrigger.create({
          trigger: frame,
          scroller: container.current,
          start: 'top 72px',
          end: '+=520',
          pin: true,
          pinSpacing: false,
        })

        // 전체 스토리 진행률을 상단 막대에 연결한다.
        // 영향: 사용자가 지금 소개 흐름의 어느 정도를 읽었는지 시각적으로 확인한다.
        gsap.to(progress, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.product-story__steps',
            scroller: container.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        })

        // 여러 설명 카드를 batch로 묶어 등장시킨다.
        // 영향: 빠르게 스크롤해도 가까운 시점에 들어온 카드들이 한 번에 처리되어 tween이 과하게 많이 생기지 않는다.
        ScrollTrigger.batch(steps, {
          scroller: container.current,
          start: 'top 78%',
          interval: 0.08,
          batchMax: 2,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.38,
              stagger: 0.08,
              ease: 'power2.out',
              overwrite: true,
            })
          },
          onLeaveBack: (batch) => {
            gsap.set(batch, { autoAlpha: 0, y: 28, overwrite: true })
          },
        })
      })

      mm.add('(max-width: 719px)', () => {
        if (!container.current) return

        // 좁은 화면에서는 pin을 만들지 않는다.
        // 영향: 작은 화면에서 고정 요소가 콘텐츠를 가리거나 스크롤 거리를 과하게 늘리는 문제를 피한다.
        gsap.set(frame, { clearProps: 'all' })

        // 모바일도 batch는 유지하되 pin/scrub보다 단순한 순차 등장에 집중한다.
        // 영향: 같은 정보를 읽을 수 있지만 모션 부담과 레이아웃 복잡도는 줄어든다.
        ScrollTrigger.batch(steps, {
          scroller: container.current,
          start: 'top 82%',
          interval: 0.1,
          batchMax: 1,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: true,
            })
          },
          onLeaveBack: (batch) => {
            gsap.set(batch, { autoAlpha: 0, y: 28, overwrite: true })
          },
        })
      })

      // 내부 scroller는 일반 window보다 좌표 계산 타이밍이 어긋나기 쉽다.
      // 영향: pin 시작점, batch 진입점, progress end 지점을 현재 DOM 크기 기준으로 다시 맞춘다.
      ScrollTrigger.refresh()

      // matchMedia가 만든 tween과 ScrollTrigger를 모두 정리한다.
      // 영향: 실습 태그 이동, 다시 재생, route 변경 후 이전 pin spacer나 trigger가 남지 않는다.
      return () => mm.revert()
    },
    { scope: container }, // useGSAP cleanup 범위를 이 스크롤 실습 내부로 제한한다.
  )

  return (
    <div ref={container} className="product-story" aria-label="Scroll product story practice">
      <div className="product-story__progress">
        <span className="product-story__progress-bar" />
      </div>
      <section className="product-story__hero">
        <div className="product-story__frame">
          <span className="product-story__badge">Live Preview</span>
          <strong className="product-story__device">Motion UI Kit</strong>
          <span className="product-story__screen">pin + scrub</span>
        </div>
      </section>
      <div className="product-story__steps">
        <article className="product-story__step">
          <span>01</span>
          <h3>Anchor the product</h3>
          <p>Keep the visual frame in place while the user reads the first part of the story.</p>
        </article>
        <article className="product-story__step">
          <span>02</span>
          <h3>Show progress</h3>
          <p>Connect a small progress bar to the scroll distance so the section feels measurable.</p>
        </article>
        <article className="product-story__step">
          <span>03</span>
          <h3>Batch details</h3>
          <p>Reveal nearby cards together instead of creating a separate heavy sequence for each item.</p>
        </article>
        <article className="product-story__step">
          <span>04</span>
          <h3>Respect layout limits</h3>
          <p>Remove pinning on narrow screens and keep the same content readable with simpler motion.</p>
        </article>
      </div>
    </div>
  )
}
