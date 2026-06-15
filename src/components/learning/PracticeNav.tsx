import type { Lesson } from '../../lessons'

type Props = {
  practices: Lesson[]
  activeSlug: string
  onNavigate: (slug: string) => void
}

export function PracticeNav({ practices, activeSlug, onNavigate }: Props) {
  return (
    <nav className="practice-nav" aria-label="실습 목록">
      {practices.map((practice) => (
        <a
          key={practice.slug}
          className="practice-nav__tag"
          data-active={practice.slug === activeSlug}
          aria-current={practice.slug === activeSlug ? 'page' : undefined}
          href={`/practices/${practice.slug}`}
          onClick={(event) => {
            event.preventDefault()
            onNavigate(practice.slug)
          }}
        >
          {practice.title}
        </a>
      ))}
    </nav>
  )
}
