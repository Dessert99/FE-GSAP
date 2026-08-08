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
  import('../content/gsap/fundamentals/gsap-to/GsapToPage').then(({ GsapToPage }) => ({ default: GsapToPage })),
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

const NonCssTargetValuesPage = lazy(() =>
  import('../content/gsap/fundamentals/non-css-target-values/NonCssTargetValuesPage').then(({ NonCssTargetValuesPage }) => ({ default: NonCssTargetValuesPage })),
)

const CssAnimationPage = lazy(() =>
  import('../content/gsap/fundamentals/css-animation/CssAnimationPage').then(({ CssAnimationPage }) => ({ default: CssAnimationPage })),
)

const EasingPage = lazy(() =>
  import('../content/gsap/fundamentals/easing/EasingPage').then(({ EasingPage }) => ({ default: EasingPage })),
)

const CustomEasePage = lazy(() =>
  import('../content/gsap/fundamentals/custom-ease/CustomEasePage').then(({ CustomEasePage }) => ({ default: CustomEasePage })),
)

const CustomBounceWigglePage = lazy(() =>
  import('../content/gsap/fundamentals/custom-bounce-wiggle/CustomBounceWigglePage').then(({ CustomBounceWigglePage }) => ({ default: CustomBounceWigglePage })),
)

const EasePackPage = lazy(() =>
  import('../content/gsap/fundamentals/ease-pack/EasePackPage').then(({ EasePackPage }) => ({ default: EasePackPage })),
)

const TweenPlayheadPage = lazy(() =>
  import('../content/gsap/fundamentals/tween-playhead/TweenPlayheadPage').then(({ TweenPlayheadPage }) => ({ default: TweenPlayheadPage })),
)

const TweenPlaybackControlsPage = lazy(() =>
  import('../content/gsap/fundamentals/tween-playback-controls/TweenPlaybackControlsPage').then(({ TweenPlaybackControlsPage }) => ({ default: TweenPlaybackControlsPage })),
)

const GsapRootClockPage = lazy(() =>
  import('../content/gsap/fundamentals/gsap-root-clock/GsapRootClockPage').then(({ GsapRootClockPage }) => ({ default: GsapRootClockPage })),
)

const GsapContextPage = lazy(() =>
  import('../content/gsap/fundamentals/gsap-context/GsapContextPage').then(({ GsapContextPage }) => ({ default: GsapContextPage })),
)

const ResponsiveMotionPage = lazy(() =>
  import('../content/gsap/fundamentals/responsive-motion/ResponsiveMotionPage').then(({ ResponsiveMotionPage }) => ({ default: ResponsiveMotionPage })),
)

const TweenInstancePage = lazy(() =>
  import('../content/gsap/fundamentals/tween-instance/TweenInstancePage').then(({ TweenInstancePage }) => ({ default: TweenInstancePage })),
)

const TweenTimingMathPage = lazy(() =>
  import('../content/gsap/fundamentals/tween-timing-math/TweenTimingMathPage').then(({ TweenTimingMathPage }) => ({ default: TweenTimingMathPage })),
)

const TweenRepeatsPage = lazy(() =>
  import('../content/gsap/fundamentals/tween-repeats/TweenRepeatsPage').then(({ TweenRepeatsPage }) => ({ default: TweenRepeatsPage })),
)

const HighFrequencyUpdatesPage = lazy(() =>
  import('../content/gsap/fundamentals/high-frequency-updates/HighFrequencyUpdatesPage').then(({ HighFrequencyUpdatesPage }) => ({ default: HighFrequencyUpdatesPage })),
)

const FindStopAnimationsPage = lazy(() =>
  import('../content/gsap/fundamentals/find-stop-animations/FindStopAnimationsPage').then(({ FindStopAnimationsPage }) => ({ default: FindStopAnimationsPage })),
)

const ReactUseGsapPage = lazy(() =>
  import('../content/gsap/fundamentals/react-use-gsap/ReactUseGsapPage').then(({ ReactUseGsapPage }) => ({ default: ReactUseGsapPage })),
)

const TweenCallbacksPromisePage = lazy(() =>
  import('../content/gsap/fundamentals/tween-callbacks-promise/TweenCallbacksPromisePage').then(({ TweenCallbacksPromisePage }) => ({ default: TweenCallbacksPromisePage })),
)

