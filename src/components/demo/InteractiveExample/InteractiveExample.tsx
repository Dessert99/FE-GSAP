/** 조절형 예제의 화면·코드·속성 설명·관찰 순서를 같은 프레임으로 묶는다. */
import type { ReactNode } from 'react'
import './InteractiveExample.css'

/** 예제에서 다루는 GSAP 속성의 타입과 허용값을 표로 전달한다. */
export type PropertyDetail = {
  name: string
  type: string
  defaultValue: string
  acceptedValues: string
}

type Props = {
  title: string
  description: string
  sourcePath: string
  controls: ReactNode
  preview: ReactNode
  code: string
  propertyDetails: PropertyDetail[]
  changes: string[]
  watchFor: string[]
  explanation: ReactNode
  onReplay: () => void
  replayLabel?: string
  reducedMotion?: boolean
}

/** 조절값·실행 화면·동기화 코드·관찰 지점을 한 학습 흐름으로 묶는다. */
export function InteractiveExample({
  title,
  description,
  sourcePath,
  controls,
  preview,
  code,
  propertyDetails,
  changes,
  watchFor,
  explanation,
  onReplay,
  replayLabel = '현재 값으로 실행',
  reducedMotion = false,
}: Props) {
  return (
    <section className="interactive-example">
      <header className="interactive-example__header">
        <div>
          <p className="interactive-example__eyebrow">INTERACTIVE EXAMPLE</p>
          <h3>{title}</h3>
          <p className="interactive-example__description">{description}</p>
        </div>
        <button type="button" className="interactive-example__replay" onClick={onReplay}>
          <span aria-hidden="true">↻</span>
          {replayLabel}
        </button>
      </header>

      {reducedMotion ? <p className="interactive-example__motion-notice">모션 감소 설정이 켜져 있어 미리보기는 0초·무반복으로 실행됩니다.</p> : null}

      <div className="interactive-example__workspace">
        <div className="interactive-example__preview">{preview}</div>
        <aside className="interactive-example__controls" aria-label={`${title} 값 조절`}>
          <p className="interactive-example__panel-label">값 조절</p>
          {controls}
        </aside>
      </div>

      <div className="interactive-example__source">
        <div className="interactive-example__source-heading">
          <span>현재 값과 동기화된 코드</span>
          <code>{sourcePath}</code>
        </div>
        <pre>
          <code>{code}</code>
        </pre>
      </div>

      <div className="interactive-example__property-reference">
        <p className="interactive-example__panel-label">속성 값 정보</p>
        <div className="interactive-example__table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">속성</th>
                <th scope="col">타입</th>
                <th scope="col">기본값</th>
                <th scope="col">허용값·특수값</th>
              </tr>
            </thead>
            <tbody>
              {propertyDetails.map((property) => (
                <tr key={property.name}>
                  <th scope="row"><code>{property.name}</code></th>
                  <td>{property.type}</td>
                  <td>{property.defaultValue}</td>
                  <td>{property.acceptedValues}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="interactive-example__lesson">
        <section>
          <h4>무엇이 달라졌나요?</h4>
          <ul>
            {changes.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
        </section>
        <section>
          <h4>무엇을 봐야 하나요?</h4>
          <ul>
            {watchFor.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
        <section className="interactive-example__principle">
          <h4>왜 이렇게 동작하나요?</h4>
          {explanation}
        </section>
      </div>
    </section>
  )
}
