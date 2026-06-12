import type { ComponentType } from 'react'
import { GsapToPage } from './gsap-to/GsapToPage'
import { GsapFromPage } from './gsap-from/GsapFromPage'

export type Lesson = {
  slug: string
  title: string
  Page: ComponentType
}

// 사이드바와 페이지 전환의 단일 소스. 새 레슨은 여기에 등록한다.
export const lessons: Lesson[] = [
  { slug: 'gsap-to', title: 'gsap.to()', Page: GsapToPage },
  { slug: 'gsap-from', title: 'gsap.from()', Page: GsapFromPage },
]