const ReusableEffectsPage = lazy(() =>
  import('../content/gsap/fundamentals/reusable-effects/ReusableEffectsPage').then(({ ReusableEffectsPage }) => ({ default: ReusableEffectsPage })),
)

const TimelineCallbacksPausesPage = lazy(() =>
  import('../content/gsap/fundamentals/timeline-callbacks-pauses/TimelineCallbacksPausesPage').then(({ TimelineCallbacksPausesPage }) => ({ default: TimelineCallbacksPausesPage })),
)

const TimelineBasicsPage = lazy(() =>
  import('../content/gsap/fundamentals/timeline-basics/TimelineBasicsPage').then(({ TimelineBasicsPage }) => ({ default: TimelineBasicsPage })),
)

const TimelineChildPlacementPage = lazy(() =>
  import('../content/gsap/fundamentals/timeline-child-placement/TimelineChildPlacementPage').then(({ TimelineChildPlacementPage }) => ({ default: TimelineChildPlacementPage })),
)

const TimelineLabelsPage = lazy(() =>
  import('../content/gsap/fundamentals/timeline-labels/TimelineLabelsPage').then(({ TimelineLabelsPage }) => ({ default: TimelineLabelsPage })),
)

const TimelineInspectionPage = lazy(() =>
  import('../content/gsap/fundamentals/timeline-inspection/TimelineInspectionPage').then(({ TimelineInspectionPage }) => ({ default: TimelineInspectionPage })),
)

const TimelineCleanupPage = lazy(() =>
  import('../content/gsap/fundamentals/timeline-cleanup/TimelineCleanupPage').then(({ TimelineCleanupPage }) => ({ default: TimelineCleanupPage })),
)

const TimelinePlaybackControlsPage = lazy(() =>
  import('../content/gsap/fundamentals/timeline-playback-controls/TimelinePlaybackControlsPage').then(({ TimelinePlaybackControlsPage }) => ({ default: TimelinePlaybackControlsPage })),
)

const TimelinePlayheadPage = lazy(() =>
  import('../content/gsap/fundamentals/timeline-playhead/TimelinePlayheadPage').then(({ TimelinePlayheadPage }) => ({ default: TimelinePlayheadPage })),
)

const TimelineTimingMathPage = lazy(() =>
  import('../content/gsap/fundamentals/timeline-timing-math/TimelineTimingMathPage').then(({ TimelineTimingMathPage }) => ({ default: TimelineTimingMathPage })),
)

const TimelineRepeatsPage = lazy(() =>
  import('../content/gsap/fundamentals/timeline-repeats/TimelineRepeatsPage').then(({ TimelineRepeatsPage }) => ({ default: TimelineRepeatsPage })),
)

const GsapUtilsPage = lazy(() =>
  import('../content/gsap/fundamentals/gsap-utils/GsapUtilsPage').then(({ GsapUtilsPage }) => ({ default: GsapUtilsPage })),
)

const RangeInterpolationPage = lazy(() =>
  import('../content/gsap/fundamentals/range-interpolation/RangeInterpolationPage').then(({ RangeInterpolationPage }) => ({ default: RangeInterpolationPage })),
)

const UtilityPipelinesUnitsPage = lazy(() =>
  import('../content/gsap/fundamentals/utility-pipelines-units/UtilityPipelinesUnitsPage').then(({ UtilityPipelinesUnitsPage }) => ({ default: UtilityPipelinesUnitsPage })),
)

const UtilityCollectionsRandomPage = lazy(() =>
  import('../content/gsap/fundamentals/utility-collections-random/UtilityCollectionsRandomPage').then(({ UtilityCollectionsRandomPage }) => ({ default: UtilityCollectionsRandomPage })),
)

const UtilityDistributePage = lazy(() =>
  import('../content/gsap/fundamentals/utility-distribute/UtilityDistributePage').then(({ UtilityDistributePage }) => ({ default: UtilityDistributePage })),
)

