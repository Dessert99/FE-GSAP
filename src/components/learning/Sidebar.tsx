import type { Lesson } from '../../lessons'

type Props = {
  lessons: Lesson[]
  activeSlug: string
  isOpen: boolean
  onNavigate: (slug: string) => void
  onToggle: () => void
}

export function Sidebar({ lessons, activeSlug, isOpen, onNavigate, onToggle }: Props) {
  return (
    <nav className="sidebar" aria-label="레슨 목록">
      <div className="sidebar__header">
        <h1 className="sidebar__title">GSAP</h1>
        <button
          type="button"
          className="sidebar__toggle"
          aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
          aria-expanded={isOpen}
          onClick={onToggle}
        >
          {isOpen ? '<' : '>'}
        </button>
      </div>
      {isOpen ? (
        <ul className="sidebar__list">
          {lessons.map((lesson) => (
            <li key={lesson.slug}>
              <a
                className="sidebar__item"
                data-active={lesson.slug === activeSlug}
                aria-current={lesson.slug === activeSlug ? 'page' : undefined}
                href={`/lessons/${lesson.slug}`}
                onClick={(event) => {
                  event.preventDefault()
                  onNavigate(lesson.slug)
                }}
              >
                {lesson.title}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  )
}
