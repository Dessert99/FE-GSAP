/** position 표기 하나를 실제 Timeline에 넣고 getter 좌표·시간축·실행 코드를 같은 입력에서 보여 준다. */
import { positionFormOptions, usePositionSyntaxRuntime } from './usePositionSyntaxRuntime'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './PositionSyntaxLab.css'

export function PositionSyntaxLab() {
  // runtime이 소유한 control·descriptor·getter 결과를 화면 입력과 관찰 패널에 연결한다
  const {
    scope,
    formId,
    setFormId,
    insertedRepeat,
    setInsertedRepeat,
    descriptor,
    readout,
    segments,
    reducedMotion,
    round,
    labelName,
    labelPosition,
    previousDuration,
    previousPosition,
    insertedDuration,
  } = usePositionSyntaxRuntime()
  // getter가 보고한 최종 Timeline 길이를 ruler 좌표의 분모로 쓴다
  const rulerDuration = readout?.timelineDuration ?? previousDuration
  // repeat control을 실제 Tween vars 한 줄로 직렬화한다
  const repeatSyntax = descriptor.insertedRepeat === 0 ? '' : ', repeat: 1'
  // 실제 runtime 호출과 같은 descriptor를 코드 패널의 position·repeat 표기로 바꾼다
  const code = `const timeline = gsap.timeline({ paused: true })
const previous = gsap.to({ v: 0 }, { v: 1, duration: ${previousDuration} })
timeline.add(previous, ${previousPosition})
timeline.addLabel('${labelName}', ${labelPosition})

const inserted = gsap.to({ v: 0 }, { v: 1, duration: ${insertedDuration}${repeatSyntax} })
timeline.add(inserted, ${descriptor.form.code})`

  return (
    <section className="position-lab" aria-labelledby="position-lab-title" ref={scope} data-reduced-motion={reducedMotion}>
      <header>
        <p className="position-lab__eyebrow">실행 예제</p>
        <h3 id="position-lab-title">같은 fixture에서 position 표기만 바꾸기</h3>
        <p>이전 animation은 {previousPosition}초에서 {previousDuration}초까지, <code>{labelName}</code>은 {labelPosition}초에 고정합니다. 표기와 repeat만 바꾸고 실제 getter 좌표를 읽습니다.</p>
      </header>

      <div className="position-lab__controls">
        <label>
          <span>position 표기</span>
          <select value={formId} onChange={(event) => setFormId(event.target.value)}>
            {positionFormOptions.map((option) => <option key={option.id} value={option.id}>{option.code}</option>)}
          </select>
        </label>
        <label className="position-lab__check">
          <input type="checkbox" checked={insertedRepeat === 1} onChange={(event) => setInsertedRepeat(event.target.checked ? 1 : 0)} />
          <span>삽입 child에 <code>repeat: 1</code> 적용</span>
        </label>
      </div>

      <p className="position-lab__status" role="status">
        {readout ? <><code>{descriptor.form.code}</code> → 시작 {round(readout.insertedStart)}초 · total duration {round(readout.insertedTotalDuration)}초</> : '좌표를 읽는 중입니다.'}
      </p>

      <div className="position-lab__ruler" aria-label="부모 Timeline 위 실제 child 배치">
        <div className="position-lab__label" style={{ left: `${readout ? (readout.labelTime / rulerDuration) * 100 : 0}%` }}>
          <span>{labelName}</span><small>{readout ? round(readout.labelTime) : 0}s</small>
        </div>
        {segments.map((segment, index) => (
          <div
            className="position-lab__segment"
            data-kind={segment.kind}
            key={segment.id}
            style={{ left: `${(segment.start / rulerDuration) * 100}%`, top: `${38 + index * 54}px`, width: `${((segment.end - segment.start) / rulerDuration) * 100}%` }}
          >
            <strong>{segment.label}</strong>
            <small>{round(segment.start)}s → {round(segment.end)}s</small>
          </div>
        ))}
      </div>

      {readout ? (
        <div className="position-lab__readouts">
          <div><span>삽입 직전 끝</span><strong>{round(readout.timelineEndBeforeInsert)}s</strong></div>
          <div><span>이전 child total</span><strong>{round(readout.previousTotalDuration)}s</strong></div>
          <div><span>삽입 child total</span><strong>{round(readout.insertedTotalDuration)}s</strong></div>
          <div><span>최종 Timeline 길이</span><strong>{round(readout.timelineDuration)}s</strong></div>
        </div>
      ) : null}

      <pre className="position-lab__code"><code>{code}</code></pre>

      <div className="position-lab__explanations">
        <article><h4>무엇이 달라졌나요?</h4><p>position 표기를 바꾸면 삽입 child의 <code>startTime()</code>만 새 기준점에 맞춰 바뀝니다.</p></article>
        <article><h4>무엇을 봐야 하나요?</h4><p>퍼센트 표기에서 repeat를 켰을 때 이전 child 기준과 삽입 child 기준 중 어느 막대가 계산에 쓰이는지 비교하세요.</p></article>
        <article><h4>왜 이렇게 동작하나요?</h4><p>GSAP은 표기 앞부분으로 기준점을 고르고, 뒤의 숫자나 퍼센트를 그 기준에서 이동량으로 해석합니다.</p></article>
        <article><h4>실제로 언제 쓰나요?</h4><p>고정 초를 다시 계산하지 않고 gap·overlap·label·직전 child 기준으로 sequence를 조립할 때 씁니다.</p></article>
      </div>

      <p className="position-lab__source">실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/timeline-child-placement/examples/PositionSyntaxLab/usePositionSyntaxRuntime.ts" /></p>
    </section>
  )
}
