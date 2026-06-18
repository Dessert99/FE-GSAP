import { useRef, useState } from 'react' // state는 카드 선택과 정렬 모드를, ref는 GSAP scope를 잡는다.
import { flushSync } from 'react-dom' // Flip이 React 상태 변경 직후의 DOM 위치를 정확히 읽게 만든다.
import gsap from 'gsap' // Flip/Draggable/Observer 플러그인을 등록하고 보조 tween을 만든다.
import { Draggable } from 'gsap/Draggable' // 카드 직접 드래그를 처리한다.
import { Flip } from 'gsap/Flip' // grid/stack 레이아웃 전환을 transform 애니메이션으로 이어준다.
import { Observer } from 'gsap/Observer' // wheel/touch/pointer 방향 입력을 하나의 이벤트 레이어로 묶는다.
import { useGSAP } from '@gsap/react' // React 언마운트와 다시 재생 시 GSAP 작업을 정리한다.

gsap.registerPlugin(Draggable, Flip, Observer) // 세 플러그인의 API를 예제 안에서 사용할 수 있게 등록한다.

const cards = [
  { title: 'Launch', meta: 'timeline' },
  { title: 'Browse', meta: 'observer' },
  { title: 'Arrange', meta: 'flip' },
  { title: 'Drag', meta: 'draggable' },
]

export function InteractiveGalleryExample() {
  // 이 ref 안에서만 card selector, Observer target, Draggable bounds를 찾는다.
  const container = useRef<HTMLDivElement>(null)
  // grid와 stack은 React가 실제 DOM 배치를 바꾸는 기준이다.
  const [mode, setMode] = useState<'grid' | 'stack'>('grid')
  // Observer 입력과 카드 클릭은 이 activeIndex를 바꿔 현재 선택 카드를 보여준다.
  const [activeIndex, setActiveIndex] = useState(0)
  // contextSafe는 버튼/Observer 콜백에서 만든 Flip tween도 cleanup 대상에 넣는다.
  const { contextSafe } = useGSAP(
    () => {
      if (!container.current) return

      const q = gsap.utils.selector(container)
      const cardElements = q<HTMLElement>('.interactive-gallery__card')
      const board = q<HTMLElement>('.interactive-gallery__board')[0]

      if (!board || cardElements.length === 0) return

      // 카드를 다시 재생할 때 이전 transform이 남아 있으면 Flip 시작점이 흐려진다.
      // 영향: 갤러리가 항상 React가 렌더링한 정렬 상태에서 시작한다.
      gsap.set(cardElements, { clearProps: 'transform' })

      const draggables = Draggable.create(cardElements, {
        type: 'x,y', // 카드가 grid나 stack 안에서 잠깐 들려 움직이는 느낌을 만든다.
        bounds: board, // 카드가 실습 보드 밖으로 밀려 나가지 않게 한다.
        edgeResistance: 0.82, // 경계에 닿을수록 이동을 둔하게 만들어 UI 제약을 느끼게 한다.
        onPress() {
          gsap.killTweensOf(this.target) // 연속 입력 중 이전 복귀 tween이 새 드래그를 방해하지 않게 한다.
          gsap.to(this.target, { scale: 1.04, duration: 0.15, overwrite: true })
        },
        onRelease() {
          // 드래그가 끝나면 React layout 위치로 되돌린다.
          // 영향: 직접 조작한 transform이 다음 Flip 상태 계산을 오염시키지 않는다.
          gsap.to(this.target, { x: 0, y: 0, scale: 1, duration: 0.32, ease: 'power2.out', overwrite: true })
        },
      })

      const observer = Observer.create({
        target: board, // 실습 보드 안의 wheel/touch/pointer 입력만 처리한다.
        type: 'wheel,touch,pointer',
        tolerance: 24, // 작은 흔들림을 카드 변경으로 처리하지 않는다.
        preventDefault: true, // 데모 안 제스처가 페이지 스크롤로 새지 않게 막는다.
        onDown: () => setActiveIndex((index) => (index + 1) % cards.length),
        onRight: () => setActiveIndex((index) => (index + 1) % cards.length),
        onUp: () => setActiveIndex((index) => (index - 1 + cards.length) % cards.length),
        onLeft: () => setActiveIndex((index) => (index - 1 + cards.length) % cards.length),
      })

      return () => {
        observer.kill()
        draggables.forEach((draggable) => draggable.kill())
      }
    },
    { scope: container },
  )

  const toggleMode = contextSafe(() => {
    if (!container.current) return

    const q = gsap.utils.selector(container)
    const cardElements = q<HTMLElement>('.interactive-gallery__card')

    // Flip 전에 현재 tween과 drag transform을 정리한다.
    // 영향: 빠르게 토글해도 이전 애니메이션이 다음 레이아웃 전환 위에 누적되지 않는다.
    gsap.killTweensOf(cardElements)
    gsap.set(cardElements, { x: 0, y: 0 })

    const state = Flip.getState(cardElements)

    flushSync(() => {
      setMode((current) => (current === 'grid' ? 'stack' : 'grid'))
    })

    Flip.from(state, {
      duration: 0.48,
      ease: 'power2.inOut',
      absolute: true, // 이동 중 주변 카드가 밀리며 흔들리지 않게 한다.
      scale: true, // stack 모드에서 달라지는 카드 크기도 transform으로 이어준다.
      stagger: 0.04,
      overwrite: true,
    })
  })

  return (
    <div ref={container} className="interactive-gallery" data-mode={mode}>
      <div className="interactive-gallery__toolbar">
        <button type="button" className="demo-button" onClick={toggleMode}>
          {mode === 'grid' ? 'stack view' : 'grid view'}
        </button>
        <span>Wheel, drag, or swipe inside the board.</span>
      </div>
      <div className="interactive-gallery__board" aria-label="Interactive card gallery">
        {cards.map((card, index) => (
          <button
            key={card.title}
            type="button"
            className="interactive-gallery__card"
            data-active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            <span>{card.meta}</span>
            <strong>{card.title}</strong>
          </button>
        ))}
      </div>
    </div>
  )
}
