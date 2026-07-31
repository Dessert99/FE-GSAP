import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { FloatingToc } from '../components/learning/FloatingToc'
import { TrackTabs } from '../components/learning/TrackTabs'
import { TrackOverviewPage } from '../pages/TrackOverviewPage'
import { resolveRoute, tracks } from './routes'

export function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname)
  const shouldFocusMain = useRef(false)
  const mainRef = useRef<HTMLElement>(null)
  const route = useMemo(() => resolveRoute(pathname), [pathname])
  const ActivePage = route.lesson?.Page
  const lessonIndex = route.track.lessons.findIndex(({ slug }) => slug === route.lessonSlug)
  const progressLabel = route.lesson
    ? `${String(lessonIndex + 1).padStart(2, '0')} / ${String(route.track.lessons.length).padStart(2, '0')}`
    : route.track.label

  useEffect(() => {
    if (window.location.pathname !== route.canonicalPath) {
      window.history.replaceState(null, '', route.canonicalPath)
    }
  }, [route.canonicalPath])

  useEffect(() => {
    const handlePopState = () => {
      shouldFocusMain.current = true
      setPathname(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (!shouldFocusMain.current) return
    shouldFocusMain.current = false
    mainRef.current?.focus({ preventScroll: true })
  }, [route.canonicalPath])

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path)
    }

    shouldFocusMain.current = true
    setPathname(path)
  }

  const handleLinkNavigate = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    event.preventDefault()
    navigate(path)
  }

  return (
    <div className="learning-app" data-track={route.trackId}>
      <header className="learning-header">
        <a
          className="learning-header__brand"
          href="/fundamentals/gsap-to"
          onClick={(event) => handleLinkNavigate(event, '/fundamentals/gsap-to')}
        >
          GSAP Study
        </a>
        <TrackTabs tracks={tracks} activeTrackId={route.trackId} onNavigate={handleLinkNavigate} />
        <span className="learning-header__progress">{progressLabel}</span>
      </header>

      {route.track.lessons.length > 0 ? (
        <FloatingToc track={route.track} activeLessonSlug={route.lessonSlug} onNavigate={navigate} />
      ) : null}

      <main
        ref={mainRef}
        className={`learning-content learning-content--${route.trackId}`}
        tabIndex={-1}
      >
        <Suspense fallback={<p className="route-loading">페이지를 불러오는 중입니다.</p>}>
          {ActivePage ? (
            <ActivePage key={`${route.trackId}-${route.lessonSlug}`} />
          ) : (
            <TrackOverviewPage label={route.track.label} description={route.track.description} />
          )}
        </Suspense>
      </main>
    </div>
  )
}
