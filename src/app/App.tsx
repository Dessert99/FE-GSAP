import { useState } from 'react'
import { Sidebar } from '../components/learning/Sidebar'
import { lessons } from '../lessons'

export function App() {
  const [activeSlug, setActiveSlug] = useState(lessons[0].slug)
  const active = lessons.find((lesson) => lesson.slug === activeSlug) ?? lessons[0]
  const ActivePage = active.Page

  return (
    <div className="app">
      <Sidebar lessons={lessons} activeSlug={active.slug} onSelect={setActiveSlug} />
      <main className="content">
        {/* key=slug: 레슨을 바꾸면 페이지가 언마운트되며 이전 데모가 정리되고 새 데모는 초기 상태에서 시작한다 */}
        <ActivePage key={active.slug} />
      </main>
    </div>
  )
}
