import { useState } from 'react'
import type { ReactNode } from 'react'
import { CodeBlock } from './CodeBlock'

type Props = {
  title: string
  code: string // 예제 소스를 ?raw로 불러온 문자열
  children: ReactNode // 실제로 실행되는 데모
}

export function ExamplePanel({ title, code, children }: Props) {
  const [runKey, setRunKey] = useState(0) // 값을 바꾸면 데모가 remount되어 애니메이션이 처음부터 다시 실행된다

  return (
    <section className="example">
      <div className="example__bar">
        <h3 className="example__title">{title}</h3>
        <button className="example__replay" onClick={() => setRunKey((n) => n + 1)}>
          다시 재생
        </button>
      </div>
      <div className="example__body">
        <div className="example__demo">
          {/* key가 바뀌면 이 영역이 언마운트→마운트되며 useGSAP 애니메이션이 다시 실행된다 */}
          <div key={runKey} className="example__stage">
            {children}
          </div>
        </div>
        <CodeBlock code={code} />
      </div>
    </section>
  )
}
