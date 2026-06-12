import type { Lesson } from '../../lessons'

type Props = {
  lessons: Lesson[]
  activeSlug: string
  onSelect: (slug: string) => void
}

export function Sidebar({ lessons, activeSlug, onSelect }: Props) {
  return (
    <nav className="sidebar">
      <h1 className="sidebar__title">GSAP</h1>
      <ul className="sidebar__list">
        {lessons.map((lesson) => (
          <li key={lesson.slug}>
            <button
              className="sidebar__item"
              data-active={lesson.slug === activeSlug}
              onClick={() => onSelect(lesson.slug)}
            >
              {lesson.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
