import { useEffect, useState } from 'react'
import { Header } from '../components/learning/Header'
import { PracticeNav } from '../components/learning/PracticeNav'
import { Sidebar } from '../components/learning/Sidebar'
import { apiLessons, practiceLessons } from '../lessons'
import type { Section } from '../lessons'

const lessonRoutePrefix = '/lessons/'
const practiceRoutePrefix = '/practices/'

type ActiveRoute = {
  section: Section
  slug: string
}

function getActiveRouteByPath(pathname: string): ActiveRoute {
  if (pathname.startsWith(practiceRoutePrefix)) {
    const slug = decodeURIComponent(pathname.slice(practiceRoutePrefix.length).split('/')[0])
    const activePractice = practiceLessons.find((lesson) => lesson.slug === slug) ?? practiceLessons[0]

    return { section: 'practice', slug: activePractice.slug }
  }

  if (pathname.startsWith(lessonRoutePrefix)) {
    const slug = decodeURIComponent(pathname.slice(lessonRoutePrefix.length).split('/')[0])
    const activeLesson = apiLessons.find((lesson) => lesson.slug === slug) ?? apiLessons[0]

    return { section: 'api', slug: activeLesson.slug }
  }

  return { section: 'api', slug: apiLessons[0].slug }
}

function getRoutePath(section: Section, slug: string) {
  return section === 'api' ? `${lessonRoutePrefix}${slug}` : `${practiceRoutePrefix}${slug}`
}

export function App() {
  const [activeRoute, setActiveRoute] = useState(() => getActiveRouteByPath(window.location.pathname))
  const [lastApiSlug, setLastApiSlug] = useState(() => (activeRoute.section === 'api' ? activeRoute.slug : apiLessons[0].slug))
  const [lastPracticeSlug, setLastPracticeSlug] = useState(() =>
    activeRoute.section === 'practice' ? activeRoute.slug : practiceLessons[0].slug,
  )
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const activeList = activeRoute.section === 'api' ? apiLessons : practiceLessons
  const active = activeList.find((lesson) => lesson.slug === activeRoute.slug) ?? activeList[0]
  const ActivePage = active.Page

  useEffect(() => {
    const activePath = getRoutePath(activeRoute.section, active.slug)

    if (window.location.pathname !== activePath) {
      window.history.replaceState(null, '', activePath)
    }
  }, [active.slug, activeRoute.section])

  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = getActiveRouteByPath(window.location.pathname)

      setActiveRoute(nextRoute)

      if (nextRoute.section === 'api') {
        setLastApiSlug(nextRoute.slug)
      } else {
        setLastPracticeSlug(nextRoute.slug)
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigateTo = (section: Section, slug: string) => {
    const nextPath = getRoutePath(section, slug)

    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', nextPath)
    }

    setActiveRoute({ section, slug })

    if (section === 'api') {
      setLastApiSlug(slug)
    } else {
      setLastPracticeSlug(slug)
    }
  }

  const handleTabNavigate = (section: Section) => {
    navigateTo(section, section === 'api' ? lastApiSlug : lastPracticeSlug)
  }

  return (
    <div className="app" data-section={activeRoute.section} data-sidebar-open={isSidebarOpen}>
      <Header activeSection={activeRoute.section} onNavigate={handleTabNavigate} />
      {activeRoute.section === 'practice' ? (
        <PracticeNav practices={practiceLessons} activeSlug={active.slug} onNavigate={(slug) => navigateTo('practice', slug)} />
      ) : null}
      <div className="app__body">
        {activeRoute.section === 'api' ? (
          <Sidebar
            lessons={apiLessons}
            activeSlug={active.slug}
            isOpen={isSidebarOpen}
            onNavigate={(slug) => navigateTo('api', slug)}
            onToggle={() => setIsSidebarOpen((isOpen) => !isOpen)}
          />
        ) : null}
        <main className={activeRoute.section === 'api' ? 'content content--api' : 'content content--practice'}>
          {/* key=section+slug: 탭이나 페이지를 바꾸면 이전 GSAP 데모가 정리되고 새 화면은 초기 상태에서 시작한다 */}
          <ActivePage key={`${activeRoute.section}-${active.slug}`} />
        </main>
      </div>
    </div>
  )
}