const ModifiersSnapWrapPage = lazy(() =>
  import('../content/gsap/fundamentals/modifiers-snap-wrap/ModifiersSnapWrapPage').then(({ ModifiersSnapWrapPage }) => ({ default: ModifiersSnapWrapPage })),
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
      { slug: 'non-css-target-values', title: 'CSS가 아닌 값', group: '값과 움직임', Page: NonCssTargetValuesPage },
      { slug: 'easing', title: 'Easing', group: '값과 움직임', Page: EasingPage },
      { slug: 'custom-ease', title: '속도 곡선 직접 만들기', group: '값과 움직임', Page: CustomEasePage },
      { slug: 'custom-bounce-wiggle', title: '튕김과 흔들림', group: '값과 움직임', Page: CustomBounceWigglePage },
      { slug: 'ease-pack', title: '특수 ease 모음', group: '값과 움직임', Page: EasePackPage },
      { slug: 'tween-instance', title: 'Tween에 남는 것', group: '트윈 제어', Page: TweenInstancePage },
      { slug: 'tween-playback-controls', title: '재생·정지·역재생', group: '트윈 제어', Page: TweenPlaybackControlsPage },
      { slug: 'tween-playhead', title: 'Tween playhead', group: '트윈 제어', Page: TweenPlayheadPage },
      { slug: 'tween-timing-math', title: '시간 계산', group: '트윈 제어', Page: TweenTimingMathPage },
      { slug: 'tween-repeats', title: '반복과 값 재계산', group: '트윈 제어', Page: TweenRepeatsPage },
      { slug: 'tween-callbacks-promise', title: '콜백 교체와 완료 대기', group: '트윈 제어', Page: TweenCallbacksPromisePage },
      { slug: 'find-stop-animations', title: '찾아서 멈추기', group: '트윈 제어', Page: FindStopAnimationsPage },
      { slug: 'high-frequency-updates', title: '잦은 입력에 반응하기', group: '트윈 제어', Page: HighFrequencyUpdatesPage },
      { slug: 'gsap-root-clock', title: '누가 매 frame 진행시키나', group: '엔진과 정리', Page: GsapRootClockPage },
      { slug: 'gsap-context', title: '한 영역을 함께 되돌리기', group: '엔진과 정리', Page: GsapContextPage },
      { slug: 'responsive-motion', title: '조건별 animation', group: '엔진과 정리', Page: ResponsiveMotionPage },
      { slug: 'react-use-gsap', title: 'React 안에서 쓰기', group: '통합', Page: ReactUseGsapPage },
      { slug: 'reusable-effects', title: '재사용 가능한 effect', group: '트윈 구성', Page: ReusableEffectsPage },
      { slug: 'timeline-callbacks-pauses', title: 'Timeline 함수와 멈춤 예약', group: 'Timeline', Page: TimelineCallbacksPausesPage },
      { slug: 'timeline-basics', title: 'Timeline sequence 만들기', group: 'Timeline', Page: TimelineBasicsPage },
      { slug: 'timeline-child-placement', title: 'Timeline child 배치', group: 'Timeline', Page: TimelineChildPlacementPage },
      { slug: 'timeline-labels', title: 'Timeline label 탐색', group: 'Timeline', Page: TimelineLabelsPage },
      { slug: 'timeline-inspection', title: 'Timeline child 조회', group: 'Timeline', Page: TimelineInspectionPage },
      { slug: 'timeline-cleanup', title: 'Timeline 내용 정리', group: 'Timeline', Page: TimelineCleanupPage },
      { slug: 'timeline-playback-controls', title: 'Timeline 재생 제어', group: 'Timeline', Page: TimelinePlaybackControlsPage },
      { slug: 'timeline-playhead', title: 'Timeline playhead 이동', group: 'Timeline', Page: TimelinePlayheadPage },
      { slug: 'timeline-timing-math', title: 'Timeline 시간 계산', group: 'Timeline', Page: TimelineTimingMathPage },
      { slug: 'timeline-repeats', title: 'Timeline 반복과 invalidate', group: 'Timeline', Page: TimelineRepeatsPage },
      { slug: 'gsap-utils', title: 'gsap.utils 계산 도구', group: '값 계산', Page: GsapUtilsPage },
      { slug: 'range-interpolation', title: '값 범위 변환과 보간', group: '값 계산', Page: RangeInterpolationPage },
      { slug: 'utility-pipelines-units', title: '계산 함수와 CSS 단위 연결', group: '값 계산', Page: UtilityPipelinesUnitsPage },
      { slug: 'utility-collections-random', title: '후보 배열과 무작위 선택', group: '값 계산', Page: UtilityCollectionsRandomPage },
      { slug: 'utility-distribute', title: '위치별 값 배분', group: '값 계산', Page: UtilityDistributePage },
      { slug: 'modifiers-snap-wrap', title: '값 가로채기·눈금·순환', group: '값 계산', Page: ModifiersSnapWrapPage },
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
