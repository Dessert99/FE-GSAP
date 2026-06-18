import { useRef } from 'react' // stage, cursor, magnetic button DOM을 GSAP target으로 잡는다.
import gsap from 'gsap' // quickTo로 고빈도 포인터 이동을 부드럽게 따라가게 한다.
import { Observer } from 'gsap/Observer' // pointer 입력을 실습 stage 안으로 제한한다.
import { useGSAP } from '@gsap/react' // Observer와 hover tween을 cleanup한다.

gsap.registerPlugin(Observer) // Observer.create()를 사용할 수 있게 등록한다.

export function CursorMagneticUiExample() {
  const stage = useRef<HTMLDivElement>(null)
  const cursor = useRef<HTMLSpanElement>(null)
  const magnetic = useRef<HTMLButtonElement>(null)

  useGSAP(
    () => {
      if (!stage.current || !cursor.current || !magnetic.current) return

      const moveX = gsap.quickTo(cursor.current, 'x', { duration: 0.22, ease: 'power3.out' })
      const moveY = gsap.quickTo(cursor.current, 'y', { duration: 0.22, ease: 'power3.out' })
      const buttonX = gsap.quickTo(magnetic.current, 'x', { duration: 0.3, ease: 'power3.out' })
      const buttonY = gsap.quickTo(magnetic.current, 'y', { duration: 0.3, ease: 'power3.out' })

      const observer = Observer.create({
        target: stage.current,
        type: 'pointer',
        onMove: (self) => {
          if (self.x === undefined || self.y === undefined) return

          const bounds = stage.current?.getBoundingClientRect()
          const buttonBounds = magnetic.current?.getBoundingClientRect()

          if (!bounds || !buttonBounds) return

          const pointerX = self.x
          const pointerY = self.y
          const localX = pointerX - bounds.left
          const localY = pointerY - bounds.top

          // pointermove마다 새 tween을 만들지 않는다.
          // 영향: 커서 추적 UI가 오래 켜져 있어도 tween 생성량이 불필요하게 늘지 않는다.
          moveX(localX)
          moveY(localY)

          const buttonCenterX = buttonBounds.left + buttonBounds.width / 2
          const buttonCenterY = buttonBounds.top + buttonBounds.height / 2
          const deltaX = pointerX - buttonCenterX
          const deltaY = pointerY - buttonCenterY
          const nearButton = Math.hypot(deltaX, deltaY) < 120

          buttonX(nearButton ? deltaX * 0.18 : 0)
          buttonY(nearButton ? deltaY * 0.18 : 0)
        },
        onHover: () => gsap.to(cursor.current, { scale: 1.35, autoAlpha: 1, duration: 0.18, overwrite: true }),
        onHoverEnd: () => {
          gsap.to(cursor.current, { scale: 0.8, autoAlpha: 0.6, duration: 0.18, overwrite: true })
          buttonX(0)
          buttonY(0)
        },
      })

      return () => observer.kill()
    },
    { scope: stage },
  )

  return (
    <div ref={stage} className="cursor-magnetic">
      <span ref={cursor} className="cursor-magnetic__cursor" aria-hidden="true" />
      <p>Move inside this panel and hover near the button.</p>
      <button ref={magnetic} type="button" className="cursor-magnetic__button">
        magnetic action
      </button>
    </div>
  )
}
