import { useRef, useState } from 'react' // 현재 선택 index와 focus 가능한 버튼 목록을 관리한다.
import gsap from 'gsap' // reduced motion 조건에 따라 indicator 움직임을 다르게 만든다.
import { useGSAP } from '@gsap/react' // matchMedia 조건과 tween을 cleanup한다.

const options = ['Overview', 'Details', 'Confirm']

export function AccessibilityAuditExample() {
  const container = useRef<HTMLDivElement>(null)
  const buttons = useRef<Array<HTMLButtonElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP(
    () => {
      if (!container.current) return

      const indicator = container.current.querySelector<HTMLElement>('.accessibility-audit__indicator')
      const activeButton = buttons.current[activeIndex]

      if (!indicator || !activeButton) return

      const bounds = container.current.getBoundingClientRect()
      const buttonBounds = activeButton.getBoundingClientRect()
      const targetX = buttonBounds.left - bounds.left

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        // reduced motion에서는 위치를 즉시 맞춘다.
        // 영향: 같은 상태 변화를 제공하지만 이동 애니메이션 부담은 제거한다.
        gsap.set(indicator, { x: targetX, width: buttonBounds.width })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(indicator, { x: targetX, width: buttonBounds.width, duration: 0.28, ease: 'power2.out', overwrite: true })
      })

      return () => mm.revert()
    },
    { scope: container, dependencies: [activeIndex] },
  )

  const moveFocus = (nextIndex: number) => {
    setActiveIndex(nextIndex)
    buttons.current[nextIndex]?.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveFocus((activeIndex + 1) % options.length)
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveFocus((activeIndex - 1 + options.length) % options.length)
    }
  }

  return (
    <div ref={container} className="accessibility-audit" onKeyDown={handleKeyDown}>
      <div className="accessibility-audit__tabs" role="tablist" aria-label="Accessibility audit tabs">
        <span className="accessibility-audit__indicator" aria-hidden="true" />
        {options.map((option, index) => (
          <button
            key={option}
            ref={(node) => {
              buttons.current[index] = node
            }}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
          >
            {option}
          </button>
        ))}
      </div>
      <section className="accessibility-audit__panel" role="tabpanel">
        <strong>{options[activeIndex]}</strong>
        <p>Use left and right arrows. Focus should stay on the active tab, and the indicator should respect reduced motion.</p>
      </section>
    </div>
  )
}
