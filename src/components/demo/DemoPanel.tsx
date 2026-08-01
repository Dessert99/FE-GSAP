import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  OfficialDocsLink,
  type OfficialReference,
} from '../learning/OfficialDocsLink'
import './DemoPanel.css'

type Props = {
  title: string
  description: string
  references?: OfficialReference[]
  children: ReactNode
}

export function DemoPanel({ title, description, references, children }: Props) {
  const [runKey, setRunKey] = useState(0)

  return (
    <section className="demo-panel">
      <header className="demo-panel__header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="demo-panel__actions">
          {references?.map((reference) => (
            <OfficialDocsLink key={`${reference.href}-${reference.label}`} {...reference} />
          ))}
          <button
            type="button"
            className="demo-panel__replay"
            aria-label={`${title} 다시 재생`}
            onClick={() => setRunKey((key) => key + 1)}
          >
            <span aria-hidden="true">↻</span>
            다시 재생
          </button>
        </div>
      </header>
      <div key={runKey} className="demo-panel__stage">
        {children}
      </div>
    </section>
  )
}
