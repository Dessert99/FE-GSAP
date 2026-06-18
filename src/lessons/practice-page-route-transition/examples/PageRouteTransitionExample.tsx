import { useRef, useState } from 'react' // 현재 route 상태와 GSAP scope를 같이 관리한다.
import { flushSync } from 'react-dom' // exit 후 새 DOM을 즉시 만들고 enter 애니메이션이 바로 읽게 한다.
import gsap from 'gsap' // 페이지 enter/exit timeline과 이전 tween cleanup을 만든다.
import { useGSAP } from '@gsap/react' // route 변경, 다시 재생, 언마운트 때 현재 GSAP 작업을 정리한다.

const pages = [
  { id: 'overview', title: 'Overview', copy: '사용자가 처음 보는 요약 화면' },
  { id: 'details', title: 'Details', copy: '선택 이후 더 깊게 읽는 상세 화면' },
  { id: 'checkout', title: 'Checkout', copy: '최종 행동 직전의 확인 화면' },
]

export function PageRouteTransitionExample() {
  // scope 안의 화면만 query해서 다른 실습의 같은 class와 섞이지 않게 한다.
  const container = useRef<HTMLDivElement>(null)
  // 실제 앱에서는 pathname이나 router state가 이 activePage 역할을 한다.
  const [activePage, setActivePage] = useState(pages[0])
  // 빠른 route 변경 중 이전 exit/enter timeline을 명시적으로 끊기 위한 ref다.
  const transition = useRef<gsap.core.Timeline | null>(null)
  const { contextSafe } = useGSAP(
    () => {
      if (!container.current) return

      const q = gsap.utils.selector(container)
      const panel = q<HTMLElement>('.route-transition__panel')[0]
      const pieces = q<HTMLElement>('.route-transition__piece')

      if (!panel) return

      // route가 바뀐 직후 새 화면은 항상 같은 출발점에서 들어온다.
      // 영향: 뒤로 가기, 다시 재생, 빠른 클릭에서도 이전 transform이 남지 않는다.
      gsap.set(panel, { autoAlpha: 1, y: 0, clearProps: 'transform' })
      gsap.from(pieces, {
        autoAlpha: 0,
        y: 18,
        duration: 0.32,
        stagger: 0.06,
        ease: 'power2.out',
        overwrite: true,
      })

      return () => {
        transition.current?.kill()
        transition.current = null
      }
    },
    { scope: container, dependencies: [activePage.id] },
  )

  const navigate = contextSafe((nextId: string) => {
    if (nextId === activePage.id || !container.current) return

    const nextPage = pages.find((page) => page.id === nextId)
    const panel = container.current.querySelector<HTMLElement>('.route-transition__panel')

    if (!nextPage || !panel) return

    // 새 전환이 시작되면 진행 중이던 이전 전환을 먼저 끝낸다.
    // 영향: 사용자가 탭을 빠르게 눌러도 오래된 exit가 새 화면을 다시 숨기지 않는다.
    transition.current?.kill()
    transition.current = gsap
      .timeline({
        defaults: { duration: 0.18, ease: 'power2.inOut' },
        onComplete: () => {
          flushSync(() => setActivePage(nextPage))
        },
      })
      .to(panel, { autoAlpha: 0, y: -16, overwrite: true })
  })

  return (
    <div ref={container} className="route-transition">
      <nav className="route-transition__tabs" aria-label="Demo routes">
        {pages.map((page) => (
          <button
            key={page.id}
            type="button"
            className="demo-button"
            data-active={page.id === activePage.id}
            onClick={() => navigate(page.id)}
          >
            {page.title}
          </button>
        ))}
      </nav>
      <section className="route-transition__panel" aria-live="polite">
        <span className="route-transition__piece route-transition__label">route: /{activePage.id}</span>
        <h3 className="route-transition__piece">{activePage.title}</h3>
        <p className="route-transition__piece">{activePage.copy}</p>
      </section>
    </div>
  )
}
