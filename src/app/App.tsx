/** URL·학습 트랙·레슨 화면을 동기화하고 앱 공통 탐색 UI를 조립한다. */
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { FloatingToc } from '../components/navigation/FloatingToc/FloatingToc'
import { TrackTabs } from '../components/navigation/TrackTabs/TrackTabs'
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
    // 알 수 없는 경로도 계산된 정규 경로로 교체해 새 히스토리를 만들지 않는다.
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
    // 사용자가 탐색한 경우에만 본문으로 초점을 옮겨 초기 진입의 초점을 빼앗지 않는다.
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
    // 새 탭 열기와 보조 클릭은 브라우저 기본 동작을 유지한다.
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
