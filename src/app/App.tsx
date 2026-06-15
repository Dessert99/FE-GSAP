import { useEffect, useState } from 'react'
import { Sidebar } from '../components/learning/Sidebar'
import { lessons } from '../lessons'

const lessonRoutePrefix = '/lessons/'

function getLessonByPath(pathname: string) {
  if (pathname === '/') {
    return lessons[0]
  }

  if (!pathname.startsWith(lessonRoutePrefix)) {
    return lessons[0]
  }

  const slug = decodeURIComponent(pathname.slice(lessonRoutePrefix.length).split('/')[0])

  return lessons.find((lesson) => lesson.slug === slug) ?? lessons[0]
}

function getLessonPath(slug: string) {
  return `${lessonRoutePrefix}${slug}`
}

export function App() {
  const [activeSlug, setActiveSlug] = useState(() => getLessonByPath(window.location.pathname).slug)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const active = lessons.find((lesson) => lesson.slug === activeSlug) ?? lessons[0]
  const ActivePage = active.Page

  useEffect(() => {
    const activePath = getLessonPath(active.slug)

    if (window.location.pathname !== activePath) {
      window.history.replaceState(null, '', activePath)
    }
  }, [active.slug])

  useEffect(() => {
    const handlePopState = () => {
      setActiveSlug(getLessonByPath(window.location.pathname).slug)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const handleNavigate = (slug: string) => {
    const nextPath = getLessonPath(slug)

    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', nextPath)
    }

    setActiveSlug(slug)
  }

  return (
    <div className="app" data-sidebar-open={isSidebarOpen}>
      <Sidebar
        lessons={lessons}
        activeSlug={active.slug}
        isOpen={isSidebarOpen}
        onNavigate={handleNavigate}
        onToggle={() => setIsSidebarOpen((isOpen) => !isOpen)}
      />
      <main className="content">
        {/* key=slug: 레슨을 바꾸면 페이지가 언마운트되며 이전 데모가 정리되고 새 데모는 초기 상태에서 시작한다 */}
        <ActivePage key={active.slug} />
      </main>
    </div>
  )
}
