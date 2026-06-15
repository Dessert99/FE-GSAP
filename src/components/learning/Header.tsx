import type { Section } from '../../lessons'

type Props = {
  activeSection: Section
  onNavigate: (section: Section) => void
}

export function Header({ activeSection, onNavigate }: Props) {
  return (
    <header className="app-header">
      <a
        className="app-header__brand"
        href="/lessons/react-integration"
        onClick={(event) => {
          event.preventDefault()
          onNavigate('api')
        }}
      >
        GSAP Codebook
      </a>
      <nav className="app-header__tabs" aria-label="학습 영역">
        <a
          className="app-header__tab"
          data-active={activeSection === 'api'}
          aria-current={activeSection === 'api' ? 'page' : undefined}
          href="/lessons/react-integration"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('api')
          }}
        >
          API
        </a>
        <a
          className="app-header__tab"
          data-active={activeSection === 'practice'}
          aria-current={activeSection === 'practice' ? 'page' : undefined}
          href="/practices/practice-hero-intro"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('practice')
          }}
        >
          실습
        </a>
      </nav>
    </header>
  )
}
