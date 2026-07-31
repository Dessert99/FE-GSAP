import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function CardFeedbackExample() {
  // 카드, 상태 문구, 클릭 handler에서 만들어지는 timeline을 같은 GSAP context에 묶는다.
  const scope = useRef<HTMLDivElement>(null)
  const { contextSafe } = useGSAP({ scope })

  // contextSafe는 useGSAP 콜백 이후의 사용자 이벤트에서 만든 tween도 unmount cleanup 대상에 포함한다.
  const handleConfirm = contextSafe(() => {
    const card = scope.current?.querySelector('.gsap-to-feedback__card')
    const status = scope.current?.querySelector('.gsap-to-feedback__status')

    if (!card || !status) return

    // 빠르게 다시 눌러도 이전 피드백이 새 timeline과 경쟁하지 않도록 같은 타깃의 진행 중 tween을 정리한다.
    gsap.killTweensOf([card, status])
    gsap
      .timeline()
      .to(card, { scale: 0.97, duration: 0.12, ease: 'power2.in' })
      .to(card, { scale: 1, duration: 0.28, ease: 'back.out(2)' })
      .to(status, { autoAlpha: 1, y: 0, duration: 0.24, ease: 'power2.out' }, '<')
  })

  return (
    <div ref={scope} className="gsap-to-feedback">
      <div className="gsap-to-feedback__card">
        <div>
          <span className="gsap-to-feedback__eyebrow">LIVE WORKSHOP</span>
          <strong>Motion systems for interfaces</strong>
        </div>
        <button type="button" onClick={handleConfirm}>
          자리 예약
        </button>
      </div>
      <p className="gsap-to-feedback__status" aria-live="polite">
        예약이 완료되었습니다.
      </p>
    </div>
  )
}
