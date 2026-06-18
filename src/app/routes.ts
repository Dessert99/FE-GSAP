const lessonRoutePrefix = '/lessons/'
const practiceRoutePrefix = '/practices/'

type Section = 'api' | 'practice'

type RouteLesson = {
  slug: string
}

export type ActiveRoute = {
  section: Section
  slug: string
}

export function getActiveRouteByPath(pathname: string, apiLessons: RouteLesson[], practiceLessons: RouteLesson[]): ActiveRoute {
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

  const slugAlias = decodeURIComponent(pathname.slice(1).split('/')[0])
  const activeLesson = apiLessons.find((lesson) => lesson.slug === slugAlias)

  if (activeLesson) {
    return { section: 'api', slug: activeLesson.slug }
  }

  return { section: 'api', slug: apiLessons[0].slug }
}

export function getRoutePath(section: Section, slug: string) {
  return section === 'api' ? `${lessonRoutePrefix}${slug}` : `${practiceRoutePrefix}${slug}`
}
