import { useMemo, useRef, useState } from 'react' // 필터/정렬 상태와 목록 DOM scope를 관리한다.
import { flushSync } from 'react-dom' // Flip이 상태 변경 전후 DOM 위치를 정확히 비교하게 한다.
import gsap from 'gsap' // Flip plugin 등록과 tween cleanup을 담당한다.
import { Flip } from 'gsap/Flip' // React가 재배치한 리스트를 transform 애니메이션으로 잇는다.
import { useGSAP } from '@gsap/react' // 버튼 핸들러에서 만든 Flip tween도 cleanup 대상에 넣는다.

gsap.registerPlugin(Flip) // Flip.getState와 Flip.from을 사용할 수 있게 등록한다.

const items = [
  { id: 'brief', title: 'Brief', kind: 'content', score: 2 },
  { id: 'wireframe', title: 'Wireframe', kind: 'design', score: 5 },
  { id: 'motion', title: 'Motion pass', kind: 'design', score: 4 },
  { id: 'copy', title: 'Copy review', kind: 'content', score: 3 },
]

export function ListReorderFilteringExample() {
  const container = useRef<HTMLDivElement>(null)
  const [kind, setKind] = useState<'all' | 'design' | 'content'>('all')
  const [sortByScore, setSortByScore] = useState(false)
  const { contextSafe } = useGSAP({ scope: container })

  const visibleItems = useMemo(() => {
    const filtered = kind === 'all' ? items : items.filter((item) => item.kind === kind)
    return sortByScore ? [...filtered].sort((a, b) => b.score - a.score) : filtered
  }, [kind, sortByScore])

  const updateList = contextSafe((nextKind: typeof kind, nextSort: boolean) => {
    if (!container.current) return

    const cards = container.current.querySelectorAll('.list-flip__item')
    const state = Flip.getState(cards)

    flushSync(() => {
      setKind(nextKind)
      setSortByScore(nextSort)
    })

    // React가 목록을 바꾼 뒤 Flip이 이전 위치에서 새 위치로 이어준다.
    // 영향: 필터링으로 사라진 항목과 남은 항목의 이동을 사용자가 놓치지 않는다.
    Flip.from(state, {
      duration: 0.34,
      ease: 'power2.inOut',
      absolute: true,
      stagger: 0.04,
      onEnter: (elements) => gsap.fromTo(elements, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.24 }),
      onLeave: (elements) => gsap.to(elements, { autoAlpha: 0, y: -12, duration: 0.2 }),
    })
  })

  return (
    <div ref={container} className="list-flip">
      <div className="list-flip__controls">
        <button type="button" className="demo-button" onClick={() => updateList('all', sortByScore)}>
          all
        </button>
        <button type="button" className="demo-button" onClick={() => updateList('design', sortByScore)}>
          design
        </button>
        <button type="button" className="demo-button" onClick={() => updateList('content', sortByScore)}>
          content
        </button>
        <button type="button" className="demo-button" onClick={() => updateList(kind, !sortByScore)}>
          {sortByScore ? 'original order' : 'sort by score'}
        </button>
      </div>
      <div className="list-flip__grid">
        {visibleItems.map((item) => (
          <article key={item.id} className="list-flip__item">
            <span>{item.kind}</span>
            <strong>{item.title}</strong>
            <em>{item.score}/5</em>
          </article>
        ))}
      </div>
    </div>
  )
}
