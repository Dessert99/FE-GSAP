import type { ComponentType } from 'react'
import { GsapToPage } from './gsap-to/GsapToPage'
import { GsapFromPage } from './gsap-from/GsapFromPage'
import { GsapFromToPage } from './gsap-from-to/GsapFromToPage'
import { GsapSetPage } from './gsap-set/GsapSetPage'
import { TweenPropertiesPage } from './tween-properties/TweenPropertiesPage'
import { TweenValuesPage } from './tween-values/TweenValuesPage'
import { ReactIntegrationPage } from './react-integration/ReactIntegrationPage'
import { BuiltInEasesPage } from './built-in-eases/BuiltInEasesPage'
import { EasePackPage } from './ease-pack/EasePackPage'
import { CustomEasesPage } from './custom-eases/CustomEasesPage'
import { TimelineBasicsPage } from './timeline-basics/TimelineBasicsPage'
import { TimelineControlsPage } from './timeline-controls/TimelineControlsPage'

export type Lesson = {
  slug: string
  title: string
  Page: ComponentType
}

// 사이드바와 페이지 전환의 단일 소스. 새 레슨은 여기에 등록한다.
export const lessons: Lesson[] = [
  { slug: 'react-integration', title: 'React 통합', Page: ReactIntegrationPage },
  { slug: 'gsap-to', title: 'gsap.to()', Page: GsapToPage },
  { slug: 'gsap-from', title: 'gsap.from()', Page: GsapFromPage },
  { slug: 'gsap-from-to', title: 'gsap.fromTo()', Page: GsapFromToPage },
  { slug: 'gsap-set', title: 'gsap.set()', Page: GsapSetPage },
  { slug: 'tween-properties', title: '트윈 핵심 속성', Page: TweenPropertiesPage },
  { slug: 'tween-values', title: '트윈 값 표현', Page: TweenValuesPage },
  { slug: 'built-in-eases', title: '내장 ease', Page: BuiltInEasesPage },
  { slug: 'ease-pack', title: 'EasePack', Page: EasePackPage },
  { slug: 'custom-eases', title: 'Custom Eases', Page: CustomEasesPage },
  { slug: 'timeline-basics', title: '타임라인 기본', Page: TimelineBasicsPage },
  { slug: 'timeline-controls', title: '타임라인 제어', Page: TimelineControlsPage },
]
