import { lazy } from 'react'
import type { ComponentType } from 'react'

export type Section = 'api' | 'practice'

export type Lesson = {
  slug: string
  title: string
  Page: ComponentType
}

function lazyPage(loader: () => Promise<unknown>, exportName: string): ComponentType {
  return lazy(() =>
    loader().then((module) => ({
      default: (module as Record<string, ComponentType>)[exportName],
    })),
  ) as ComponentType
}

// API 탭의 사이드바와 페이지 전환의 단일 소스. Page는 클릭될 때 별도 chunk로 불러온다.
export const apiLessons: Lesson[] = [
  { slug: 'react-integration', title: 'React 통합', Page: lazyPage(() => import('./react-integration/ReactIntegrationPage'), 'ReactIntegrationPage') },
  { slug: 'gsap-to', title: 'gsap.to()', Page: lazyPage(() => import('./gsap-to/GsapToPage'), 'GsapToPage') },
  { slug: 'gsap-from', title: 'gsap.from()', Page: lazyPage(() => import('./gsap-from/GsapFromPage'), 'GsapFromPage') },
  { slug: 'gsap-from-to', title: 'gsap.fromTo()', Page: lazyPage(() => import('./gsap-from-to/GsapFromToPage'), 'GsapFromToPage') },
  { slug: 'gsap-set', title: 'gsap.set()', Page: lazyPage(() => import('./gsap-set/GsapSetPage'), 'GsapSetPage') },
  { slug: 'tween-properties', title: '트윈 핵심 속성', Page: lazyPage(() => import('./tween-properties/TweenPropertiesPage'), 'TweenPropertiesPage') },
  { slug: 'tween-values', title: '트윈 값 표현', Page: lazyPage(() => import('./tween-values/TweenValuesPage'), 'TweenValuesPage') },
  { slug: 'built-in-eases', title: '내장 ease', Page: lazyPage(() => import('./built-in-eases/BuiltInEasesPage'), 'BuiltInEasesPage') },
  { slug: 'ease-pack', title: 'EasePack', Page: lazyPage(() => import('./ease-pack/EasePackPage'), 'EasePackPage') },
  { slug: 'custom-eases', title: 'Custom Eases', Page: lazyPage(() => import('./custom-eases/CustomEasesPage'), 'CustomEasesPage') },
  { slug: 'timeline-basics', title: '타임라인 기본', Page: lazyPage(() => import('./timeline-basics/TimelineBasicsPage'), 'TimelineBasicsPage') },
  { slug: 'timeline-controls', title: '타임라인 제어', Page: lazyPage(() => import('./timeline-controls/TimelineControlsPage'), 'TimelineControlsPage') },
  { slug: 'callbacks', title: '콜백', Page: lazyPage(() => import('./callbacks/CallbacksPage'), 'CallbacksPage') },
  { slug: 'keyframes', title: 'keyframes', Page: lazyPage(() => import('./keyframes/KeyframesPage'), 'KeyframesPage') },
  { slug: 'stagger', title: 'stagger', Page: lazyPage(() => import('./stagger/StaggerPage'), 'StaggerPage') },
  { slug: 'gsap-utils', title: 'gsap.utils', Page: lazyPage(() => import('./gsap-utils/GsapUtilsPage'), 'GsapUtilsPage') },
  { slug: 'gsap-helpers', title: 'GSAP 헬퍼 메서드', Page: lazyPage(() => import('./gsap-helpers/GsapHelpersPage'), 'GsapHelpersPage') },
  { slug: 'match-media', title: 'gsap.matchMedia()', Page: lazyPage(() => import('./match-media/MatchMediaPage'), 'MatchMediaPage') },
  { slug: 'register-effect', title: 'gsap.registerEffect()', Page: lazyPage(() => import('./register-effect/RegisterEffectPage'), 'RegisterEffectPage') },
  { slug: 'modifiers-plugin', title: 'ModifiersPlugin', Page: lazyPage(() => import('./modifiers-plugin/ModifiersPluginPage'), 'ModifiersPluginPage') },
  { slug: 'scroll-trigger-basics', title: 'ScrollTrigger 기본', Page: lazyPage(() => import('./scroll-trigger-basics/ScrollTriggerBasicsPage'), 'ScrollTriggerBasicsPage') },
  { slug: 'scroll-trigger-start-end', title: 'ScrollTrigger start/end', Page: lazyPage(() => import('./scroll-trigger-start-end/ScrollTriggerStartEndPage'), 'ScrollTriggerStartEndPage') },
  { slug: 'scroll-trigger-scrub', title: 'ScrollTrigger scrub', Page: lazyPage(() => import('./scroll-trigger-scrub/ScrollTriggerScrubPage'), 'ScrollTriggerScrubPage') },
  { slug: 'scroll-trigger-pin', title: 'ScrollTrigger pin', Page: lazyPage(() => import('./scroll-trigger-pin/ScrollTriggerPinPage'), 'ScrollTriggerPinPage') },
  { slug: 'scroll-trigger-snap', title: 'ScrollTrigger snap', Page: lazyPage(() => import('./scroll-trigger-snap/ScrollTriggerSnapPage'), 'ScrollTriggerSnapPage') },
  { slug: 'scroll-trigger-callbacks', title: 'ScrollTrigger 콜백', Page: lazyPage(() => import('./scroll-trigger-callbacks/ScrollTriggerCallbacksPage'), 'ScrollTriggerCallbacksPage') },
  { slug: 'scroll-trigger-batch', title: 'ScrollTrigger.batch()', Page: lazyPage(() => import('./scroll-trigger-batch/ScrollTriggerBatchPage'), 'ScrollTriggerBatchPage') },
  { slug: 'scroll-trigger-match-media', title: 'ScrollTrigger matchMedia', Page: lazyPage(() => import('./scroll-trigger-match-media/ScrollTriggerMatchMediaPage'), 'ScrollTriggerMatchMediaPage') },
  { slug: 'scroll-to-plugin', title: 'ScrollToPlugin', Page: lazyPage(() => import('./scroll-to-plugin/ScrollToPluginPage'), 'ScrollToPluginPage') },
  { slug: 'scroll-smoother', title: 'ScrollSmoother', Page: lazyPage(() => import('./scroll-smoother/ScrollSmootherPage'), 'ScrollSmootherPage') },
  { slug: 'draggable', title: 'Draggable', Page: lazyPage(() => import('./draggable/DraggablePage'), 'DraggablePage') },
  { slug: 'observer', title: 'Observer', Page: lazyPage(() => import('./observer/ObserverPage'), 'ObserverPage') },
  { slug: 'flip', title: 'Flip', Page: lazyPage(() => import('./flip/FlipPage'), 'FlipPage') },
  { slug: 'draw-svg-plugin', title: 'DrawSVGPlugin', Page: lazyPage(() => import('./draw-svg-plugin/DrawSvgPluginPage'), 'DrawSvgPluginPage') },
  { slug: 'morph-svg-plugin', title: 'MorphSVGPlugin', Page: lazyPage(() => import('./morph-svg-plugin/MorphSvgPluginPage'), 'MorphSvgPluginPage') },
  { slug: 'motion-path-plugin', title: 'MotionPathPlugin', Page: lazyPage(() => import('./motion-path-plugin/MotionPathPluginPage'), 'MotionPathPluginPage') },
  { slug: 'split-text', title: 'SplitText', Page: lazyPage(() => import('./split-text/SplitTextPage'), 'SplitTextPage') },
  { slug: 'text-plugin', title: 'TextPlugin', Page: lazyPage(() => import('./text-plugin/TextPluginPage'), 'TextPluginPage') },
  { slug: 'scramble-text-plugin', title: 'ScrambleTextPlugin', Page: lazyPage(() => import('./scramble-text-plugin/ScrambleTextPluginPage'), 'ScrambleTextPluginPage') },
  { slug: 'physics-plugins', title: 'Physics 플러그인', Page: lazyPage(() => import('./physics-plugins/PhysicsPluginsPage'), 'PhysicsPluginsPage') },
  { slug: 'gs-dev-tools', title: 'GSDevTools', Page: lazyPage(() => import('./gs-dev-tools/GSDevToolsPage'), 'GSDevToolsPage') },
  { slug: 'reduced-motion', title: 'prefers-reduced-motion', Page: lazyPage(() => import('./reduced-motion/ReducedMotionPage'), 'ReducedMotionPage') },
]

