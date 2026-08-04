/** 학습 콘텐츠 등록 정보와 URL 해석 규칙을 한곳에서 관리한다. */
import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

/** 앱 상단에서 전환할 수 있는 학습 관점의 고정 식별자다. */
export type TrackId = 'fundamentals' | 'patterns' | 'showcases'

/** 목차 항목과 지연 로딩할 학습 페이지를 연결한다. */
export type LessonDefinition = {
  slug: string
  title: string
  group: string
  Page: LazyExoticComponent<ComponentType>
}

/** 한 트랙의 소개와 소속 레슨을 탐색 UI에 전달한다. */
export type TrackDefinition = {
  id: TrackId
  label: string
  description: string
  lessons: LessonDefinition[]
}

/** 요청 경로를 화면 렌더링에 필요한 정규화된 상태로 바꾼 결과다. */
export type ResolvedRoute = {
  track: TrackDefinition
  trackId: TrackId
  lesson: LessonDefinition | null
  lessonSlug: string | null
  canonicalPath: string
}

const GsapToPage = lazy(() =>
  import('../content/gsap/methods/gsap-to/GsapToPage').then(({ GsapToPage }) => ({ default: GsapToPage })),
)

const GsapCoreMapPage = lazy(() =>
  import('../content/gsap/fundamentals/gsap-core-map/GsapCoreMapPage').then(({ GsapCoreMapPage }) => ({ default: GsapCoreMapPage })),
)

const InstallationPage = lazy(() =>
  import('../content/gsap/fundamentals/installation/InstallationPage').then(({ InstallationPage }) => ({ default: InstallationPage })),
)

const TweenStartEndValuesPage = lazy(() =>
  import('../content/gsap/fundamentals/tween-start-end-values/TweenStartEndValuesPage').then(({ TweenStartEndValuesPage }) => ({ default: TweenStartEndValuesPage })),
)

const TweenConfigurationPage = lazy(() =>
  import('../content/gsap/fundamentals/tween-configuration/TweenConfigurationPage').then(({ TweenConfigurationPage }) => ({ default: TweenConfigurationPage })),
)

const CssAnimationPage = lazy(() =>
  import('../content/gsap/fundamentals/css-animation/CssAnimationPage').then(({ CssAnimationPage }) => ({ default: CssAnimationPage })),
)

const EasingPage = lazy(() =>
  import('../content/gsap/fundamentals/easing/EasingPage').then(({ EasingPage }) => ({ default: EasingPage })),
)

const TweenPlayheadPage = lazy(() =>
  import('../content/gsap/fundamentals/tween-playhead/TweenPlayheadPage').then(({ TweenPlayheadPage }) => ({ default: TweenPlayheadPage })),
)

const ReusableEffectsPage = lazy(() =>
  import('../content/gsap/fundamentals/reusable-effects/ReusableEffectsPage').then(({ ReusableEffectsPage }) => ({ default: ReusableEffectsPage })),
)

/** 앱에서 탐색 가능한 모든 학습 트랙과 레슨의 단일 등록부다. */
export const tracks: TrackDefinition[] = [
  {
    id: 'fundamentals',
    label: '기본',
    description: '공식 API와 자주 만나는 상황을 작은 예제로 깊게 확인합니다.',
    lessons: [
      { slug: 'gsap-core-map', title: 'GSAP Core 지도', group: '시작하기', Page: GsapCoreMapPage },
      { slug: 'installation', title: 'GSAP 가져오기와 등록하기', group: '시작하기', Page: InstallationPage },
      { slug: 'gsap-to', title: 'gsap.to()', group: '트윈 기초', Page: GsapToPage },
      { slug: 'tween-start-end-values', title: 'Tween 시작·끝 값', group: '트윈 기초', Page: TweenStartEndValuesPage },
      { slug: 'tween-configuration', title: '설정은 어디서 오나', group: '트윈 기초', Page: TweenConfigurationPage },
      { slug: 'css-animation', title: 'CSS animation', group: '값과 움직임', Page: CssAnimationPage },
      { slug: 'easing', title: 'Easing', group: '값과 움직임', Page: EasingPage },
      { slug: 'tween-playhead', title: 'Tween playhead', group: '트윈 제어', Page: TweenPlayheadPage },
      { slug: 'reusable-effects', title: '재사용 가능한 effect', group: '트윈 구성', Page: ReusableEffectsPage },
    ],
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

/** 배포 환경마다 달라지는 base를 끝 슬래시 없는 접두사로 통일한다. */
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

/** 앱 내부 경로에 배포 base를 붙여 실제 브라우저 주소로 만든다. */
export function toHref(path: string) {
  return `${basePath}${path}`
}

/** 브라우저 주소에서 배포 base를 걷어내 앱 내부 경로로 되돌린다. */
export function toAppPath(pathname: string) {
  return pathname.startsWith(basePath) ? pathname.slice(basePath.length) || '/' : pathname
}

/** 레슨이 있으면 첫 학습 페이지로, 없으면 트랙 소개로 연결한다. */
export function getTrackHref(track: TrackDefinition) {
  const firstLesson = track.lessons[0]

  return firstLesson ? `/${track.id}/${firstLesson.slug}` : `/${track.id}`
}

/** 모르는 경로도 첫 트랙·첫 레슨으로 흡수해 학습 흐름이 끊기지 않게 한다. */
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
