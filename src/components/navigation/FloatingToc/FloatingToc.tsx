/** 현재 트랙의 레슨을 그룹별로 접어 탐색할 수 있는 부유 목차를 제공한다. */
import { useEffect, useRef, useState } from 'react'
import type { LessonDefinition, TrackDefinition } from '../../../app/routes'

type Props = {
  track: TrackDefinition
  activeLessonSlug: string | null
  onNavigate: (path: string) => void
}

export function FloatingToc({ track, activeLessonSlug, onNavigate }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const closeFromOutside = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return
      setIsOpen(false)
    }
    const closeFromEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      triggerRef.current?.focus()
    }

    document.addEventListener('pointerdown', closeFromOutside)
    document.addEventListener('keydown', closeFromEscape)

    return () => {
      document.removeEventListener('pointerdown', closeFromOutside)
      document.removeEventListener('keydown', closeFromEscape)
    }
  }, [])

  const groups = track.lessons.reduce<Map<string, LessonDefinition[]>>((result, lesson) => {
    const lessons = result.get(lesson.group) ?? []
    lessons.push(lesson)
    result.set(lesson.group, lessons)

    return result
  }, new Map())

  return (
    <div ref={rootRef} className="floating-toc">
      <button
        ref={triggerRef}
        type="button"
        className="floating-toc__trigger"
        aria-label={isOpen ? '목차 닫기' : '목차 열기'}
        aria-expanded={isOpen}
        aria-controls="track-table-of-contents"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="floating-toc__icon" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>
      <nav
        id="track-table-of-contents"
        className="floating-toc__panel"
        aria-label={`${track.label} 목차`}
        hidden={!isOpen}
      >
        {[...groups].map(([group, lessons]) => (
          <section key={group} className="floating-toc__group">
            <h2>{group}</h2>
            {lessons.map((lesson) => (
              <button
                key={lesson.slug}
                type="button"
                className="floating-toc__item"
                aria-current={lesson.slug === activeLessonSlug ? 'page' : undefined}
                onClick={() => {
                  setIsOpen(false)
                  onNavigate(`/${track.id}/${lesson.slug}`)
                }}
              >
                {lesson.title}
              </button>
            ))}
          </section>
        ))}
      </nav>
    </div>
  )
}
