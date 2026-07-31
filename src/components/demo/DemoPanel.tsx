import { useState } from 'react'
import type { ReactNode } from 'react'
import './DemoPanel.css'

type Props = {
  title: string
  description: string
  children: ReactNode
}

export function DemoPanel({ title, description, children }: Props) {
  const [runKey, setRunKey] = useState(0)

  return (
    <section className="demo-panel">
      <header className="demo-panel__header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <button
          type="button"
          className="demo-panel__replay"
          aria-label={`${title} 다시 재생`}
          onClick={() => setRunKey((key) => key + 1)}
        >
          <span aria-hidden="true">↻</span>
          다시 재생
        </button>
      </header>
      <div key={runKey} className="demo-panel__stage">
        {children}
      </div>
    </section>
  )
}