// 실습 탭의 단일 소스. 실습도 태그를 클릭할 때 해당 페이지 chunk만 불러온다.
export const practiceLessons: Lesson[] = [
  { slug: 'practice-hero-intro', title: '실무 실습: Hero Intro', Page: lazyPage(() => import('./practice-hero-intro/PracticeHeroIntroPage'), 'PracticeHeroIntroPage') },
  { slug: 'practice-scroll-product', title: '실무 실습: Scroll Product', Page: lazyPage(() => import('./practice-scroll-product/PracticeScrollProductPage'), 'PracticeScrollProductPage') },
  { slug: 'practice-interactive-gallery', title: '실무 실습: Interactive Gallery', Page: lazyPage(() => import('./practice-interactive-gallery/PracticeInteractiveGalleryPage'), 'PracticeInteractiveGalleryPage') },
  { slug: 'practice-svg-text-motion', title: '실무 실습: SVG / Text Motion', Page: lazyPage(() => import('./practice-svg-text-motion/PracticeSvgTextMotionPage'), 'PracticeSvgTextMotionPage') },
  { slug: 'practice-navigation-modal', title: '실무 실습: Navigation / Modal', Page: lazyPage(() => import('./practice-navigation-modal/PracticeNavigationModalPage'), 'PracticeNavigationModalPage') },
  { slug: 'practice-performance-debugging', title: '실무 실습: Performance Debugging', Page: lazyPage(() => import('./practice-performance-debugging/PracticePerformanceDebuggingPage'), 'PracticePerformanceDebuggingPage') },
]
