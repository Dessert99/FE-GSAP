import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

export type TrackId = 'fundamentals' | 'patterns' | 'showcases'

export type LessonDefinition = {
  slug: string
  title: string
  group: string
  Page: LazyExoticComponent<ComponentType>
}

export type TrackDefinition = {
  id: TrackId
  label: string
  description: string
  lessons: LessonDefinition[]
}

export type ResolvedRoute = {
  track: TrackDefinition
  trackId: TrackId
  lesson: LessonDefinition | null
  lessonSlug: string | null
  canonicalPath: string
}

const GsapToPage = lazy(() =>
  import('../fundamentals/gsap-to/GsapToPage').then(({ GsapToPage }) => ({ default: GsapToPage })),
)

export const tracks: TrackDefinition[] = [
  {
    id: 'fundamentals',
    label: '기본',
    description: '공식 API와 자주 만나는 상황을 작은 예제로 깊게 확인합니다.',
    lessons: [{ slug: 'gsap-to', title: 'gsap.to()', group: '트윈 기초', Page: GsapToPage }],
  },
  {
    id: 'patterns',
    label: '패턴',
    description: '여러 GSAP 기능을 특정 디자인에 종속되지 않는 조합 패턴으로 익힙니다.',
    lessons: [],
  },
  {
    id: 'showcases',
    label: '실무',
    description: '페이지와 컴포넌트 단위의 완성된 디자인으로 실무 활용법을 익힙니다.',
    lessons: [],
  },
]

export function getTrackHref(track: TrackDefinition) {
  const firstLesson = track.lessons[0]

  return firstLesson ? `/${track.id}/${firstLesson.slug}` : `/${track.id}`
}

export function resolveRoute(pathname: string): ResolvedRoute {
  const [trackSegment, lessonSegment] = pathname.split('/').filter(Boolean)
  const track = tracks.find(({ id }) => id === trackSegment) ?? tracks[0]
  const lesson = track.lessons.find(({ slug }) => slug === lessonSegment) ?? track.lessons[0] ?? null

  return {
    track,
    trackId: track.id,
    lesson,
    lessonSlug: lesson?.slug ?? null,
    canonicalPath: lesson ? `/${track.id}/${lesson.slug}` : `/${track.id}`,
  }
}
