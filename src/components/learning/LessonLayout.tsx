import type { ReactNode } from 'react'

type Props = {
  title: string
  description: string
  children: ReactNode
}

export function LessonLayout({ title, description, children }: Props) {
  return (
    <article className="lesson">
      <header className="lesson__header">
        <h2 className="lesson__title">{title}</h2>
        <p className="lesson__desc">{description}</p>
      </header>
      <div className="lesson__examples">{children}</div>
    </article>
  )
}
