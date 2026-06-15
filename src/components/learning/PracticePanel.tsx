import { useState } from 'react'
import type { ReactNode } from 'react'
import { CodeBlock } from './CodeBlock'

type Props = {
  title: string
  description: string
  code: string
  children: ReactNode
}

export function PracticePanel({ title, description, code, children }: Props) {
  const [runKey, setRunKey] = useState(0) // 값을 바꾸면 상단 렌더링 영역만 다시 마운트되어 실습 애니메이션을 처음부터 다시 본다

  return (
    <section className="practice-panel">
      <div className="practice-panel__bar">
        <div className="practice-panel__heading">
          <h3 className="practice-panel__title">{title}</h3>
          <p className="practice-panel__desc">{description}</p>
        </div>
        <button className="practice-panel__replay" onClick={() => setRunKey((n) => n + 1)}>
          다시 재생
        </button>
      </div>
      <div className="practice-panel__demo" aria-label="실습 렌더링 결과">
        {/* 실습 화면은 위쪽에 결과만 크게 보여준다. key 변경은 이 영역의 useGSAP cleanup과 재실행을 확인하게 해준다 */}
        <div key={runKey} className="practice-panel__stage">
          {children}
        </div>
      </div>
      <div className="practice-panel__code" aria-label="실습 코드">
        <CodeBlock code={code} />
      </div>
    </section>
  )
}
