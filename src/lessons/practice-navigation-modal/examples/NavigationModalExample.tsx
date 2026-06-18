import { useEffect, useRef, useState } from 'react' // open 상태, focus 복귀 대상, 애니메이션 대상을 관리한다.
import { flushSync } from 'react-dom' // 열기 직후 생성된 DOM을 GSAP이 바로 읽게 한다.
import gsap from 'gsap' // enter/exit timeline을 만든다.
import { useGSAP } from '@gsap/react' // 이벤트 핸들러에서 만든 tween도 cleanup 대상에 묶는다.

export function NavigationModalExample() {
  // 이 실습 전체를 GSAP scope로 제한한다.
  const container = useRef<HTMLDivElement>(null)
  // 모달을 연 버튼이다. 닫힌 뒤 focus를 되돌리는 기준이 된다.
  const openButton = useRef<HTMLButtonElement>(null)
  // overlay, panel, toast는 enter/exit timeline의 대상이다.
  const overlay = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const toast = useRef<HTMLDivElement>(null)
  // 닫힘 애니메이션이 끝나기 전까지 DOM을 유지하기 위한 React 상태다.
  const [isOpen, setIsOpen] = useState(false)
  // 연타 중 같은 enter/exit timeline이 겹치지 않도록 잠금 역할을 한다.
  const isAnimating = useRef(false)
  const { contextSafe } = useGSAP({ scope: container })

  const openModal = contextSafe(() => {
    if (isOpen || isAnimating.current) return

    isAnimating.current = true

    flushSync(() => {
      setIsOpen(true) // DOM을 만든 직후 아래 GSAP timeline이 ref를 읽을 수 있게 한다.
    })

    if (!overlay.current || !panel.current || !toast.current) return

    gsap
      .timeline({
        defaults: { duration: 0.24, ease: 'power2.out' },
        onComplete: () => {
          isAnimating.current = false
          panel.current?.focus()
        },
      })
      .set([overlay.current, panel.current, toast.current], { clearProps: 'all' })
      .from(overlay.current, { autoAlpha: 0 })
      .from(panel.current, { autoAlpha: 0, y: 22, scale: 0.98 }, '<')
      .from(toast.current, { autoAlpha: 0, y: -10 }, '-=0.08')
  })

  const closeModal = contextSafe(() => {
    if (!isOpen || isAnimating.current || !overlay.current || !panel.current || !toast.current) return

    isAnimating.current = true

    gsap
      .timeline({
        defaults: { duration: 0.18, ease: 'power2.in' },
        onComplete: () => {
          isAnimating.current = false
          setIsOpen(false) // 닫힘 모션이 끝난 뒤 DOM을 제거해 exit가 끊기지 않게 한다.
          openButton.current?.focus()
        },
      })
      .to(toast.current, { autoAlpha: 0, y: -8, overwrite: true })
      .to(panel.current, { autoAlpha: 0, y: 18, scale: 0.98, overwrite: true }, '<')
      .to(overlay.current, { autoAlpha: 0, overwrite: true }, '<')
  })

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeModal, isOpen])

  return (
    <div ref={container} className="navigation-modal">
      <nav className="navigation-modal__nav" aria-label="Practice navigation">
        <a href="#overview">Overview</a>
        <a href="#pricing">Pricing</a>
        <a href="#docs">Docs</a>
        <button ref={openButton} type="button" className="demo-button" onClick={openModal}>
          open modal
        </button>
      </nav>

      {isOpen ? (
        <div ref={overlay} className="navigation-modal__overlay" role="presentation">
          <section
            ref={panel}
            className="navigation-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="navigation-modal-title"
            tabIndex={-1}
          >
            <div ref={toast} className="navigation-modal__toast">
              Draft saved
            </div>
            <h3 id="navigation-modal-title">Confirm animation cleanup</h3>
            <p>Open, close, press ESC, and click quickly. The UI should finish one transition before accepting the next one.</p>
            <div className="navigation-modal__actions">
              <button type="button" className="demo-button" onClick={closeModal}>
                cancel
              </button>
              <button type="button" className="demo-button" onClick={closeModal}>
                confirm
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  )
}
